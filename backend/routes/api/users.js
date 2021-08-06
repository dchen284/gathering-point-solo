//external require/imports
const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

//internal require/imports
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth, setTokenCookie } = require('../../utils/auth');
const { Event, User, UserBookmark, UserTicket } = require('../../db/models');
// const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

//Validations

const validateSignup = [
    check('email')
      // .exists({ checkFalsy: true })
      // .withMessage('Email cannot be blank.')
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      // .exists({ checkFalsy: true })
      // .withMessage('Username cannot be blank.')
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      // .exists({ checkFalsy: true })
      // .withMessage('Password cannot be blank.')
      // .isLength({ min: 8 })
      // .withMessage('Password must be 8 characters or more.')
      .isStrongPassword()
      .withMessage("Password must be minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character."),
    check('confirmPassword')
      // .exists({ checkFalsy: true })
      // .withMessage('Confirm Password cannot be blank.')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirm Password does not match Password');
        }
        return true;
      }),
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

// router.get('/:userId/tickets', requireAuth, asyncHandler( async (req, res) => {
//   const userId = req.params.userId;

//   const userTicketsOfSessionUser = await UserTicket.findAll({
//     // attributes: ['id', 'userId', 'eventId'],
//     attributes: { include: ['id'] },
//     where: { userId: userId },
//     include: [ Event ],
//   })
//   // console.log('userTicketsOfSession', JSON.stringify(userTicketsOfSession, null, 4));
//   return res.json(userTicketsOfSessionUser);

// }));

router.post('/:userId/events/:eventId/tickets', requireAuth, asyncHandler( async (req, res) => {

  const { eventId, userId } = req.params;
  // console.log('eventId', eventId, 'userId', userId)

  const checkForExistingTicket = await UserTicket.findOne({
    where: { userId, eventId }
  })

  // console.log('existing ticket', checkForExistingTicket);

  if (!checkForExistingTicket) {
    // console.log('good, no existing ticket');
    const userTicketToAdd = await UserTicket.create( { eventId, userId } );
    // const ticketThatWasJustAdded = await UserTicket.findOne({
    //   where: { userId, eventId },
    //   attributes: { include: ['id'] },
    //   include: [ Event ],
    // })
    return res.json(userTicketToAdd);
  }

}));

router.delete('/:userId/events/:eventId/tickets', requireAuth, asyncHandler( async (req, res) => {
  const { eventId, userId } = req.body;

  const userTicketToDelete = await UserTicket.findOne({
    where: { userId, eventId }
  });

  // console.log('gibo', JSON.stringify(userTicketToDelete, null, 4);

  if (userTicketToDelete) {
    await userTicketToDelete.destroy();
    return res.json({success: 'success'});
  }

  if (!userTicketToDelete) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'No event found';
    err.errors = ['No event was found.'];
    console.log('err', err);
    return err;
    // return next(err);
  }



}));

// user bookmark routes
router.post('/:userId/events/:eventId/bookmarks', requireAuth, asyncHandler( async (req, res) => {

  const { eventId, userId } = req.params;
  // console.log('eventId', eventId, 'userId', userId)

  const checkForExistingBookmark = await UserBookmark.findOne({
    where: { userId, eventId }
  })

  // console.log('existing ticket', checkForExistingTicket);

  if (!checkForExistingBookmark) {
    // console.log('good, no existing ticket');
    const userBookmarkToAdd = await UserBookmark.create( { eventId, userId } );
    // const ticketThatWasJustAdded = await UserTicket.findOne({
    //   where: { userId, eventId },
    //   attributes: { include: ['id'] },
    //   include: [ Event ],
    // })
    return res.json(userBookmarkToAdd);
  }

}));

router.delete('/:userId/events/:eventId/bookmarks', requireAuth, asyncHandler( async (req, res) => {
  const { eventId, userId } = req.body;

  const userBookmarkToDelete = await UserBookmark.findOne({
    where: { userId, eventId }
  });

  // console.log('gibo', JSON.stringify(userBookmarkToDelete, null, 4);

  if (userBookmarkToDelete) {
    await userBookmarkToDelete.destroy();
    return res.json({success: 'success'});
  }

  if (!userBookmarkToDelete) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'No event found';
    err.errors = ['No event was found.'];
    console.log('err', err);
    return err;
    // return next(err);
  }



}));

module.exports = router;



// Unused code: Sign up with AWS
// router.post(
//   "/",
//   singleMulterUpload("image"),
//   validateSignup,
//   asyncHandler(async (req, res) => {
//     const { email, password, username } = req.body;
//     const profileImageUrl = await singlePublicFileUpload(req.file);
//     const user = await User.signup({
//       username,
//       email,
//       password,
//       profileImageUrl,
//     });

//     setTokenCookie(res, user);

//     return res.json({
//       user,
//     });
//   })
// );