//external imports

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

//internal imports

const { Event, User, UserTicket } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

//Validations

const validateEvent = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a title.')
        .isLength({ min: 3, max: 255 })
        .withMessage('Title must be between 3 and 255 characters.'),
    check('startTime')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a start time.'),
    check('endTime')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a end time.'),
    check('organizerName')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a name for the organizer of the event.')
        .isLength({ min: 3, max: 255 })
        .withMessage('Organizer name must be between 3 and 255 characters.'),
    handleValidationErrors,
];

//routes


//fetching multiple events for display
router.get('/', asyncHandler( async (req, res) => {

    const fetchedEvents = await Event.findAll({
        // limit: 6,
        include: [ UserTicket ],
        order: [ ['id', 'DESC'] ],
    });
    // console.log('fetchedEvents', JSON.stringify(fetchedEvents, null, 4));
    return res.json(fetchedEvents);
}));

//fetching an event by id
router.get('/:eventId(\\d+)', asyncHandler( async (req, res) => {

    const eventId = req.params.eventId;

    const fetchedEvent = await Event.findByPk(eventId, {
        include: [ UserTicket ],
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

router.post('/', validateEvent, requireAuth, asyncHandler( async (req, res) => {

    await Event.create(req.body);

    const fetchedNewestEvent = await Event.findOne({
        // limit: 6,
        include: [ User, UserTicket ],
        order: [ ['id', 'DESC'] ],
    });

    return res.json(fetchedNewestEvent);

    // return fetchEventsForEventCardDisplay();
    // might not need a return, either addOne action creator, or force a load action
}));

router.delete('/:eventId(\\d+)', requireAuth, asyncHandler( async (req, res) => {

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

router.put('/:eventId(\\d+)', requireAuth, asyncHandler( async (req, res) => {

    const newData = req.body;

    // console.log('newData', newData);

    // console.log('eventId', newData.id);

    const eventToUpdate = await Event.findByPk(newData.id, {});

    // console.log('eventToUpdate', JSON.stringify(eventToUpdate, null, 4));

    if (!eventToUpdate) {
        const err = new Error('No event found');
        err.status = 401;
        err.title = 'No event found';
        err.errors = ['No event with that ID found.'];
        return next(err);
    }
    else {
        const updatedEvent = await eventToUpdate.update(newData);
        // console.log('updatedEvent', JSON.stringify(updatedEvent, null, 4));
        return res.json(updatedEvent);
    }

}));

router.get('/:eventId(\\d+)/tickets', asyncHandler( async (req, res) => {

    console.group('in route');
    const { eventId } = req.params;

    const TicketsOfEvent = await UserTicket.findAll({
        where: { eventId: eventId },
        attributes: { include: ['id'] },
    });

    // console.log('in route', JSON.stringify(TicketsOfEvent, null, 4));

    if (!Array.isArray(TicketsOfEvent)) {
        let temp = [TicketsOfEvent]
        TicketsOfEvent = temp;
    }

    return res.json(TicketsOfEvent);

}));

module.exports = router;