# Web App FIFO Queue

This is a web application that implements a First-In-First-Out (FIFO) queue system. The project is built using Node.js, TypeScript, and React. Axios is used for API calls to interact with the backend.

## Project Structure

### Backend

- **Server.ts:** Entry point for the Node.js server.
  
- **routes folder:** Contains route definitions for the API endpoints.

- **model folder:** Includes data models and structures.

### Client

- **index.js:** Entry point for the React application.

- **Components folder:** Contains React components for the user interface.

- **services folder:** Houses services for making API calls using Axios.

- **styles folder:** Holds styling files for the React components.

## Running the Project

To run the project locally, navigate to the root folder and execute the following commands:

```bash
npm install        # Install project dependencies
npm run start      # Start the server and the React application
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).
The server will run on the port 3030.

## Running Tests

Tests for both the backend and the client are implemented using Jest. To run the tests, use the following command:

```bash
npm run test       # Run Jest tests
```

## Development

For development, you can use the following command to start the server and the React application with hot-reloading:

```bash
npm run dev        # Start the server and React application with hot-reloading
```

# API Documentation

[Web App FIFO Queue](backend/API.md) - Link to API Documentation

