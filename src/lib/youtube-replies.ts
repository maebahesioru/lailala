/**
 * Protobuf continuation token encoder for YouTube comment replies.
 * Manually builds protobuf binary because @bufbuild/protobuf's dynamic schema 
 * API (createDescriptorSet) is not available in v2.
 */

function varint(value: number): Buffer {
  const bytes: number[] = [];
  let v = value >>> 0;
  while (v > 0x7f) {
    bytes.push((v & 0x7f) | 0x80);
    v >>>= 7;
  }
  bytes.push(v & 0x7f);
  return Buffer.from(bytes);
}

function stringField(fieldNum: number, str: string): Buffer {
  const data = Buffer.from(str, "utf8");
  const tag = (fieldNum << 3) | 2;
  return Buffer.concat([Buffer.from([tag]), varint(data.length), data]);
}

function varintField(fieldNum: number, value: number): Buffer {
  const tag = (fieldNum << 3) | 0;
  return Buffer.concat([Buffer.from([tag]), varint(value)]);
}

function messageField(fieldNum: number, msg: Buffer): Buffer {
  const tag = (fieldNum << 3) | 2;
  return Buffer.concat([Buffer.from([tag]), varint(msg.length), msg]);
}

export function buildRepliesContinuationToken(
  commentId: string,
  channelId: string
): string {
  // RenderContext message (field 3 of CommentThreadInfo)
  const renderContext = Buffer.concat([
    stringField(1, channelId),
  ]);

  // CommentThreadInfo message
  const commentThread = Buffer.concat([
    stringField(1, commentId),
    stringField(2, commentId),
    messageField(3, renderContext),
    varintField(4, 0), // offset
  ]);

  // ContinuationRequest message (outer)
  const request = Buffer.concat([
    messageField(1, commentThread),
  ]);

  return request.toString("base64");
}
