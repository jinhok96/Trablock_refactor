import {
  GetArticleListByUserIdParams,
  GetArticleListParams,
  GetBookmarkListParams,
  GetSearchArticleListParams
} from '@/apis/services/article/reader/type';

export const CACHE_TAGS_PREFIX = {
  ARTICLE: 'ARTICLE',
  ARTICLE_SCHEDULE: 'ARTICLE_SCHEDULE',
  USER_PROFILE: 'USER_PROFILE',
  GOOGLE_PLACES: 'GOOGLE_PLACES'
};

export const CACHE_TAGS = {
  ARTICLE: {
    getArticle: (articleId: number) => [CACHE_TAGS_PREFIX.ARTICLE, `getArticle-${articleId}`],
    getSearchArticleList: (params: GetSearchArticleListParams) => [
      CACHE_TAGS_PREFIX.ARTICLE,
      `getSearchArticleList-${JSON.stringify(params)}`
    ],
    getBookmarkList: (userId: number, params: GetBookmarkListParams) => [
      CACHE_TAGS_PREFIX.ARTICLE,
      `getBookmarkList-${userId}-${JSON.stringify(params)}`
    ],
    getBannerLikesArticleList: () => [CACHE_TAGS_PREFIX.ARTICLE, 'getBannerLikesArticleList'],
    getBannerHotArticleList: () => [CACHE_TAGS_PREFIX.ARTICLE, 'getBannerHotArticleList'],
    getArticleList: (params: GetArticleListParams) => [
      CACHE_TAGS_PREFIX.ARTICLE,
      `getArticleList-${JSON.stringify(params)}`
    ],
    getArticleListByUserId: (userId: number, params: GetArticleListByUserIdParams) => [
      CACHE_TAGS_PREFIX.ARTICLE,
      `getArticleListByUserId-${userId}-${JSON.stringify(params)}`
    ]
  },
  ARTICLE_SCHEDULE: {
    getScheduleList: (articleId: number) => [CACHE_TAGS_PREFIX.ARTICLE_SCHEDULE, `getScheduleList-${articleId}`],
    getSchedulePlaceList: (articleId: number) => [
      CACHE_TAGS_PREFIX.ARTICLE_SCHEDULE,
      `getSchedulePlaceList-${articleId}`
    ]
  },
  USER_PROFILE: {
    getUserProfile: (userId: number) => [CACHE_TAGS_PREFIX.USER_PROFILE, `getUserProfile-${userId}`]
  },
  GOOGLE_PLACES: {
    getGooglePlacesDetail: (placeId: string) => [CACHE_TAGS_PREFIX.GOOGLE_PLACES, `getGooglePlacesDetail-${placeId}`],
    getGooglePlacesPhotos: (name: string) => [CACHE_TAGS_PREFIX.GOOGLE_PLACES, `getGooglePlacesPhotos-${name}`]
  }
};
