'use strict';

const build = require('@microsoft/sp-build-web');
const fs = require("fs");

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.task('update-appSettings', {
  execute: (config) => {
    return new Promise((resolve, reject) => {
      const stage = config.args['stage'] || environmentInfo.stage;
      console.info(`Using Stage ${stage}`);    
      let inputFile;
      let appSettingsFile;
      try {
        inputFile = fs.readFileSync('./src/appSettings.all.json');
        let inputJson = JSON.parse(inputFile);
        appSettingsFile = fs.readFileSync('./src/appSettings.json');
        let appSettings = JSON.parse(appSettingsFile);

        // Variables
        appSettings.siteUrl = inputJson.tenants[stage].siteUrl;
        appSettings.cssUrl = inputJson.tenants[stage].cssUrl;
        ///////////////////////////

        fs.writeFileSync('./src/appSettings.json', JSON.stringify(appSettings));
        resolve();
      }
      catch(err) {
        console.log(err);
      }
    });
  }
});


build.initialize(require('gulp'));
