
const {Appointment} = require('../db');

const router = require('express').Router();

/**
 * @api {post} api/v1/appointments - create an appointment
 * @apiBody {String} - userId - Required, the userId of the user to create an appointment for
 * @apiBody {String} - date - Required, the date on which to create an appointment (format)
 * in YYYY-MM-DD format e.g. "2020-11-04"
 * @apiBody {String} - time - Required, the userId of the user to create an appointment for
 * in HH:MM format e.g. "10:00"
 */
router.post('/', async (req, res, next) => {
    try {
        const { userId, date, time } = req.body;
        if (!(userId && date && time)) {
            const err = new Error('Missing required fields');
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