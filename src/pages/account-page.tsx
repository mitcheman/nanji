import { AccountInfo } from "../components/accountInfo-comp";
import { Auth } from "aws-amplify";
import "../css/account.css";
import React from "react";

type UserModel = {
  id: string;
  username: string;
  attributes: {
    family_name: string;
    given_name: string;
    preferred_username: string;
    email: string;
  };
};

type Props = { user: UserModel };

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
