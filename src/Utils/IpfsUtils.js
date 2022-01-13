import * as IPFS from 'ipfs-core'

let ipfs;

export const ipfsConnect = async () => {
    try {
        if (ipfs == null)
            ipfs = await IPFS.create();
            console.log(ipfs);
    } catch (error) {
        console.log(error);
    }
}

export const ipfsUpload = async (data) => {
    if (ipfs != null) {
        const { cid } = await ipfs.add(data, {cidVersion: 1});
        console.info(cid);
        return cid;
    } else return null;
}