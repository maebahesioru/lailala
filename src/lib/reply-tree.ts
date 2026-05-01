import { YtComment } from "@/types/youtube";

export interface ReplyNode extends YtComment {
  children: ReplyNode[];
  replyTo: string | null;
}

function stripHandle(name: string): string {
  return name.replace(/^@/, "").trim().toLowerCase();
}

function parseMention(content: string): { replyTo: string | null; displayContent: string } {
  const match = content.match(/^@([^\s@]+)\s*/);
  if (match) {
    return {
      replyTo: match[1],
      displayContent: content.slice(match[0].length),
    };
  }
  return { replyTo: null, displayContent: content };
}

/**
 * Build a reply tree from a flat list of replies.
 * Replies with @mentions are attached as children of the most recent reply
 * from that user. If the mentioned user is the parent commenter (not in replies list),
 * the reply stays as a root (but can still receive nested replies as children).
 * Replies without @mentions are attached to the most recent reply from a different author
 * (heuristic: they're likely replies to the previous reply in the chain).
 */
export function buildReplyTree(replies: YtComment[], parentAuthorName?: string): ReplyNode[] {
  const nodes: ReplyNode[] = replies.map((r) => ({
    ...r,
    children: [],
    replyTo: parseMention(r.content).replyTo,
  }));

  const parentKey = parentAuthorName ? stripHandle(parentAuthorName) : null;
  const roots: ReplyNode[] = [];
  const allNodes: ReplyNode[] = []; // Track all nodes for backward scanning

  for (const node of nodes) {
    let parentNode: ReplyNode | null = null;

    if (node.replyTo) {
      const targetKey = stripHandle(node.replyTo);

      // Scan backwards through all nodes (roots and children) to find the most recent reply from target user
      for (let i = allNodes.length - 1; i >= 0; i--) {
        if (stripHandle(allNodes[i].author.name) === targetKey) {
          parentNode = allNodes[i];
          break;
        }
      }

      // If target user is the parent commenter and not found in replies, keep as root
      if (!parentNode && parentKey && targetKey === parentKey) {
        roots.push(node);
        allNodes.push(node);
        continue;
      }
    } else {
      // No @mention: treat as root (reply to parent comment, not nested)
      // Do NOT attach to any tree node automatically
    }

    if (parentNode) {
      parentNode.children.push(node);
    } else {
      roots.push(node);
    }

    allNodes.push(node);
  }

  return roots;
}

/**
 * Extract a subtree rooted at a specific commentId.
 */
export function extractReplySubTree(
  replies: YtComment[],
  rootCommentId: string,
  parentAuthorName?: string
): { root: ReplyNode | null; roots: ReplyNode[] } {
  const tree = buildReplyTree(replies, parentAuthorName);

  function find(node: ReplyNode): ReplyNode | null {
    if (node.commentId === rootCommentId) return node;
    for (const child of node.children) {
      const found = find(child);
      if (found) return found;
    }
    return null;
  }

  for (const root of tree) {
    const found = find(root);
    if (found) return { root: found, roots: tree };
  }

  return { root: null, roots: tree };
}
