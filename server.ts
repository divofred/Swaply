import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Swaply API');
});
app.use(express.json());
app.use('/api/convert', require('./routes/convert'));
app.use('/api/getprices', require('./routes/getprices'));
app.use('/api/bonus', require('./routes/bonus'));
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Invalid route' });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
