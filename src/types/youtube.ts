export interface YtComment {
  commentId: string;
  author: {
    name: string;
    channelId?: string;
    thumbnail?: string;
    isChannelOwner?: boolean;
    isMember?: boolean;
  };
  content: string;
  publishedTime: string;
  likeCount: string;
  replyCount: string;
  isLiked?: boolean;
  isDisliked?: boolean;
  isPinned?: boolean;
  isHearted?: boolean;
}

export interface CommentThread {
  comment: YtComment;
  replies?: YtComment[];
  hasRepliesContinuation?: boolean;
}
