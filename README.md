# Linktr Backend

A MERN stack backend for a platform similar to [Linktr.ee](https://linktr.ee) or [Bento.me](https://bento.me) that supports user registration, login, and a referral system.

## Overview

This project provides a robust backend with user authentication, referral tracking, and essential API endpoints. It is built using **Node.js, Express, and MongoDB**. The project emphasizes security and scalability by using **JWT for authentication**, **bcrypt for password hashing**, and **proper error handling**.

## Features

- **User Registration & Authentication:**

  - Sign up using email, username, and password.
  - Login with either email or username.
  - Secure password storage using bcrypt.
  - JWT-based session management.

- **Referral System:**

  - Generate a unique referral code for every user.
  - Allow users to register using a valid referral code.
  - Track referral statistics (e.g., number of successful referrals).

- **Security Practices:**

  - Input validation and error handling.
  - Use of Helmet and CORS to secure API endpoints.
  - Middleware for route protection using JWT.

## Project Setup

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/yourusername/linktr-backend.git
cd linktr-backend
```

### 2. Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following content:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Replace the placeholders with your actual MongoDB connection string and a secret key for JWT.

### 4. Running the Application

Start the server in development mode using nodemon:

```bash
npm run dev
```

The server will run on the port specified in your `.env` file (default is **5000**).

## API Endpoints

### 1. Authentication Endpoints

#### Register a New User

**Endpoint:** `POST /api/register`

**Request Body:**

```json
{
  "username": "johnDoe",
  "email": "john@example.com",
  "password": "yourPassword",
  "referralCode": "optionalReferralCode"
}
```

**Description:** Registers a new user. If a valid referral code is provided, the new user is linked to the referrer.

#### Login

**Endpoint:** `POST /api/login`

**Request Body:**

```json
{
  "emailOrUsername": "john@example.com",
  "password": "yourPassword"
}
```

**Description:** Authenticates a user and returns a JWT token. Use this token to access protected routes.

#### Forgot Password

**Endpoint:** `POST /api/forgot-password`

(Placeholder endpoint for future password recovery functionality.)

### 2. Referral Endpoints

These endpoints require a valid JWT in the `Authorization` header:

#### List Referrals

**Endpoint:** `GET /api/referrals`

**Header:**

```
Authorization: Bearer <your_jwt_token>
```

**Description:** Retrieves a list of users who registered using the logged-in user’s referral code.

#### Referral Stats

**Endpoint:** `GET /api/referral-stats`

**Header:**

```
Authorization: Bearer <your_jwt_token>
```

**Description:** Returns the count of successful referrals for the logged-in user.

## Testing the API

Use tools like **Postman** or **Insomnia** to test the API endpoints:

1. **Register a User:** Register a user without a referral code. Note the referral code generated in the response or check your database.
2. **Register with a Referral Code:** Use the referral code from the first user to register a second user. This will test the referral relationship.
3. **Login and Use Token:** Login with your registered user to receive a JWT token. Use this token in the `Authorization` header (as `Bearer <JWT_TOKEN>`) to access the referral endpoints.

## Deployment Considerations

- **Secure Environment Variables:** Ensure your environment variables (such as `MONGO_URI` and `JWT_SECRET`) are kept secure in production.
- **Logging and Monitoring:** Set up logging and error monitoring to track application performance and troubleshoot issues.
- **Scalability:** Consider **load balancing**, **horizontal scaling**, and **caching strategies** to manage increased traffic.

## License

This project is licensed under the **MIT License**.

---


