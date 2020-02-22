const Migrations = artifacts.require('./Migrations.sol');
const DLX = artifacts.require('./DLX.sol');
const Kudos = artifacts.require('./Kudos.sol');
const Challenge = artifacts.require('./Challenge.sol');

const nodejsPath = require('path');
require('dotenv').config({ path: nodejsPath.join(process.cwd(), '..') });


// for dev only!
module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(Migrations);
    await deployer.deploy(DLX);
    await deployer.deploy(Kudos);
    await deployer.deploy(Challenge, DLX.address);
    const meetup = await DLX.deployed();
    meetup.transferOwnership(process.env.USER_ADDRESS, { from: accounts[0]});
    const challenge = await Challenge.deployed();
    challenge.transferOwnership(process.env.USER_ADDRESS, { from: accounts[0]});
    const kudos = await Kudos.deployed();
    kudos.addMinter(process.env.USER_ADDRESS, { from: accounts[0]});
};
