import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure longer timeout for async operations
configure({ 
  asyncUtilTimeout: 5000,
  // Disable error boundary warnings
  suppressErrorBoundary: true
});

// Setup axios mock
jest.mock('axios', () => ({
  get: jest.fn(),
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  })),
  defaults: {
    headers: {
      common: {}
    }
  }
}));
