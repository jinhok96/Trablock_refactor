import { Location, Pagination, Params } from '@/apis/types/common';

type Review = {
  review_id: number;
  title: string;
  representative_img_url: string;
  locations: Location[];
};

//params
export type GetReviewListByUserIdParams = Omit<Params, 'sort'>;

//response
export type GetReviewResponse = {
  user_id: number;
  profile_img_url: string;
  nickname: string;
  is_editable: boolean;
  article_id: number;
  review_id: number;
  title: string;
  representative_img_url: string;
  description: string;
  created_at: string;
  is_like: boolean;
  like_count: number;
};
export type GetReviewListByUserIdResponse = Pagination & { reviews: (Review & { start_at: string; end_at: string })[] };
export type GetBannerReviewListResponse = {
  reviews: (Review & { nickname: string; profile_img_url: string })[];
};
