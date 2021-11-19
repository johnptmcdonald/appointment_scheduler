
const express = require('express');
const morgan = require('morgan');

const { appointmentsRouter, usersRouter } = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/appointments', appointmentsRouter);
app.use('/api/v1/users', usersRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
})

module.exports = app;