//external require/imports
const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

//internal require/imports
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth, setTokenCookie } = require('../../utils/auth');
const { User, UserTicket } = require('../../db/models');

//Validations

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

//Routes



// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );

//user tickets routes

router.get('/:userId/tickets', asyncHandler( async (req, res) => {
  const userId = req.params.userId;

  const userTicketsOfSession = await UserTicket.findAll({
    attributes: ['id', 'userId', 'eventId'],
    where: { userId: userId },
  })
  // console.log('userTicketsOfSession', JSON.stringify(userTicketsOfSession, null, 4));
  return res.json(userTicketsOfSession);

}));


module.exports = router;