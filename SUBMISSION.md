# SFL Assessment Submission

## S1. Application Description

### What It Does
**MealPlan Pro** is a smart meal planning and grocery list builder that helps users plan their weekly meals and automatically generates a consolidated shopping list.

### Problem It Solves
Planning meals for the week is tedious, and creating grocery lists from multiple recipes is error-prone. MealPlan Pro solves this by:
- Generating personalized meal plans based on dietary preferences and time constraints
- Automatically aggregating ingredients into a categorized grocery list
- Providing a mobile-friendly "shopping mode" for in-store use

### Key Features
- **Smart Plan Generation**: Select number of days, dietary tags (vegetarian, high-protein, etc.), exclude specific ingredients, and set max cooking time
- **Shareable Plans**: Each plan gets a unique link that can be shared with family members
- **Intelligent Grocery Aggregation**: Combines duplicate ingredients across recipes and groups by store section (Produce, Proteins, Dairy, Pantry, Spices)
- **Mobile-First Grocery Mode**: Large tap targets, sticky category headers, progress tracking, and localStorage persistence for checked items

### What I'm Most Proud Of
- The responsive grocery checklist UX optimized for actual in-store use
- Clean separation between NestJS backend and Next.js frontend
- The rules-based plan generation that avoids recipe repetition and respects all constraints

---

## S2. Prompt Documentation

### Initial Architecture Prompt
```
Design a Prisma schema for a meal planning app with:
- Recipes with tags, cook time, servings
- Ingredients with categories (produce, protein, dairy, pantry, spices)
- Recipe-Ingredient join table with quantity and unit
- Plans with shareable codes
- Plan meals linking plans to recipes by day and meal type
Optimize for grocery list aggregation queries.
```

### Backend Generation Prompt
```
Create a NestJS service for meal plan generation that:
1. Filters recipes by included/excluded tags
2. Excludes recipes containing specific ingredients
3. Filters by max cook time
4. Randomly assigns recipes to meal slots without repetition
5. Persists the plan in a transaction
6. Returns a unique share code
```

### Grocery Aggregation Prompt
```
Write a NestJS endpoint that aggregates ingredients from all meals in a plan:
- Group by ingredient
- Sum quantities when units match
- Keep separate lines when units differ
- Return grouped by ingredient category for UI display
```

### Frontend UI Prompt
```
Create a Next.js grocery list page that is mobile-first with:
- Sticky category headers
- Large checkbox tap targets
- Progress counter showing checked/total items
- localStorage persistence keyed by plan shareCode
- Search/filter functionality
```

### Polish & Responsiveness Prompt
```
Add loading skeletons, error states, and ensure the meal plan viewer 
is responsive across mobile, tablet, and desktop. Use Tailwind for 
consistent spacing and shadcn/ui components for polish.
```

---

## S3. Live Application Link

**URL**: `[TO BE FILLED AFTER DEPLOYMENT]`

### Demo Instructions
1. Visit the homepage
2. Select number of days (3, 5, or 7)
3. Optionally toggle dietary preferences
4. Click "Generate Plan"
5. View your meal plan and click "View Grocery List"
6. Use the grocery checklist in mobile view for the best experience

---

## S4. GitHub Repository Link

**Repository**: `[TO BE FILLED AFTER PUSHING TO GITHUB]`

### Tech Stack
- **Backend**: NestJS + Prisma + SQLite
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + shadcn/ui
- **Deployment**: Render (API) + Vercel (Web)

---

## Development Notes

### Time Allocation (Approximate)
- Architecture & Planning: 15 min
- Backend (Prisma + NestJS): 45 min
- Frontend (Next.js pages): 45 min
- Polish & Responsiveness: 15 min

### Trade-offs Made
- Used SQLite for simplicity (works well for demo scale)
- Seeded recipe dataset instead of external API (reliability)
- No authentication (keeps scope tight, improves stability)
- Rules-based generation instead of AI (predictable, fast)
