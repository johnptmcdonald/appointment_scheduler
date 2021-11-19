# Appointment Scheduler

This is a _very simple_ code sample designed to be built in 2 hours as a starting point for code/design discussions. There are lots of things that are not ideal but are meant to lead to discussions on extensibility/scalability/use. This repo should _not_ be used as a reference for building HTTP services.

## How to run

clone this repo and run `npm i`. This will install the packages you need. You can then start the server with `npm run start` and play with Postman or any other software that makes HTTP requests.

## Description

This is an HTTP service that serves two JSON endpoints. It does not store data across restarts.

- /api/v1/appointments
  A POST endpoint that takes a date, time, and user ID in the request body as JSON (all required). Creates an appointment beginning at that time for that user or returns an appropriate status code and error if the appointment cannot be made (the user already has an appointment that day).

  example POST request body:
  {
  "userID": "3",
  "date": "2020-11-04", // calendar date in YYYY-MM-DD format
  "time": "09:00" // HH:MM format, with 00:00 being midnight and 13:30 being 1:30 PM
  }

- api/v1/users/:userId/appointments
  A GET endpoint that takes a user ID (as a reqest parameter) and returns all appointments for the user.

There is no auth/user code in here. I decided to put the endoints in two different resource routes and have the userId for the POST come from the JSON body.
Getting the userId from the request body is not something that would be done if real life, but it's a placeholder that simulates pulling off the userId from the request if I were to use some auth middleware.

## Requirements:

- all appointments must start and end on the hour or half hour
- all appointments are exactly 30 minutes long # I kind of ignore this because users can only have a single appointment per day anyway
- a user can only have 1 appointment on a calendar date

## Discussion

- The most interesting part is the relationship between DB and Appointment. Enforcing uniqueness to user/date appointments could be done simply by doing a DB.get() for the user/date and seeing if anything comes back. I went with a unique Key constraint in the DB instead, as I wanted it to feel kind of like a real database with an ORM, where the database enforces uniqueness. I pretended the 'DB' (in-memory storage) was database-like by making it return promises.
- I structured the DB as a key-value store that doesn't really know anything about what it stores, and then 'Models' link themselves to the DB and store the data however they want.
- The model stores the data in the DB according to the the use cases - retrieving all appointments for a user or identifying uniqueness constraints quickly
- I chose to use two different resource endpoints for the API - /appointments for the POST and users/:userId/appointments for the GET. This just seemed the most RESTful.

## Todo

- I love testing, but given the time constraints I went for features instead of tests.
- I'd like to do more input validation. You can pretty much send in whatever you want as date and time.
- Have more detailed Appointment data.
- Typescript, of course.
