const ethers = require('ethers');
const provider = ethers.getDefaultProvider('rinkeby');

// 部署合约
const abi = [
  "event ValueChanged(address indexed author, string oldValue, string newValue)",
  "constructor(string value)",
  "function getValue() view returns (string value)",
  "function setValue(string value)"
];

const contractAddress = '0x68296E63109030f602cC2D641E088fde1b2Cb055';
const contract = new ethers.Contract(contractAddress, abi, provider);

// 监听合约的事件，
contract.on("ValueChanged", (author, oldValue, newValue, event) => {
  // Called when anyone changes the value

  console.log(author);
  // "0x14791697260E4c9A71f18484C9f997B308e59325"

  console.log(oldValue);
  // "Hello World"

  console.log(newValue);
  // "Ilike turtles."

  // See Event Emitter below for all properties on Event
  console.log(event.blockNumber);
  // 4115004
});
