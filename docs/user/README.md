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

## 3. Get User Profile

- Method: `GET`
- Endpoint: `/users/profile`
- Description: Retrieves the current authenticated user's profile information.
- Authentication: Required (Bearer token)

### Headers

```
Authorization: Bearer <jwt_token>
```

### Status Codes

- `200 OK`: Profile retrieved successfully
- `401 Unauthorized`: Token is invalid, expired, or blacklisted
- `500 Internal Server Error`: Server error

### Success Response (200)

```json
{
	"user": {
		"_id": "65f0c0a5f7f9d4d0f4a12345",
		"fullname": {
			"firstname": "John",
			"lastname": "Doe"
		},
		"email": "john@example.com",
		"createdAt": "2024-03-15T10:30:00.000Z"
	}
}
```

### Error Response (401)

```json
{
	"message": "Unauthorized"
}
```

### Example Request

```bash
curl -X GET http://localhost:4001/users/profile \
	-H "Authorization: Bearer <jwt_token>"
```

## 4. Logout User

- Method: `GET`
- Endpoint: `/users/logout`
- Description: Logs out the current user and invalidates their token by adding it to the blacklist.
- Authentication: Required (Bearer token)

### Headers

```
Authorization: Bearer <jwt_token>
```

### Status Codes

- `200 OK`: Logged out successfully
- `401 Unauthorized`: Token is invalid or expired
- `500 Internal Server Error`: Server error

### Success Response (200)

```json
{
	"message": "Logged out successfully"
}
```

### Example Request

```bash
curl -X GET http://localhost:4001/users/logout \
	-H "Authorization: Bearer <jwt_token>"
```

## Token Blacklisting

### How It Works

Token blacklisting is a security mechanism that prevents users from using their JWT tokens after logout:

1. **On Logout**: When a user logs out, their token is stored in the `BlacklistToken` collection in MongoDB.
2. **On Protected Requests**: Before processing any protected request, the authentication middleware checks if the token exists in the blacklist.
3. **Access Denial**: If the token is found in the blacklist, the request is rejected with a 401 Unauthorized response.
4. **Automatic Cleanup**: Blacklisted tokens are automatically deleted from the database after 24 hours using MongoDB's TTL (Time To Live) feature.

### Token Lifecycle

```
User Login
    ↓
JWT Token Generated
    ↓
User Makes Requests (Token Valid)
    ↓
User Logs Out
    ↓
Token Added to Blacklist
    ↓
Token Cannot Be Used
    ↓
After 24 Hours
    ↓
Token Automatically Removed from Blacklist
```

### Security Benefits

- **Immediate Logout**: Users are immediately logged out upon logout request
- **Session Revocation**: Old tokens cannot be reused after logout
- **Automatic Cleanup**: Prevents database growth with automatic TTL expiration
- **Stateless + Stateful**: Combines stateless JWT advantages with stateful logout control

### Database Schema

The `BlacklistToken` model stores:

```javascript
{
	"_id": ObjectId,
	"token": String (unique, required),
	"createdAt": Date (expires after 86400 seconds / 24 hours)
}
```
