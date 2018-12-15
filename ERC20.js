const ethers = require('ethers');
const fs = require('fs');
const util = require('util');
const readFile =util.promisify(fs.readFile);

const provider = ethers.getDefaultProvider('rinkeby');
const mnemonic1 = 'utility opinion husband upset finger side round exhaust arm allow pilot hospital';
const _wallet = ethers.Wallet.fromMnemonic(mnemonic1);
const wallet = _wallet.connect(provider);

const createERC20 = async () => {
  // 读取编译完成的文件。
  const file = await readFile('./erc20/build/contracts/MyToken.json',{encoding: 'utf8'})  ;
  const obj = JSON.parse(file);
  const abi = obj.abi;
  const bytecode= obj.bytecode;
  // console.log(abi);
  // console.log(bytecode);


  let factory = new ethers.ContractFactory(abi, bytecode, wallet);
  let contract = await factory.deploy();
  return contract.deployed()

};

// 运行后如果显示一大串信息，并且有交易哈希，则表示运行成功
// 运行结果中，找到合约地址为 0x13f60906DE3758F025cdA95899d3742DC60C24A4
// createcreateToken().then(result=>console.log('result: ',result)).catch(err=>console.log('err: ',err));

// ERC20 转账

const transferERC20 = async () => {
  const file = await readFile('./erc20/build/contracts/MyToken.json',{encoding: 'utf8'})  ;
  const obj = JSON.parse(file);
  const abi = obj.abi;
  const contractAddress = '0x13f60906DE3758F025cdA95899d3742DC60C24A4';
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const decimals = await contract.decimals();
  const name = await contract.name();
  const totalSupply =  await contract.totalSupply();
  const symbol = await contract.symbol();
  console.log('name: ',name);
  console.log('symbol: ',symbol) ;
  console.log('decimals: ',decimals) ;
  console.log('totalSupply: ',ethers.utils.formatUnits(totalSupply, decimals)) ;
  
  // 合约签名
  const contractWithSigner = contract.connect(wallet);
  const amount = '10';
  // 数字序列化
  const numberOfTokens = ethers.utils.parseUnits(amount, decimals);
  // 发起转账
  const tx = await contractWithSigner.transfer('0xbe79D5B66A5D44607F91E312ec5E35b8c92db5bf', numberOfTokens);
  await tx.wait();
  console.log('hash',tx.hash);

  // 查询余额
  const _balance = await contract.balanceOf('0xbe79D5B66A5D44607F91E312ec5E35b8c92db5bf');
  // 数字反序列化
  const balance = ethers.utils.formatUnits(_balance, decimals);
  console.log('balance: ',balance, symbol)

};


transferERC20().catch(console.log);
