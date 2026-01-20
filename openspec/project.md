# Project Context

## Purpose

**MealPlan Pro** is a full-stack web application for generating personalized meal plans and automatically aggregating grocery lists. Users can:
- Specify dietary preferences (vegetarian, high-protein, quick, etc.)
- Set cooking time constraints
- Exclude specific ingredients
- Generate 3, 5, or 7-day meal plans
- Get organized grocery lists grouped by category
- Share meal plans via unique URLs

## Tech Stack

### Backend (`apps/api/`)
- **Runtime:** Node.js 18+
- **Framework:** NestJS 10.3.0
- **Language:** TypeScript (ES2021 target)
- **ORM:** Prisma 5.8.0
- **Database:** SQLite (file-based)
- **Key Libraries:** rxjs, nanoid, reflect-metadata

### Frontend (`apps/web/`)
- **Framework:** Next.js 14.1.0 (App Router)
- **UI Library:** React 18.2.0
- **Styling:** Tailwind CSS 3.4.1
- **Icons:** lucide-react
- **Utilities:** clsx, tailwind-merge
- **Language:** TypeScript 5.3.3

### Infrastructure
- **Package Management:** npm workspaces (monorepo)
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render
- **Database:** SQLite (single-instance deployment)

## Project Conventions

### Code Style
- TypeScript strict mode enabled
- **Naming Conventions:**
  - `camelCase` for variables and functions
  - `PascalCase` for components, classes, and types
  - `UPPER_SNAKE_CASE` for constants
- Functional React components (no class components)
- ES modules in frontend, CommonJS in backend
- Utility function `cn()` for Tailwind class merging

### Architecture Patterns

**Backend (NestJS):**
- Modular design with feature modules (RecipesModule, PlansModule, PrismaModule)
- Service-Controller pattern: business logic in services, HTTP in controllers
- Dependency Injection via NestJS decorators
- DTOs as inline TypeScript interfaces
- NestJS exceptions for error handling (NotFoundException, etc.)

**Frontend (Next.js):**
- App Router with file-based routing
- Dynamic routes for shareable plans (`[shareCode]`)
- `'use client'` directives for interactive components
- Centralized API client in `lib/api.ts`
- localStorage for persisting UI state (grocery checkmarks)

**Database (Prisma):**
- Models: Recipe, Ingredient, RecipeIngredient, Plan, PlanMeal
- Ingredient categories: produce, protein, dairy, pantry, spices, other
- Unique share codes for each plan (nanoid)

### Testing Strategy
Currently no automated testing framework configured. Manual testing is used during development.

### Git Workflow
- Main branch: `main`
- Commit messages should be concise and descriptive
- Feature branches recommended for larger changes

## Domain Context

### Core Entities
- **Recipe:** A meal with title, tags, cook time, servings, and ingredients
- **Ingredient:** Individual food items with a category for grocery organization
- **Plan:** A generated meal plan spanning multiple days with a unique share code
- **PlanMeal:** Individual meals (breakfast/lunch/dinner) for each day

### Key Features
- **Tag-based filtering:** Recipes can have multiple tags (vegetarian, high-protein, quick, etc.)
- **Grocery aggregation:** Combines ingredients across all meals, grouped by category
- **Shareable URLs:** Plans are accessed via `/plan/[shareCode]`

### API Endpoints
- `POST /plans/generate` - Create a new meal plan
- `GET /plans/:shareCode` - Retrieve a plan with all meals
- `GET /plans/:shareCode/grocery-list` - Get aggregated grocery list
- `GET /recipes` - List recipes with optional filters
- `GET /recipes/:id` - Get single recipe details

## Important Constraints

- **SQLite limitations:** Single-instance deployment only; not suitable for horizontal scaling
- **CORS:** Backend must have `CORS_ORIGIN` configured to match frontend domain
- **Environment variables:** Required for both apps (see `.env.example` files)

## External Dependencies

### Services
- **Vercel:** Frontend hosting and CDN
- **Render:** Backend API hosting

### Environment Configuration
**API (`apps/api/.env`):**
```
DATABASE_URL="file:./dev.db"
PORT=3001
CORS_ORIGIN="https://your-frontend-domain.vercel.app"
```

**Web (`apps/web/.env.local`):**
```
NEXT_PUBLIC_API_URL=https://your-api-domain.onrender.com
```

## Development Commands

```bash
# Root level
npm run dev:api    # Start NestJS dev server
npm run dev:web    # Start Next.js dev server
npm run build:api  # Build backend
npm run build:web  # Build frontend

# Backend specific
npm run prisma:migrate       # Run migrations
npm run prisma:seed          # Seed database

# Frontend specific
npm run lint                 # ESLint checks
```
