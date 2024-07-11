"use client";
import { useContext } from 'react';
import RenderTransactions from './containers/plaid/GenerateTransactions';
import GenerateLinkToken from './containers/plaid/GenerateLinkToken';
import LaunchLink from './containers/plaid/LaunchLink';
import PlaidProvider from './state/plaid/PlaidProvider';
import PlaidLinkContext from './state/plaid/plaidLinkContext';
import ConnectToBank from './containers/plaid/ConnectToBank';

function App() {
  const { linkSuccess, isItemAccess, isPaymentInitiation } = useContext(PlaidLinkContext);
  return (
    <div className="App">
      <PlaidProvider>
        <ConnectToBank />
      </PlaidProvider>
    </div >
  );
}

export default App;
