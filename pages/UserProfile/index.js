import Rect from 'react'

import UserProfileComponent from "../../components/UserProfileComponents"

export default function UserProfile({user}){
  return(
    <div>
      <h1>UserProfile for {user.uid && user.uid}</h1>
      <UserProfileComponent email={user.email ? user.email : "whoops"} />
    </div>
  );
}
