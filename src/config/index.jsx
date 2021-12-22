import axios from 'axios';

// backend api url
export const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
});

// web3 data for polygon(mumbai) testnet
export const chainId = 80001;
export const chainIdHex = '0x13881';
export const rpcUrls = 'https://rpc-mumbai.maticvigil.com';
export const currency_symbol = 'MATIC';
export const network_name = 'Polygon Testnet'