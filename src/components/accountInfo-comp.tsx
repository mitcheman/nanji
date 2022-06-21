import React from "react";
import "../css/account.css";

type UserModel = {
  id: string;
  attributes: {
    family_name: string;
    given_name: string;
    preferred_username: string;
    email: string;
  };
};

type Props = { user: UserModel };

export const AccountInfo = ({ user }: Props) => {
  return (
    <div id="accountcontainer">
      <div id="accountdetails">
        <h3>Account Details</h3>
        <div className="accountline">
          <h3>First Name |</h3>
          <p>{user.attributes.given_name}</p>
        </div>
        <div className="accountline">
          <h3>Last Name |</h3>
          <p>{user.attributes.family_name}</p>
        </div>
        <div className="accountline">
          <h3>Username |</h3>
          <p>{user.attributes.preferred_username}</p>
        </div>
        <div className="accountline">
          <h3>Email |</h3>
          <p>{user.attributes.email}</p>
        </div>
      </div>
    </div>
  );
};
