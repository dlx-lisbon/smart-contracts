import { should } from 'chai';
import { KudosCoreInstance } from '../types/truffle-contracts';

const {
    BN,
    constants,
    expectEvent,
    expectRevert,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@openzeppelin/test-helpers');


const KudosCore = artifacts.require('./KudosCore.sol') as Truffle.Contract<KudosCoreInstance>;
should();

/** @test {KudosCore} contract */
contract('KudosCore', (accounts) => {
    let kudosCoreInstance: KudosCoreInstance;
    const owner = accounts[0];
    const coordinator1 = accounts[1];
    const user1 = accounts[2];


    beforeEach(async () => {
        kudosCoreInstance = await KudosCore.new();
    });

    /**
     * @test {KudosCore#name}
     */
    it('name with success', async () => {
        (await kudosCoreInstance.name()).should.be.equal('KudosDLX');
    });

    /**
     * @test {KudosCore#symbol}
     */
    it('symbol with success', async () => {
        (await kudosCoreInstance.symbol()).should.be.equal('KDLX');
    });

    /**
     * @test {KudosCore#mintWithTokenURI}
     */
    it('mintWithTokenURI with success', async () => {
        const tokenURI = 'ipfs/Qm8xo3nxwo3uowoerjow';
        const tokenId = (await kudosCoreInstance.totalSupply()).toNumber() + 1;
        await kudosCoreInstance.mintWithTokenURI(user1, tokenId, tokenURI, { from: owner });
        (await kudosCoreInstance.tokenURI(tokenId)).should.be.equal(tokenURI);
    });

    /**
     * @test {KudosCore#mintWithTokenURI}
     */
    it('mintWithTokenURI fails', async () => {
        const tokenURI = 'ipfs/Qm8xo3nxwo3uowoerjow';
        const tokenId = (await kudosCoreInstance.totalSupply()).toNumber() + 1;
        await expectRevert(
            kudosCoreInstance.mintWithTokenURI(user1, tokenId, tokenURI, { from: coordinator1 }),
            'MinterRole: caller does not have the Minter role',
        );
    });
});
