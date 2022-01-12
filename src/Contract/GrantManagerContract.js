import abi from './grantManagerAbi.json';
import config from './config';
import { ethers } from 'ethers';

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
        //const dai = ethers.utils.parseUnits(amount, 18);
        const options = {value: ethers.utils.parseEther(amount)}
        const tx = await this.signedContract.createGrant(owner, [0, data], options);

        return tx;
    }

    async fulfillGrant(id, payee) {
        const tx = await this.signedContract.fulfillGrant(id, payee);

        return tx;
    }
}

export default GrantManagerContract;