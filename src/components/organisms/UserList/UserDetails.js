import React from 'react';
import { formatUserName } from 'utils/helpers';

function UserDetails({ user }) {
  if (!user) return null;

  const getCompanyInfo = (field) => {
    if (!user.company) return 'N/A';
    return user.company[field] || 'N/A';
  };

  const getAddress = () => {
    if (!user.company || !user.company.address) return '';
    const { address, city } = user.company.address;
    return `${address || ''}${address && city ? ', ' : ''}${city || ''}`;
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">
          {formatUserName(user.firstName, user.lastName)}
        </h2>
      </div>
      <div className="space-y-4">
        {[
          { label: 'Email', value: user.email, testId: 'email-value' },
          { label: 'Phone', value: user.phone, testId: 'phone-value' },
          { label: 'Company', value: getCompanyInfo('name'), testId: 'company-value' },
          { label: 'Department', value: getCompanyInfo('department'), testId: 'department-value' },
          { label: 'Title', value: getCompanyInfo('title'), testId: 'title-value' },
          { label: 'Address', value: getAddress(), testId: 'address-value' }
        ].map(({ label, value, testId }) => (
          <div key={label} className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-400">{label}:</dt>
            <dd className="text-sm text-gray-200 col-span-2" data-testid={testId}>
              {value || 'N/A'}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDetails; 