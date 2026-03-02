# Fullstack Next.js 16 + Apollo Demo

A **hydration-safe**, **App Router-compatible** Next.js 16 demo with:

- **Login / Authentication** using `localStorage` (mock JWT)
- **Dashboard** fetching data via **Apollo GraphQL**
- **Mock CRUD** for adding items
- **TypeScript** + **Tailwind CSS** styling
- **Client-only rendering** to prevent SSR hydration issues

---

## Features

1. **Home Page (`/`)**  
   Redirects automatically based on authentication status.

2. **Login Page (`/login`)**
   - Client-side login (`demo/demo`)
   - Redirects to Dashboard upon success
   - Safe `localStorage` access using `ClientOnly` wrapper

3. **Dashboard Page (`/dashboard`)**
   - Fetches countries from [Countries GraphQL API](https://countries.trevorblades.com/) using Apollo Client
   - Displays a list of items
   - Add new items (mock CRUD)
   - Logout functionality
   - Fully type-safe and ESLint-clean

4. **Client-only rendering**
   - Wraps components in `ClientOnly` to avoid Next.js 16 **hydration errors**
   - Ensures all `localStorage` and hooks run only on the client

---

## Tech Stack

- [Next.js App Router](https://nextjs.org/docs/app)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Project Structure

```text
app/
├── layout.tsx
├── page.tsx // Home redirect
├── login/
│ └── page.tsx // Login page
├── dashboard/
│ └── page.tsx // Dashboard page
lib/
├── apollo.ts // Apollo client
├── auth.ts // Login/logout/auth helpers
components/
├── ClientOnly.tsx // Client-only wrapper
styles/
└── globals.css

```

## Installation

1. Clone the repo:

```bash
git clone https://github.com/johnnyflores/aura-next-app.git
cd aura-next-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open http://localhost:3000

## Usage

Login credentials:

```bash
Username: demo
Password: demo
```

Dashboard:

- View countries fetched from GraphQL
- Add items
- Logout to return to login
