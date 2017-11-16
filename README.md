# squeezer-swagger
Swagger API Docs Squeezer Plugin  . This plugin enables Swagger API Docs support within the Squeezer Framework.

[![Squeezer.IO](https://cdn.rawgit.com/SqueezerIO/squeezer/9a010c35/docs/gitbook/images/badge.svg)](https://Squeezer.IO)
[![Build Status](https://travis-ci.org/SqueezerIO/squeezer-swagger.svg?branch=master)](https://travis-ci.org/SqueezerIO/squeezer-swagger)
[![npm version](https://badge.fury.io/js/squeezer-swagger.svg)](https://badge.fury.io/js/squeezer-swagger)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)]()

### Installation

`cd PROJECT_DIR`

`npm i squeezer-swagger --save`

### Activate the plugin

*PROJECT_DIR/squeezer.yml*

```yaml
plugins:
  - name: squeezer-swagger
    path: node_modules
```

### Squeezer Global Config

```
.
PROJECT_DIR
└─squeezer.yml
```

`squeezer.yml` :

```yaml
swagger:
  info:
    title: My API Docs
    description: detailed docs for my API endpoints
  definitions:
    ErrorResponse:
      type: object
      properties:
        message:
          type: string
          default: error message
        code:
          type: string
          default: error code
        statusCode:
          type: integer
          default: 400
```          


### Functions Configs

You can add paths and definitions for a specific function on your project.

```
PROJECT_DIR
└─services/
    └── hello
      └──function1 
        ├── handler.js
        └── sqzueezer.yml
```

`squeezer.yml` :

```yaml
swagger:
  paths:
    /pet:
      post:
        tags:
          - "pet"
        summary: "Add a new pet to the store"
        description: "long description"
        operationId: "addPet"
        consumes:
          - "application/json"
          - "application/xml"
        produces:
          - "application/xml"
          - "application/json"
  definitions:
    Pet:
      type: "object"
      required:
        - "name"
        - "photoUrls"
      properties:
        id:
          type: "integer"
          format: "int64"
```
