"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import { Label } from "./ui/label";
import UserType from "./UserType";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";
import Peeps from "./Peeps";
import { useSelf } from "@liveblocks/react/suspense";
import { updateDocumentAccess } from "@/lib/actions/room.actions";
import { type } from "os";
import { FaShare } from "react-icons/fa";


const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const [loading, setloading] = useState(false);
  const shareDocumentHandler = async () => {
    setloading(true);
    await updateDocumentAccess({
      roomId,
      email,
      userType: userType,
      updatedBy: user.info,
    });
    setloading(false);
  };
  return (
    <div className="relative">
      {currentUserType === "editor" ? (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Button
                className=" flex h-9 gap-1 px-4 group/modal-btn relative overflow-hidden justify-center share-btn"
                disabled={currentUserType !== "editor"}
                onClick={shareDocumentHandler}
              >
              <div className="flex justify-center ">
              <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 ">
                  Book your flight
                </span>
                <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                <FaShare className="fill-black"/>

                </div>
              </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] p-6 bg-black  border-[#9fffcb] border-2 rounded-lg">
              <DialogHeader>
                <DialogTitle className="my-4 text-lg">
                  Manage who can view this project.
                </DialogTitle>
                <DialogDescription className="">
                  <p className="mb-4">
                    Select which users can view and edit this document.
                  </p>
                </DialogDescription>
              </DialogHeader>
              <Label
                htmlFor="email"
                className="my-9 text-lg text-bold text-[#9fffcb]"
              >
                <h1 className="my-2"> Email address</h1>
              </Label>
              <div className="flex items-center ">
                <div className="flex flex-1 items-center rounded-md bg-black border-2 border-[#9fffcb]">
                  <Input
                    id="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="share-input border-white"
                  />
                  <UserType userType={userType} setUserType={setUserType} />
                  <Button
                    type="submit"
                    className="border-l-2 border-l-[#9fffcb] rounded-none "
                    onClick={shareDocumentHandler}
                    disabled={loading}
                  >
                    {loading ? "Sharing..." : "Share"}
                  </Button>
                </div>
              </div>
              <div className="my-2 space-y-2 ">
                <ul className="flex flex-col">
                  {collaborators.map((c) => (
                    <Peeps
                      key={c.id}
                      roomId={roomId}
                      creatorId={creatorId}
                      email={c.email}
                      collaborator={c}
                      user={user.info}
                    />
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
          {open && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          )}
        </>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default ShareModal;
