const fs = require('fs');
const util = require('util');
const readFile =util.promisify(fs.readFile);

readFile('./contracts/SimpleStorage_sol_SimpleStorage.bin',{encoding: 'utf8'}).then(abi=>console.log(abi));
