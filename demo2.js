const ethers = require('ethers');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const provider = ethers.getDefaultProvider('rinkeby');
const contractAddress = '0x5Dbcdb3d61Bf83d5Fb6C926F23717A0138f536d9';

const listening = async ()=> {
  const abi = await readFile('./contracts/SimpleStorage_sol_SimpleStorage.abi',{encoding: 'utf8'});
  const contract = new ethers.Contract(contractAddress, abi, provider);

// 监听合约的事件，
  contract.on("ValueChanged", (author, oldValue, newValue, event) => {
    // Called when anyone changes the value

    console.log('author', author);
    // "0x14791697260E4c9A71f18484C9f997B308e59325"

    console.log('oldValue', oldValue);
    // "Hello World"

    console.log('newValue', newValue);
    // "Ilike turtles."

    // See Event Emitter below for all properties on Event
    console.log('blockNumber', event.blockNumber);
    // 4115004
  });
};

listening().catch(console.log);

