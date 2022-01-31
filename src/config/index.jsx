import axios from 'axios';

// backend api url
export const api = axios.create({
  // baseURL: 'http://localhost:4000/api/v1', // Local system url
  baseURL: 'http://ec2-18-191-95-183.us-east-2.compute.amazonaws.com:4000/api/v1', // Server url 
});

// web3 data for polygon(mumbai) testnet & contract details
export const contract_type = 'ERC 115';
export const chainId = 80001;
export const chainIdHex = '0x13881';
export const rpcUrls = 'https://matic-mumbai.chainstacklabs.com';
export const currency_symbol = 'MATIC';
export const network_name = 'Polygon Testnet'
export const transactionLink = 'https://mumbai.polygonscan.com/tx';
export const explorerLinks = 'https://mumbai.polygonscan.com';

// share on social media content 
export const socialText = 'Check profile with FAW'
export const hashTag = '#FanAnyWhere'
