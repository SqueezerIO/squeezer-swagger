'use strict';

class SwaggerPlugin {
  constructor(sqz) {
    this.sqz = sqz;

    this.commands = [
      {
        arg       : ['serve'],
        lifecycle : [
          'swagger:serve'
        ],
        options   : {},
        examples  : []
      },
      {
        arg         : ['deploy'],
        lifecycle   : [
          'after:deploy:run:swagger:deploy'
        ],
        options     : {}
      }
    ];
  }
}

module.exports = SwaggerPlugin;
