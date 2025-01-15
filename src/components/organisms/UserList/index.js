import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearchTerm } from 'store/users/slice';
import Modal from 'components/common/Modal';
import { TABLE_HEADERS } from 'utils/constants';
import { formatUserName } from 'utils/helpers';
import UserDetails from './UserDetails';

function UserList() {
  const dispatch = useDispatch();
  const { users, status, error, searchTerm } = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const filteredUsers = users.filter((user) =>
    formatUserName(user.firstName, user.lastName)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') return <div className="flex items-center justify-center min-h-screen text-gray-200">Loading...</div>;
  if (status === 'failed') return <div className="flex items-center justify-center min-h-screen text-red-400">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Users List</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg shadow-xl bg-gray-800 border border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{TABLE_HEADERS.NAME}</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{TABLE_HEADERS.EMAIL}</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{TABLE_HEADERS.PHONE}</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{TABLE_HEADERS.COMPANY}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="hover:bg-gray-700 cursor-pointer transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                    {formatUserName(user.firstName, user.lastName)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)}>
        {selectedUser && <UserDetails user={selectedUser} />}
      </Modal>
    </div>
  );
}

export default UserList; 