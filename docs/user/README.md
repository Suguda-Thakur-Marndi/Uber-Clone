# User API Documentation

Base route prefix: `/users`

## 1. Register User

- Method: `POST`
- Endpoint: `/users/register`
- Description: Creates a new user account and returns a token.

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

### Required Fields

- `fullname.firstname` (string, min 3 characters)
- `email` (valid email, min 5 characters)
- `password` (string, min 6 characters)

### Optional Fields

- `fullname.lastname` (string, min 3 characters if provided)

### Status Codes

- `201 Created`: User successfully registered
- `400 Bad Request`: Validation failed
- `500 Internal Server Error`: Server error

### Success Response (201)

```json
{
	"message": "User registered successfully",
	"userId": "65f0c0a5f7f9d4d0f4a12345",
	"token": "<jwt_token>"
}
```

### Error Response (400)

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

### Example Request

```bash
curl -X POST http://localhost:4001/users/register \
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
- Description: Authenticates a user and returns a token.

### Request Body

```json
{
	"email": "john@example.com",
	"password": "secret123"
}
```

### Required Fields

- `email` (valid email)
- `password` (string, min 6 characters)

### Status Codes

- `200 OK`: Login successful
- `400 Bad Request`: Validation failed
- `401 Unauthorized`: Invalid email or password
- `500 Internal Server Error`: Server error

### Success Response (200)

```json
{
	"message": "Login successful",
	"userId": "65f0c0a5f7f9d4d0f4a12345",
	"token": "<jwt_token>"
}
```

### Error Response (401)

```json
{
	"message": "Invalid email or password"
}
```

### Example Request

```bash
curl -X POST http://localhost:4001/users/login \
	-H "Content-Type: application/json" \
	-d '{
		"email": "john@example.com",
		"password": "secret123"
	}'
```
