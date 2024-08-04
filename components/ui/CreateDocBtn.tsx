"use client";
import React from "react";
import { Button } from "./button";
import Image from "next/image";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

const CreateDocBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="share-btn"
    >
      <p className="text-2xl  h-24 flex items-center justify-center">+</p>
      <p className="hidden sm:block">Start a blank document.</p>
    </Button>
  );
};

export default CreateDocBtn;
