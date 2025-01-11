const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerRouter = require('./routes/swagger');
const connectDB = require('./config/database');
const { startPriceUpdateJob } = require('./jobs/priceUpdateJob');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Swagger documentation routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(null, {
  swaggerOptions: {
    url: '/swagger.json'
  }
}));
app.use('/', swaggerRouter);

// API routes
app.use('/', apiRoutes);

// Start the price update job
startPriceUpdateJob();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`Swagger JSON available at http://localhost:${PORT}/swagger.json`);
});