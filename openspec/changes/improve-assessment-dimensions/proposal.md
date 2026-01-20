# Change: Improve Assessment Evaluation Dimensions

## Why

The SFL assessment evaluates submissions across 7 dimensions (D1-D7). After analyzing the codebase against these criteria, several high-impact improvements can increase scores with minimal effort—particularly in UI/UX refinement (D1), front-end quality (D3), back-end quality (D4), and overall impressiveness (D7).

## What Changes

### D1: UI/UX Refinement (High Priority)
- Add skeleton loading states instead of simple spinners (more polished)
- Add micro-interactions (button hover states, card transitions)
- Improve empty states with helpful illustrations
- Add toast notifications for user feedback (copy to clipboard, errors)

### D3: Front-End Quality (High Priority)
- Add React Error Boundary for graceful error recovery
- Fix potential layout issues on edge screen sizes
- Add proper form validation with inline error messages
- Improve keyboard navigation and focus states

### D4: Back-End Quality (Medium Priority)
- Add input validation with class-validator on DTOs
- Add proper HTTP exception handling with structured errors
- Add request logging for debugging
- Handle edge cases (no recipes match filters)

### D5: Responsiveness (Medium Priority)
- Audit and fix any tablet breakpoint issues
- Ensure touch targets meet 44px minimum
- Test and fix landscape mobile orientation

### D6: Performance (Low Priority - Already Good)
- Add loading state optimization (show partial content early)
- Consider image optimization if images added later

### D7: Overall Impressiveness (High Priority)
- Add print stylesheet for grocery list
- Add "regenerate" button on plan page
- Add meal swap functionality (swap one meal for another)
- Add nutritional summary (mock data, impressiveness factor)

## Impact

- **Affected specs**: New specs to be created (ui-polish, backend-reliability, accessibility)
- **Affected code**:
  - `apps/web/src/app/page.tsx` - Home page polish
  - `apps/web/src/app/plan/[shareCode]/page.tsx` - Plan display
  - `apps/web/src/app/plan/[shareCode]/grocery/page.tsx` - Grocery page
  - `apps/api/src/plans/plans.controller.ts` - Validation
  - `apps/api/src/plans/plans.service.ts` - Error handling
  - New: `apps/web/src/components/` - Reusable components

## Scope Prioritization

Given the ~2 hour effort guideline, focus on **highest impact, lowest effort** changes:

1. **Must Have** (30 min): Error boundaries, toast notifications, skeleton loaders
2. **Should Have** (30 min): Input validation, better empty states, micro-interactions
3. **Nice to Have** (30 min): Print stylesheet, regenerate button, nutritional summary
4. **Skip for Now**: Meal swap (too complex), authentication, admin panel
