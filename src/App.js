import { Provider } from 'react-redux';
import UserList from 'components/organisms/UserList';
import { store } from 'store';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-900">
        <UserList />
      </div>
    </Provider>
  );
}

export default App;
