pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/AccessControl.sol";


/**
 * @title DLX
 * @dev DLX control contract
 */
contract DLX is AccessControl {
    bytes32 public constant COORDINATOR_ROLE = keccak256("COORDINATOR_ROLE");

    event NewCoordinator(address _coordinator);
    event CoordinatorLeft(address _coordinator);

    /**
     * @dev Modifier to restrict any action to coordinators and contract owner.
     */
    modifier onlyCoordinators() {
        require(hasRole(COORDINATOR_ROLE, msg.sender), "Not Allowed!");
        _;
    }

    /**
     * @dev Constructor method initializing Meetup
     */
    constructor() public {
        _setupRole(COORDINATOR_ROLE, msg.sender);
        _setRoleAdmin(COORDINATOR_ROLE, COORDINATOR_ROLE);
    }

    /**
     * @dev Public method used to add new coordinators.
     * @param _coordinator address of the coordinator to be added
     */
    function addCoordinator(address _coordinator) public onlyCoordinators {
        grantRole(COORDINATOR_ROLE, _coordinator);
        emit NewCoordinator(_coordinator);
    }

    /**
     * @dev Public method used to verify if a user is a coordinators.
     * @param _coordinator address to be verified
     */
    function isCoordinator(address _coordinator) public view returns (bool) {
        return hasRole(COORDINATOR_ROLE, _coordinator);
    }

    /**
     * @dev Public method used to remove a given coordinator.
     * @param _coordinator address of the coordinator to be removed
     */
    function removeCoordinator(address _coordinator) public onlyCoordinators {
        revokeRole(COORDINATOR_ROLE, _coordinator);
        emit CoordinatorLeft(_coordinator);
    }
}
