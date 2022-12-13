

let login = async () => {
    // const provider = web3.currentProvider
    // await provider.send("eth_requestAccounts", []);
    // return provider
}


let sign = async (provider, msg) => {

    const signer = provider.getSigner()
    return await signer.signMessage(msg);

}
export {login, sign}
