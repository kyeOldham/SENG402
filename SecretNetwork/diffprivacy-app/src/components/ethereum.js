import { ethers } from 'ethers';

const ethFunctions = {
  async startPayment({ether, addr}) {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });
      console.log({ ether, addr });
      console.log("tx", tx);
    } catch (err) {
      console.log("Error sending eth");
    }
  },

  async checkBalance(address){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let balance = await provider.getBalance(address);
    return ethers.utils.formatUnits(balance, "ether")
  }

}

export default ethFunctions;