import { ReplyNode } from "@/lib/reply-tree";
import { YtComment } from "@/types/youtube";

export interface ThreadData {
  parent: YtComment;
  replies: ReplyNode[];
  replyError: string | null;
  continuationToken: string | null;
  isReplyThread: boolean;
}
