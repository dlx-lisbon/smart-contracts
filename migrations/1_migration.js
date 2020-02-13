const Migrations = artifacts.require('./Migrations.sol');
const DLX = artifacts.require('./DLX.sol');
const Kudos = artifacts.require('./Kudos.sol');
const Challenge = artifacts.require('./Challenge.sol');

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(Migrations);
    await deployer.deploy(DLX);
    await deployer.deploy(Kudos);
    await deployer.deploy(Challenge);
    const meetup = await DLX.deployed();
    meetup.transferOwnership('0xA6b94Ce98D6CD4f447a9C6788F169DD17f65f747', { from: accounts[0]});
    const challenge = await Challenge.deployed();
    challenge.transferOwnership('0xA6b94Ce98D6CD4f447a9C6788F169DD17f65f747', { from: accounts[0]});
    const kudos = await Kudos.deployed();
    kudos.addMinter('0xA6b94Ce98D6CD4f447a9C6788F169DD17f65f747', { from: accounts[0]});
};
