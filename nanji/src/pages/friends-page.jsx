
import { SearchField } from '@aws-amplify/ui-react';
import '../css/friends.css'

export function Friends({user}) {

 return (
    <>
    <div id="friendsearch">
        <h4>Search for friends and family</h4>
        <SearchField label="Search for friends and family" placeholder="Search here..."/>
     </div>
    </>
 )
}