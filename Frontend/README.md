# UBER Frontend

React + Vite frontend for the UBER ride app project.

## Stack

- React 19
- React Router DOM 7
- Vite 7
- Axios
- Tailwind CSS 4

## Prerequisites

- Node.js 18+
- npm 9+
- Backend API running (default: `http://localhost:3000`)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in the `Frontend` folder:

```env
VITE_BASE_URL=http://localhost:3000
```

3. Start development server:

```bash
npm run dev
```

App runs on `http://localhost:5173` by default.

## Available Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## App Routes

- `/` - Start page
- `/signup` - User signup
- `/login` - User login
- `/driver-sign` - Driver login
- `/driver-signup` - Driver signup
- `/Home` - User home (protected)
- `/Driverhome` - Driver home (protected)

Protected route behavior:

- `UserProtectedWrapper` redirects unauthenticated users to `/login`.
- `DriverProtected` verifies token by calling `GET /drivers/profile` and redirects to `/driver-sign` if invalid.

## Project Structure

```text
Frontend/
	src/
		assets/context/
			Usercontext.jsx
		pages/
			Start.jsx
			UserSignup.jsx
			UserLogin.jsx
			DriverSign.jsx
			DriverSignup.jsx
			Home.jsx
		App.jsx
		main.jsx
```

## Backend Integration

- API base URL is read from `import.meta.env.VITE_BASE_URL`.
- Current user signup flow posts to `/users/register`.
- Keep backend running before testing frontend auth flows.
