import express, { Request, Response } from 'express';
import { convert } from '../controller';
const router = express.Router();

router.route('/').post(convert);

router.route('*').all((req, res) => {
  res.status(404).json({ message: 'Invalid route' });
});

module.exports = router;
