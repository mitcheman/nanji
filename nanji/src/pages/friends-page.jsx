import { Search } from "../components/search-comp"
import { FriendsList } from "../components/friendsList-comp"
import { RequestList } from "../components/requestList-comp"
import '../css/friends.css'

export function Friends({user}) {

 return (
    <>
    <div id="friends">
        <Search />
        <FriendsList />
        <RequestList />
    </div>
    </>
 )
}