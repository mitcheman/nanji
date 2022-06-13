import '../css/friends.css'
import { Friend } from './friend-comp'

export function FriendsList({friends, setFriends}) {

    return (
        <div id="friendlist">
            <h4>Friends and Family</h4>
                {friends.map((friend) => (
                    <Friend key={friend.id} friend={friend}/>
                ))}
        </div>
    )
}