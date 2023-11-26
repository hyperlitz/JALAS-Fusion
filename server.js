import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRouter from './Routers/authRouter.js';
import categoryRouter from './Routers/categoryRouter.js';
import productRouter from './Routers/productRouter.js';

// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CORS configuration
const corsOptions = {
  origin: 'https://jalas-fusion-6b3afa890e65.herokuapp.com',
  credentials: false, // Do not require credentials
};

app.use(cors(corsOptions));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);

// rest API
app.get('/api', (req, res) => {
  res.send('<h1>Welcome</h1>');
});

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});