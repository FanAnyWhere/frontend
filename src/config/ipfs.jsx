//using the infura.io node, otherwise ipfs requires you to run a daemon on your own computer/server. See IPFS.io docs
const ipfsHttpClient = require('ipfs-http-client');
const ipfs = ipfsHttpClient.create({
  url: 'https://ipfs.infura.io:5001/api/v0/',
});

export default ipfs;
