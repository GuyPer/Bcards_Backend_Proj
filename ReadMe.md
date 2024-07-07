# Project: Building a Node.js Server using Express

![Node.js Logo](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg)
![Express Logo](https://expressjs.com/images/express-facebook-share.png)

## Project Description

This project involves building a server-side application using JavaScript with the Express framework, enabling handling of HTTP requests via various middlewares.

## Key Features


- Accepting JSON in HTTP request bodies
- CRUD operations for managing business cards and users

- Written in JavaScript
- Connection to MongoDB database with two options:
  1. Locally with seed.js initialization paths
  2. Cloud-based using MongoDB Atlas

## Relevant Files and Folders


- **server.js**: The main file of the application, start the server by running `npm run dev` (development mode) or `npm run prod` (production mode) in the terminal. The application support these two modes, the default is dev.
- **middleware/morganConfig.js**: Custom configurations for the morgan module to output colored logs in a customized format.

- **public/pages/404.html**: Error 404 page file for requests not found.

## Installation and Usage

1. Install dependencies by running `npm install`.
2. Start the server with `npm run dev`.

## Request and Response Handling

Requests and their responses can be viewed in the terminal using the Morgan library, customized to display request method, URL, response status, response time, and timestamp. Response status is color-coded green for success and red for errors.

## Additional Libraries Used


- **cors**: Allows HTTP requests only from authorized addresses.
- **Joi**: Validates client-side object inputs; invalid input results in an appropriate error message and status.

- **bcryptjs**: Encrypts new user passwords before saving them to the MongoDB database and verifies client-entered passwords during login.
- **JWT (JSON Web Token)**: Generates an encrypted token containing user information (_id, isBusiness, isAdmin) for login authentication.

## Initialization with seed.js

Executing `seed.js` initializes the application with predefined data, including 4 cards created by different three instances of users: general user, business user, and admin.

## Mongoose Library

Utilized to create USERS and CARDS models for MongoDB data management.

## CRUD Operations

The application supports CRUD operations (Create, Read, Update, Delete) for both Users and Cards. The following routes are available:

### Users Routes

| No. | URL               | Method | Authorization      | Action             | Return               |
|-----|-------------------|--------|--------------------|--------------------|----------------------|
| 1   | `/users`       	  | POST   | All                | Register user      | Encrypted token      |
| 2   | `/users/login`    | POST   | All                | Login              | Array of users       |
| 3   | `/users`          | GET    | Admin              | Get all users      | Array of users       |
| 4   | `/users/:id`      | GET    | Registered User or Admin | Get user           | User object          |
| 5   | `/users/:id`      | PUT    | Registered User    | Edit user          | User object          |
| 6   | `/users/:id`      | PATCH  | Registered User    | Change user isBusiness status | User object          |
| 7   | `/users/:id`      | DELETE | Registered User or Admin | Delete user        | User object          |
| 8   | `api/auth/profile`| GET    | Registered User    | User details       | User object          |

### Cards Routes

| No. | URL                  | Method | Authorization      | Action             | Return               |
|-----|----------------------|--------|--------------------|--------------------|----------------------|
| 1   | `/cards`             | GET    | All                | Get all cards      | Array of cards       |
| 2   | `/cards/my-cards`    | GET    | Registered User    | Get user cards     | Array of cards       |
| 3   | `/cards/:id`         | GET    | All                | Get card           | Card object          |
| 4   | `/cards`             | POST   | Business User      | Create new card    | Card object          |
| 5   | `/cards/:id`         | PUT    | User who created the card | Edit card          | Card object          |
| 6   | `/cards/:id`         | PATCH  | Registered User    | Like/unlike card          | Card object          |
| 7   | `/cards/:id`         | DELETE | User who created the card or Admin | Delete card        | Card object          |

## Error Logging

The application includes a logger that generates log files for errors with a status code of 400 or above. When such an error is encountered, it is logged to a file named with the date of that day.

## Local Development URLs

When using a local MongoDB instance, the application can be accessed at the following URLs:

- `http://localhost:3000`
- `http://127.0.0.1:3000`

These URLs are the base for the CRUD operations listed above.