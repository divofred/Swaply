import express, { Request, Response } from 'express';
import { getPrices } from '../controller';
const router = express.Router();

router.route('/').get(getPrices);

router.route('*').all((req, res) => {
  res.status(404).json({ message: 'Invalid route' });
});

module.exports = router;
