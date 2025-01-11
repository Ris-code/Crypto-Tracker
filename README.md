# Crypto-Tracker

Crypto-Tracker is a Node.js-based API for tracking cryptocurrency prices and statistics, including price updates, standard deviation analysis, and real-time data retrieval. It leverages MongoDB for data storage, CoinGecko API for fetching cryptocurrency data, and Express.js for API routing. 

- **Deployed backend**: https://crypto-tracker-three-livid.vercel.app/
- **Swagger for Endpoint Testing**: https://crypto-tracker-three-livid.vercel.app/api-docs/

## Features

- Fetch latest cryptocurrency statistics (price, market cap, 24-hour price change).
- Calculate price standard deviation from the last 100 records.
- Automated price updates using a scheduler (runs every 2 hours).
- Swagger documentation for API exploration.
- Supports cryptocurrencies: Bitcoin, Ethereum, MATIC (Polygon).

## Prerequisites

- Node.js (v14 or later)
- MongoDB instance (local or cloud)
- Environment variables configured in a `.env` file.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crypto-tracker.git
   cd crypto-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   COINGECKO_API_BASE_URL=https://api.coingecko.com/api/v3
   ```

## Scripts

- **Start Server**:
  ```bash
  npm start
  ```
- **Start in Development Mode** (with auto-reload):
  ```bash
  npm run dev
  ```

## Deployment

The project is pre-configured for deployment on [Vercel](https://vercel.com/). Simply push the code to a linked Vercel repository, and it will be deployed automatically.

### Vercel Configuration

The `vercel.json` file defines the routing and build configuration:
- API endpoints (`/api-docs`, `/`) are routed to `src/app.js`.

## API Documentation

Swagger documentation is available at:  
`https://crypto-tracker-three-livid.vercel.app/api-docs/`

### Endpoints

#### 1. **GET /stats**

Retrieve the latest statistics for a specific cryptocurrency.

**Query Parameters:**
- `coin` (required): Cryptocurrency identifier (`bitcoin`, `matic-network`, `ethereum`).

**Responses:**
- `200 OK`: Latest statistics.
- `400 Bad Request`: Invalid coin ID.

#### 2. **GET /deviation**

Calculate the price standard deviation for a cryptocurrency based on the last 100 records.

**Query Parameters:**
- `coin` (required): Cryptocurrency identifier (`bitcoin`, `matic-network`, `ethereum`).

**Responses:**
- `200 OK`: Price standard deviation.
- `400 Bad Request`: Invalid coin ID or insufficient data.

## Folder Structure

```plaintext
crypto-tracker/
├── src/
│   ├── config/              # Configuration files (e.g., database connection)
│   ├── jobs/                # Scheduled jobs (e.g., price update job)
│   ├── models/              # Mongoose schemas and models
│   ├── routes/              # Express.js routes
│   ├── services/            # Business logic and API integration
│   ├── utils/               # Utility functions (e.g., validators)
│   ├── app.js               # Main application file
│   └── swagger.json         # Swagger API documentation
├── package.json             # Project metadata and dependencies
├── vercel.json              # Vercel deployment configuration
├── README.md                # Project documentation
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **API Integration**: CoinGecko API
- **Scheduler**: Node Schedule
- **Documentation**: Swagger
- **Logging**: Winston

## Development Workflow

1. **Connect MongoDB**:
   Ensure the `MONGODB_URI` in the `.env` file is valid and accessible.

2. **API Testing**:
   Use the Swagger interface or tools like Postman to test the endpoints.

3. **Scheduler**:
   The price update job runs every 2 hours. Logs are generated for each execution.

4. **Logging**:
   Winston logs application activity and errors for debugging.

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for providing cryptocurrency data.
- [Swagger](https://swagger.io/) for API documentation.
- [Vercel](https://vercel.com/) for deployment.

---