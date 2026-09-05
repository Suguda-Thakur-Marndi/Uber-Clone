# UBER Full-Stack Ride Hailing Platform (Production-Ready)

A modern, production-ready ride-hailing web application built with a high-performance Node.js / Express / Socket.io backend and a React + Vite + Tailwind CSS frontend.

---

## Features

- **Real-Time Ride Dispatch**: Socket.io real-time bidirection communication between riders and drivers.
- **Interactive Live Map**: Leaflet & OpenStreetMap vector map rendering with live driver locations, route polyline, and pickup/dropoff markers.
- **Dual-Mode Maps Service**: Intelligent geocoding and distance calculation with automatic fallback to Nominatim & Haversine distance if Google Maps API limits or restrictions are encountered.
- **Dynamic Fare Engine**: Fare estimation based on real distances and times for multiple vehicle categories (Uber Go, Uber Auto, Uber Moto).
- **Secure 6-Digit OTP Verification**: Ride safety workflow requiring driver to verify the passenger's cryptographically generated OTP before starting any trip.
- **Role-Based Authentication**: JWT-based session security with token blacklisting and cookie/bearer token support for both Riders and Drivers.
- **Driver Portal**: Real-time incoming ride popups, online/offline status switch, trip navigation, and trip completion summary.

---

## Tech Stack

- **Backend**: Node.js, Express 5, Socket.io 4, MongoDB (Mongoose 9), JSON Web Tokens (JWT), Bcrypt, Cookie-Parser, CORS.
- **Frontend**: React 19, Vite 7, Tailwind CSS 4, Leaflet, GSAP Animations, Remix Icons, Lucide React, Axios, Socket.io-client.

---

## Quick Start

### 1. Backend Setup

```bash
cd Backend
npm install
```

Create `Backend/.env`:
```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/uber
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API=your_google_maps_api_key_or_leave_blank_for_fallback
```

Run integration test suite:
```bash
npm test
```

Start backend development server:
```bash
npm run dev
# or
npm start
```

### 2. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create `Frontend/.env`:
```env
VITE_BASE_URL=http://localhost:3000
```

Start frontend development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

---

## API Documentation

### Rider Endpoints (`/users`)
- `POST /users/register`: Register rider (`fullname.firstname`, `email`, `password`)
- `POST /users/login`: Authenticate rider and issue JWT
- `GET /users/profile`: Fetch rider profile (Auth required)
- `GET /users/logout`: Blacklist session token

### Driver Endpoints (`/drivers`)
- `POST /drivers/register`: Register driver partner (`fullname`, `email`, `password`, `vehicle`)
- `POST /drivers/login`: Authenticate driver partner and return driver profile
- `GET /drivers/profile`: Fetch driver profile (Auth required)
- `GET /drivers/logout`: Blacklist session token

### Maps Endpoints (`/maps`)
- `GET /maps/get-coordinates?address=...`: Geocode address to `{ ltd, lng }`
- `GET /maps/get-distance-time?origin=...&destination=...`: Distance & duration matrix
- `GET /maps/get-suggestions?input=...`: Autocomplete place suggestions

### Ride Lifecycle Endpoints (`/rides`)
- `GET /rides/get-fare?pickup=...&destination=...`: Calculate dynamic fares
- `POST /rides/create`: Book ride (`pickup`, `destination`, `vehicleType`)
- `POST /rides/confirm`: Driver accepts ride (`rideId`)
- `GET /rides/start-ride?rideId=...&otp=...`: Driver verifies OTP and starts trip
- `POST /rides/end-ride`: Driver completes trip (`rideId`)

---

## Socket.io Real-Time Events

| Event Name | Direction | Payload Description |
|---|---|---|
| `join` | Client -> Server | `{ userId, userType }` ('user' or 'driver') |
| `update-location-driver` | Driver -> Server | `{ userId, location: { ltd, lng } }` |
| `new-ride` | Server -> Driver | Broadcasts new ride request to nearby available drivers |
| `ride-confirmed` | Server -> Rider | Notifies rider that a driver accepted with driver details and OTP |
| `ride-started` | Server -> Rider | Notifies rider that the trip is underway |
| `ride-ended` | Server -> Rider | Notifies rider of trip completion and final fare |

---

## Verification & Testing

To run the complete automated integration test suite covering end-to-end user registration, driver registration, ride quotes, ride creation, socket-ready state transitions, OTP validation, and completion:

```bash
cd Backend
npm test
```
