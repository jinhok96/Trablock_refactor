import { Location, PaginationArticleList, Params } from '@/apis/types/common';

type Article = {
  title: string;
  location: Location[];
  start_at: string; // yyyy-MM-dd
  end_at: string; // yyyy-MM-dd
  expense: string;
  cover_img_url?: string;
  travel_companion: string;
  travel_styles: string[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_private: boolean;
  is_editable: boolean;
};

type Content = {
  article_id: number;
  title: string;
  location: Location[];
  start_at: string;
  end_at: string;
  expense: string;
  profile_img_url?: string;
  cover_img_url?: string;
  travel_companion: string;
  travel_styles: string[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable: boolean;
};

//params
export type GetSearchArticleListParams = Params & { keyword: string };
export type GetBookmarkListParams = Omit<Params, 'sort'>;
export type GetArticleListParams = Params;
export type GetArticleListByUserIdParams = Omit<Params, 'sort'>;

//response
export type GetArticleResponse = Article;
export type GetSearchArticleListResponse = PaginationArticleList & { content: Content[] };
export type GetBookmarkListResponse = PaginationArticleList & { content: Content[] };
export type GetBannerArticleListResponse = Content[];
export type GetAuthBannerArticleListResponse = Content[];
export type GetArticleListResponse = PaginationArticleList & { content: Content[] };
export type GetArticleListByUserIdResponse = PaginationArticleList & { content: Content[] };
