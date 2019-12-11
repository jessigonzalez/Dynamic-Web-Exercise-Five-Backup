import React from 'react'

import Header from "../../components/Header"

export default function Logout({logoutFunction}){
  return(
    <div>
      <div>Logging out</div>
      <Header submitFunction={logoutFunction}/>
    </div>
  );
}
