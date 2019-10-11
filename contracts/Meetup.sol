pragma solidity ^0.5.10;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";

contract MeetupCore is Initializable, Ownable {

    enum MeetupStatus {OPEN, CANCELED}

    event NewMeetup(uint256 _id, uint256 _date, string _infoHash);
    event UpdatedMeetup(uint256 _id, uint256 _date, string _infoHash);
    event CanceledMeetup(uint256 _id);
    event NewCoordinator(address _coordinator);
    event CoordinatorLeft(address _coordinator);

    struct Meetup {
        uint256 status;
        uint256 date;
        uint256 seats;
        mapping(address => bool) attendees;
        string infoHash;
    }
    Meetup[] public meetups;
    mapping(address => bool) public coordinators;

    modifier onlyCoordinators() {
        require(msg.sender == owner() || coordinators[msg.sender] == true, "Not Allowed!");
        _;
    }

    function initializeMeetup(address _owner) public initializer {
        Ownable.initialize(_owner);
    }

    function addCoordinator(address _coordinator) public onlyOwner {
        coordinators[_coordinator] = true;
        emit NewCoordinator(_coordinator);
    }

    function removeCoordinator(address _coordinator) public onlyOwner {
        coordinators[_coordinator] = false;
        emit CoordinatorLeft(_coordinator);
    }

    function newMeetup(uint256 _date, uint256 _seats, string memory _infoHash) public onlyCoordinators {
        Meetup memory meetup;
        meetup.status = uint256(MeetupStatus.OPEN);
        meetup.date = _date;
        meetup.seats = _seats;
        meetup.infoHash = _infoHash;
        uint256 id = meetups.push(meetup) - 1;
        emit NewMeetup(id, _date, _infoHash);
    }

    function editMeetup(uint256 _id, uint256 _date, uint256 _seats, string memory _infoHash) public onlyCoordinators {
        Meetup memory meetup = meetups[_id];
        meetup.date = _date;
        meetup.seats = _seats;
        meetup.infoHash = _infoHash;
        meetups[_id] = meetup;
        emit UpdatedMeetup(_id, _date, _infoHash);
    }

    function cancelMeetup(uint256 _id) public onlyCoordinators {
        Meetup memory meetup = meetups[_id];
        meetup.status = uint256(MeetupStatus.CANCELED);
        meetups[_id] = meetup;
        emit CanceledMeetup(_id);
    }

    function joinMeetup(uint256 _id) public {
        Meetup storage meetup = meetups[_id];
        require(meetup.seats > 0, "No seats available!");
        meetup.attendees[msg.sender] = true;
        meetup.seats -= 1;
        meetups[_id] = meetup;
    }

    function leaveMeetup(uint256 _id) public {
        Meetup storage meetup = meetups[_id];
        require(meetup.attendees[msg.sender] == true, "Not in meetup!");
        meetup.attendees[msg.sender] = false;
        meetup.seats += 1;
        meetups[_id] = meetup;
    }
}
