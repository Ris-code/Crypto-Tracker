const axios = require('axios');

class CryptoService {
    constructor() {
      this.baseUrl = process.env.COINGECKO_API_BASE_URL;
    }
  
    async getCoinData(coinId) {
      try {
        // Using the /simple/price endpoint with required parameters
        const response = await axios.get(
          `${this.baseUrl}/simple/price`, {
            params: {
              ids: coinId,
              vs_currencies: 'usd',
              include_market_cap: true,
              include_24hr_change: true
            }
          }
        );
        
        const data = response.data[coinId];
        console.log('Data:', data);
        
        return {
          priceUSD: data.usd,
          marketCapUSD: data.usd_market_cap,
          change24h: data.usd_24h_change
        };
      } catch (error) {
        throw new Error(`Failed to fetch data for ${coinId}: ${error.message}`);
      }
    }
  }
  
  module.exports = new CryptoService();