import { TravelCompanion, TravelStyle } from '@/apis/services/article/writer/type';
import { Location, PaginationArticleList, Params } from '@/apis/types/common';

export type Article = {
  article_id: number;
  title: string;
  locations: Location[];
  start_at: string;
  end_at: string;
  expense: string;
  cover_img_url?: string;
  travel_companion: TravelCompanion;
  travel_styles: TravelStyle[];
  name: string;
  profile_img_url?: string;
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
export type GetArticleResponse = {
  title: string;
  locations: Location[];
  start_at: string; // yyyy-MM-dd
  end_at: string; // yyyy-MM-dd
  expense: string;
  cover_img_url?: string;
  travel_companion: TravelCompanion;
  travel_styles: TravelStyle[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable: boolean;
};
export type GetSearchArticleListResponse = PaginationArticleList & { content: Article[] };
export type GetBookmarkListResponse = PaginationArticleList & { content: Article[] };
export type GetBannerLikesArticleListResponse = Article[];
export type GetBannerHotArticleListResponse = Article[];
export type GetArticleListResponse = PaginationArticleList & { content: Article[] };
export type GetArticleListByUserIdResponse = PaginationArticleList & { content: Article[] };
