import { Pagination, Params } from '@/apis/types/common';

type Comment = {
  user_id: number;
  profile_img_url: string;
  nickname: string;
  is_editable: boolean;
  comment_id: number;
  reply_comment: string;
  created_at: string;
  is_like: boolean;
  like_count: number;
};

//params
export type GetCommentListParams = Omit<Params, 'sort'>;

//response
export type GetCommentListResponse = Pagination & {
  profile_img_url: string;
  comments: Comment[];
};
