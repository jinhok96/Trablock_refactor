//payload
export type PostCommentPayload = {
  review_id: number;
  reply_comment: string;
};
export type PatchEditCommentPayload = { reply_comment: string };

//response
export type PostCommentResponse = { comment_id: number };
export type PatchEditCommentResponse = { comment_id: number };
export type PatchDeleteCommentResponse = { is_delete: boolean };
