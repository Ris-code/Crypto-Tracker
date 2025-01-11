const schedule = require('node-schedule');
const CryptoPrice = require('../models/CryptoPrice');
const cryptoService = require('../services/cryptoService');

const SUPPORTED_COINS = ['bitcoin', 'matic-network', 'ethereum'];

async function updatePrices() {
  try {
    console.log('Starting price update job...');
    
    for (const coinId of SUPPORTED_COINS) {
      console.log(`Fetching data for ${coinId}...`);
      
      const data = await cryptoService.getCoinData(coinId);
      console.log(`Data received for ${coinId}:`, data);
      
      const newPrice = await CryptoPrice.create({
        coinId,
        priceUSD: data.priceUSD,
        marketCapUSD: data.marketCapUSD,
        change24h: data.change24h
      });
      
      console.log(`Successfully saved data for ${coinId}:`, newPrice);
    }
    console.log('Price update job completed successfully');
  } catch (error) {
    console.error('Price update job failed:', error.message);
    if (error.response) {
      console.error('API Response Error:', error.response.data);
    }
  }
}

const startPriceUpdateJob = () => {
  // Run immediately when server starts
  console.log('Running initial price update...');
  updatePrices();

  // Then schedule to run every 2 hours
  const job = schedule.scheduleJob('0 */2 * * *', updatePrices);
  console.log('Price update job scheduled for every 2 hours');
  return job;
};

module.exports = { startPriceUpdateJob };

