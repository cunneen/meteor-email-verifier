Package.describe({
  summary: "Override the default email verification sequence.  See ideaq/meteor-email.",
    version: '1.0.1',
    name: "cunneen:email-verifier",
    githubUrl: 'https://github.com/cunneen/meteor-email-verifier/'
});

Package.on_use(function(api, where) {
  api.use([
    'deps@1.0.6',
    'service-configuration@1.0.3',
    'underscore@1.0.2',
    'templating@1.0.11',
    'handlebars@1.0.2',
    'email@1.0.5',
    'iron:router@1.0.7']
          , 'client');
  api.use([
    'accounts-base@1.1.3',
  ], ['client', 'server']);
  api.add_files([
    'client/views/templates.html',
    'shared/routes.js'
  ], 'client');
  api.add_files('server/server_verify_email.js', 'server');
  api.export('AccountController');
});

Package.on_test(function(api) {
  api.use('cunneen:email-verifier');

});
