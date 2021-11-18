const {Appointment} = require('../db');

const router = require('express').Router();

/**
 * @api {get} api/v1/users/:userId/appointments - get all the appointments for a user
 * @apiParam {String} - userId - The userId of the user to create an appointment for
 */
router.get('/:userId/appointments', async (req, res, next) => {
    const {userId} = req.params
    console.log(userId)
    try {
        const appointments = await Appointment.findByUserId(userId);
        res.json(appointments);
    } catch (err) {
        next(err);
    }
})



module.exports = router;