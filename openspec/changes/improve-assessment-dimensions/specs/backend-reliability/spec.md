# Backend Reliability Capability

## ADDED Requirements

### Requirement: Input Validation
The API SHALL validate all incoming request data.

#### Scenario: Valid plan generation request
- **WHEN** a POST request to /plans/generate contains valid data
- **THEN** the request SHALL proceed normally
- **AND** the plan SHALL be generated

#### Scenario: Invalid days value
- **WHEN** a POST request to /plans/generate has days < 1 or days > 7
- **THEN** the API SHALL return HTTP 400 Bad Request
- **AND** the response SHALL include a clear validation error message
- **AND** the message SHALL specify which field failed validation

#### Scenario: Invalid tag format
- **WHEN** tagsInclude or tagsExclude contains non-string values
- **THEN** the API SHALL return HTTP 400 Bad Request
- **AND** the response SHALL specify the validation error

#### Scenario: Invalid maxCookTimeMins
- **WHEN** maxCookTimeMins is negative or exceeds reasonable limits
- **THEN** the API SHALL return HTTP 400 Bad Request

### Requirement: Structured Error Responses
The API SHALL return consistent error response format.

#### Scenario: Validation error response
- **WHEN** a validation error occurs
- **THEN** the response SHALL have format:
```json
{
  "statusCode": 400,
  "message": ["validation error details"],
  "error": "Bad Request"
}
```

#### Scenario: Not found error response
- **WHEN** a requested resource is not found
- **THEN** the response SHALL have format:
```json
{
  "statusCode": 404,
  "message": "Plan not found",
  "error": "Not Found"
}
```

### Requirement: Graceful Error Handling
The API SHALL handle edge cases gracefully.

#### Scenario: No recipes match constraints
- **WHEN** plan generation is requested
- **AND** no recipes match the provided constraints
- **THEN** the API SHALL return HTTP 400 Bad Request
- **AND** the message SHALL explain that no recipes match the filters
- **AND** the message SHALL suggest broadening the search criteria

#### Scenario: Database error handling
- **WHEN** a database operation fails
- **THEN** the API SHALL return HTTP 500 Internal Server Error
- **AND** the error details SHALL NOT be exposed to the client
- **AND** the error SHALL be logged server-side
