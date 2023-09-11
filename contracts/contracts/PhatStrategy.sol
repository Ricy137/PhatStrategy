// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./PhatRollupAnchor.sol";

contract PhatStrategy is PhatRollupAnchor, Ownable {
    address public j1; // The first player .
    address public j2; // The second player.
    enum Move {
        Null,
        Reverse,
        Keep
    }
    string[] public handles; // The handles of the players.
    bytes32 public c1Hash; // Commitment of j1.
    Move public c2; // Commitment of j2.
    uint256 public stake; // Amout bet by each party.
    uint256 public TIMEOUT = 5 minutes;
    uint256 public lastAction; // The time of the last action. Usefull to determine if someone has timed out.
    uint256 public biggerHandle;
    bool public isMessageReceived;

    event ResponseReceived(uint reqId, string[] pair, uint256 value);
    event ErrorReceived(uint reqId, string[] pair, uint256 errno);
    event gameStart(uint256 stake, string[] handles);
    event Result(uint reqId, uint256 winner);

    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;

    mapping(uint => string[]) requests;
    uint nextRequest = 1;

    constructor(address phatAttestor) {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function setAttestor(address phatAttestor) public {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function startGame(
        bytes32 _c1Hash,
        string[] memory _handles
    ) external payable {
        require(j1 == address(0), "Game already started");
        require(msg.value > 0, "Must bet something");
        require(_handles.length == 2, "Must provide two handles");
        stake = msg.value;
        j1 = msg.sender;
        c1Hash = _c1Hash;
        handles = _handles;
        lastAction = block.timestamp;
        emit gameStart(stake, handles);
    }

    function request(Move _c2) public payable {
        // assemble the request
        require(j1 != address(0), "Game not started");
        require(c2 == Move.Null, "Already played"); //J2 has not played yet.
        require(_c2 != Move.Null, "Invalid move");
        require(msg.value >= (stake * 102) / 100); //J2 must bet the same amount as J1.
        j2 = msg.sender;
        c2 = _c2;
        uint id = nextRequest;
        requests[id] = handles;
        _pushMessage(abi.encode(id, handles[0], handles[1]));
        nextRequest += 1;
        lastAction = block.timestamp;
    }

    function _onMessageReceived(bytes calldata action) internal override {
        require(action.length == 32 * 3, "cannot parse action");
        (uint respType, uint id, uint256 data) = abi.decode(
            action,
            (uint, uint, uint256)
        );
        if (respType == TYPE_RESPONSE) {
            biggerHandle = data;
            emit ResponseReceived(id, requests[id], data);
            delete requests[id];
        } else if (respType == TYPE_ERROR) {
            biggerHandle = 0;
            emit ErrorReceived(id, requests[id], data);
            delete requests[id];
        }
        isMessageReceived = true;
    }

    function solve(Move _c1, uint256 _salt) external {
        require(isMessageReceived, "message not recieved"); //Message already recieved
        require(_c1 != Move.Null, "not valid move"); //J1 should have played
        require(c2 != Move.Null, "j2 not played"); //J2 should not have played
        require(keccak256(abi.encode(_c1, _salt)) == c1Hash, "wrong move"); // Verify the value is the commited one.
        if (biggerHandle == 0) {
            payable(j1).transfer(stake);
            payable(j2).transfer(stake);
            emit Result(nextRequest - 1, 0);
        } else if (win(_c1)) {
            payable(j1).transfer(stake * 2);
            emit Result(nextRequest - 1, 1);
        } else {
            emit Result(nextRequest - 1, 2);
            payable(j2).transfer(stake * 2);
        }
        clearGame();
    }

    function win(Move _c1) internal view returns (bool w) {
        uint256 reverse = (uint(_c1) + uint(c2)) % 2;
        if (reverse == 0) {
            return biggerHandle == 1;
        } else {
            // Reverse
            return biggerHandle == 2;
        }
    }

    function clearGame() internal {
        j1 = address(0);
        j2 = address(0);
        c1Hash = bytes32(0);
        c2 = Move.Null;
        stake = 0;
        lastAction = 0;
        biggerHandle = 0;
        isMessageReceived = false;
    }

    /** @dev Let j2 get the funds back if j1 delays too much;
     */
    function j1Timeout() public {
        require(c2 != Move.Null); // J2 already played.
        require(isMessageReceived); //Message already recieved
        require(block.timestamp > lastAction + TIMEOUT); // Timeout time has passed.
        payable(j2).transfer(2 * stake);
        clearGame();
    }

    /** @dev Let j1 take back the funds if j2 never play.
     */
    function j2Timeout() public {
        require(c2 == Move.Null); // J2 has not played.
        require(block.timestamp > lastAction + TIMEOUT); // Timeout time has passed.
        payable(j1).transfer(stake);
        clearGame();
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
