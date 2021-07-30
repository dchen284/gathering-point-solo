//external require/imports
const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

//internal require/imports
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Event, UserBookmark, UserTicket } = require('../../db/models');
// const { demouser } = require('../../config');

//Validations
const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors,
];

//Routes


// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    async (req, res) => {
      const { user } = req;
      console.log('in api route for restore session user', JSON.stringify(user, null, 4));
      if (user) {
        const result = await User.scope('currentUser').findByPk(user.id, {
          include: [UserBookmark, UserTicket],
        });
        return res.json({user: result});
      //   return res.json({
      //     user: user.toSafeObject(),
      //   });
      // } else return res.json({});

      } else return res.json({user: null});
    }
);

// Log in
router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password } );
      // console.log('user >>>>>>>>>>>>', user);

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );

// Log in demo user
// router.post(
//   '/demo-user',
//   asyncHandler(async (req, res, next) => {
//     // const { credential, password } = req.body;

//     const user = await User.login(demouser);

//     if (!user) {
//       const err = new Error('Login failed');
//       err.status = 401;
//       err.title = 'Login failed';
//       err.errors = ['The provided credentials were invalid.'];
//       return next(err);
//     }

//     await setTokenCookie(res, user);

//     return res.json({
//       user,
//     });
//   }),
// );


module.exports = router;