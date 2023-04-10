import React from "react";
import Avatar from "avataaars";
import { RandomName } from "../dashboard/RandomName";
import { generateRandomAvatarOptions } from "../dashboard/randomAvatar";

const ChatUser = () => {
  const avatarOptions = generateRandomAvatarOptions();
  const name = <RandomName />;

  return (
    <div className="mx-auto text-center">
      <Avatar
        className="rounded-full dark:bg-zinc-700 my-6 ml-10"
        {...avatarOptions}
      />
      {name}
      <button
        className="bg-pink-600 text-black active:bg-pink-800
        font-bold my-6 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-32 mb-1"
      >
        Withdraw
      </button>
      <button className="bg-pink-600 text-black active:bg-pink-800
        font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1">
        Report
      </button>
    </div>
  );
};

export default ChatUser;
