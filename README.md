# REST API with Restify

## Run locally

Install packages

```bash
$ npm install
```

Run the server

```bash
$ npm start
```

http://localhost:5001

## In order to check your code, the project has some linters installed

```bash
$ npm run lint
```

## Docs

### Create new model with REST endpoints

Add a new file inside the 'models' folder and export a json with the necessary props:

`mongooseModelName` (required): this will be use to create the REST routes.
`schema` (required): mongoose schema props must be here.
`statics`: here you add custom functions which will be called in custom urls that you have to add at the end of route.js
`populate`: array with props to be populated in the find()


The router.js file handles the REST request automatically when the model file is created.

