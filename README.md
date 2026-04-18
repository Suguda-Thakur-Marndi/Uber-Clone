# UBER Ride App

Full-stack ride-booking demo app with:

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
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

You can also use `MONGO_URI` (both are supported by the backend).

3. Install frontend dependencies.

```bash
cd ../Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_BASE_URL=http://localhost:3000
```

4. Start backend (Terminal 1).

```bash
cd UBER/Backend
npm run dev
```

5. Start frontend (Terminal 2).

```bash
cd UBER/Frontend
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

JWT payload includes both `_id` and `role`:

- User token: `role: "user"`
- Driver token: `role: "driver"`

Backend middleware validates role-specific access:

- User endpoints use user auth middleware.
- Driver endpoints use driver auth middleware.

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
	"user": {
		"_id": "<user_id>",
		"email": "john@example.com",
		"fullname": {
			"firstname": "John",
			"lastname": "Doe"
		}
	},
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
	"user": {
		"_id": "<user_id>",
		"email": "john@example.com",
		"fullname": {
			"firstname": "John",
			"lastname": "Doe"
		}
	},
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

## Frontend Route Notes

- `/Home` is protected by `UserProtectedWrapper` and redirects to `/login` when token is missing.
- `/Driverhome` is protected by `DriverProtected`.
- `DriverProtected` validates token by calling `GET /drivers/profile` before rendering children.

## Common Error Responses

Validation error:

## Frontend Home Page

The **Home page** (`/Home`) is the main landing page for authenticated users. It is protected by the `UserProtectedWrapper` component, which ensures that only users with a valid JWT token can access it. If a user is not authenticated, they are redirected to the login page.

**Features:**
- Displays user-specific information after login
- Entry point for booking rides and viewing ride status
- Accessible only to logged-in users

**Route Protection:**
- The route `/Home` is guarded by `UserProtectedWrapper`.
- If the JWT token is missing or invalid, users are redirected to `/login`.

For more details, see the implementation in `Frontend/src/pages/Home.jsx` and the route protection logic in `Frontend/src/pages/UserProtectedWrapper.jsx`.

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
