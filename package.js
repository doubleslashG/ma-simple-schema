Package.describe({
  summary: " \* Fill me in! *\ ",
  version: "1.0.0",
  git: " \* Fill me in! *\ "
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('ma:simple-schema.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ma:simple-schema');
  api.addFiles('ma:simple-schema-tests.js');
});
