"use client";
import Image from "next/image";
import React, { useState } from "react";
import UserType from "./UserType";
import { Button } from "./ui/button";
import { removePeeper, updateDocumentAccess } from "@/lib/actions/room.actions";

const Peeps = ({
  roomId,
  creatorId,
  email,
  collaborator,
  user,
}: CollaboratorProps) => {
  const [userType, setuserType] = useState(collaborator.userType || "viewer");
  const [loading, setloading] = useState(false);
  const shareDoc = async (type: string) => {
    setloading(true);
    await updateDocumentAccess({
      roomId,
      email,
      userType: type as UserType,
      updatedBy: user,
    });
    setloading(false);
  };
  const removePeep = async (email: string) => {
    setloading(true);
    await removePeeper(
        { roomId, email }
    );
    setloading(false);
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex items-center justify-center gap-2 ">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-none rounded-full"
        />
        <div className="">
          <p className="line-clamp-1 text-sm font-semibold leading-4">
            {collaborator.name}
            <span className="text-10-regular pl-2 text-[#9fffcb]">
              {loading && "upadating..."}
            </span>
          </p>
          <p className="text-sm font-light text-[#9fffcb]">
            {collaborator.email}
          </p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm text-[#9fffcb]">Creator</p>
      ) : (
        <div className="flex items-center">
          <UserType
            userType={userType}
            setUserType={setuserType}
            onClickHandler={shareDoc}
          />
          <Button type="button" onClick={() => removePeep(collaborator.email)}>
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Peeps;
