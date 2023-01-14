
import React , {useState, useEffect } from "react"
import { useRouter } from "next/router"

//internal import
import {
    CheckIfWalletConnected,
    connectWallet,
    connectingWithContract
} from "../Utils/apiFeature"
export const ChatAppContext = React.createContext();
export const ChatAppProvider = ({children})  => {
    const title = "Hey wellcome to blockchain Chat App."
const [account, setAccount] = useState("");
const [userName, setuserName] = useState("");
const [friendLists, setfriendLists] = useState([]);
const [friendMSG, setfriendMSG] = useState([]);
const [loading, setloading] = useState(false);
const [userLists, setuserLists] = useState([]);
const [error, seterror] = useState("");


//CHAT USER DATA
const [currentUserName, setCurrentUserName] = useState("");
const [currentUserAddress , setcurrentUserAddress] = useState("");

const router = useRouter();

const fetchData = async () => {
    try {
        //GET CONTRACT
        const contract = await connectingWithContract();
        //GET ACCOUNT
const connectAccount = await connectWallet();
setAccount(connectAccount);
//GET USER NAME
const uerName = await contract.getUserName(connectAccount);
setuserName(uerName); 

//GET MY FRIEND LIST
const friendLists = await contract.getMyFriendList();
setfriendLists(friendLists);

//GET ALL APP USER LIST
const userList = await contract.getAllAppUser();
setuserLists(userList);
    } catch (error) {
        seterror("Please install and Connect your wallet")
    }
};
useEffect(() => {
    fetchData();
},[]);

const readMessage = async(friendAddress) => {
    try {
        const contract = await connectingWithContract(); 
        const read = await contract.readMessage(friendAddress);
        setfriendMSG(read);
    } catch (error) {
        console.log("Currently you have no message");
    }
}

const createAccount = async ({name, accountAddress}) => {
    try {
        if(name || accountAddress) return seterror("Name and address cannot be empty")

        const contract = await connectingWithContract();
        const getCreateUser = await contract.createAccount(name);
        setloading(true);
        await getCreateUser.wait();
        setloading(false);
        window.location.reload();
    } catch (error) {
        seterror("Error while creating your account please relaod the browser")
    }
}

const addFriends = async ({name, accountAddress}) =>{
    try {
        if(name || accountAddress) return seterror("Please provide")

        const contract = await connectingWithContract();
        const addMyFriend = await contract.addFriend(accountAddress,name);
        setloading(true);
        await addMyFriend.wait();
        setloading(false);
        router.push("/");
        window.location.reload();
    } catch (error) {
        seterror("Error Making friend!!")
    }
}

const sendMessage = async ({msg, address}) => {
    try {
        if(msg || address) return seterror("Please type your message");
        
        const contract = await connectingWithContract();
        const addMessage = await contract.sendMessage(address,msg);
        setloading(true);
        await addMessage.wait();
        setloading(false);
        window.location.reload();
    } catch (error) {
        seterror("Please reload and try again!!")
    }
} 

const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName =  await contract.getUserName(userAddress);
    setCurrentUserName(userName);
    setcurrentUserAddress(userAddress);
}
    return (
            <ChatAppContext.Provider value={{
                readMessage,
                createAccount,
                addFriends,
                sendMessage,
                readUser,
                connectWallet,
                CheckIfWalletConnected,
                account,
                userName,
                friendLists,
                friendMSG,
                userLists,
                loading,
                error,
                currentUserName,
                currentUserAddress,
            }}>
                {children}
            </ChatAppContext.Provider>
    )
}