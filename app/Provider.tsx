"use client";
import Loader from "@/components/Loader";
import { getClerkUser, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const clerkUser = useUser();
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUser({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({text, roomId}) => {
        const roomUsers= await getDocumentUsers({roomId, currentUser: clerkUser.user?.emailAddresses[0].emailAddress!, text});
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
