pragma solidity ^0.5.10;

import "@openzeppelin/contracts/ownership/Ownable.sol";

interface ChildrenContract {
    function parent() external view returns(address);
}

contract Content is Ownable {
    address public postContractAddress;
    address public meetupContractAddress;

    constructor() public Ownable() {
        //
    }

    function setPostContractAddress(address _contract) public onlyOwner {
        require(ChildrenContract(_contract).parent() == address(this), "");
        postContractAddress = _contract;
    }
}
