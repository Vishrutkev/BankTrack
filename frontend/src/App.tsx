import PlaidProvider from './state/plaid/PlaidProvider';
import ConnectToBank from './containers/plaid/ConnectToBank';
import SignIn from './containers/SignIn';
import { createTheme } from '@mui/material';
import { useState } from 'react';
import ToggleTheme from './component/toggleThemeProvider';
import AuthWrapper from './state/AuthWrapper';

function App() {

  return (
    <div className="App">
      <PlaidProvider>
        <ConnectToBank />
      </PlaidProvider>
    </div >
  );
}

export default App;
