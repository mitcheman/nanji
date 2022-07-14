import awsConfig from './src/aws-exports';
import { defineConfig } from "cypress";

// Populate process.env with values from .env file
require('dotenv').config()
// AWS exports

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config): void {
      // implement node event listeners here
    },
    
    baseUrl: 'http://localhost:3000',
  },
  // env: {
  //   cognito_username: process.env.AWS_COGNITO_USERNAME,
  //   cognito_password: process.env.AWS_COGNITO_PASSWORD,
  //   userPoolID: process.env.USER_POOL_ID,
  //   clientID: process.env.CLIENT_ID,
  //   awsConfig: awsConfig.default
  // }
});




