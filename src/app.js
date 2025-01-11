const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
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

// Swagger Setup
const swaggerUICss = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
app.use('/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, {
        customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
        customCssUrl: swaggerUICss
    })
);
// API routes
app.use('/', apiRoutes);

// Start the price update job
startPriceUpdateJob();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});