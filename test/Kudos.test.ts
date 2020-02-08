import { should } from 'chai';
import { KudosInstance } from '../types/truffle-contracts';

const {
    BN,
    constants,
    expectEvent,
    expectRevert,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@openzeppelin/test-helpers');


const Kudos = artifacts.require('./Kudos.sol') as Truffle.Contract<KudosInstance>;
should();

/** @test {Kudos} contract */
contract('Kudos', (accounts) => {
    let kudosInstance: KudosInstance;
    const owner = accounts[0];
    const coordinator1 = accounts[1];
    const user1 = accounts[2];


    beforeEach(async () => {
        kudosInstance = await Kudos.new();
    });

    /**
     * @test {Kudos#name}
     */
    it('name with success', async () => {
        (await kudosInstance.name()).should.be.equal('KudosDLX');
    });

    /**
     * @test {Kudos#symbol}
     */
    it('symbol with success', async () => {
        (await kudosInstance.symbol()).should.be.equal('KDLX');
    });

    /**
     * @test {Kudos#mintWithTokenURI}
     */
    it('mintWithTokenURI with success', async () => {
        const tokenURI = 'ipfs/Qm8xo3nxwo3uowoerjow';
        const tokenId = (await kudosInstance.totalSupply()).toNumber() + 1;
        await kudosInstance.mintWithTokenURI(user1, tokenId, tokenURI, { from: owner });
        (await kudosInstance.tokenURI(tokenId)).should.be.equal(tokenURI);
    });

    /**
     * @test {Kudos#mintWithTokenURI}
     */
    it('mintWithTokenURI fails', async () => {
        const tokenURI = 'ipfs/Qm8xo3nxwo3uowoerjow';
        const tokenId = (await kudosInstance.totalSupply()).toNumber() + 1;
        await expectRevert(
            kudosInstance.mintWithTokenURI(user1, tokenId, tokenURI, { from: coordinator1 }),
            'MinterRole: caller does not have the Minter role',
        );
    });
});
