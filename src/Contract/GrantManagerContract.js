import abi from "./grantManagerAbi.json";
import config from "./config";
import { ethers } from "ethers";
import { create } from 'ipfs-http-client';

class GrantManagerContract {
  constructor(provider) {
    this.contract = new ethers.Contract(config.contractAddress, abi, provider);
    const signer = provider.getSigner();
    this.signedContract = this.contract.connect(signer);
    this.client = create('https://ipfs.infura.io:5001/api/v0');
  }

  async getAllGrants() {
    const grants = await this.contract.getAllGrants();
    return grants;
  }

  async createGrant(owner, data, amount) {
    // const dai = ethers.utils.parseUnits(amount, 18);
    // TODO 3: Upload data to IPFS and get the hash and call API endpoint

    const added = await this.client.add(data, {onlyHash: true});
    console.log(added);
    const hash = added.path;
    console.log(hash.toString());
    console.log(owner);

    const options = { value: ethers.utils.parseEther(amount) };
    const tx = await this.signedContract.createGrant(
      owner,
      [0, hash.toString()],
      options
    );

    // hit end point to pinning service (hash + data + tx)
    return tx;
  }

  async fulfillGrant(id, payee) {
    const tx = await this.signedContract.fulfillGrant(id, payee);

    return tx;
  }
}

export default GrantManagerContract;
