const express = require('express');
const router = express.Router();
const statsService = require('../services/statsService');
const { validateCoinId } = require('../utils/validators');

router.get('/', (req, res) => {
  res.json(
    { message: 'Welcome to the Crypto Stats API', 
      testing: 'https://crypto-tracker-three-livid.vercel.app/api-docs/'
    });
});

router.get('/stats', async (req, res) => {
  try {
    const { coin } = req.query;
    validateCoinId(coin);
    const stats = await statsService.getLatestStats(coin);
    res.json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/deviation', async (req, res) => {
  try {
    const { coin } = req.query;
    validateCoinId(coin);
    const deviation = await statsService.calculateDeviation(coin);
    res.json(deviation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;