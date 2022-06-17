import '../css/friends.css'

export function Friend({friend}) {

    return (
        <a id="friendalink" href={'/user/' + friend.id}>
        <div class="individualfriend" key={friend.id} id={friend.id}>
            <p>Name | {friend.given_name + ' ' + friend.family_name}</p>
            <p>Username | {friend.preferred_username}</p>
        </div>
        </a>
    )
}