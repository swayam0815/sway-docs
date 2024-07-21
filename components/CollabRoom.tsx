'use client'
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const CollabRoom = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaborative-room">
        <Header>
        <div className="flex w-fit items-center justify-center gap-2">
          <p className="p-2  border-orange-500 rounded-full bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black">Share</p>
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollabRoom;
