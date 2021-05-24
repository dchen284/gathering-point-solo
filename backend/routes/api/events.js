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
        // limit: 6,
        include: [ User ],
        order: [ ['id', 'DESC'] ],
    });

    return res.json(fetchedEvents);
}));

//fetching an event by id
router.get('/:eventId(\\d+)', asyncHandler( async (req, res) => {

    const eventId = req.params.eventId;

    const fetchedEvent = await Event.findByPk(eventId, {
        include: [ User ],
    });

    // console.log('fetchedEvent', fetchedEvent);

    if (!fetchedEvent) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'No event found';
        err.errors = ['No event was found.'];
        console.log('err', err);
        return err;
        // return next(err);
      }

    return res.json(fetchedEvent);


}));

router.post('/', asyncHandler( async (req, res) => {

    await Event.create(req.body);

    const fetchedNewestEvent = await Event.findOne({
        // limit: 6,
        include: [ User ],
        order: [ ['id', 'DESC'] ],
    });

    return res.json(fetchedNewestEvent);

    // return fetchEventsForEventCardDisplay();
    // might not need a return, either addOne action creator, or force a load action
}));

router.delete('/:eventId(\\d+)', asyncHandler( async (req, res) => {

    const eventId = req.params.eventId;
    // console.log('eventId>>>>', eventId);

    const eventToDestroy = await Event.findByPk(eventId, {});

    // console.log('eventToDestroy>>>>>', eventToDestroy);

    if (!eventToDestroy) {
        const err = new Error('No event found');
        err.status = 401;
        err.title = 'No event found';
        err.errors = ['No event with that ID found.'];
        return next(err);
    }
    else {
        await eventToDestroy.destroy();
        return res.json(eventToDestroy);
    }

}));

router.put('/:eventId(\\d+)', asyncHandler( async (req, res) => {

    const newData = req.body;

    console.log('newData', newData);

    console.log('eventId', newData.id);

    const eventToUpdate = await Event.findByPk(newData.id, {});

    console.log('eventToUpdate', JSON.stringify(eventToUpdate, null, 4));

    if (!eventToUpdate) {
        const err = new Error('No event found');
        err.status = 401;
        err.title = 'No event found';
        err.errors = ['No event with that ID found.'];
        return next(err);
    }
    else {
        const updatedEvent = await eventToUpdate.update(newData);
        console.log('updatedEvent', JSON.stringify(updatedEvent, null, 4));
        return res.json(updatedEvent);
    }

}));

module.exports = router;