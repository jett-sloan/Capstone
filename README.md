# Capstone
My Window Washing Service
My website is url is https://capstone-frontend-jade.vercel.app/ 
Description
My Window Washing Service is a web application designed to streamline the process of managing window cleaning appointments and quotes. It allows users to request quotes, schedule appointments, and view their account details. The website is built with a modern tech stack and provides a user-friendly interface for both customers and administrators.

Features
Home Page: Introduces the service and highlights key features with visual elements.
Quote Request: Users can request quotes for window washing services, specifying the number of windows and type of service needed.
Appointment Scheduling: Users can select a date and time for their appointment. Availability is dynamically fetched to show open time slots.
User Authentication: Includes sign-up, login, and account management functionalities. Logged-in users can view their appointment history and manage their details.
Admin Dashboard: Allows administrators to view all appointments and manage availability.
Loyalty Program: Offers a free service after every third window cleaning to encourage customer retention.
Why These Features?
Quote Request: Simplifies the process for users to get an estimate without needing to contact customer support.
Appointment Scheduling: Provides real-time availability and allows users to pick convenient times, improving customer experience.
User Authentication: Secures user data and provides personalized experiences, such as viewing appointment history.
Admin Dashboard: Facilitates management and oversight of appointments and availability, ensuring efficient service delivery.
Loyalty Program: Enhances customer satisfaction and promotes repeat business.
Tests
Location
Tests are located in the /backend/tests directory for backend functionality and in the /frontend/src/tests directory for frontend components.

Running Tests
To run backend tests:

bash
Copy code
cd backend
npm test
To run frontend tests:

bash
Copy code
cd frontend
npm test
User Flow
Homepage: Users land on the homepage, which introduces the service and provides navigation to other parts of the site.
Request a Quote: Users fill out a form specifying their requirements for a quote.
Schedule an Appointment: Users select a date and time for their appointment from available slots.
Sign Up/Login: Users sign up or log in to manage their appointments and view history.
Account Management: Users can view their appointment history and update their account details.
Admin Dashboard: Administrators can view and manage all appointments and availability.
API Documentation
GET /availability: Fetches available time slots for a given day.

Query Parameters: day (format: YYYY-MM-DD)
Response: List of available time slots.
POST /availability: Books an appointment slot.

Body Parameters: day, daytime
Response: Confirmation of the newly created appointment.
POST /orders: Creates a new order based on the provided quote and appointment details.

Body Parameters: quoteId, day, time, name, email, address
Response: Confirmation of the new order.
Technology Stack
Frontend: React.js, Bootstrap
Backend: Node.js, Express.js
Database: PostgreSQL
Testing: Jest, Supertest
Additional Information
Deployment: The website is not yet hosted.
Development Environment: Ensure Node.js and PostgreSQL are installed for running the development environment.
Contributing: Contributions are welcome. Please open an issue or submit a pull request for any improvements.
