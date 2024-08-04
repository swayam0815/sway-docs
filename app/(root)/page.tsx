import {DeleteModal} from "@/components/DeleteModal";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import CreateDocBtn from "@/components/ui/CreateDocBtn";
import { getAllDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const documents = await getAllDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4 ">
          Notifications
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            {/* <SignInButton className="border-4 border-yellow-400 p-2 m-2 rounded-2xl hover:bg-yellow-400 transition-all hover:scale-105" /> */}
          </SignedOut>
        </div>
      </Header>

      {documents.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">Your Documents</h3>
            <CreateDocBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {documents.data.map(({ id, metadata, createdAt }: any) => (
              <li className="document-list-item hover:bg-[#5fffa7]" key={id}>
                <Link
                  href={`/documents/${id}`}
                  className="flex flex-1 items-center justify-center gap-4"
                >
                  <div className="hidden rounded-md bg-[#5fffa7] border-2  border-emerald-500 p-2 sm:block">
                    <Image
                      src={`/assets/icons/doc.png`}
                      alt="document"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="space-y-1  w-52 ">
                    <p className="line-clamp-1 text-lg">
                      {metadata.title || "Untitled"}
                    </p>
                    <p className="text-sm ">
                      Created {dateConverter(createdAt)}.
                    </p>
                  </div>
                </Link>
                <DeleteModal
                roomId={id}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="document"
            width={40}
            height={40}
            className="mx-auto"
          />
          <CreateDocBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default page;
