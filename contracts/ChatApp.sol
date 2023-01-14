// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

contract ChatApp{

    //User Struct
    struct user{
        string name;
        friend[] friendlist;
    }

    struct allUserStruck{
        string name;
        address accountAddress;
    }

    allUserStruck[] getAllUsers;

    struct friend{
        address pubkey;
        string name;

    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }


mapping(address => user) userlist;
mapping(bytes32 => message[]) allMessages;

//check user
function checkUserExist(address pubkey) public view returns (bool){
return bytes(userlist[pubkey].name).length > 0;
}
 
//CREATE ACCOUNT
function createAccount ( string calldata name ) external {
    require(checkUserExist(msg.sender) == false, "User already exist");
    userlist[msg.sender].name = name;
    getAllUsers.push(allUserStruck(name,msg.sender));
}

//GET USERNAME
function getUserName(address pubkey ) external view returns (string memory){
    require(checkUserExist(pubkey),"User not exist or registered");
    return userlist[pubkey].name;
}




//ADD FRIEND
function addFriend(address friend_key, string calldata name) external{
require(checkUserExist(msg.sender), "Create a Account first");
require(checkUserExist(friend_key), "User not exist");
require(msg.sender != friend_key, "User cannot add themself as friends");
require(checkAlreadyFriend(msg.sender, friend_key)==false, "These users are already friends");


_addFriend(msg.sender,friend_key,name);
_addFriend(friend_key,msg.sender,userlist[msg.sender].name);

}

function checkAlreadyFriend(address pubkey1, address pubkey2) internal view returns(bool)
{
    if(userlist[pubkey1].friendlist.length > userlist[pubkey2].friendlist.length){

        address temp = pubkey1;
        pubkey1 = pubkey2;
        pubkey2 = temp;

        for(uint256 i = 0; i < userlist[pubkey1].friendlist.length; i++)
        {
            if(userlist[pubkey1].friendlist[i].pubkey == pubkey2) return true;
        }
        return false;
    }
}


function _addFriend(address me, address friend_key,string memory name ) internal {

    friend memory newFriend = friend(friend_key,name);
    userlist[me].friendlist.push(newFriend);

}


function getMyFriendList() external view returns (friend[] memory){
    return userlist[msg.sender].friendlist;
}

function _getChatCode(address pubkey1, address pubkey2) internal pure returns (bytes32){
    if(pubkey1<pubkey2){
        return keccak256(abi.encodePacked(pubkey1,pubkey2));
    }else return keccak256(abi.encodePacked(pubkey2,pubkey1));
}


function sendMessage(address friend_key, string calldata _msg) external {
    require(checkUserExist(msg.sender),"Create an account first");
    require(checkUserExist(friend_key),"User not exist");
    require(checkAlreadyFriend(msg.sender,friend_key), "You are not friend with given user");
    bytes32 chatCode = _getChatCode(msg.sender, friend_key);
    message memory newMSG = message(msg.sender,block.timestamp, _msg);
    allMessages[chatCode].push(newMSG);
}

function readMessage(address friend_key) external view returns(message[] memory){

bytes32 chatCode = _getChatCode(msg.sender,friend_key);
return allMessages[chatCode];

}

function getAllAppUser() public view returns (allUserStruck[] memory){
    return getAllUsers;
}
}