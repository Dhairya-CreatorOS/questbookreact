import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import './App.css';
import Home from './Pages/Home';
import IPFS from './Pages/IPFS';
import App2 from './Pages/IPFS_eg';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider)
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
        <App2></App2>
    </Web3ReactProvider>
  );
}

export default App;
