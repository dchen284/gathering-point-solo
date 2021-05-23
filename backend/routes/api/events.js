//external imports

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

//internal imports

const { Event, User } = require('../../db/models')

//helper functions

// async function fetchEventsForEventCardDisplay() {
//     const fetchedEvents = await Event.findAll({
//         limit: 5,
//         include: [ User ],
//     });
//     // const dataEvents = await fetchedEvents.json();
//     return res.json(fetchedEvents);
// }

//routes

router.get('/', asyncHandler( async (req, res) => {

    const fetchedEvents = await Event.findAll({
        limit: 6,
        include: [ User ],
    });
    // console.log(fetchedEvents);
    // const dataEvents = await fetchedEvents.json();
    return res.json(fetchedEvents);
    // return fetchEventsForEventCardDisplay();
}));

router.post('/', asyncHandler( async (req, res) => {

    const { thing } = req.body;

    const eventToPost = { thing }

    await eventToPost.save();

    // return fetchEventsForEventCardDisplay();
    // might not need a return, either addOne action creator, or force a load action
}));

module.exports = router;