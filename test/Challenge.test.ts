import { should } from 'chai';
import { ChallengeInstance, DLXInstance } from '../types/truffle-contracts';

const DLX = artifacts.require('./DLX.sol') as Truffle.Contract<DLXInstance>;
const Challenge = artifacts.require('./Challenge.sol') as Truffle.Contract<ChallengeInstance>;
should();


/** @test {Challenge} contract */
contract('Challenge', (accounts) => {
    let dlxInstance: DLXInstance;
    let challengeInstance: ChallengeInstance;
    const owner = accounts[0];
    const user = accounts[1];


    beforeEach(async () => {
        dlxInstance = await DLX.new();
        challengeInstance = await Challenge.new(dlxInstance.address);
    });

    /**
     * @test {Challenge#add}
     */
    it('add new challenge', async () => {
        await challengeInstance.add({ from: owner });
        assert.equal((await challengeInstance.challengeAuthor(0)).toString(), owner);
    });

    /**
     * @test {Challenge#remove}
     */
    it('remove challenge', async () => {
        await challengeInstance.add({ from: owner });
        await challengeInstance.remove(0, { from: owner });
    });

    /**
     * @test {Challenge#setCompleted}
     */
    it('setCompleted  challenge', async () => {
        await challengeInstance.add({ from: owner });
        await challengeInstance.setCompleted(0, user, { from: owner });
    });
});
