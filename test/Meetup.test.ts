import { should } from 'chai';
import { MeetupCoreInstance } from '../types/truffle-contracts';

const MeetupCore = artifacts.require('./MeetupCore.sol') as Truffle.Contract<MeetupCoreInstance>;
should();

/** @test {MeetupCore} contract */
contract('MeetupCore', (accounts) => {
    let meetupCoreInstance: MeetupCoreInstance;
    const owner = accounts[0];
    const coordinator1 = accounts[1];
    const user1 = accounts[2];


    beforeEach(async () => {
        meetupCoreInstance = await MeetupCore.new({ from: owner });
        meetupCoreInstance.initializeMeetup(owner, { from: owner });
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

    /**
     * Test the newMeetup method
     * @test {MeetupCore#newMeetup}
     */
    it('add new meetup with success', async () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const fakeInfoHash = 'Qm8xo3nxwo3uowoerjow';
        await meetupCoreInstance.newMeetup(currentTime.toString(), '3', fakeInfoHash, { from: owner });
        // TODO: listen to events
        const meetupData = (await meetupCoreInstance.meetups(0));
        meetupData[0].toString().should.be.equal('0');
        meetupData[1].toString().should.be.equal(currentTime.toString());
        meetupData[2].toString().should.be.equal('3');
    });

    /**
     * Test the editMeetup method
     * @test {MeetupCore#editMeetup}
     */
    it('edit meetup with success', async () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const fakeInfoHash = 'Qm8xo3nxwo3uowoerjow';
        await meetupCoreInstance.newMeetup(currentTime.toString(), '3', fakeInfoHash, { from: owner });
        // TODO: listen to events
        let meetupData = (await meetupCoreInstance.meetups(0));
        meetupData[2].toString().should.be.equal('3');
        await meetupCoreInstance.editMeetup(0, currentTime.toString(), '5', fakeInfoHash, { from: owner });
        // TODO: listen to events
        meetupData = (await meetupCoreInstance.meetups(0));
        meetupData[2].toString().should.be.equal('5');
    });

    /**
     * Test the cancelMeetup method
     * @test {MeetupCore#cancelMeetup}
     */
    it('cancel meetup with success', async () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const fakeInfoHash = 'Qm8xo3nxwo3uowoerjow';
        await meetupCoreInstance.newMeetup(currentTime.toString(), '3', fakeInfoHash, { from: owner });
        // TODO: listen to events
        let meetupData = (await meetupCoreInstance.meetups(0));
        meetupData[0].toString().should.be.equal('0');
        await meetupCoreInstance.cancelMeetup(0, { from: owner });
        // TODO: listen to events
        meetupData = (await meetupCoreInstance.meetups(0));
        meetupData[0].toString().should.be.equal('1');
    });

    /**
     * Test the joinMeetup method
     * @test {MeetupCore#joinMeetup}
     */
    it('join meetup with success', async () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const fakeInfoHash = 'Qm8xo3nxwo3uowoerjow';
        await meetupCoreInstance.newMeetup(currentTime.toString(), '3', fakeInfoHash, { from: owner });
        // TODO: listen to events
        (await meetupCoreInstance.attendees(0, user1)).should.be.false;
        await meetupCoreInstance.joinMeetup(0, { from: user1 });
        (await meetupCoreInstance.attendees(0, owner)).should.be.false;
        (await meetupCoreInstance.attendees(0, user1)).should.be.true;
    });

    /**
     * Test the leaveMeetup method
     * @test {MeetupCore#leaveMeetup}
     */
    it('leave meetup with success', async () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const fakeInfoHash = 'Qm8xo3nxwo3uowoerjow';
        await meetupCoreInstance.newMeetup(currentTime.toString(), '3', fakeInfoHash, { from: owner });
        // TODO: listen to events
        (await meetupCoreInstance.attendees(0, user1)).should.be.false;
        await meetupCoreInstance.joinMeetup(0, { from: user1 });
        (await meetupCoreInstance.attendees(0, user1)).should.be.true;
        await meetupCoreInstance.leaveMeetup(0, { from: user1 });
        (await meetupCoreInstance.attendees(0, user1)).should.be.false;
    });
});
