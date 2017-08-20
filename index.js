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
          'swagger:deploy'
        ],
        options     : {}
      }
    ];
  }
}

module.exports = SwaggerPlugin;
