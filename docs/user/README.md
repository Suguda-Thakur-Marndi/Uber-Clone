# User API Documentation (Current)

Base route prefix: `/users`

Default local server URL: `http://localhost:3000`

## 1. Register User

- Method: `POST`
- Endpoint: `/users/register`
- Controller: `registerUser`
- Description: Creates a new user account and returns a JWT token.

### Request Body

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

### Validation Rules

- `fullname.firstname`: required, string, min 3 chars
- `fullname.lastname`: optional, string, min 3 chars (if provided)
- `email`: required, valid email, min 5 chars
- `password`: required, string, min 6 chars

### Success Response (201)

```json
{
	"message": "User registered successfully",
	"userId": "65f0c0a5f7f9d4d0f4a12345",
	"token": "<jwt_token>"
}
```

### Validation Error Response (400)

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

### Example

```bash
curl -X POST http://localhost:3000/users/register \
	-H "Content-Type: application/json" \
	-d '{
		"fullname": {
			"firstname": "John",
			"lastname": "Doe"
		},
		"email": "john@example.com",
		"password": "secret123"
	}'
```

## 2. Login User

- Method: `POST`
- Endpoint: `/users/login`
- Controller: `loginUser`
- Description: Authenticates user and returns a JWT token.

### Request Body

```json
{
	"email": "john@example.com",
	"password": "secret123"
}
```

### Current Behavior

- Missing `email` or `password` returns 400.
- Invalid credentials return 401.
- Success returns token.

### Success Response (200)

```json
{
	"message": "Login successful",
	"userId": "65f0c0a5f7f9d4d0f4a12345",
	"token": "<jwt_token>"
}
```

### Error Response (400)

```json
{
	"message": "Email and password are required"
}
```

### Error Response (401)

```json
{
	"message": "Invalid email or password"
}
```

### Example

```bash
curl -X POST http://localhost:3000/users/login \
	-H "Content-Type: application/json" \
	-d '{
		"email": "john@example.com",
		"password": "secret123"
	}'
```

## 3. Get User Profile

- Method: `GET`
- Endpoint: `/users/profile`
- Controller: `getUserProfile`
- Authentication: required

### Auth Header

```txt
Authorization: Bearer <jwt_token>
```

### Success Response (200)

```json
{
	"user": {
		"_id": "65f0c0a5f7f9d4d0f4a12345",
		"fullname": {
			"firstname": "John",
			"lastname": "Doe"
		},
		"email": "john@example.com"
	}
}
```

### Error Response (401)

```json
{
	"message": "Unauthorized"
}
```

### Example

```bash
curl -X GET http://localhost:3000/users/profile \
	-H "Authorization: Bearer <jwt_token>"
```

## 4. Logout User

- Method: `GET`
- Endpoint: `/users/logout`
- Authentication: required
- Description: Adds current token to blacklist and clears `token` cookie.

### Success Response (200)

```json
{
	"message": "Logged out successfully"
}
```

### Example

```bash
curl -X GET http://localhost:3000/users/logout \
	-H "Authorization: Bearer <jwt_token>"
```

## Token Blacklist Notes

- Blacklisted tokens are stored in `BlacklistToken` collection.
- `createdAt` has TTL of 86400 seconds (24 hours).
- Auth middleware blocks blacklisted tokens with 401.

## Current Code Notes

- There is a stray `router.post` line at the end of user routes file.
- Remove that line to avoid route file syntax/runtime issues.
