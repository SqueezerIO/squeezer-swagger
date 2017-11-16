'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Swagger = require('../swagger');
const path = require('path');
const colors = require('colors');

/**
 * Class that serves a Swagger API project
 */
class Express {
  constructor(sqz) {
    this.sqz = sqz;
  }

  /**
   * Start the Node Express server
   */
  run() {
    return new Promise((resolve) => {
      const app = express();
      let port = 4002;

      app.use((req, res, next) => {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, '
          + 'max-stale=0, post-check=0, pre-check=0');
        req.rawBody = '';

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');

        req.setEncoding('utf8');

        req.on('data', (chunk) => {
          req.rawBody += chunk;
        });

        req.on('end', () => {
          next();
        });
      });

      app.use(bodyParser.raw());

      const swagger = new Swagger(this.sqz, process.env.APP_URL, {});

      app.use('/swagger-ui', express.static(path.join(__dirname, '../../public/swagger')));

      app.get('/swagger-ui/api-docs.json', (req, res) => {
        res.send(swagger.run({ development: true }));
      });

      const httpServer = () => {
        app.listen(port, () => {
          const appUrl = `http://localhost:${port}`;
          this.sqz.cli.log.info(`Swagger API Docs "${colors.blue.bold(`${appUrl}/swagger-ui`)}"`);
          resolve(null, true);
        }).on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            port += 1;
            httpServer();
          }
        });
      };

      httpServer();
    });
  }
}

module.exports = Express;
