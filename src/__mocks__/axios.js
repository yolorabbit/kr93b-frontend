const mockAxios = {
  get: jest.fn(() => Promise.resolve({ 
    data: {
      users: [
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
      ],
      total: 1,
      skip: 0,
      limit: 10
    }
  })),
  defaults: {
    headers: {
      common: {}
    }
  }
};

export default mockAxios; 