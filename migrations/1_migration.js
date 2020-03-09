const Migrations = artifacts.require('./Migrations.sol');
const DLX = artifacts.require('./DLX.sol');
const Kudos = artifacts.require('./Kudos.sol');
const Challenge = artifacts.require('./Challenge.sol');

const nodejsPath = require('path');
require('dotenv').config({ path: nodejsPath.join(process.cwd(), '../.env') });


// for dev only!
module.exports = async (deployer, network, accounts) => {
    let demoUserAddress = process.env.USER_ADDRESS;
    if (demoUserAddress === undefined) {
        demoUserAddress = accounts[1];
    }
    await deployer.deploy(Migrations);
    await deployer.deploy(DLX);
    await deployer.deploy(Kudos, DLX.address);
    await deployer.deploy(Challenge, DLX.address);
    const dlx = await DLX.deployed();
    dlx.addCoordinator(demoUserAddress, { from: accounts[0]});
};
