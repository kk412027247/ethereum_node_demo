module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks:{
    // 第一个是默认的链接节点，
    development:{
      host:'127.0.0.1',
      port:8545,
      network_id:'*'
    },
    //  rinkeby 测试网络的设置，
    rinkeby: {
      host: "localhost",
      port: 8545,
      // 需要设置一个默认的账号，钱包里可能有多个账号。
      from: "0xBe255696870b84C69F6e2b902177Cf2a2cB57B58",
      network_id: 4,
      gas: 4700000,
    }
  },

  // 编译配置
  solc:{
    optimizer:{
      enabled: true,
      runs: 200
    }
  }
};
