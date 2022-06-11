import { Search } from "../components/search-comp"
import { FriendsList } from "../components/friendsList-comp"
import { RequestList } from "../components/requestList-comp"
import '../css/friends.css'
import { useState } from "react"

export function Friends({user}) {

    const [outGoing, setOutGoing] = useState([]);
    const [incoming, setIncoming] = useState([]);
    const [friends, setFriends] = useState([]);

 return (
    <>
    <div id="friends">
        <div id="addfriends">
            <Search user={user} outGoing={outGoing} setOutGoing={setOutGoing}/>
            <RequestList user={user} outGoing={outGoing}
            setOutGoing={setOutGoing} incoming={incoming}
            setIncoming={setIncoming} friends={friends} setFriends={setFriends}/>
        </div>
        <FriendsList friends={friends} setFriends={setFriends}/>
    </div>
    </>
 )
}