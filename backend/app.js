//External require/import
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

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
app.use(express.json()); //parse JSON bodies of requests; put on req.body
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

module.exports = app;