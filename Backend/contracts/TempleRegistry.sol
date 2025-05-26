// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract TempleRegistry {
    
    // Hardcoded Super Admin address (MetaMask verified)
    address public constant superAdmin = 0x2973CCafB0A9b0439a80d082d9c5ACf254033dF7;

    // Mapping of registered temple authorities
    mapping(address => bool) public isTempleAuthority;
    address[] public templeAuthorities; // Array to store all registered temple authorities

    // Events for logging registration and removal of temple authorities
    event TempleAuthorityAdded(address indexed authority);
    event TempleAuthorityRemoved(address indexed authority);

    // Only Super Admin modifier
    modifier onlySuperAdmin() {
        require(msg.sender == superAdmin, "Only the verified super admin can perform this action");
        _;
    }

    // Register a new temple authority (Only by Super Admin)
    function registerTemple(address authority) external onlySuperAdmin {
        require(authority != address(0), "Invalid address");
        require(!isTempleAuthority[authority], "Already registered");
        
        isTempleAuthority[authority] = true;
        templeAuthorities.push(authority);

        emit TempleAuthorityAdded(authority);
    }

    // Remove a registered temple authority (Only by Super Admin)
    function removeTemple(address authority) external onlySuperAdmin {
        require(isTempleAuthority[authority], "Not registered");

        isTempleAuthority[authority] = false;

        // Remove from the array of templeAuthorities
        for (uint i = 0; i < templeAuthorities.length; i++) {
            if (templeAuthorities[i] == authority) {
                templeAuthorities[i] = templeAuthorities[templeAuthorities.length - 1];
                templeAuthorities.pop();
                break;
            }
        }

        emit TempleAuthorityRemoved(authority);
    }

    // Check if an address is a registered temple authority
    function checkTemple(address authority) external view returns (bool) {
        return isTempleAuthority[authority];
    }

    // Get all registered temple authorities
    function getAllTempleAuthorities() external view returns (address[] memory) {
        return templeAuthorities;
    }

    // Get total number of registered temple authorities
    function getTempleAuthorityCount() external view returns (uint256) {
        return templeAuthorities.length;
    }
}