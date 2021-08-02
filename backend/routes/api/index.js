//External require/imports
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
//Internal require/imports
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { Category, Event } = require('../../db/models');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
    //routers

const eventsRouter = require('./events.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

//Routes, sorted by path name
router.use('/events', eventsRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.get('/categories', asyncHandler( async (req, res) => {

    const categories = await Category.findAll({});

    return res.json(categories);
}));

router.get('/search/:searchTerm', asyncHandler( async (req, res) => {
    const { searchTerm } = req.params;

    const Op = Sequelize.Op;

    // const categories = await Category.findAll({});


    const searchedEvents = await Event.findAll({
        include: [Category],
        where: {
            [Op.or]: [
                {title: {[Op.iLike]: `%${searchTerm}%`}},
                {eventBody: {[Op.iLike]: `%${searchTerm}%`}},
                // {Category.categoryName: {[Op.iLike]: `%${searchTerm}%`}},
            ]
        }
    });

    return res.json(searchedEvents);
}));



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
//required for part 2
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });

module.exports = router;