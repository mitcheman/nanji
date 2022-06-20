import { AccountInfo } from '../components/accountInfo-comp';
import { Auth } from 'aws-amplify';
import '../css/account.css';
import React from 'react';
import { CognitoUserType } from '../Shared/Types';

//just deletes account - can trigger a lambda function to clean up s3/dynamo after
export const deleteUser = async (): Promise<string | void> => {
  try {
    const result: string | void = await Auth.deleteUser();
    console.log(result);
    return result;
  } catch (error) {
    console.log('Error deleting user', error);
  }
};

export const Account: React.FC<{ user: CognitoUserType }> = ({ user }) => {
  return (
    <>
      <AccountInfo user={user} />
      <div id="accountdelete">
        <button onClick={deleteUser} id="deleteAccount">
          Delete Account
        </button>
      </div>
    </>
  );
};
