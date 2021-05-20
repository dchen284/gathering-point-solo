//External require/imports
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
//Internal require/imports
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
    //routers
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

//Routes, sorted by path name

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

//code for testing user auth middleware routes
    // router.get(
    //     '/require-auth',
    //     requireAuth,
    //     (req, res) => {
    //       return res.json(req.user);
    //     }
    // );

    // router.get(
    //     '/restore-user',
    //     restoreUser,
    //     (req, res) => {
    //       return res.json(req.user);
    //     }
    // );

    // router.get('/set-token-cookie', asyncHandler(async (req, res) => {
    //   const user = await User.findOne({
    //       where: {
    //         username: 'Demo-lition'
    //       },
    //     })
    //   setTokenCookie(res, user);
    //   return res.json({ user });
    // }));

//code for testing initial connection to server
    // router.post('/test', function(req, res) {
    //     res.json({ requestBody: req.body });
    // });

module.exports = router;