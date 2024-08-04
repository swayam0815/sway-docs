"use server";
import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";
import { redirect } from 'next/navigation';

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled Document",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {}
};

export const getDocument = async ({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    if (!hasAccess) {
      throw new Error("no access to this room");
    } else {
      return parseStringify(room);
    }
    return parseStringify(room);
  } catch (error) {
    console.error("error happened while getting a room yo", error);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: { title },
    });
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error) {
    throw new Error("error happened while updating a room yo");
  }
};

export const getAllDocuments = async (email: string) => {
  try {
    const room = await liveblocks.getRooms({ userId: email });

    return parseStringify(room);
  } catch (error) {
    console.error("error happened while getting all documents yo", error);
  }
};

export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) => {
  try {
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };

    const room = await liveblocks.updateRoom(roomId, { usersAccesses });
    if (room) {
      console.log(" something worked wooooo");
    }
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.error("error happened while updating a room yo", error);
  }
};

export const removePeeper = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    if (room.metadata.email === email) {
      throw new Error("cannot remove the creator of the document");
    } else {
      const updatedRoom = await liveblocks.updateRoom(roomId, {
        usersAccesses: { [email]: null },
      });
      revalidatePath(`/documents/${roomId}`);
      return parseStringify(updatedRoom);
    }
  } catch (error) {
    console.error("error happened while removing a peep yo", error);
  }
};

export const deleteDocument = async (roomId: string) => {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("error happened while deleting a room yo", error);
  }
};
