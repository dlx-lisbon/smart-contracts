import { should } from 'chai';
import { MeetupInstance } from '../types/truffle-contracts';

const Meetup = artifacts.require('./Meetup.sol') as Truffle.Contract<MeetupInstance>;
should();

/** @test {Meetup} contract */
contract('Meetup', (accounts) => {
    let meetupInstance: MeetupInstance;
    const owner = accounts[0];
    const coordinator1 = accounts[1];
    const user1 = accounts[2];


    beforeEach(async () => {
        meetupInstance = await Meetup.new();
    });

    /**
     * Test the addCoordinator method
     * @test {Meetup#addCoordinator}
     */
    it('add coordinator with success', async () => {
        (await meetupInstance.coordinators(coordinator1)).should.be.equal(false);
        // add coordinator
        await meetupInstance.addCoordinator(coordinator1, { from: owner });
        // verify again
        (await meetupInstance.coordinators(coordinator1)).should.be.equal(true);
    });

    /**
     * Test the removeCoordinator method
     * @test {Meetup#removeCoordinator}
     */
    it('remove coordinator with success', async () => {
        await meetupInstance.addCoordinator(coordinator1, { from: owner });
        (await meetupInstance.coordinators(coordinator1)).should.be.equal(true);
        // add coordinator
        await meetupInstance.removeCoordinator(coordinator1, { from: owner });
        // verify again
        (await meetupInstance.coordinators(coordinator1)).should.be.equal(false);
    });

    /**
     * Test the newMeetup method
     * @test {Meetup#newMeetup}
     */
    it('add new meetup with success', async () => {
        const fakeInfoHash = 'Qm8xo3nxwo3uowoerjow';
        await meetupInstance.newMeetup(fakeInfoHash, { from: owner });
        // TODO: listen to events
        const meetupData = (await meetupInstance.meetups(0));
        meetupData[0].toString().should.be.equal(owner);
        meetupData[1].toString().should.be.equal(fakeInfoHash);
    });

    // /**
    //  * Test the editMeetup method
    //  * @test {Meetup#editMeetup}
    //  */
    // it('edit meetup with success', async () => {
    //     const currentTime = Math.floor(Date.now() / 1000);
    //     const fakeInfoHash = 'Qm8xo3nxwo3uowoerjow';
    //     await meetupInstance.newMeetup(currentTime.toString(), '3', fakeInfoHash, { from: owner });
    //     // TODO: listen to events
    //     let meetupData = (await meetupInstance.meetups(0));
    //     meetupData[3].toString().should.be.equal('3');
    //     await meetupInstance.editMeetup(0, currentTime.toString(), '5', fakeInfoHash, { from: owner });
    //     // TODO: listen to events
    //     meetupData = (await meetupInstance.meetups(0));
    //     meetupData[3].toString().should.be.equal('5');
    // });

    /**
     * Test the cancelMeetup method
     * @test {Meetup#cancelMeetup}
     */
    it('cancel meetup with success', async () => {
        const fakeInfoHash = 'Qm8xo3nxwo3uowoerjow';
        await meetupInstance.newMeetup(fakeInfoHash, { from: owner });
        // TODO: listen to events
        let meetupData = (await meetupInstance.meetupCanceled(0));
        meetupData.toString().should.be.equal('false');
        await meetupInstance.cancelMeetup(0, { from: owner });
        // TODO: listen to events
        meetupData = (await meetupInstance.meetupCanceled(0));
        meetupData.toString().should.be.equal('true');
    });

    /**
     * Test the joinMeetup method
     * @test {Meetup#joinMeetup}
     */
    it('join meetup with success', async () => {
        const fakeInfoHash = 'Qm8xo3nxwo3uowoerjow';
        await meetupInstance.newMeetup(fakeInfoHash, { from: owner });
        // TODO: listen to events
        (await meetupInstance.attendees(0, user1)).should.be.false;
        await meetupInstance.joinMeetup(0, { from: user1 });
        (await meetupInstance.attendees(0, owner)).should.be.false;
        (await meetupInstance.attendees(0, user1)).should.be.true;
    });

    /**
     * Test the leaveMeetup method
     * @test {Meetup#leaveMeetup}
     */
    it('leave meetup with success', async () => {
        const fakeInfoHash = 'Qm8xo3nxwo3uowoerjow';
        await meetupInstance.newMeetup(fakeInfoHash, { from: owner });
        // TODO: listen to events
        (await meetupInstance.attendees(0, user1)).should.be.false;
        await meetupInstance.joinMeetup(0, { from: user1 });
        (await meetupInstance.attendees(0, user1)).should.be.true;
        await meetupInstance.leaveMeetup(0, { from: user1 });
        (await meetupInstance.attendees(0, user1)).should.be.false;
    });
});
