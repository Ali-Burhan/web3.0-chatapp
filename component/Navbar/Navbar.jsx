import React,{useContext, useState} from 'react'
import Style from "./Navbar.module.css"
import Image from 'next/image'
import Link from 'next/link'
import {ChatAppContext} from "../../context/ChatAppContext"
import {Modal, Error, Model } from "../index"




const Navbar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "alluser",
  },
    {
      menu: "CHAT",
      link: "/",
  },
    {
      menu: "CONTACT",
      link: "/",
  },
    {
      menu: "SETTINGS",
      link: "/",
  },
    {
      menu: "FAQS",
      link: "/",
  },
    {
      menu: "Terms Of Use",
      link: "/",
  },
];
const [active, setActive] = useState(2);
const [open, setOpen] = useState(false);
const [openModel, setOpenModel] = useState(false);

const {account, userName,connectWallet,createAccount,error} = useContext(ChatAppContext);


  return (
  <>
  <div className={Style.Navbar}>
<div className={Style.Navbar_box}>
  <div className={Style.Navbar_box_left}>
<span>BURHANSE</span>
  </div>
  <div className={Style.Navbar_box_right}>
    {/* //Desktop Verssion */}

    <div className={Style.Navbar_box_right_menu}>

      {

        menuItems.map((el,i)=>(
          <div onClick={() => setActive(i+1)} key={i+1} className={`${Style.Navbar_box_right_menu_items} ${active == i+1 ? Style.active : ""}`}>
            <Link className={Style.Navbar_box_right_menu_items_link} href={el.link}>
            {el.menu}
            </Link>
          </div>
        ))}
    </div>

    {/* //Mobile */}
    {open && (
      <div className={Style.Navbar_mobile_menu}>
      {

        menuItems.map((el,i)=>(
          <div onClick={() => setActive(i+1)} key={i+1} className={`${Style.Navbar_box_mobile_items} ${active == i+1 ? Style.active_btn : ""}`}>
            <Link className={Style.Navbar_box_mobile_items_link} href={el.link}>
            {el.menu}
            </Link>
          </div>
        ))}
    </div>
    )}
<p className={Style.mobile_menu_btn}>

  CLOSE ICON
</p>


{/* //Connect Wallet */}
<div className={Style.Navbar_box_right_connect}>

{account == "" ? (
  <button onClick={() => connectWallet()}>
    {""}
    <span>Connect Wallet</span>
    </button>
) : (
  <button onClick={() => setOpenModel(true)}>
    {userName? accountName : "+"}
    <small>{userName || "Create Account"}</small>
  </button>
)}
</div>

<div className={Style.Navbar_box_right_open} onClick={() => setOpen(true)}>

<p>Open</p>
</div>
  </div>
</div>


{!openModel && (
  <div className={Style.modelBox}>
    <Model openModel = {setOpenModel}
    title="Wellcome to"
    head="CHAT BUDDY"
    info="Some information about the modal "
    smallInfo="Kindly select your name..."
    images = "IMAGE"
    functionName = {createAccount}
    /> 
  </div>
)}
{error == "" ? "" : <Error error={error}/>}
  </div>
  </>
  );
}

export default Navbar;