// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

import "./Roles.sol";
import "../utils/Context.sol";

// Define a contract 'ManufacturerRole' to manage this role - add, remove, check
contract ManufacturerRole is Context {
    using Roles for Roles.Role;

    // Define 2 events, one for Adding, and other for Removing
    event ManufacturerAdded(address indexed account);
    event ManufacturerRemoved(address indexed account);

    // Define a struct 'Manufacturers' by inheriting from 'Roles' library, struct Role
    Roles.Role private Manufacturers;

    // In the constructor make the address that deploys this contract the 1st Manufacturer
    constructor() public {
        _addManufacturer(_msgSender());
    }

    // Define a modifier that checks to see if _msgSender() has the appropriate role
    modifier onlyManufacturer() {
        require(isManufacturer(_msgSender()));
        _;
    }

    // Define a function 'isManufacturer' to check this role
    function isManufacturer(address account) public view returns (bool) {
        return Manufacturers.has(account);
    }

    // Define a function 'addManufacturer' that adds this role
    function addManufacturer(address account) public onlyManufacturer {
        _addManufacturer(account);
    }

    // Define a function 'renounceManufacturer' to renounce this role
    function renounceManufacturer() public {
        _removeManufacturer(_msgSender());
    }

    // Define an internal function '_addManufacturer' to add this role, called by 'addManufacturer'
    function _addManufacturer(address account) internal {
        Manufacturers.add(account);
        emit ManufacturerAdded(account);
    }

    // Define an internal function '_removeManufacturer' to remove this role, called by 'removeManufacturer'
    function _removeManufacturer(address account) internal {
        Manufacturers.remove(account);
        emit ManufacturerRemoved(account);
    }
}