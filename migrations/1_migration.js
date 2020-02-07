const Migrations = artifacts.require('./Migrations.sol');
const MeetupCore = artifacts.require('./MeetupCore.sol');
const KudosCore = artifacts.require('./KudosCore.sol');

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(Migrations);
    await deployer.deploy(MeetupCore);
    await deployer.deploy(KudosCore);
    const meetupCore = await MeetupCore.deployed();
    meetupCore.transferOwnership('0xA6b94Ce98D6CD4f447a9C6788F169DD17f65f747', { from: accounts[0]});
    const kudosCore = await KudosCore.deployed();
    kudosCore.addMinter('0xA6b94Ce98D6CD4f447a9C6788F169DD17f65f747', { from: accounts[0]});
};
