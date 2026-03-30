# UBER Ride App

Full-stack MERN-style project with:

- Backend API (Node.js, Express, MongoDB)
- Frontend client (React + Vite)

## Project Structure

```text
UBER/
	Backend/
	Frontend/
```

## Tech Stack

- Backend: Express, Mongoose, JWT, bcrypt, cookie-parser, cors
- Frontend: React, React Router, Vite, Tailwind CSS

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (local or cloud)

## Quick Start

1. Install backend dependencies.

```bash
cd Backend
npm install
```

2. Create `Backend/.env`.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Install frontend dependencies.

```bash
cd ../Frontend
npm install
```

4. Start backend (Terminal 1).

```bash
cd Backend
npm run dev
```

5. Start frontend (Terminal 2).

```bash
cd Frontend
npm run dev
```

Default URLs:

- Backend API: http://localhost:3000
- Frontend App: http://localhost:5173

## Backend Scripts

Inside `Backend`:

- `npm start` -> run server with Node
- `npm run dev` -> run server with nodemon

## Frontend Scripts

Inside `Frontend`:

- `npm run dev` -> start Vite dev server
- `npm run build` -> production build
- `npm run preview` -> preview production build
- `npm run lint` -> run ESLint

## Authentication

Protected routes require a JWT token.

Use this header:

```text
Authorization: Bearer <token>
```

## API Routes

Base URL: `http://localhost:3000`

### User Routes

1. Register User

- Method: POST
- Endpoint: `/users/register`

Request body:

```json
{
	"fullname": {
		"firstname": "John",
		"lastname": "Doe"
	},
	"email": "john@example.com",
	"password": "secret123"
}
```

Validation:

- `fullname.firstname`: required, string, min 3
- `fullname.lastname`: optional, string, min 3
- `email`: required, valid email, min 5
- `password`: required, string, min 6

Success response:

```json
{
	"message": "User registered successfully",
	"userId": "<user_id>",
	"token": "<jwt_token>"
}
```

2. Login User

- Method: POST
- Endpoint: `/users/login`

Request body:

```json
{
	"email": "john@example.com",
	"password": "secret123"
}
```

Success response:

```json
{
	"message": "Login successful",
	"userId": "<user_id>",
	"token": "<jwt_token>"
}
```

3. Get User Profile

- Method: GET
- Endpoint: `/users/profile`
- Auth required: Yes

Success response:

```json
{
	"user": {
		"_id": "<user_id>",
		"fullname": {
			"firstname": "John",
			"lastname": "Doe"
		},
		"email": "john@example.com"
	}
}
```

4. Logout User

- Method: GET
- Endpoint: `/users/logout`
- Auth required: Yes

Success response:

```json
{
	"message": "Logged out successfully"
}
```

### Driver Routes

1. Register Driver

- Method: POST
- Endpoint: `/drivers/register`

Request body:

```json
{
	"fullname": {
		"firstname": "Alex",
		"lastname": "Driver"
	},
	"email": "alex@example.com",
	"password": "secret123",
	"vehicle": {
		"colour": "white",
		"capacity": 4,
		"vehicleType": "sedan"
	}
}
```

Validation:

- `fullname.firstname`: required, string, min 3
- `fullname.lastname`: optional, string, min 3
- `email`: required, valid email, min 5
- `password`: required, string, min 6
- `vehicle.colour`: required, string, min 3
- `vehicle.capacity`: required, integer, min 1
- `vehicle.vehicleType`: required, one of sedan, suv, hatchback, van, truck

Success response:

```json
{
	"message": "Driver registered successfully",
	"driverId": "<driver_id>",
	"token": "<jwt_token>"
}
```

2. Login Driver

- Method: POST
- Endpoint: `/drivers/login`

Request body:

```json
{
	"email": "alex@example.com",
	"password": "secret123"
}
```

Success response:

```json
{
	"message": "Driver logged in successfully",
	"driverId": "<driver_id>",
	"token": "<jwt_token>"
}
```

3. Get Driver Profile

- Method: GET
- Endpoint: `/drivers/profile`
- Auth required: Yes

Success response:

```json
{
	"driver": {
		"_id": "<driver_id>",
		"fullname": {
			"firstname": "Alex",
			"lastname": "Driver"
		},
		"email": "alex@example.com",
		"vehicle": {
			"colour": "white",
			"capacity": 4,
			"vehicleType": "sedan"
		}
	}
}
```

4. Logout Driver

- Method: GET
- Endpoint: `/drivers/logout`
- Auth required: Yes

Success response:

```json
{
	"message": "Driver logged out successfully"
}
```

## Suggested Postman Test Order

1. Call `POST /users/register`
2. Call `POST /users/login` and copy token
3. Set token in Authorization header
4. Call `GET /users/profile`
5. Call `GET /users/logout`
6. Repeat for `/drivers/*` endpoints

## Common Error Responses

Validation error:

```json
{
	"errors": [
		{
			"msg": "first name must be at least 3 characters",
			"path": "fullname.firstname",
			"location": "body"
		}
	]
}
```

Unauthorized error:

```json
{
	"message": "Unauthorized"
}
```
