import PlaidProvider from './state/plaid/PlaidProvider';
import ConnectToBank from './containers/plaid/ConnectToBank';
import SignIn from './containers/SignIn';
import { createTheme } from '@mui/material';
import { useState } from 'react';
import ToggleTheme from './component/toggleThemeProvider';

function App() {

  return (
    <div className="App">
      <PlaidProvider>
        {/* <ConnectToBank /> */}
        <SignIn />
      </PlaidProvider>
    </div >
  );
}

export default App;
