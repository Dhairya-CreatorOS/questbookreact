import React, { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  metamaskConnect, 
  metamaskHandleAddressChange, 
  metamaskHandleAddressChangeListener,
} from "../Utils/MetamaskUtils";
import GrantManagerContract from "../Contract/GrantManagerContract";
import GrantManagerSubgraph from "../Contract/GrantManagerSubgraph";

const Home = () => {
  
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider)
    if (provider != null) {
      setProvider(provider);
    } else {
      setError('Web3 provider unavailable');
    }
  }, []);

  const [address, setAddress] = useState(null);
  const connectMetamask = async () => metamaskConnect(provider, setAddress, setError);
  const handleAddressChange = useCallback(
    (accounts) => metamaskHandleAddressChange(accounts, setAddress), 
    [setAddress]
  );
  useEffect(
    () => metamaskHandleAddressChangeListener(address, handleAddressChange), 
    [address, handleAddressChange]
  );

  const [contract, setContract] = useState(null);
  useEffect(() => {
    if (provider == null) return
    const contract = new GrantManagerContract(provider);
    setContract(contract);
  }, [provider]);

  const [subgraph, setSubgraph] = useState(null);
  useEffect(() => {
    const subgraph = new GrantManagerSubgraph();
    setSubgraph(subgraph);
  }, []);

  const getGrantsCount = async() => {
    const count = await subgraph.getGrantsCount();
    console.log(count);
  }

  const getGrants = async() => {
    const a = await contract.getAllGrants();
    console.log(a);
  }

  const createGrant = async() => {
    const a = await contract.createGrant(address, "data", "0.002");
    console.log(a);
  }

  const fulfillGrant = async() => {
    const a = await contract.fulfillGrant(0, "0x43Cb32825f0A1CBaC2fd6B11a18f46aa81D142f4");
    console.log(a);
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {error}
      </div>
    )
  }

  if (provider == null) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        loading
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {address == null ?
        <button onClick={connectMetamask}>Connect to MetaMask</button>
        :
        <>
        {address}
        <button onClick={() => setAddress(null)}>disconnect</button>
        </>
      }

      <br />
      <br />

      <div>Contract</div>

      {contract == null ? 
        <div>connecting to contract</div>
        :
        <>
        <div>{contract.address}</div>
        <button onClick={() => getGrantsCount()}>get number grants</button>
        <button onClick={() => getGrants()}>get all grants</button>
        <button onClick={() => createGrant()}>create grant</button>
        <button onClick={() => fulfillGrant()}>fulfill grant</button>
        </>
      }

    </div>
  );
}

export default Home;