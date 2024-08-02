Event Booking System Report
Objective
The goal of this project was to create an Event Booking System that tracks bookings for various events using Node.js, TypeScript, Express.js, and MongoDB. The system allows users to create events, book tickets, cancel bookings, and retrieve event details while adhering to specific constraints and requirements.

Implementation Details

API Endpoints
1. POST /events
Description: Creates a new event.
Request Body:
{
  "name": "Rock Concert",
  "date": "2024-08-20T20:00:00Z",
  "totalTickets": 200
}

Response:
{
  "id": "event_id_123",
  "name": "Rock Concert",
  "date": "2024-08-20T20:00:00Z",
  "totalTickets": 200,
  "bookedTickets": 0
}

Details:
ID: Unique identifier for the event.
Name: Name of the event.
Date: Date and time of the event.
TotalTickets: Total number of tickets available.
BookedTickets: Number of tickets already booked (initially 0).

2. POST /bookings
Description: Books tickets for a specific event.
Request Body:
{
  "userId": "user_id_456",
  "eventId": "event_id_123",
  "quantity": 10
}

Response:
{
  "bookingId": "booking_id_789",
  "userId": "user_id_456",
  "eventId": "event_id_123",
  "quantity": 10,
  "timestamp": "2024-08-01T12:00:00Z"
}

Details:
Booking ID: Unique identifier for the booking.
User ID: Identifier for the user making the booking.
Event ID: Identifier for the event being booked.
Quantity: Number of tickets booked.
Timestamp: Time when the booking was made.
Booking Limit: Each user can book a maximum of 15 tickets per request. Requests exceeding this limit will be truncated to 15 tickets.

3. DELETE /bookings/:id
Description: Cancels a booking by its ID.
Response:
{
  "message": "Booking cancelled successfully."
}

Details:
Message: Confirmation of booking cancellation.

4. GET /events
Description: Retrieves a list of all events with available tickets.
Response:
[
  {
    "id": "event_id_123",
    "name": "Rock Concert",
    "date": "2024-08-20T20:00:00Z",
    "totalTickets": 200,
    "bookedTickets": 10
  },
  {
    "id": "event_id_124",
    "name": "Tech Conference",
    "date": "2024-09-05T09:00:00Z",
    "totalTickets": 300,
    "bookedTickets": 0
  }
]

Details:
Lists all events with their details including booked and remaining tickets.

5. GET /events/:id
Description: Retrieves details of a specific event, including booked tickets and remaining tickets.
Response:
{
  "id": "event_id_123",
  "name": "Rock Concert",
  "date": "2024-08-20T20:00:00Z",
  "totalTickets": 200,
  "bookedTickets": 10,
  "remainingTickets": 190
}

Details:
Remaining Tickets: Total tickets minus booked tickets.

6. POST /print-ticket
Description: Generates a printable format of the ticket for a specific booking.
Request Body:
{
  "bookingId": "booking_id_789"
}

Response:
{
  "ticket": "Printable ticket format including event and booking details"
}

Details:
Provides a printable format of the ticket containing event and booking details.

Technical Details
Code Structure:
index.ts: Initializes the Express server, connects to MongoDB, sets up middleware, and defines API routes.
controllers/: Contains the logic for handling events and bookings.
models/: Defines Mongoose schemas and models for Event and Booking entities.
routes/: Maps API routes to controller functions.
Error Handling:
Validation Errors: Ensures that input data meets the required criteria and provides appropriate error messages.
Booking Errors: Handles errors related to booking limits and availability.
Documentation:
The code is well-commented to explain functionality.
Setup instructions are provided for running the application locally.

Example Usage
Creating an Event:POST request to http://localhost:3000/events with the body:
  {
     "name": "Rock Concert",
     "date": "2024-08-20T20:00:00Z",
     "totalTickets": 200
   }

Booking Tickets:POST request to http://localhost:3000/bookings with the body:
  {
     "userId": "user_id_456",
     "eventId": "event_id_123",
     "quantity": 10
   }

Retrieving Events:GET request to http://localhost:3000/events.
Printing a Ticket:POST request to http://localhost:3000/print-ticket with the body:
  {
     "bookingId": "booking_id_789"
   }


