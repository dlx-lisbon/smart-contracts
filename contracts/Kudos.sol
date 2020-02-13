pragma solidity ^0.5.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721MetadataMintable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Enumerable.sol";


/**
 * @title Kudos
 * @dev Kudos control contract
 */
contract Kudos is ERC721, ERC721Enumerable, ERC721MetadataMintable {

    /**
     * @dev Constructor method initializing KudosCore
     */
    constructor()
        ERC721()
        ERC721Metadata("KudosDLX", "KDLX")
        public
    {
        //
    }
}
