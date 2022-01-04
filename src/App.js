import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import './App.css';
import Home from './Pages/Home';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider)
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <Home />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
