# Frontend

This frontend is built with React and Vite for the Day-09 project. It provides the authentication UI for login and registration and connects to the backend API at `http://localhost:3000`.

## Features

- React + Vite application
- Login page with username/email and password
- Registration page with username, email, and password
- Axios requests to backend auth endpoints
- React Router v7 for client-side routing
- Sass styling support

## Prerequisites

- Node.js 18+ (or compatible)
- npm installed
- Backend server running on `http://localhost:3000`

## Setup

1. Open the `Frontend` directory.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser at the URL shown by Vite.

## Available scripts

- `npm run dev` - start the Vite development server
- `npm run build` - build the production bundle
- `npm run lint` - run ESLint on the project files
- `npm run preview` - preview the production build locally

## Project structure

- `src/App.jsx` - application root
- `src/AppRoutes.jsx` - router and route definitions
- `src/features/auth/pages/Login.jsx` - login form
- `src/features/auth/pages/Register.jsx` - register form
- `src/style.scss` - global styles

## Notes

- The login form sends a POST request to `/api/auth/login`.
- The registration form sends a POST request to `/api/auth/register`.
- Both forms use `withCredentials: true` to support cookies from the backend.
