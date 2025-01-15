# User Management Application

A React application that lists and searches users using the DummyJSON API. The application features a dark theme UI with a responsive design.

## Features

- View list of users in a table format
- Search users by name
- View detailed user information in a modal
- Dark theme UI
- Responsive design

## Tech Stack

- React
- Redux Toolkit for state management
- Tailwind CSS for styling
- Axios for API calls
- Jest & React Testing Library for testing

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run tests:
```bash
npm test
```

## Testing

The project uses Jest and React Testing Library for component testing. Tests are located in `__tests__` directories next to the components they test.

### Running Tests
```bash
npm test
```

### Test Structure

- `UserList.test.js`: Tests for the main user list component
  - Rendering users table
  - Search functionality
  - Modal interaction

## Component Documentation

### UserList
The main component that displays the user table and handles search functionality.

Props: None

Features:
- Displays users in a table format
- Implements search functionality
- Opens modal with user details on row click

### Modal
A reusable modal component for displaying content in an overlay.

Props:
- `isOpen`: Boolean to control modal visibility
- `onClose`: Function to handle modal close
- `children`: React nodes to render inside modal

## State Management

Uses Redux Toolkit with the following slices:

### Users Slice
- `users`: Array of user objects
- `status`: API call status ('idle', 'loading', 'succeeded', 'failed')
- `error`: Error message if API call fails
- `searchTerm`: Current search term for filtering users

## License

This project is licensed under the MIT License.