# UI Polish Capability

## ADDED Requirements

### Requirement: Skeleton Loading States
The system SHALL display skeleton placeholder UI while content is loading.

#### Scenario: Plan page loading
- **WHEN** the plan page is accessed
- **THEN** skeleton placeholders SHALL appear for meal cards
- **AND** the skeleton SHALL animate with a pulse effect
- **AND** the skeleton SHALL be replaced by real content when loaded

#### Scenario: Grocery page loading
- **WHEN** the grocery list page is accessed
- **THEN** skeleton placeholders SHALL appear for category sections
- **AND** the skeleton SHALL match approximate layout of final content

### Requirement: Toast Notifications
The system SHALL display toast notifications for user feedback.

#### Scenario: Copy to clipboard success
- **WHEN** the user clicks the share button
- **AND** the link is copied successfully
- **THEN** a success toast SHALL appear with message "Link copied!"
- **AND** the toast SHALL auto-dismiss after 3 seconds

#### Scenario: Error notification
- **WHEN** an API error occurs
- **THEN** an error toast SHALL appear with the error message
- **AND** the toast SHALL have a red/destructive color scheme
- **AND** the toast SHALL remain visible until dismissed

### Requirement: Micro-interactions
The system SHALL provide subtle animations to enhance user experience.

#### Scenario: Button interactions
- **WHEN** the user hovers over a clickable button
- **THEN** the button SHALL transition to a hover state with visual feedback
- **AND** the transition SHALL be smooth (150-200ms duration)

#### Scenario: Card hover effects
- **WHEN** the user hovers over a meal card
- **THEN** the card SHALL subtly lift with shadow enhancement
- **AND** the transition SHALL feel natural and not jarring

#### Scenario: Checkbox animation
- **WHEN** the user toggles a grocery item checkbox
- **THEN** the checkbox SHALL animate the state change
- **AND** checked items SHALL show a strikethrough with fade effect

### Requirement: Empty States
The system SHALL display helpful empty states when no content is available.

#### Scenario: No recipes match filters
- **WHEN** plan generation fails because no recipes match the filters
- **THEN** a friendly empty state SHALL be displayed
- **AND** the message SHALL explain why (e.g., "No recipes match your filters")
- **AND** a call-to-action SHALL suggest adjusting filters

### Requirement: Regenerate Plan
The system SHALL allow users to regenerate their meal plan.

#### Scenario: Regenerate from plan page
- **WHEN** the user views their generated plan
- **THEN** a "Regenerate" button SHALL be visible
- **WHEN** the user clicks "Regenerate"
- **THEN** a new plan SHALL be generated with the same constraints
- **AND** the user SHALL be redirected to the new plan

### Requirement: Print Stylesheet
The system SHALL provide a print-optimized view of the grocery list.

#### Scenario: Print grocery list
- **WHEN** the user prints the grocery list page
- **THEN** the layout SHALL be optimized for paper
- **AND** unnecessary UI elements (navigation, buttons) SHALL be hidden
- **AND** checkboxes SHALL be visible as empty squares for manual checking
