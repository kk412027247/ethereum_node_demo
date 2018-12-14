
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks:{
    development:{
      host:'127.0.0.1',
      port:8545,
      network_id:'*'
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      from: "0xBe255696870b84C69F6e2b902177Cf2a2cB57B58",
      network_id: 4,
      gas: 4700000,
    }
  },
  solc:{
    optimizer:{
      enabled: true,
      runs: 200
    }
  }
};
