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

    /**
     * Test the addCoordinator method
     * @test {DLX#addCoordinator}
     */
    it('add coordinator with success', async () => {
        (await dlxInstance.isCoordinator(coordinator1)).should.be.equal(false);
        // add coordinator
        await dlxInstance.addCoordinator(coordinator1, { from: owner });
        // verify again
        (await dlxInstance.isCoordinator(coordinator1)).should.be.equal(true);
    });

    /**
     * Test the removeCoordinator method
     * @test {DLX#removeCoordinator}
     */
    it('remove coordinator with success', async () => {
        await dlxInstance.addCoordinator(coordinator1, { from: owner });
        (await dlxInstance.isCoordinator(coordinator1)).should.be.equal(true);
        // add coordinator
        await dlxInstance.removeCoordinator(coordinator1, { from: owner });
        // verify again
        (await dlxInstance.isCoordinator(coordinator1)).should.be.equal(false);
    });
});
