const dotenv = require('dotenv');

async function globalSetup() {
    // Normalize environment variable name to handle case-insensitivity
    const env = process.env.TEST_ENV || process.env.Test_Env || 'sit';
    
    dotenv.config({
        path: `.env.${env.toLowerCase()}`,
        override: true
    });
    
    console.log(`Using environment: ${env.toLowerCase()}`);
    console.log(`Base URL: ${process.env.BASE_URL}`);
}

module.exports = globalSetup;
