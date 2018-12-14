pragma solidity ^0.4.24;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract MyToken is ERC20, ERC20Detailed {
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals()));
    constructor () public ERC20Detailed("TMD_TOKEN", "TMD", 18) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
