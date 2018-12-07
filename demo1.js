const ethers = require('ethers');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// const randomWallet = ethers.Wallet.createRandom();
// console.log( randomWallet.signingKey.mnemonic);

// 助记词由以上随机函数生成，为了保持账号统一，这里记录了两组助记词
const mnemonic1 = 'utility opinion husband upset finger side round exhaust arm allow pilot hospital';
const mnemonic2 = 'method expand rule tool impact wedding just body slogan offer rate pass';

// 根据两组助记词生成两个钱包对象
const _wallet1 = ethers.Wallet.fromMnemonic(mnemonic1);

// address1 0xBe255696870b84C69F6e2b902177Cf2a2cB57B58
// privateKey1 0x056ef7c6a165f877a5aedb3cfe24b2bbcdd6c680d12df9a82092705fc03ce37f

const _wallet2 = ethers.Wallet.fromMnemonic(mnemonic2);
// address2 0xbe79D5B66A5D44607F91E312ec5E35b8c92db5bf
// privateKey2 0x8544e404dea9123dd6fe1b6b35702a738284e055223c0e2afd41ec7694a2bfda

// 现在给账号充值一点ETH测试转账，
// 这里选择测试网rinkeby   https://www.rinkeby.io/#stats
// 水龙头地址   https://www.rinkeby.io/#faucet
// 发一条带有自己地址推文，粘贴在水龙头页面的输入框即可。


//接下来是选择链接网络（rinkeby），与链接网络
let provider = ethers.getDefaultProvider('rinkeby');
const wallet1 = _wallet1.connect(provider);
const wallet2 = _wallet2.connect(provider);

// 查询一下账号余额
const getBalance = async () => {
  // 返回的余额单位是ether，要转换成ETH
  const _balance1 =  await wallet1.getBalance();
  // 第一次获取是18.75, 总之这里是非零就说明水龙头转账成功，并且连接测试网成功了
  const balance1 =  ethers.utils.formatEther(_balance1);

  const _balance2 =  await wallet2.getBalance();
  const balance2 =  ethers.utils.formatEther(_balance2);
  console.log(balance1, balance2);
};

// getBalance();



const transfer = async () => {
  let tx = {
    // 这里写一个接收人的地址，就写我们的wallet2吧
    to: "0xbe79D5B66A5D44607F91E312ec5E35b8c92db5bf",
    // 填写一个金额
    value: ethers.utils.parseEther('2.33')
  };

  // 广播转账信息
  const result =  await wallet1.sendTransaction(tx);
  console.log(result);
};

// transfer();

// 转账结束后，查询一下余额，数正确，没毛病
// getBalance().then();

// 部署合约
const abi = [
  "event ValueChanged(address indexed author, string oldValue, string newValue)",
  "constructor(string value)",
  "function getValue() view returns (string value)",
  "function setValue(string value)"
];


const deploy = async () => {
  const bytecode = await readFile('./contracts/SimpleStorage_sol_SimpleStorage.bin',{encoding: 'utf8'});
  let factory = new ethers.ContractFactory(abi, bytecode, wallet1);
  let contract = await factory.deploy("Hello World");
  console.log(contract.address);
  console.log(contract.deployTransaction.hash);
  await contract.deployed()
};

// deploy();

const contractAddress = '0x68296E63109030f602cC2D641E088fde1b2Cb055';
const contract = new ethers.Contract(contractAddress, abi, provider);

const getContractValue = async () => {
  let currentValue = await contract.getValue();
  console.log(currentValue);
};

// getContractValue();

const setContractValue = async (value) => {
  const contractWithSigner = contract.connect(wallet1);
  const tx = await contractWithSigner.setValue(value);
  console.log(tx.hash);
  await tx.wait();
  await getContractValue()
};

// setContractValue('kkkk');

const abi2 = [
  'function totalSupply() external view returns (uint256)',
  'function balanceOf(address who) external view returns (uint256)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function transfer(address to, uint256 value) external returns (bool)',
  'function approve(address spender, uint256 value) external returns (bool)',
  'function transferFrom(address from, address to, uint256 value) external returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)'
];
const contractAddress2 = '0xab1274a1fef8c9a66400da7d180df5b3b02f63a7';

const contract2 = new ethers.Contract(contractAddress2, abi2, provider);

const runContract2 = async ()=> {
  // const contractWithSigner = contract2.connect(wallet1);
  const balance = await contract2.balanceOf('0xBe255696870b84C69F6e2b902177Cf2a2cB57B58') ;
  console.log(balance)
} ;

runContract2()
