
const {DB, Key} = require('../db')

/** Represents a model whose instances are stored in a DB instance. */
class Appointment {
    
    // set the database this model uses
    static database = new DB('appointments');

    constructor(date, time, userId) {
        this.date = new Date(date)
        this.userId = userId;
        this.time = time;
        
    }

    hasValidTime() {
        const minutes = this.time.split(':')[1]
        if(minutes != '00' && minutes != '30'){
            return false
        }
        return true
    }

    static async findByUserId(userId) {
        const appointments = await this.database.get(userId);
        return Object.values(appointments)
    }

    static async create(userId, date, time) {
        let appointment;
        let saved_appointment;
        try {
            appointment = new Appointment(date, time, userId)
            if(!appointment.hasValidTime()){
                const err = {
                    name: 'ValidationError',
                    message: `Invalid time ${time}- appointment must begin must start on the hour or half hour`,
                    status: 400
                }                
                throw err;
            }
        } catch (err) {
            throw err
        }

        try {
            saved_appointment = await this.database.set(appointment, new Key(userId), new Key(date, true));
        } catch (err) {
            if(err.name === 'UniqueKeyError'){
                err.message = `Appointment for user ${userId} on ${date} already exists`
            }
            throw err
        }
        
        return saved_appointment;
    }
}


module.exports = Appointment;