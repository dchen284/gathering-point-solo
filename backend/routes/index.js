//External require/import
const express = require('express');
const router = express.Router();
//Internal require/import
const apiRouter = require('./api');

//Middleware
    //Routes
router.use('/api', apiRouter);


//used for testing while setting up backend
  // router.get('/hello/world', function(req, res) {
  //   res.cookie('XSRF-TOKEN', req.csrfToken());
  //   res.send('Hello World!');
  // });

module.exports = router;

