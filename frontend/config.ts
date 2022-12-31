import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

export const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK ||
  WalletAdapterNetwork.Devnet) as WalletAdapterNetwork;
// const network = WalletAdapterNetwork.Devnet;

export const rpcHost =
  process.env.NEXT_PUBLIC_QUICKNODE_RPC_HOST || clusterApiUrl(network);


export const defaultGuardGroup =
  process.env.NEXT_PUBLIC_DEFAULT_GUARD_GROUP || undefined; // undefined means default

export const bundlrAddress = 
  process.env.NEXT_PUBLIC_BUNDLR_ADDRESS || 'https://devnet.bundlr.network';