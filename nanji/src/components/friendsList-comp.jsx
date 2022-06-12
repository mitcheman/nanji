import '../css/friends.css'

export function FriendsList({friends, setFriends}) {

    //friend useEffect initialization in requestList component

    return (
        <div id="friendlist">
            <h4>Friends and Family</h4>
                {friends.map((req) => (
                    <a id="nanji" href={'/user/' + req.id}>
                    <div class="individualfriend" key={req.id} id={req.id}>
                        <p>Name | {req.given_name + ' ' + req.family_name}</p>
                        <p>Username | {req.preferred_username}</p>
                    </div>
                    </a>
                ))}
        </div>
    )
}