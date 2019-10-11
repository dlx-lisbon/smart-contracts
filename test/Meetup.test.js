const chai = require('chai');

const MeetupCore = artifacts.require('MeetupCore');
chai.should();

/** @test {MeetupCore} contract */
contract('MeetupCore', (accounts) => {
    let meetupCoreInstance;
    const owner = accounts[0];
    const coordinator1 = accounts[1];


    beforeEach(async () => {
        meetupCoreInstance = await MeetupCore.new({ from: owner });
        meetupCoreInstance.initializeMeetup(accounts[0], { from: owner });
    });

    /**
     * Test the addCoordinator method
     * @test {MeetupCore#addCoordinator}
     */
    it('add coordinator with success', async () => {
        (await meetupCoreInstance.coordinators(coordinator1)).should.be.equal(false);
        // add coordinator
        await meetupCoreInstance.addCoordinator(coordinator1, { from: owner });
        // verify again
        (await meetupCoreInstance.coordinators(coordinator1)).should.be.equal(true);
    });

    /**
     * Test the removeCoordinator method
     * @test {MeetupCore#removeCoordinator}
     */
    it('remove coordinator with success', async () => {
        await meetupCoreInstance.addCoordinator(coordinator1, { from: owner });
        (await meetupCoreInstance.coordinators(coordinator1)).should.be.equal(true);
        // add coordinator
        await meetupCoreInstance.removeCoordinator(coordinator1, { from: owner });
        // verify again
        (await meetupCoreInstance.coordinators(coordinator1)).should.be.equal(false);
    });
});
