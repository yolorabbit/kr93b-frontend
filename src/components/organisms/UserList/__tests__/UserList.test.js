import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserList from '../index';
import usersReducer from 'store/users/slice';
import { api } from 'api/config';

const mockUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    company: {
      name: 'Test Company',
      department: 'IT',
      title: 'Developer',
      address: {
        address: '123 Street',
        city: 'Test City'
      }
    }
  }
];

const renderWithProvider = async (ui, store) => {
  const utils = render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
  
  // Wait for initial render and state updates
  await waitFor(() => {
    expect(document.body).toBeTruthy();
  });
  
  return { ...utils, store };
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      users: usersReducer
    },
    preloadedState: {
      users: {
        users: mockUsers,
        status: 'succeeded',
        error: null,
        searchTerm: '',
        ...initialState
      }
    }
  });
};

describe('UserList Component', () => {
  beforeEach(() => {
    const mockResponse = {
      data: {
        users: mockUsers,
        total: 1,
        skip: 0,
        limit: 10
      }
    };
    api.get.mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render users table with all users', async () => {
    const store = createMockStore();
    await renderWithProvider(<UserList />, store);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('should open modal when clicking user row', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    await renderWithProvider(<UserList />, store);

    await user.click(screen.getByText('John Doe'));
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('should fetch users on mount when status is idle', async () => {
    const store = createMockStore({ status: 'idle' });
    await renderWithProvider(<UserList />, store);

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/users');
  });

  it('should show loading state', async () => {
    const store = createMockStore({ status: 'loading' });
    await renderWithProvider(<UserList />, store);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error state', async () => {
    const store = createMockStore({ 
      status: 'failed',
      error: 'Failed to fetch users'
    });
    await renderWithProvider(<UserList />, store);

    expect(screen.getByText('Error: Failed to fetch users')).toBeInTheDocument();
  });
}); 