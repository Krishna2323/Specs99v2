const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');

//ROUTES
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/reviewRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoutes');
const orderController = require('./controllers/orderController');

// UTILS AND HANDLERS
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const { getFileStream } = require('./controllers/s3');
const { getImages } = require('./controllers/productController');

//MIDDLEWARES
const app = express();
app.use(cors());

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  orderController.webhookCheckout
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

// ROUTES

app.use(
  '/api/v1/products',
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  productRoute
);

app.use('/api/v1/images/:key', getImages);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/order', orderRoute);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't Find ${req.originalUrl} On The Server.`, 404));
});

/////////////////////////////////////////////////////////////////////////////////////////////

app.use(globalErrorHandler);

//////////////////////////////////////////////////////////////////////////////////////////////

module.exports = app;
