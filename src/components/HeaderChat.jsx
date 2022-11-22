import { collection, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../firebase";
import { UserAvatar } from "../styledComponents/UserAvatar";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
const HeaderChat = ({ users, user }) => {
  const q = query(
    collection(db, "users"),
    where("email", "==", getRecipientEmail(users, user?.email))
  );
  const [recipient] = useCollection(q);

  return (
    <>
      {recipient?.docs[0]?.data()?.image ? (
        <UserAvatar
          src={
            recipient?.docs[0]?.data()?.image &&
            recipient?.docs[0]?.data()?.image
          }
          alt=""
        />
      ) : (
        <UserAvatar>
          {users && getRecipientEmail(users, user?.email)[0]?.toUpperCase()}
        </UserAvatar>
      )}
      <div>
        <p>{users && getRecipientEmail(users, user?.email)}</p>
        <h6 style={{ color: "white" }}>
          {recipient ? (
            recipient?.docs[0]?.data() ? (
              <TimeAgo
                datetime={recipient?.docs[0]?.data()?.lastSeen?.toDate()}
              />
            ) : (
              "Unavailable"
            )
          ) : (
            "..."
          )}
        </h6>
      </div>
    </>
  );
};

export default HeaderChat;
