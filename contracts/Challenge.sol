pragma solidity ^0.5.10;


import "@openzeppelin/contracts/ownership/Ownable.sol";

/**
 * @title Challenge
 * @dev Challenge control contract
 */
contract Challenge is Ownable {

    address private systemAddress;

    address[] public challengeAuthor;
    mapping(uint256 => bool) public challengesRemoved;
    mapping(address => uint256[]) public challengesCompleted;

    event AddChallenge(address author, uint256 challengeId);
    event RemoveChallenge(address author, uint256 challengeId);
    event CompletedChallenge(address user, uint256 challengeId);

    modifier onlySystemOrOwner() {
        require(isOwner() || msg.sender == systemAddress, "");
        _;
    }

    /**
     * @dev Constructor method initializing Challenge
     */
    constructor(address _systemAddress) public {
        systemAddress = _systemAddress;
    }

    function add() public onlyOwner {
        uint256 challengeId = challengeAuthor.push(msg.sender) - 1;
        emit AddChallenge(msg.sender, challengeId);
    }

    function remove(uint256 _challengeId) public onlyOwner {
        challengesRemoved[_challengeId] = true;
        emit RemoveChallenge(msg.sender, _challengeId);
    }

    function setCompleted(uint256 _challengeId, address _winner) public onlySystemOrOwner {
        challengesCompleted[msg.sender].push(_challengeId);
        emit CompletedChallenge(_winner, _challengeId);
    }
}
