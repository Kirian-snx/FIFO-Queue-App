# Web App FIFO Queue API Documentation

## Introduction

This API provides functionality for managing a First-In-First-Out (FIFO) queue system. The system includes actions, credits, and the ability to add, execute, and retrieve the status of actions in the queue.

## Base URL

The base URL for all endpoints is `http://localhost:3030`.

## Endpoints

## Action Endpoints

For actions, the base URL is `http://localhost:3030/action/`.

### 1. Add Action to Queue

**Endpoint:** `POST /add-action`

**Description:** Adds a new action to the queue based on the specified action type.

**Request:**

```json
{
  "type": "A"
}
```

**Response (Success):**

```json
{
  "message": "Action added to the queue."
}
```

**Response (Error):**

```json
{
  "message": "Invalid action type."
}
```

### 2. Execute Action from Queue

**Endpoint:** `POST /execute-action`

**Description:** Executes the first available action in the queue, reducing the corresponding credit value.

**Response (Success):**

```json
{
  "message": "Action executed.",
  "action": {
    "id": 1,
    "type": "A"
  }
}
```

**Response (Error - Empty Queue):**

```json
{
  "message": "Queue is empty."
}
```

**Response (Error - Insufficient Credits):**

```json
{
  "message": "No enough credits to execute actions in the queue."
}
```

### 3. Get Queue Status

**Endpoint:** `GET /queue-status`

**Description:** Retrieves the current status of the action queue and available credits.

**Response (Success):**

```json
{
  "queue": [
    {
      "id": 1,
      "type": "A"
    },
    {
      "id": 2,
      "type": "B"
    }
  ],
  "credits": [
    {
      "type": "A",
      "value": 3,
      "lastUpdated": "2023-11-14T12:00:00Z",
      "maxCredits": 5
    },
    {
      "type": "B",
      "value": 8,
      "lastUpdated": "2023-11-14T12:00:00Z",
      "maxCredits": 10
    },
    {
      "type": "C",
      "value": 10,
      "lastUpdated": "2023-11-14T12:00:00Z",
      "maxCredits": 10
    }
  ]
}
```

### 4. Get Available Credits

## Credit Endpoints
For credits, the base URL is http://localhost:3030/credit/.

**Endpoint:** `GET /`

**Description:** Retrieves the available credits for each action type.

**Response (Success):**

```json
[
  {
    "type": "A",
    "value": 3,
    "lastUpdated": "2023-11-14T12:00:00Z",
    "maxCredits": 5
  },
  {
    "type": "B",
    "value": 8,
    "lastUpdated": "2023-11-14T12:00:00Z",
    "maxCredits": 10
  },
  {
    "type": "C",
    "value": 10,
    "lastUpdated": "2023-11-14T12:00:00Z",
    "maxCredits": 10
  }
]
```

## Credits Management

### 1. Initialize Credits

**Endpoint:** `GET /initialize-credits`

**Description:** Initializes the credits based on the provided action types.

**Response (Success):**

```json
[
  {
    "type": "A",
    "value": 4,
    "lastUpdated": "2023-11-14T12:00:00Z",
    "maxCredits": 5
  },
  {
    "type": "B",
    "value": 9,
    "lastUpdated": "2023-11-14T12:00:00Z",
    "maxCredits": 10
  },
  {
    "type": "C",
    "value": 8,
    "lastUpdated": "2023-11-14T12:00:00Z",
    "maxCredits": 10
  }
]
```

### 2. Update Credits

**Endpoint:** `POST /update-credits`

**Description:** Updates the credits based on the provided action types.

**Request:**

```json
{
  "actionTypes": [
    { "type": "A", "maxCredits": 5 },
    { "type": "B", "maxCredits": 10 },
    { "type": "C", "maxCredits": 10 }
  ]
}
```

**Response (Success):**

```json
{
  "message": "Credits updated successfully."
}
```

**Response (Error):**

```json
{
  "message": "Failed to update credits."
}
```
