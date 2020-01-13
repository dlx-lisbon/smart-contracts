pragma solidity ^0.5.10;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721Mintable.sol";


/**
 * @title KudosCore
 * @dev Kudos control contract
 */
contract KudosCore is Initializable, ERC721, ERC721Mintable {

    /**
     * @dev Initializer method coded acording OZ system
     * @param _owner address of the contract owner
     */
    function initializeKudos(address _owner) public initializer {
        ERC721.initialize();
        ERC721Mintable.initialize(_owner);
    }
}
