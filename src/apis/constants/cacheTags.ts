import {
  GetArticleListByUserIdParams,
  GetArticleListParams,
  GetBookmarkListParams,
  GetSearchArticleListParams
} from '@/apis/services/article/reader/type';
import { GetCommentListParams } from '@/apis/services/comment/reader/type';
import { GetReviewListByUserIdParams } from '@/apis/services/review/reader/type';

export const CACHE_TAGS = {
  ARTICLE: {
    getArticle: (articleId: number) => `getArticle-${articleId}`,
    getSearchArticleList: (params: GetSearchArticleListParams) => `getSearchArticleList-${JSON.stringify(params)}`,
    getBookmarkList: (userId: number, params: GetBookmarkListParams) =>
      `getBookmarkList-${userId}-${JSON.stringify(params)}`,
    getBannerArticleList: () => 'getBannerArticleList',
    getAuthBannerArticleList: () => 'getAuthBannerArticleList',
    getArticleList: (params: GetArticleListParams) => `getArticleList-${JSON.stringify(params)}`,
    getArticleListByUserId: (userId: number, params: GetArticleListByUserIdParams) =>
      `getArticleListByUserId-${userId}-${JSON.stringify(params)}`
  },
  ARTICLE_SCHEDULE: {
    getScheduleList: (articleId: number) => `getScheduleList-${articleId}`,
    getSchedulePlaceList: (articleId: number) => `getSchedulePlaceList-${articleId}`
  },
  REVIEW: {
    getReview: (reviewId: number) => `getReview-${reviewId}`,
    getReviewListByUserId: (userId: number, params: GetReviewListByUserIdParams) =>
      `getReviewListByUserId-${userId}-${JSON.stringify(params)}`,
    getBannerReviewList: () => 'getBannerReviewList'
  },
  COMMENT: {
    getCommentList: (reviewId: number, params: GetCommentListParams) =>
      `getCommentList-${reviewId}-${JSON.stringify(params)}`
  },
  USER_PROFILE: {
    getUserProfile: (userId: number) => `getUserProfile-${userId}`
  },
  GOOGLE_PLACES: {
    getGooglePlacesDetail: (placeId: string) => `getGooglePlacesDetail-${placeId}`,
    getGooglePlacesPhotos: (name: string) => `getGooglePlacesPhotos-${name}`
  }
};
