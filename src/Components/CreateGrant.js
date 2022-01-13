import React from "react";
import { useState } from "react/cjs/react.development";

const CreateGrant = ({address, contract}) => {

  const [ownerAddress, setOwnerAddress] = useState('');
  const [grantDetails, setGrantDetails] = useState('');
  const [grantAmount, setGrantAmount] = useState('');

  const [loading, setLoading] = useState(false);

  const createGrant = async () => {
    setLoading(true);
    if (ownerAddress == '' || grantDetails == '' || grantAmount == '') {
      setLoading(false);
      return;
    }
    const txn = await contract.createGrant(ownerAddress, grantDetails, grantAmount);
    const result = await txn.wait();
    console.log(result);

    setLoading(false);
    setOwnerAddress('');
    setGrantDetails('');
    setGrantAmount('');
  };

  

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="row">
        <b>Create Grant</b>
      </div>
      <div className="row">
        <div>Owner address</div>
        <input 
          value={ownerAddress} 
          onChange={e => setOwnerAddress(e.target.value)} 
          type="text" 
        />
        <button onClick={() => setOwnerAddress(address)}>Use self metamask address</button>
      </div>

      <div className="row">
        <div>Grant details</div>
        <input 
          value={grantDetails} 
          onChange={e => setGrantDetails(e.target.value)} 
          type="text" 
        />
      </div>

      <div className="row">
        <div>Grant amount</div>
        <input
          value={grantAmount} 
          onChange={e => setGrantAmount(e.target.value)} 
          type="number" 
        />
        <div>eth</div>
      </div>

      <button disabled={loading} onClick={() => createGrant()}>create grant</button>
    </div>
  );
};

export default CreateGrant;
