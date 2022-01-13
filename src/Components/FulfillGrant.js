import React, { useState } from "react";

const FulfillGrant = ({contract}) => {

  const [grantId, setGrantId] = useState('');
  const [payeeAddress, setPayeeAddress] = useState('');

  const [loading, setLoading] = useState(false);

  const fulfillGrant = async () => {
    setLoading(true);
    if (payeeAddress == '' || grantId == '') {
      setLoading(false);
      return;
    }
    const a = await contract.fulfillGrant(grantId, payeeAddress);
    console.log(a);

    setLoading(false);
    setPayeeAddress('');
    setGrantId('');
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="row">
        <b>Fulfill Grant</b>
      </div>
      <div className="row">
        <div>Grant ID</div>
        <input 
          value={grantId} 
          onChange={e => setGrantId(e.target.value)} 
          type="text" 
        />
      </div>

      <div className="row">
        <div>Payee Address</div>
        <input 
          value={payeeAddress} 
          onChange={e => setPayeeAddress(e.target.value)} 
          type="text" 
        />
      </div>

      <button disabled={loading} onClick={() => fulfillGrant()}>fulfill grant</button>
    </div>
  );
};

export default FulfillGrant;
