const Migrations = artifacts.require('./Migrations.sol');
const Meetup = artifacts.require('./Meetup.sol');
const Kudos = artifacts.require('./Kudos.sol');

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(Migrations);
    await deployer.deploy(Meetup);
    await deployer.deploy(Kudos);
    const meetup = await Meetup.deployed();
    meetup.transferOwnership('0xA6b94Ce98D6CD4f447a9C6788F169DD17f65f747', { from: accounts[0]});
    const kudos = await Kudos.deployed();
    kudos.addMinter('0xA6b94Ce98D6CD4f447a9C6788F169DD17f65f747', { from: accounts[0]});
};
