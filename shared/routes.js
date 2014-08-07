// More info: https://github.com/EventedMind/iron-router/issues/3
AccountController = RouteController.extend({
  verifyEmail: function() {
    Accounts.verifyEmail(this.params.token, function() {
      Router.go('/verified');
    });
  }
});

Router.map(function() {

  this.route('verifyEmail', {
    controller: 'AccountController',
    path: '/verify-email/:token',
    action: 'verifyEmail'
  });
  this.route('verified', {
    path: '/verified',
    template: 'verified',
    layoutTemplate: 'fullScreen'

  });
  this.route('checkemail', {
    path: '/checkemail',
    template: 'checkemail',
    layoutTemplate: 'fullScreen'
  });
});

