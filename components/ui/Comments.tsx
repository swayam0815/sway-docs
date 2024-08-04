import { cn } from "@/lib/utils";
import { useIsThreadActive } from "@liveblocks/react-lexical";
import { Composer, Thread } from "@liveblocks/react-ui";
import { useThreads } from "@liveblocks/react/suspense";
import React from "react";

const ThreadWrapper = ({ thread }: ThreadWrapperProps) => {
  const isActive = useIsThreadActive(thread.id);
  return (
    <Thread
      thread={thread}
      data-state={isActive ? "active" : null}
      className={cn(
        "comment-thread border rounded-lg",
        isActive && "!border-emerald-400",
        thread.resolved && "opacity-40 "
      )}
    />
  );
};

const Comments = () => {
  const { threads } = useThreads();
  return (
    <div className="comments-container">
      <Composer className="comment-composer" />
      {threads.map((t) => (
        <ThreadWrapper key={t.id} thread={t} />
      ))}
    </div>
  );
};

export default Comments;
