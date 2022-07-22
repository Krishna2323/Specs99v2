const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//ROUTES
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/reviewRoute');

// UTILS AND HANDLERS
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//MIDDLEWARES
const app = express();
app.use(express.json());
app.use(cookieParser());
if ((process.env.ENV_NODE = 'development')) {
  app.use(morgan('dev'));
}

// ROUTES
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/reviews', reviewRoute);

//////////////////////////////////////////////////////////////////////////////////////////////
app.all('*', (req, res, next) => {
  next(new AppError(`Can't Find ${req.originalUrl} On This Server.`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
