const SUPPORTED_COINS = ['bitcoin', 'matic-network', 'ethereum'];

const validateCoinId = (coinId) => {
  if (!SUPPORTED_COINS.includes(coinId)) {
    throw new Error('Invalid coin ID. Supported coins: bitcoin, matic-network, ethereum');
  }
};

module.exports = { validateCoinId };