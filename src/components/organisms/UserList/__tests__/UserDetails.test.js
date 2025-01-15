import { render, screen, waitFor } from '@testing-library/react';
import UserDetails from '../UserDetails';

const mockUser = {
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
};

describe('UserDetails Component', () => {
  const renderUserDetails = async (props) => {
    const utils = render(<UserDetails {...props} />);
    
    // Wait for initial render
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
    
    return utils;
  };

  it('should render all user details correctly', async () => {
    await renderUserDetails({ user: mockUser });
    
    // Check name header
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check all fields are rendered
    const expectedFields = [
      { label: 'Email', value: 'john@example.com' },
      { label: 'Phone', value: '1234567890' },
      { label: 'Company', value: 'Test Company' },
      { label: 'Department', value: 'IT' },
      { label: 'Title', value: 'Developer' },
      { label: 'Address', value: '123 Street, Test City' }
    ];

    expectedFields.forEach(({ label, value }) => {
      expect(screen.getByText(`${label}:`)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
}); 