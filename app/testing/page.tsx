'use client';
import { Modal, ModalTrigger, ModalBody, ModalContent, ModalFooter } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { PlaneIcon, MicIcon } from "lucide-react";
import Image from "next/image";
import { Input } from "postcss";
import React from "react";

const page = () => {
  return (
    <div className="py-40  flex items-center justify-center">
    <Modal>
      <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          Book your flight
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          ✈️
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            Book your trip to{" "}
            <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
              Bali
            </span>{" "}
            now! ✈️
          </h4>
          <div className="flex justify-center items-center">
            
          </div>
          <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
            <div className="flex  items-center justify-center">
              <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                5 connecting flights
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                12 hotels
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                69 visiting spots
              </span>
            </div>
            <div className="flex  items-center justify-center">
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Good food everyday
              </span>
            </div>
            <div className="flex items-center justify-center">
              <MicIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Open Mic
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Paragliding
              </span>
            </div>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
            Cancel
          </button>
          <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
            Book Now
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  </div>
);
}

export default page;
