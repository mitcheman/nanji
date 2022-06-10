import { Search } from "../components/search-comp"
import { FriendsList } from "../components/friendsList-comp"
import { RequestList } from "../components/requestList-comp"
import '../css/friends.css'
import { useState } from "react"

export function Friends({user}) {

    const [outGoing, setOutGoing] = useState([])

 return (
    <>
    <div id="friends">
        <Search user={user} outGoing={outGoing} setOutGoing={setOutGoing}/>
        <RequestList user={user} outGoing={outGoing} setOutGoing={setOutGoing}/>
        <FriendsList />
    </div>
    </>
 )
}