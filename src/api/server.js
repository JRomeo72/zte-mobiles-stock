import express from 'express';
import cors from 'cors';
import { engine } from 'express-handlebars';
import { __dirname, __join } from '../dirname.js';

import apiRouter from './routes/api.mobile.router.js';
import clientRouter from './routes/client.mobile.router.js'
import userRouter from './routes/user.router.js'
import authRouter from './routes/auth.router.js'
// import storageRouter from './routes/storage.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: false } ))
app.use(express.static('public'))

app.engine('.hbs', engine( { extname: '.hbs' } ));
app.set('view engine', '.hbs');
app.set('views', __join(__dirname, './client/views'))

app.get('/', (req, res) => res.render('home'))

app.use('/', clientRouter);
app.use('/api', apiRouter);

app.use('/', authRouter);
app.use('/api', userRouter);

export default app;