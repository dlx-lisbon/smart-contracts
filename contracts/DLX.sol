pragma solidity ^0.5.10;

import "@openzeppelin/contracts/ownership/Ownable.sol";

/**
 * @title DLX
 * @dev DLX control contract
 */
contract DLX is Ownable {
    address public contentContractAddress;
    address public challengeContractAddress;
    address public kudosContractAddress;

    /**
     * @dev Constructor method initializing DLX
     */
    constructor(
        address _contentContractAddress,
        address _challengeContractAddress,
        address _kudosContractAddress
    ) public Ownable() {
        //
    }
}
