pragma solidity ^0.6.0;


interface IDLX {
    function isCoordinator(address _coordinator) external view returns (bool);
}


/**
 * @title Challenge
 * @dev Challenge control contract
 */
contract Challenge {

    address private dlxAddress;

    address[] public challengeAuthor;
    mapping(uint256 => bool) public challengesRemoved;
    mapping(address => uint256[]) public challengesCompleted;

    event AddChallenge(address author, uint256 challengeId);
    event RemoveChallenge(address author, uint256 challengeId);
    event CompletedChallenge(address user, uint256 challengeId);

    modifier onlySystemOrCoordinators() {
        require(
            IDLX(dlxAddress).isCoordinator(msg.sender) ||
            msg.sender == dlxAddress,
            "Not Allowed!"
        );
        _;
    }

    modifier onlyCoordinators() {
        require(IDLX(dlxAddress).isCoordinator(msg.sender), "Not Allowed!");
        _;
    }

    /**
     * @dev Constructor method initializing Challenge
     */
    constructor(address _dlxAddress) public {
        dlxAddress = _dlxAddress;
    }

    function add() public onlyCoordinators {
        uint256 challengeId = challengeAuthor.push(msg.sender) - 1;
        emit AddChallenge(msg.sender, challengeId);
    }

    function remove(uint256 _challengeId) public onlyCoordinators {
        challengesRemoved[_challengeId] = true;
        emit RemoveChallenge(msg.sender, _challengeId);
    }

    function setCompleted(uint256 _challengeId, address _winner) public onlySystemOrCoordinators {
        challengesCompleted[msg.sender].push(_challengeId);
        emit CompletedChallenge(_winner, _challengeId);
    }
}
