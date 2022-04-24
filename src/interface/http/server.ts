import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
import container from '../../../di-setup';
const { database, messenger } = container.cradle;

database();
messenger.createChannel();

const PORT = process.env.PORT || 4001;

app.use(express.json());
import productRouter from './routes/product.routes';

// Set test page
app.get('/', (req, res) => {
  res.send('<h1>Product Service<h1>');
});

app.use('/v1/products', productRouter);

app.listen(PORT, () => {
  console.log(`Product Service listening on Port ${PORT}...`);
});
