const express = require('express');
const router = express.Router();
const statsService = require('../services/statsService');
const { validateCoinId } = require('../utils/validators');

/**
 * @swagger
 * components:
 *   schemas:
 *     Stats:
 *       type: object
 *       properties:
 *         price:
 *           type: number
 *           description: Current price in USD
 *         marketCap:
 *           type: number
 *           description: Current market cap in USD
 *         24hChange:
 *           type: number
 *           description: 24-hour price change percentage
 *     Deviation:
 *       type: object
 *       properties:
 *         deviation:
 *           type: number
 *           description: Standard deviation of price from last 100 records
 *   parameters:
 *     coinParam:
 *       in: query
 *       name: coin
 *       required: true
 *       schema:
 *         type: string
 *         enum: [bitcoin, matic-network, ethereum]
 *       description: Cryptocurrency identifier
 */

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get latest cryptocurrency statistics
 *     tags: [Cryptocurrency]
 *     parameters:
 *       - $ref: '#/components/parameters/coinParam'
 *     responses:
 *       200:
 *         description: Latest cryptocurrency statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stats'
 *       400:
 *         description: Invalid coin ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /deviation:
 *   get:
 *     summary: Get price standard deviation from last 100 records
 *     tags: [Cryptocurrency]
 *     parameters:
 *       - $ref: '#/components/parameters/coinParam'
 *     responses:
 *       200:
 *         description: Price standard deviation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deviation'
 *       400:
 *         description: Invalid coin ID or insufficient data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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