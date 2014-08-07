Package.describe({
  summary: "Override the default email verification sequence. From https://github.com/ideaq/meteor-email ."
});

Package.on_use(function(api, where) {
  api.use([
    'deps',
    'service-configuration',
    'underscore',
    'templating',
    'handlebars',
    'iron-router']
          , 'client');
  api.use([
    'accounts-base',
  ], ['client', 'server']);
  api.add_files([
    'client/views/templates.html',
    'shared/routes.js'
  ], 'client');
  api.add_files('server/server_verify_email.js', 'server');
  api.export('AccountController');
});

Package.on_test(function(api) {
  api.use('email-verifier');

});