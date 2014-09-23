Package.describe({
  summary: "aldeed:simple-schema extended",
  version: "1.1.1",
  git: "https://github.com/doubleslashG/ma-simple-schema.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('simple-schema.js');
  api.use('aldeed:simple-schema');
  api.use('check');
  api.imply('aldeed:simple-schema');

  api.export('maSimpleSchema');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ma:simple-schema');
  api.addFiles('simple-schema-tests.js');
});
