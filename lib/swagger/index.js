'use strict';

const _        = require('lodash');
const URL      = require('url-parse');

/**
 * Class manages Swagger JSON file building
 */
class Swagger {
  constructor(sqz, host, options) {
    this.sqz = sqz;
    this.options = options || {};
    this.url = new URL(host);
  }

  init() {
    const project = this.sqz.vars.project;
    this.swagger = {
      swagger     : '2.0',
      info        : {
        description    : 'Loads documentation from the <b>swagger.yml</b> ' +
        'files stored in the  microservices directories',
        version        : '1.0.0',
        title          : 'API documentation',
        termsOfService : 'http://swagger.io/terms/',
        contact        : {
          email : 'nick@squeezer.io'
        },
        license        : {
          name : 'Apache 2.0',
          url  : 'http://www.apache.org/licenses/LICENSE-2.0.html'
        }
      },
      host        : this.url.host,
      basePath    : this.url.pathname,
      tags        : [],
      schemes     : [
        this.url.protocol.replace(':', '')
      ],
      paths       : {},
      definitions : {}
    };

    if (_.has(project, 'swagger')) {
      this.swagger = _.assign(this.swagger, project.swagger);
    }
  }

  run() {
    this.init();
    this.load();

    return this.swagger;
  }

  load() {
    const functions = this.sqz.vars.functions;

    _.forEach(functions, (functionObject) => {
      if (_.has(functionObject, 'swagger')) {
        const data = functionObject.swagger;
        /* add paths to the Swagger main object */
        _.forEach(data.paths, (pathVal, pathName) => {
          if (!_.has(this.swagger.paths, pathName)) {
            this.swagger.paths[pathName] = {};
          }
          _.forEach(pathVal, (methodVal, methodName) => {
            this.swagger.paths[pathName][methodName] = methodVal;
          });
        });

        /* add definitions to the Swagger main object */
        _.forEach(data.definitions, (definitionVal, definitionName) => {
          this.swagger.definitions[definitionName] = definitionVal;
        });
      }
    });
  }
}

module.exports = Swagger;
