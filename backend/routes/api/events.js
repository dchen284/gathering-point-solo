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


//fetching multiple events for display
router.get('/', asyncHandler( async (req, res) => {

    const fetchedEvents = await Event.findAll({
        limit: 6,
        include: [ User ],
    });
    return res.json(fetchedEvents);
}));

//fetching an event by id
router.get('/:eventId', asyncHandler( async (req, res) => {

    const eventId = req.params.eventId;

    const fetchedEvent = await Event.findByPk(eventId, {
        include: [ User ],
    });
    return res.json(fetchedEvent);
}));

// router.post('/', asyncHandler( async (req, res) => {

//     const { thing } = req.body;

//     const eventToPost = { thing }

//     await eventToPost.save();

//     // return fetchEventsForEventCardDisplay();
//     // might not need a return, either addOne action creator, or force a load action
// }));

module.exports = router;