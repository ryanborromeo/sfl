# MealPlan Pro

A smart meal planning and grocery list builder application.

## Tech Stack

- **Backend**: NestJS + Prisma + SQLite
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + shadcn/ui

## Project Structure

```
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # Next.js frontend
├── package.json      # Workspace root
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Set up the database
cd apps/api
npx prisma migrate dev
npx prisma db seed
```

### Development

```bash
# Start the API (from root)
npm run dev:api

# Start the web app (from root)
npm run dev:web
```

### Environment Variables

#### API (`apps/api/.env`)
```
DATABASE_URL="file:./dev.db"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

#### Web (`apps/web/.env.local`)
```
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## Features

- Generate personalized meal plans based on dietary preferences
- Automatic grocery list aggregation
- Mobile-friendly shopping mode
- Shareable plan links

## License

MIT
