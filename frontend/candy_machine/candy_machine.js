import { Keypair } from "@solana/web3.js";

const isPhantomInstalled = window.phantom?.solana?.isPhantom;

const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open('https://phantom.app/', '_blank');
};

const provider = getProvider(); // see "Detecting the Provider"
try {
    const resp = await provider.connect();
    console.log(resp.publicKey.toString());
   
} catch (err) {
    // { code: 4001, message: 'User rejected the request.' }
}

const myCustomAuthority = Keypair.generate();
const candyMachineSettings = {
  authority: myCustomAuthority,
};
