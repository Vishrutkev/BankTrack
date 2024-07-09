"use client";
import GenerateLinkToken from './component/Link/GenerateLinkToken';
import LaunchLink from './component/Link/LaunchLink';
import PlaidProvider from './state_management/plaid/PlaidProvider';

function App() {

  return (
    <div className="App">
      <PlaidProvider>
        <GenerateLinkToken />
        <LaunchLink />
      </PlaidProvider>
    </div>
  );
}

export default App;
