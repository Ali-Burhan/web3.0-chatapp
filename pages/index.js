import React, {useContext, useEffect, useState} from 'react'


//INTERNAL IMPORT
import {ChatAppContext} from "../context/ChatAppContext"

function Chatapp() {
  const {title} = useContext(ChatAppContext);
  return (
    <div>{title}</div>
  )
}

export default Chatapp