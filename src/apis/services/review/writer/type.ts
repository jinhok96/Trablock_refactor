import { Status } from '@/apis/types/common';

//payload
export type PostReviewPayload = {
  article_id: number;
  title: string;
  representative_img_url: string;
  description: string;
  status: Status;
};
export type PatchEditReviewPayload = {
  title: string;
  representative_img_url: string;
  description: string;
  status: Status;
};

//response
export type PostReviewResponse = { review_id: number };
export type PatchEditReviewResponse = { review_id: number };
export type PatchDeleteReviewResponse = { is_delete: boolean };
