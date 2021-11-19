
const {Appointment} = require('../db');

const router = require('express').Router();

/**
 * @api {post} api/v1/appointments - create an appointment
 * @apiBody {String} - userId - Required, the userId of the user to create an appointment for
 * @apiBody {String} - date - Required, the date on which to create an appointment
 * in YYYY-MM-DD format e.g. "2020-11-04"
 * @apiBody {String} - time - Required, the start time of the appointment
 * in 24hr HH:MM format e.g. "10:00" or "14:30". Start times must be on the hour or half hour.
 */
router.post('/', async (req, res, next) => {
    try {
        const { userId, date, time } = req.body;
        if (!(userId && date && time)) {
            const err = new Error('Request body must contain userId, date, and time');
            err.status = 400;
            throw err;
        }
        const saved_appointment = await Appointment.create(userId, date, time);
        res.status(201).json(saved_appointment);
    } catch (err) {
        next(err);
    }
})

module.exports = router