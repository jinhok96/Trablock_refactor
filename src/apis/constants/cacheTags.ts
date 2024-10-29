import {
  GetArticleListByUserIdParams,
  GetArticleListParams,
  GetBookmarkListParams,
  GetSearchArticleListParams
} from '@/apis/services/article/reader/type';

export const CACHE_TAGS = {
  ARTICLE: {
    getArticle: (articleId: number) => `getArticle-${articleId}`,
    getSearchArticleList: (params: GetSearchArticleListParams) => `getSearchArticleList-${JSON.stringify(params)}`,
    getBookmarkList: (userId: number, params: GetBookmarkListParams) =>
      `getBookmarkList-${userId}-${JSON.stringify(params)}`,
    getBannerLikesArticleList: () => 'getBannerLikesArticleList',
    getBannerHotArticleList: () => 'getBannerHotArticleList',
    getArticleList: (params: GetArticleListParams) => `getArticleList-${JSON.stringify(params)}`,
    getArticleListByUserId: (userId: number, params: GetArticleListByUserIdParams) =>
      `getArticleListByUserId-${userId}-${JSON.stringify(params)}`
  },
  ARTICLE_SCHEDULE: {
    getScheduleList: (articleId: number) => `getScheduleList-${articleId}`,
    getSchedulePlaceList: (articleId: number) => `getSchedulePlaceList-${articleId}`
  },
  USER_PROFILE: {
    getUserProfile: (userId: number) => `getUserProfile-${userId}`
  },
  GOOGLE_PLACES: {
    getGooglePlacesDetail: (placeId: string) => `getGooglePlacesDetail-${placeId}`,
    getGooglePlacesPhotos: (name: string) => `getGooglePlacesPhotos-${name}`
  }
};
