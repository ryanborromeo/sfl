# Design: Improve Assessment Evaluation Dimensions

## Context

The SFL assessment evaluates submissions on 7 dimensions. The current implementation has solid fundamentals but can be enhanced to score higher on:
- **D1 (UI/UX)**: Loading states are basic spinners; missing micro-interactions
- **D3 (Front-End)**: No error boundaries; limited form validation
- **D4 (Back-End)**: No input validation; basic error handling
- **D7 (Impressiveness)**: Functional but lacks "wow" features

**Constraint**: Changes should be minimal-effort, high-impact to stay within project scope.

## Goals / Non-Goals

### Goals
- Improve perceived polish without major refactoring
- Add error resilience to frontend and backend
- Enhance accessibility basics
- Add 1-2 "impressive" features that stand out

### Non-Goals
- Adding authentication or user accounts
- Building an admin panel
- Implementing meal swapping (too complex)
- Full test coverage (out of scope)
- Redesigning the UI (current design is good)

## Decisions

### 1. Component Architecture

**Decision**: Create minimal reusable components in `apps/web/src/components/`
- `Skeleton.tsx` - Loading placeholder
- `Toast.tsx` - Notification popup
- `ErrorBoundary.tsx` - Error wrapper

**Rationale**: These components are needed in multiple places and demonstrate good code organization.

### 2. Toast Implementation

**Decision**: Use a simple custom toast with CSS transitions (no library)

**Alternatives considered**:
- react-hot-toast: Extra dependency, overkill for simple needs
- sonner: Same concern
- Custom implementation: Lightweight, no bundle impact

**Implementation**:
```typescript
// Simple toast context with useState
const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)
```

### 3. Skeleton Loader Pattern

**Decision**: Use Tailwind's `animate-pulse` with gray backgrounds

**Example**:
```tsx
<div className="animate-pulse bg-gray-200 rounded h-6 w-3/4" />
```

### 4. Backend Validation

**Decision**: Use class-validator with NestJS ValidationPipe

**Implementation**:
```typescript
// main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));

// generate-plan.dto.ts
class GeneratePlanDto {
  @IsInt()
  @Min(1)
  @Max(7)
  days: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagsInclude?: string[];
  // ...
}
```

### 5. Error Boundary Strategy

**Decision**: Single error boundary at layout level with reset capability

**Rationale**: Simpler than per-page boundaries; catches all errors; allows retry.

### 6. Nutritional Summary (Impressiveness Feature)

**Decision**: Show mock nutritional totals per day (not real calculations)

**Rationale**: Adds visual impressiveness without requiring recipe nutrition data. Display as "estimated" to set expectations.

**Display**:
```
Day 1 Nutrition (Est.)
Calories: ~1,800  Protein: ~65g  Carbs: ~200g
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Adding too many changes could introduce bugs | Keep changes small and test each |
| Mock nutritional data could confuse users | Label as "Estimated" clearly |
| New components add complexity | Keep components under 50 lines each |
| Validation could break existing API calls | Test frontend form submission |

## Migration Plan

No migration needed—all changes are additive enhancements.

**Deployment order**:
1. Deploy backend validation first (backwards compatible)
2. Deploy frontend enhancements
3. Verify on staging/preview before production

## Open Questions

1. Should toast auto-dismiss or require user action?
   - **Recommendation**: Auto-dismiss after 3 seconds for success, persist for errors

2. What favicon to use?
   - **Recommendation**: Simple fork/spoon emoji or custom SVG

3. Should skeleton loaders match exact layout?
   - **Recommendation**: Approximate layout is sufficient (faster to implement)
