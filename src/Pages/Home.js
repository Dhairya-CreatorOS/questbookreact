import React from "react";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../Components/MetamaskConnector";

const Home = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {active ?
        <>
          <span>Connected with <b>{account}</b></span>
          <button onClick={disconnect}>Disconnect</button>
        </> : 
        <>
          <span>Not connected</span>
          <button onClick={connect}>Connect to MetaMask</button>
        </>
      }
      
    </div>
  );
}

export default Home;