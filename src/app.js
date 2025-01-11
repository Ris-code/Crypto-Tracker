const express = require('express');
const swaggerUI = require('swagger-ui-express');
const specs = require('./config/swagger');
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

// Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Routes
app.use('/', apiRoutes);

// Start the price update job
startPriceUpdateJob();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});