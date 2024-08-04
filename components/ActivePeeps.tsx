import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";
import React from "react";

const ActivePeeps = () => {
  const others = useOthers();
  const peeps = others.map((other) => other.info);
  return (
    <ul className="collaborators-list">
      {peeps.map((peep) => (
        <li key={peep.id} className=" w-9 h-9 flex items-center justify-center">
          <Image
            src={peep.avatar}
            alt={peep.name}
            width={100}
            height={100}
            className="inline-block size-8 p-1 rounded-full ring-2  "
            style={{ border: `3px ${peep.color}` }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ActivePeeps;
