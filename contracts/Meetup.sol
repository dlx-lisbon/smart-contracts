pragma solidity ^0.5.10;

import "@openzeppelin/contracts/ownership/Ownable.sol";


/**
 * @title Meetup
 * @dev Meetup control contract
 */
contract Meetup is Ownable {

    enum MeetupStatus {OPEN, CANCELED}

    event NewMeetup(uint256 _id, string _infoHash);
    event UpdatedMeetup(uint256 _id, string _infoHash);
    event CanceledMeetup(uint256 _id);
    event NewCoordinator(address _coordinator);
    event CoordinatorLeft(address _coordinator);

    /**
     * Meetup data sctructure
     * @param author meetup author addresses
     * @param infoHash meetup IPFS hash for info
     */
    struct Meetup {
        address author;
        string infoHash;
    }
    // meetup attendees
    mapping(uint256 => mapping(address => bool)) public attendees;
    // meetups array
    Meetup[] public meetups;
    // meetup canceled
    mapping(uint256 => bool) public meetupCanceled;
    // coordinators map
    mapping(address => bool) public coordinators;

    /**
     * @dev Modifier to restrict any action to coordinators and contract owner.
     */
    modifier onlyCoordinators() {
        require(msg.sender == owner() || coordinators[msg.sender] == true, "Not Allowed!");
        _;
    }

    /**
     * @dev Constructor method initializing Meetup
     */
    constructor() public Ownable() {
        //
    }

    /**
     * @dev Public method available only to the contract owner
     * used to add new coordinators.
     * @param _coordinator address of the coordinator to be added
     */
    function addCoordinator(address _coordinator) public onlyOwner {
        coordinators[_coordinator] = true;
        emit NewCoordinator(_coordinator);
    }

    /**
     * @dev Public method available only to the contract owner
     * used to remove a given coordinator.
     * @param _coordinator address of the coordinator to be removed
     */
    function removeCoordinator(address _coordinator) public onlyOwner {
        coordinators[_coordinator] = false;
        emit CoordinatorLeft(_coordinator);
    }

    /**
     * @dev Public method available to coordinators and the contract owner
     * used to register a new meetup.
     * @param _infoHash IPFS hash containing the title, full description, and location of the meetup
     */
    function newMeetup(string memory _infoHash) public onlyCoordinators {
        Meetup memory meetup;
        meetup.author = msg.sender;
        meetup.infoHash = _infoHash;
        uint256 id = meetups.push(meetup) - 1;
        emit NewMeetup(id, _infoHash);
    }

    /**
     * @dev Public method available to coordinators and the contract owner
     * used to edit a meetup.
     * @param _id meetup id
     * @param _infoHash IPFS hash containing the title, full description, and location of the meetup
     */
    function editMeetup(
        uint256 _id,
        string memory _infoHash
    ) public onlyCoordinators {
        Meetup memory meetup = meetups[_id];
        meetup.infoHash = _infoHash;
        meetups[_id] = meetup;
        emit UpdatedMeetup(_id, _infoHash);
    }

    /**
     * @dev Public method available to coordinators and the contract owner
     * used to cancel a meetup.
     * @param _id meetup id
     */
    function cancelMeetup(uint256 _id) public onlyCoordinators {
        Meetup memory meetup = meetups[_id];
        meetups[_id] = meetup;
        meetupCanceled[_id] = true;
        emit CanceledMeetup(_id);
    }

    /**
     * @dev Public method used to join a meetup.
     * @param _id meetup id
     */
    function joinMeetup(uint256 _id) public {
        Meetup storage meetup = meetups[_id];
        attendees[_id][msg.sender] = true;
        meetups[_id] = meetup;
    }

    /**
     * @dev Public method used to leave a meetup.
     * @param _id meetup id
     */
    function leaveMeetup(uint256 _id) public {
        Meetup storage meetup = meetups[_id];
        require(attendees[_id][msg.sender] == true, "Not in meetup!");
        attendees[_id][msg.sender] = false;
        meetups[_id] = meetup;
    }

    /**
     * @dev Public method used to get the total number of meetups
     * registered, independently of it's status.
     */
    function totalMeetups() public view returns(uint256) {
        return meetups.length;
    }
}
