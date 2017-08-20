'use strict';

const Swagger = require('./');
const fs      = require('fs');
const Promise = require('bluebird');
const path    = require('path');

/**
 * Deploy Swagger resources to the Cloud storage
 */
class SwaggerDeploy {
  constructor(sqz) {
    this.sqz = sqz;
  }

  run() {
    return new Promise((resolve) => {
      const swagger      = new Swagger(this.sqz, this.sqz.variables.getAppBaseUrl());
      const project      = this.sqz.vars.project;
      const docsFilename = `${project.buildPath}/api-docs.json`;

      this.sqz.cli.log.info('Uploading Swagger API Docs resources');
      this.sqz.cli.loader.start();

      fs.writeFileSync(docsFilename, JSON.stringify(swagger.run(), null, 2), 'utf8');

      this.sqz.cloud.storage.getPublicUrl().then((pubRes) => {
        const publicUrl = pubRes.publicUrl;

        this.sqz.cloud.storage.uploadDir(path.join(__dirname, '../../public/swagger'), 'swagger-ui', {
          sync   : true,
          public : true
        }).then(() => {
          this.sqz.cloud.storage.uploadFile(docsFilename, 'swagger-ui/api-docs.json', {
            public : true
          }).then(() => {
            this.sqz.cli.loader.stop();
            this.sqz.cli.log.info(`Swagger API Docs : ${publicUrl}/swagger-ui/index.html`);
            resolve();
          });
        });
      });

      resolve();
    });
  }
}

module.exports = SwaggerDeploy;
