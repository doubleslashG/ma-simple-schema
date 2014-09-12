Package.describe({
  summary: "aldeed:simple-schema extended",
  version: "0.0.0",
  git: "https://github.com/doubleslashG/ma-simple-schema.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('ma:simple-schema.js');
  api.use('aldeed:simple-schema');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ma:simple-schema');
  api.addFiles('ma:simple-schema-tests.js');
});
