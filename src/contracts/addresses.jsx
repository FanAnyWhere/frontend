import { services } from '../../services';
let networkId = 1;
async function fetchNetworkId() {
  networkId = await services.getNetworkId();
}
fetchNetworkId();

function getContractAddresses() {
  if (networkId === '0x4' || +networkId === 4)
    return {
      nftContractAddress: '0x1591D2cbC71f5E05c90a0081215d7a197B3f1ED1',
    };
  else if (+networkId === 1 || networkId === '0x1')
    return {
      nftContractAddress: '0x1591D2cbC71f5E05c90a0081215d7a197B3f1ED1',
    };
  else  
    return {
      nftContractAddress: '0x1591D2cbC71f5E05c90a0081215d7a197B3f1ED1',
    };
}
export default getContractAddresses;


function getEscrowAddresses() {
  if (networkId === '0x4' || +networkId === 4)
    return {
      nftEscrowAddresses: '0x41460b509f588bD1D40253e48B2078322a99790A',
    };
  else if (+networkId === 1 || networkId === '0x1')
    return {
      nftEscrowAddresses: '0x41460b509f588bD1D40253e48B2078322a99790A',
    };
  else  
    return {
      nftEscrowAddresses: '0x41460b509f588bD1D40253e48B2078322a99790A',
    };
}
export default getEscrowAddresses;