export const metamaskConnect = async (provider, setAddress, setError) => {
  try {
    if (window.ethereum) {
      try {
        const req = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(req);

        const signer = provider.getSigner();
        console.log(signer);

        const address = await signer.getAddress();
        console.log(address);

        setAddress(address);
      } catch (error) {
        console.log(error);
        if (error.code === 4001) {
          alert('user cancelled transaction');
        }

        setError('Error connecting to metamask');
      }
    }
  } catch (ex) {
    console.log(ex)
  }
}

export const metamaskHandleAddressChangeListener = (address, handleAddressChange) => {
  if (address != null) {
    // console.log('add listener')
    window.ethereum.on('accountsChanged', handleAddressChange);
  } else {
    // console.log('remove listener')
    window.ethereum.removeListener('accountsChanged', handleAddressChange);
  }

  return () => window.ethereum.removeListener('accountsChanged', handleAddressChange);
}

export const metamaskHandleAddressChange = (accounts, setAddress) => {
  if (accounts.length) {
    setAddress(accounts[0]);
  }
  else {
    setAddress(null);
  }
}