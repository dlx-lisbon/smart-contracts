pragma solidity ^0.5.10;


contract Post {
    address public parent;

    constructor(
        address _parentContract
    )
        public
    {
        parent = _parentContract;
        // use _parentContract to get owner and also
        // to confirm when adding it to parent
    }
}
