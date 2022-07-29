const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

//ROUTES
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/reviewRoute');
const cartRoute = require('./routes/cartRoute');

// UTILS AND HANDLERS
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//MIDDLEWARES
const app = express();
app.use(cors());

// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());
// app.use(express.)
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(bodyParser.json());

app.use(cookieParser());

if ((process.env.ENV_NODE = 'development')) {
  app.use(morgan('dev'));
}

// ROUTES
app.use((req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  next();
});
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/cart', cartRoute);

//////////////////////////////////////////////////////////////////////////////////////////////
app.all('*', (req, res, next) => {
  next(new AppError(`Can't Find ${req.originalUrl} On This Server.`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
