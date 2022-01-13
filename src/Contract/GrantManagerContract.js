import abi from './grantManagerAbi.json';
import config from './config';
import { ethers } from 'ethers';
import * as IPFS from '../Utils/IpfsUtils';

class GrantManagerContract {
    constructor(provider) {
        this.contract = new ethers.Contract(
            config.contractAddress, 
            abi, 
            provider
        );
        const signer = provider.getSigner();
        this.signedContract = this.contract.connect(signer);
    }

    async getAllGrants() {
        const grants = await this.contract.getAllGrants();
        return grants;
    }

    async createGrant(owner, data, amount) {
        // const dai = ethers.utils.parseUnits(amount, 18);
        // TODO 3: Upload data to IPFS and get the hash and call API endpoint
        IPFS.ipfsConnect();
        const hash = IPFS.ipfsUpload(data);
        const options = {value: ethers.utils.parseEther(amount)}
        const tx = await this.signedContract.createGrant(owner, [hash, data], options);

        // hit end point to pinning service
        return tx;
    }

    async fulfillGrant(id, payee) {
        const tx = await this.signedContract.fulfillGrant(id, payee);

        return tx;
    }
}

export default GrantManagerContract;