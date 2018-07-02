const fs = require('fs')
const helpers = require('./helpers')
const path = require('path')


const ENV = process && process.env && process.env.ENV ? process.env.ENV : '';

const config = {
  STATICPAGES: STATIC,
  DOCS: DOCS,
  ENV: ENV,
  STATIC_PATH: STATIC_PATH,
  DOCS_PATH: DOCS_PATH,
  DOCS_MODULE_PATH: DOCS_MODULE_PATH,
  DOCS_ROUTE_PATH: DOCS_ROUTE_PATH
}

run(config)

function run (config) {

  writeEnvFile(config,'./environment.ts')
  writeEnvFile(config,'./environment.prod.ts')

}

function writeEnvFile (config, file) {

  const envFile = path.join(__dirname, file)
  
  const content = setVariables(config);

  fs.writeFile(envFile, content, (err) => {

    if (err) {

      handleError(err)

    }

  })

}

function setVariables (config) {
  return `
/* tslint:disable */
import { EnvironmentVariables } from './environment.d';

export const environment: EnvironmentVariables = {
  production: ${config.ENV === 'prod' ? true : false}
}\n`

}

function handleError (err) {

  if (err) {

    throw new Error(err)

  }

}
