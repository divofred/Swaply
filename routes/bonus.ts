import express, { Request, Response } from 'express';
import { bonus } from '../controller';
const router = express.Router();

router.route('/').post(bonus);

router.route('*').all((req, res) => {
  res.status(404).json({ message: 'Invalid route' });
});

module.exports = router;
