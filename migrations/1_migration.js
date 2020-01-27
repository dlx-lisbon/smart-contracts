const Migrations = artifacts.require('./Migrations.sol');
const MeetupCore = artifacts.require('./MeetupCore.sol');
const KudosCore = artifacts.require('./KudosCore.sol');

module.exports = async (deployer) => {
    await deployer.deploy(Migrations);
    await deployer.deploy(MeetupCore);
    await deployer.deploy(KudosCore);
};
