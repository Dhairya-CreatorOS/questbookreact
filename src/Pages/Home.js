import React, { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  metamaskConnect,
  metamaskHandleAddressChange,
  metamaskHandleAddressChangeListener,
} from "../Utils/MetamaskUtils";
import GrantManagerContract from "../Contract/GrantManagerContract";
import GrantManagerSubgraph from "../Contract/GrantManagerSubgraph";
import { Fragment } from "react/cjs/react.production.min";

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

  const getGrantsCount = async () => {
    const count = await subgraph.getGrantsCount();
    console.log(count);
  }

  const [grants, setGrants] = useState([]);
  const getAllGrants = async () => {
    const grantsData = await subgraph.getAllGrants();
    const _grants = grantsData['data']['grants']
    console.log(_grants);

    console.log(_grants.length);
    console.log(typeof _grants);
    console.log(_grants[0]);

    setGrants([]);
    let arr = [];
    for (let i = 0; i < grants.length; ++i) arr.push(grants[i]);
    for (let i = 0; i < _grants.length; ++i) arr.push(_grants[i]);
    setGrants(arr);
    // _grants.push.apply(_grants, grants);
    // setGrants(_grants);
    // console.log(grants);
  }
  // useEffect(() => {
  //   getAllGrants();
  // }, [subgraph]);

  const createGrant = async () => {
    const a = await contract.createGrant(address, "data", "0.002");
    console.log(a);
  }

  const fulfillGrant = async () => {
    const a = await contract.fulfillGrant(1, "0x43Cb32825f0A1CBaC2fd6B11a18f46aa81D142f4");
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
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%', height: '100%' }}>
        {/* TODO 1: Fetch and display all grants from the graph */}
        {grants.map((grant, i) => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <text>Grant ID - {grant['id']}</text>
          <text>Grant Data - {grant['data']}</text>
          <text>Grant Owner - {grant['owner']}</text>
          <text>Grant Payee - {grant['payee'] == '' ? 'Grant not completed' : grant['payee']}</text>
          <text>Grant amount - {grant['amount'] / (1e18)} ETH</text>
          <br />
        </div>)}
        <button onClick={() => getAllGrants()}>load more</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%', height: '100%' }}>
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
            {/* TODO 2: Create text boxes for these */}
            <button onClick={() => createGrant()}>create grant</button>
            <button onClick={() => fulfillGrant()}>fulfill grant</button>
          </>
        }

      </div>
    </div>
  );
}

export default Home;