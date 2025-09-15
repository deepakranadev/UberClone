# User Registration API

## POST `/user/register`

Creates a new user account.

### Description
This endpoint registers a new user in the system. It validates the incoming data, hashes the password, stores the user in the database, and returns a JWT authentication token along with the created user data.

### Request

- **Method:** `POST`
- **URL:** `/user/register`
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**

```json
{
  "fullName": {
    "firstName": "Deepak",
    "lastName": "Rana"
  },
  "email": "deepak@example.com",
  "password": "yourPassword123"
}
```

| Field                    | Type   | Required | Description                        |
|--------------------------|--------|----------|------------------------------------|
| `fullName.firstName`      | string | Yes      | First name of the user (min 3)     |
| `fullName.lastName`       | string | No       | Last name of the user (min 3)      |
| `email`                  | string | Yes      | User email address (valid email)   |
| `password`               | string | Yes      | Password (min 3 characters)        |

### Responses

| Status Code | Meaning                                                        | Body Example                                                  |
|-------------|----------------------------------------------------------------|---------------------------------------------------------------|
| `201`       | User created successfully. Returns a token and user info.       | `{ "token": "<jwt_token>", "user": { ...userData } }`          |
| `400`       | Validation failed. Returns array of validation errors.          | `{ "errors": [ { "msg": "Invalid email", "param": "email" } ]}`|
| `409`       | Email already exists (if you handle conflict separately).       | `{ "message": "User already exists" }`                        |
| `500`       | Internal server error.                                          | `{ "message": "Server error" }`                               |

### Example Request (curl)

```bash
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": { "firstName": "Deepak", "lastName": "Rana" },
  "email": "deepak@example.com",
  "password": "yourPassword123"
}'
```

### Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "Deepak",
      "lastName": "Rana"
    },
    "email": "deepak@example.com"
  }
}
```


