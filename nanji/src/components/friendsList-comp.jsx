import '../css/friends.css'

export function FriendsList({friends, setFriends}) {

    //friend useEffect initialization in requestList component

    return (
        <div id="friendlist">
            <h4>Friends and Family</h4>
            <div class="individualfriendslist">
                {friends.map((req) => (
                    <div class="individualfriend" key={req.id} id={req.id}>
                        <p>Name: {req.given_name + ' ' + req.family_name}</p>
                        <p>Username: {req.preferred_username}</p>
                    </div>
                ))}
                </div>
        </div>
    )
}