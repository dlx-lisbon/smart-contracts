pragma solidity ^0.5.10;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721MetadataMintable.sol";


/**
 * @title KudosCore
 * @dev Kudos control contract
 */
contract KudosCore is ERC721, ERC721Mintable, ERC721MetadataMintable {

    /**
     * @dev Constructor method initializing KudosCore
     */
    constructor() public ERC721() {
        //
    }
}
