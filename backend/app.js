//External require/import
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const bodyParser = require('body-parser');

//Internal require/import
const { environment } = require('./config');
const routes = require('./routes');

//Boolean for checking environment
const isProduction = environment === 'production';

//Set up Express application
const app = express();

//Middleware
app.use(morgan('dev')); //Console log info on req & res; dev is format type for console log
app.use(cookieParser()); //parse cookies
app.use(bodyParser.urlencoded({ extended: false })); //used for AWS
app.use(bodyParser.json()); //used for AWS

// app.use(express.json()); //parse JSON bodies of requests; put on req.body
    // Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(helmet({
    contentSecurityPolicy: false
  }));
// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({ //also makes the XSRF-TOKEN cookie
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
      },
    })
  );
    //Routes
app.use(routes); // Connect all the routes


//Error handlers
  // Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});
  // Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});
  // Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;