"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUser = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient().users.getUserList({
      emailAddress: userIds,
    });
    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((u) => u.email === email)
    );
    return parseStringify(sortedUsers);
  } catch (error) {
    console.log("error happened while getting clerk user", error);
  }
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    if(text.length){
      const lowercaseText = text.toLowerCase();
      const filteredUsers = users.filter((email) => email.toLowerCase().includes(lowercaseText));
      return parseStringify(filteredUsers);
    }
  } catch (error) {
    console.log("error happened while getting document users", error);
  }
};
