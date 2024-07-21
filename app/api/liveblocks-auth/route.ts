import { liveblocks } from "@/lib/liveblocks";
import { getRandomColor, getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { userInfo } from "os";

export async function POST(request: Request) {
  const clerkUser = await currentUser();
  // Get the current user from your database
  if (!clerkUser) {
    redirect("/sign-in");
  }

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [],
    },
    { userInfo: user.info }
  );


  return new Response(body, { status });
}
