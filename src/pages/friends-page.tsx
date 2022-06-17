import { Search } from '../components/search-comp.jsx'
import { FriendsList } from "../components/friendsList-comp.tsx"
import { RequestList } from "../components/requestList-comp.tsx"
import '../css/friends.css'
import { useState } from "react"

export function Friends({user, friends, setFriends}) {

    const [outGoing, setOutGoing] = useState([]);
    const [incoming, setIncoming] = useState([]);

 return (
    <>
    <div id="friends">
        <div id="addfriends">
            <Search user={user} outGoing={outGoing} setOutGoing={setOutGoing}/>
            <RequestList user={user} outGoing={outGoing}
            setOutGoing={setOutGoing} incoming={incoming}
            setIncoming={setIncoming} friends={friends} setFriends={setFriends}/>
        </div>
        <div id="friendspagelist">
            <FriendsList user={user} friends={friends} setFriends={setFriends}/>
        </div>
    </div>
    </>
 )
}