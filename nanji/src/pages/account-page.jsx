import { AccountInfo } from "../components/accountInfo-comp"
import { useNavigate } from "react-router-dom";
import { Auth, API, Storage } from 'aws-amplify';
import { deletePost } from "../graphql/mutations"
import '../css/account.css'


export function Account({user}) {

    //just deletes account - can trigger a lambda function to clean up s3/dynamo after
    async function deleteUser() {
        try {
            const result = await Auth.deleteUser();
            return result;
        } catch (error) {
            console.log('Error deleting user', error);
        }
    }

 return (
     <>
     <AccountInfo user={user} />
     <div id="accountdelete">
     <button onClick={deleteUser}>Delete Account</button>
     </div>
     </>
 )
}