pragma solidity ^0.5.10;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721MetadataMintable.sol";


/**
 * @title Kudos
 * @dev Kudos control contract
 */
contract Kudos is ERC721Full, ERC721MetadataMintable {

    /**
     * @dev Constructor method initializing KudosCore
     */
    constructor()
        public
        ERC721Full("KudosDLX", "KDLX")
    {
        //
    }
}
