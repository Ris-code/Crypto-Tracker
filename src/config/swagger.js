const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crypto Tracker API',
      version: '1.0.0',
      description: 'API for tracking cryptocurrency prices and statistics',
    },
    servers: [
      {
        url: 'https://crypto-tracker-three-livid.vercel.app/',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);
module.exports = specs;