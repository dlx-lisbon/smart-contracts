pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface IDLX {
    function isCoordinator(address _coordinator) external view returns (bool);
}


/**
 * @title Kudos
 * @dev Kudos control contract
 */
contract Kudos is ERC721 {
    address private dlxAddress;

    modifier onlyCoordinators() {
        require(IDLX(dlxAddress).isCoordinator(msg.sender), "Not Allowed!");
        _;
    }

    /**
     * @dev Constructor method initializing KudosCore
     */
    constructor(address _dlxAddress)
        ERC721("KudosDLX", "KDLX")
        public
    {
        //
        dlxAddress = _dlxAddress;
    }

    /**
     * @dev Function to mint tokens.
     * @param to The address that will receive the minted tokens.
     * @param tokenId The token id to mint.
     * @param tokenURI The token URI of the minted token.
     * @return A boolean that indicates if the operation was successful.
     */
    function mintWithTokenURI(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) public onlyCoordinators returns (bool) {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return true;
    }
}
