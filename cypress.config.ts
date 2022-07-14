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
});




