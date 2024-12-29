# [IMDB Clone Application](https://imdb-coding-challenge.vercel.app)

## Overview

A modern web application that clones IMDB functionality.

## Features

- **Movie Discovery**: Browse and search through a curated list of movies and TV shows
- **Favorites System**: Add/remove movies and episodes to your favorites list
- **Persistent Storage**: Favorites are saved locally and persist between sessions
- **Responsive Design**: Fully responsive UI that works on both desktop and mobile devices
- **Dark/Light Mode**: Theme toggle functionality for user preference
- **Dynamic Menu**: Side menu with discover suggestions and quick access to favorites

## Tech Stack

### Frontend

- React (TypeScript)
- Tailwind CSS for styling
- Shadcn/ui collection of components
- Lucide React for icons
- React Context for state management

### Backend

- Node.js
- Express.js
- Local storage simulation for data persistence

## Project Structure

```
imdb/
├── imdb-frontend/     # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Rendered pages
│   │   ├── contexts/      # Context providers
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   └── package.json
│
└── imdb-backend/     # Node.js backend application
    ├── src/
    │   └── index.js
    └── package.json
```

## Deployment

- Frontend: Deployed on Vercel
- Backend: Deployed on Render

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/pdarceno/imdb-coding-challenge.git
```

2. Frontend Setup

```bash
cd imdb-frontend
npm install
npm run dev
```

3. Backend Setup

```bash
cd imdb-backend
npm install
npm run dev
```

## Environment Variables

### Frontend (.env)

Create a `.env` file in the `imdb-frontend` directory with the following variables:

```env
VITE_API_URL=http://localhost:3001/api  # Backend API URL
```

### Backend (.env)

Create a `.env` file in the `imdb-backend` directory with the following variables:

```env
OMDB_API_KEY=d1467d11                 # OMDB API Key
PORT=3001                             # Server port
OMDB_BASE_URL=http://www.omdbapi.com  # OMDB Base URL
```

Make sure to never commit your `.env` files to version control. Both directories include `.env` in their respective `.gitignore` files.

## Development Journey and Technical Decisions

### 1. Pagination Implementation

I implemented traditional pagination using shadcn/ui's pagination component, which provides a better user experience for browsing through search results.

### 2. API Response Caching

Implemented a custom caching solution using a TypeScript class for better control over cache behavior:

```typescript
export class ApiCache {
  private cache: Cache = {};
  private readonly ttl: number;

  constructor(ttlMinutes: number = 5) {
    this.ttl = ttlMinutes * 60 * 1000;
  }

  get<T>(key: string): T | null {
    const item = this.cache[key];
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > this.ttl) {
      delete this.cache[key];
      return null;
    }

    return item.data;
  }
}
```

### 3. Loading State Animations

Used Tailwind's animation utilities with shadcn/ui's Skeleton component for smooth loading states:

```typescript
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}
```

### 4. Mobile Responsiveness

Implemented responsive design using Tailwind CSS utility classes:

- Flex and grid layouts that automatically adjust to screen size
- Responsive padding and margins
- Dynamic font sizes and spacing
- Mobile-first approach with progressive enhancement
