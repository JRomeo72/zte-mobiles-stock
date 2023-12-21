import express from 'express';
import cors from 'cors';
import { engine } from 'express-handlebars';
import { __dirname, __join } from '../dirname.js';

import mobileRouter from './routes/mobile.router.js';
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

app.use('/', mobileRouter);
app.use('/api', mobileRouter);

export default app;