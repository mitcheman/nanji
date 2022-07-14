import { AccountInfo } from "../components/accountInfo-comp";
import { Auth } from "aws-amplify";
import "../css/account.css";
import React from "react";
import  { UserType } from '../types/UserType'


type Props = { user: UserType, signOut: boolean };

export const Account = ({ user }: Props) => {
  //just deletes account - can trigger a lambda function to clean up s3/dynamo after
  async function deleteUser(): Promise<string | void> {
    try {
      const result = await Auth.deleteUser();
      return result;
    } catch (error) {
      console.log("Error deleting user", error);
    }
  }

  return (
    <>
      <AccountInfo user={user} />
      <div id="accountdelete">
        <button onClick={deleteUser}>Delete Account</button>
      </div>
    </>
  );
};
