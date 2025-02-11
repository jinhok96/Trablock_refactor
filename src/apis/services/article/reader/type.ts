import { TravelCompanion, TravelStyle } from '@/apis/services/article/writer/type';
import { Location, PaginationArticleList, Params } from '@/apis/types/common';

export type BaseArticle = {
  article_id: number;
  user_id: number;
  nickname: string;
  profile_img_url?: string;
  title: string;
  locations: Location[];
  start_at: string;
  end_at: string;
  expense: string;
  cover_img_url?: string;
  travel_companion: TravelCompanion;
  travel_styles: TravelStyle[];
};
export type OptionalArticle = {
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable: boolean;
};
export type Article = BaseArticle & OptionalArticle;
export type BannerArticle = BaseArticle;
export type PaginationArticleListWithContent = PaginationArticleList & { content: Article[] };

//params
export type GetSearchArticleListParams = Params & { keyword: string };
export type GetBookmarkListParams = Omit<Params, 'sort'>;
export type GetArticleListParams = Params;
export type GetArticleListByUserIdParams = Omit<Params, 'sort'>;

//response
export type GetArticleResponse = Omit<Article, 'article_id'>;
export type GetSearchArticleListResponse = PaginationArticleListWithContent;
export type GetBookmarkListResponse = PaginationArticleListWithContent;
export type GetBannerLikesArticleListResponse = BannerArticle[];
export type GetBannerHotArticleListResponse = BannerArticle[];
export type GetArticleListResponse = PaginationArticleListWithContent;
export type GetArticleListByUserIdResponse = PaginationArticleListWithContent;
