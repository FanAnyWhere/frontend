import Compressor from 'compressorjs'
import nftABI from '../contracts/abis/nft.json'
import escrowABI from '../contracts/abis/escrow.json'
import getContractAddresses from '../contracts/addresses'
import { web3 } from '../web3'


export async function compressImage(image) {
  return new Promise((resolve, reject) => {
    try {
      new Compressor(image, {
        quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          resolve(compressedResult);
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
        },
      });
    } catch {
      reject(undefined);
    }
  });
}

export function getContractInstance(isEscrow) {
  const { nftContractAddress, escrowContractAddres } = getContractAddresses();
  const currentaddress = isEscrow ? escrowContractAddres : nftContractAddress;
  const currentABI = isEscrow ? escrowABI : nftABI;
  try {
    if (web3) {
      const contractInstance = new web3.eth.Contract(
        currentABI,
        currentaddress
      );
      return contractInstance;
    }
  } catch (error) {
    // console.log(error);
  }
}


export function getNFTTime(timeline, history=false) {
  let data
  if (!history) {
    data = new Intl.DateTimeFormat('en-US', 
      { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', 
      // second: '2-digit' 
    }).format(timeline)
  } else {
    data = new Intl.DateTimeFormat('en-US', 
    { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', 
    // second: '2-digit' 
  }).format(new Date(timeline))
  }
  return data
}