import PlaidProvider from './state/plaid/PlaidProvider';
import Dashboard from './containers/dashboard';
import { AuthProvider } from './state/Auth/AuthProvider';
import AuthWrapper from './state/AuthWrapper';
import { useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { useEffect } from 'react';

function App() {

  return (
    <div className="App">
      <PlaidProvider>
        <AuthWrapper>
          <Dashboard />
        </AuthWrapper>
      </PlaidProvider>
    </div>
  );
}

export default App;
