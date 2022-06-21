import { AccountInfo } from '../components/accountInfo-comp';
// import { deleteUserData } from '../graphql/mutations.js';
// import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import '../css/account.css';
import React, { useState } from 'react';
import { CognitoUserType } from '../Shared/Types';

//just deletes account - can trigger a lambda function to clean up s3/dynamo after
export const deleteUser = async (id: string): Promise<string | void> => {
  try {
    // const response = await API.graphql({
    //   query: deleteUserData,
    //   authMode: 'AMAZON_COGNITO_USER_POOLS',
    //   variables: { id: id },
    // });
    // console.log(response);
    const result: string | void = await Auth.deleteUser();
    console.log(result);
    return result;
  } catch (error) {
    console.log('Error deleting user', error);
  }
};

export const Account: React.FC<{ user: CognitoUserType }> = ({ user }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <AccountInfo user={user} />
      <div id="accountdelete">
        <button onClick={() => setIsVisible(true)} id="deleteAccount">
          Delete Account
        </button>
      </div>
      {isVisible ? (
        <div className="deleteAccountPromp">
          <div className="warningContainer">
            <h1>WARNING</h1>
            <div>
              This action is permanent and cannot be undone, are you sure?
            </div>
          </div>
          <div className="buttonContainer">
            <button
              onClick={() => setIsVisible(false)}
              className="cancelDeleteAccount">
              Cancel
            </button>
            <button
              onClick={() => deleteUser(user.username)}
              className="deleteAccountDefButton">
              Delete Account
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
