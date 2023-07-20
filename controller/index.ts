import { Request, Response } from 'express';
const API_URL = process.env.API_URL; //Fetch API from .env file
import axios from 'axios';

export const getPrices = async (req: Request, res: Response) => {
  if (!API_URL) {
    return res.status(500).json({ message: 'API not found' });
  }
  try {
    await axios.get(API_URL).then(response => {
      const data = response.data;
      let result: any = [];
      data.forEach((item: any) => {
        const { symbol, price } = item;
        if (symbol.endsWith('USDT')) {
          let split: any = symbol.split('USDT');
          let symbol1 = split[0];
          result.push({
            Conurrency: symbol1,
            'price in USDT': parseFloat(price).toFixed(4),
          });
        }
      });
      return res.status(200).json({ result });
    });
  } catch (err: any) {
    console.log('error', err.message);
    res.status(500).json({ message: err.message });
  }
};

export const convert = async (req: Request, res: Response) => {
  if (!API_URL) {
    return res.status(500).json({ message: 'API not found' });
  }
  try {
    const { from, amount } = req.body;
    if (from.toString().toUpperCase() === 'USDT')
      return res.status(400).json({
        message: 'It is already in USDT, provide other crypto currencies',
      });
    if (!from || !amount) {
      return res.status(500).json({ message: 'Invalid request' });
    }
    const url = `${API_URL}?symbol=${from.toString().toUpperCase()}USDT`;
    let result: any;
    await axios
      .get(url)
      .then(response => {
        const { price } = response.data;
        const val =
          parseFloat(parseFloat(price).toFixed(4)) * parseFloat(amount);
        if (!val) {
          return res.status(400).json({ message: 'Invalid amount' });
        }
        const message = `1 USDT = ${parseFloat(price).toFixed(4)} ${from}}`;
        result = {
          message,
          'Converted amount': val,
        };
      })
      .catch(err => {
        if (err.response.data.msg === 'Invalid symbol.') {
          return res
            .status(err.response.status)
            .json({ message: 'Invalid request' });
        }
        return res
          .status(err.response.status)
          .json({ message: err.response.data.msg });
      });
    if (result) return res.status(200).json({ result });
  } catch (error: any) {
    console.log('error', error.message);
    res.status(500).json({ message: error.message });
  }
};
export const bonus = async (req: Request, res: Response) => {
  if (!API_URL) {
    return res.status(500).json({ message: 'API not found' });
  }
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || !amount) {
      return res.status(400).json({ message: 'Invalid request' });
    }
    if (from == to) {
      return res
        .status(400)
        .json({ message: 'Provide different crypto currencies' });
    }
    const url1 = `${API_URL}?symbol=${from.toString().toUpperCase()}${to
      .toString()
      .toUpperCase()}`;
    const url2 = `${API_URL}?symbol=${to.toString().toUpperCase()}${from
      .toString()
      .toUpperCase()}`;
    let result: any;
    await axios
      .get(url1)
      .then(response => {
        const { price } = response.data;
        const val =
          parseFloat(parseFloat(price).toFixed(4)) * parseFloat(amount);
        if (!val) {
          return res.status(400).json({ message: 'Invalid amount' });
        }
        const message = `1 ${from} = ${parseFloat(price).toFixed(4)} ${to}`;
        const message2 = `${amount} ${from} = ${val} ${to}`;
        result = {
          message,
          'Converted amount': message2,
        };
      })
      .catch(async err => {
        if (err.response.data.msg === 'Invalid symbol.') {
          console.log('here');
          await axios
            .get(url2)
            .then(response => {
              console.log('here2');
              const { price } = response.data;
              const con = 1 / parseFloat(parseFloat(price).toFixed(4));
              const val = parseFloat(amount) * con;
              if (!val) {
                return res.status(400).json({ message: 'Invalid amount' });
              }
              const message = `1 ${from} = ${con}${to}`;
              const message2 = `${amount} ${from} = ${val} ${to}`;
              result = {
                message,
                'Converted amount': message2,
              };
            })
            .catch(err => {
              if (err.response.data.msg === 'Invalid symbol.') {
                console.log('here3');
                return res
                  .status(err.response.status)
                  .json({ message: 'Invalid request' });
              }
              return res
                .status(err.response.status)
                .json({ message: err.response.data.msg });
            });
          return;
        }
        console.log('here4');
        return res
          .status(err.response.status)
          .json({ message: err.response.data.msg });
      });
    if (result) return res.status(200).json({ result });
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ message: error.message });
  }
};
