const CryptoPrice = require('../models/CryptoPrice');

class StatsService {
  async getLatestStats(coinId) {
    const latestRecord = await CryptoPrice.findOne(
      { coinId },
      { priceUSD: 1, marketCapUSD: 1, change24h: 1 },
      { sort: { timestamp: -1 } }
    );

    if (!latestRecord) {
      throw new Error('No data found for the specified coin');
    }

    return {
      price: latestRecord.priceUSD,
      marketCap: latestRecord.marketCapUSD,
      "24hChange": latestRecord.change24h
    };
  }

  async calculateDeviation(coinId) {
    const prices = await CryptoPrice.find(
      { coinId },
      { priceUSD: 1 },
      { sort: { timestamp: -1 }, limit: 100 }
    );

    if (prices.length === 0) {
      throw new Error('No data found for the specified coin');
    }

    const priceValues = prices.map(p => p.priceUSD);
    const mean = priceValues.reduce((a, b) => a + b) / priceValues.length;
    const squaredDiffs = priceValues.map(price => Math.pow(price - mean, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b) / priceValues.length;
    const deviation = Math.sqrt(variance);

    return { deviation: Number(deviation.toFixed(2)) };
  }
}

module.exports = new StatsService();