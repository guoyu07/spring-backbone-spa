/**
 * Define Require module with dependencies
 */
define([
  'bootstrap',
  'underscore',
  'backbone',
  'models/login'
], function ($, _, Backbone, LoginStatus) {
  /**
   * Login view which represents the login popup
   */
  var LoginView = Backbone.View.extend({
    // Wired on the login modal
    el:'div.register-login',
    // Listen view events on modal buttons
    events:{
      'click .modal-footer .btn.cancelLogin':'cancel',
      'click .modal-footer .btn.doLogin':'ok',
      'click .modal-footer .btn.showRegister':'showRegister'
    },
    // View initialization with logout outside if the view and listening on model
    initialize:function (callback) {
      this.callback = callback;
      //$("a.logout").click(this.logout);
      LoginStatus.on('change:loggedIn', this.loggedInChange, this);
      LoginStatus.fetch();
    },
    // Login state change handler
    loggedInChange:function () {
      if (LoginStatus.get('loggedIn')) {
        this.$("div.modal.login").modal('hide');
        if (this.callback) {
          this.callback();
        }
      } else {
        this.$("form input").val(null);
        this.$("div.modal.login").modal('show');
      }
    },
    // Ok button handler
    ok:function () {
      LoginStatus.set({
        username:this.$("#username").val(),
        password:this.$("#password").val(),
        rememberMe:this.$("#rememberMe:checked").length > 0,
      });
      LoginStatus.save();
    },
    // Cancel button handler
    cancel:function () {
      this.$("div.modal").modal('hide');
    },
    showRegister:function() {
    	this.$("div.modal.login").modal('hide');
    	this.$("div.modal.register").modal('show');
    },
    showLogin:function() {
    	this.$("div.modal.login").modal('show');
    	this.$("div.modal.register").modal('hide');
    }
    // Logout button handler
//    logout:function () {
//      LoginStatus.destroy();
//      LoginStatus.set({
//        loggedIn:false
//      });
//    }
  });

  // Return the view as the Require module
  return LoginView;

});
