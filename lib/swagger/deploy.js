'use strict';

const Swagger = require('./');
const fs = require('fs');
const Promise = require('bluebird');
const path = require('path');
const colors = require('colors');

/**
 * Deploy Swagger resources to the Cloud storage
 */
class SwaggerDeploy {
  constructor(sqz) {
    this.sqz = sqz;
  }

  run() {
    return new Promise((resolve) => {
      this.sqz.provider.utils.getAppBaseUrl().then((appBaseUrl) => {
        const swagger = new Swagger(this.sqz, appBaseUrl);
        const swaggerAssetsPath = path.join(__dirname, '../../public/swagger');
        const docsFilename = path.join(swaggerAssetsPath, 'api-docs.json');
        this.sqz.cli.log.info('Uploading Swagger API Docs resources');
        this.sqz.cli.loader.start();

        fs.writeFileSync(docsFilename, JSON.stringify(swagger.run(), null, 2), 'utf8');

        this.sqz.provider.utils.getStorageBaseUrl().then((publicUrl) => {
          this.sqz.provider.storage.uploadDir(swaggerAssetsPath, 'swagger-ui', {
            sync: true,
            public: true
          }).then(() => {
            const swaggerUrl = `${publicUrl}/swagger-ui/index.html`;
            this.sqz.cli.loader.stop();
            this.sqz.cli.log.info(`Swagger API Docs : "${colors.blue.bold(swaggerUrl)}"`);

            fs.unlinkSync(docsFilename);

            resolve();
          });
        });
      });
    });
  }
}

module.exports = SwaggerDeploy;
