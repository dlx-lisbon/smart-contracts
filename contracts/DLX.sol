pragma solidity ^0.5.10;

import "@openzeppelin/contracts/ownership/Ownable.sol";


/**
 * @title DLX
 * @dev DLX control contract
 */
contract DLX is Ownable {
    enum ContentType { MEETUP, POST }
    /**
     * Content data sctructure
     * @param author content author addresses
     * @param infoHash content IPFS hash for info
     */
    struct Content {
        address author;
        ContentType contentType;
    }
    // content attendees
    mapping(uint256 => mapping(address => bool)) public attendees;
    // contents array
    Content[] public contents;
    // meetup canceled
    mapping(uint256 => bool) public meetupCanceled;
    // coordinators map
    mapping(address => bool) public coordinators;

    event NewPost(uint256 _id);
    event NewMeetup(uint256 _id);
    event CancelMeetup(uint256 _id);
    event NewCoordinator(address _coordinator);
    event CoordinatorLeft(address _coordinator);

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
     * used to register a new post.
     */
    function newPost() public onlyCoordinators {
        Content memory content;
        content.author = msg.sender;
        content.contentType = ContentType.POST;
        uint256 id = contents.push(content) - 1;
        emit NewPost(id);
    }

    /**
     * @dev Public method available to coordinators and the contract owner
     * used to register a new meetups.
     */
    function newMeetup() public onlyCoordinators {
        Content memory content;
        content.author = msg.sender;
        content.contentType = ContentType.MEETUP;
        uint256 id = contents.push(content) - 1;
        emit NewMeetup(id);
    }

    /**
     * @dev Public method available to coordinators and the contract owner
     * used to cancel a meetup.
     * @param _id meetup id
     */
    function cancelMeetup(uint256 _id) public onlyCoordinators {
        meetupCanceled[_id] = true;
        emit CancelMeetup(_id);
    }

    /**
     * @dev Public method used to join a meetup.
     * @param _id meetup id
     */
    function joinMeetup(uint256 _id) public {
        attendees[_id][msg.sender] = true;
    }

    /**
     * @dev Public method used to leave a meetup.
     * @param _id meetup id
     */
    function leaveMeetup(uint256 _id) public {
        require(attendees[_id][msg.sender] == true, "Not signed!");
        attendees[_id][msg.sender] = false;
    }

    /**
     * @dev Public method used to get the total number of contents
     * registered, independently of it's status.
     */
    function totalContents() public view returns(uint256) {
        return contents.length;
    }
}
