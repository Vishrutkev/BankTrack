import PlaidProvider from './state/plaid/PlaidProvider';
import ConnectToBank from './containers/plaid/ConnectToBank';

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
