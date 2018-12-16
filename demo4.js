const ethers = require('ethers');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const mnemonic1 = 'utility opinion husband upset finger side round exhaust arm allow pilot hospital';
const _wallet1 = ethers.Wallet.fromMnemonic(mnemonic1);
let provider = ethers.getDefaultProvider('rinkeby');
const wallet1 = _wallet1.connect(provider);

const deploy = async () => {
  const bytecode = await readFile('./contracts/SimpleStorage_sol_SimpleStorage.bin',{encoding: 'utf8'});
  const abi = await readFile('./contracts/SimpleStorage_sol_SimpleStorage.abi',{encoding: 'utf8'});
  let factory = new ethers.ContractFactory(abi, bytecode, wallet1);
  let contract = await factory.deploy("Hello World");
  console.log('contract.address',contract.address);
  await contract.deployed();
  console.log('hash',contract.deployTransaction.hash);
};

// deploy();

const contractAddress = '0xa85a627c7ea7bF5c1F92B922362A31fE57A4841e';

module.exports = contractAddress;

const getContractValue = async () => {
  const abi = await readFile('./contracts/SimpleStorage_sol_SimpleStorage.abi',{encoding: 'utf8'});
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const currentValue = await contract.getValue();
  console.log(currentValue);
};

// getContractValue();

const setContractValue = async (value) => {
  const abi = await readFile('./contracts/SimpleStorage_sol_SimpleStorage.abi',{encoding: 'utf8'});
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const currentValue = await contract.getValue();
  console.log('currentValue', currentValue);

  const contractWithSigner = contract.connect(wallet1);
  const tx = await contractWithSigner.setValue(value);
  console.log('tx.hash',tx.hash);
  await tx.wait();

  const netValue = await contract.getValue();
  console.log('netValue', netValue);

};

setContractValue('KKKK').catch();
