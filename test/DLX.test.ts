import { should } from 'chai';
import { DLXInstance } from '../types/truffle-contracts';

const DLX = artifacts.require('./DLX.sol') as Truffle.Contract<DLXInstance>;
should();


/** @test {DLX} contract */
contract('DLX', (accounts) => {
    let dlxInstance: DLXInstance;
    const owner = accounts[0];
    const coordinator1 = accounts[1];
    const user1 = accounts[2];


    beforeEach(async () => {
        dlxInstance = await DLX.new();
    });

    describe('Meetups', () => {
        /**
         * Test the addCoordinator method
         * @test {DLX#addCoordinator}
         */
        it('add coordinator with success', async () => {
            (await dlxInstance.coordinators(coordinator1)).should.be.equal(false);
            // add coordinator
            await dlxInstance.addCoordinator(coordinator1, { from: owner });
            // verify again
            (await dlxInstance.coordinators(coordinator1)).should.be.equal(true);
        });

        /**
         * Test the removeCoordinator method
         * @test {DLX#removeCoordinator}
         */
        it('remove coordinator with success', async () => {
            await dlxInstance.addCoordinator(coordinator1, { from: owner });
            (await dlxInstance.coordinators(coordinator1)).should.be.equal(true);
            // add coordinator
            await dlxInstance.removeCoordinator(coordinator1, { from: owner });
            // verify again
            (await dlxInstance.coordinators(coordinator1)).should.be.equal(false);
        });

        /**
         * Test the newMeetup method
         * @test {DLX#newMeetup}
         */
        it('add new meetup with success', async () => {
            await dlxInstance.newMeetup({ from: owner });
            // TODO: listen to events
            const meetupData = (await dlxInstance.contents(0));
            meetupData[0].toString().should.be.equal(owner);
        });

        /**
         * Test the cancelMeetup method
         * @test {DLX#cancelMeetup}
         */
        it('cancel meetup with success', async () => {
            await dlxInstance.newMeetup({ from: owner });
            // TODO: listen to events
            let meetupData = (await dlxInstance.meetupCanceled(0));
            meetupData.toString().should.be.equal('false');
            await dlxInstance.cancelMeetup(0, { from: owner });
            // TODO: listen to events
            meetupData = (await dlxInstance.meetupCanceled(0));
            meetupData.toString().should.be.equal('true');
        });

        /**
         * Test the joinMeetup method
         * @test {DLX#joinMeetup}
         */
        it('join meetup with success', async () => {
            await dlxInstance.newMeetup({ from: owner });
            // TODO: listen to events
            (await dlxInstance.attendees(0, user1)).should.be.false;
            await dlxInstance.joinMeetup(0, { from: user1 });
            (await dlxInstance.attendees(0, owner)).should.be.false;
            (await dlxInstance.attendees(0, user1)).should.be.true;
        });

        /**
         * Test the leaveMeetup method
         * @test {DLX#leaveMeetup}
         */
        it('leave meetup with success', async () => {
            await dlxInstance.newMeetup({ from: owner });
            // TODO: listen to events
            (await dlxInstance.attendees(0, user1)).should.be.false;
            await dlxInstance.joinMeetup(0, { from: user1 });
            (await dlxInstance.attendees(0, user1)).should.be.true;
            await dlxInstance.leaveMeetup(0, { from: user1 });
            (await dlxInstance.attendees(0, user1)).should.be.false;
        });
    });

    describe('Post', () => {
        /**
         * Test the newPost method
         * @test {DLX#newPost}
         */
        it('add new meetup with success', async () => {
            await dlxInstance.newPost({ from: owner });
            // TODO: listen to events
            const meetupData = (await dlxInstance.contents(0));
            meetupData[0].toString().should.be.equal(owner);
        });

        /**
         * Test mixed post and meetup
         */
        it('add new meetup with success', async () => {
            await dlxInstance.newPost({ from: owner });
            await dlxInstance.newMeetup({ from: owner });
            await dlxInstance.newPost({ from: owner });
            await dlxInstance.newMeetup({ from: owner });
            await dlxInstance.newMeetup({ from: owner });
            //
            const contents = [];
            const totalContents = (await dlxInstance.totalContents()).toNumber();
            for (let index = 0; index < totalContents; index += 1) {
                // eslint-disable-next-line no-await-in-loop
                const element = await dlxInstance.contents(index);
                contents.push({ author: element[0], type: element[1].toNumber() });
            }
            const posts = contents.filter((c) => c.type === 1);
            //
            posts.length.should.be.equal(2);
            posts[0].should.deep.include({ author: owner, type: 1 });
            posts[1].should.deep.include({ author: owner, type: 1 });
        });
    });
});
