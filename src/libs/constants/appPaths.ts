export const APP_URLS = {
  HOME: '/',
  LOGIN: '/login',
  PW_INQUIRY: '/pwinquiry',
  JOIN: '/join',
  PROFILE: (userId: number) => `/profile/${userId}`,
  SEARCH: '/search',
  PLAN_LIST: '/plans',
  PLAN_CREATE: '/plans/create',
  PLAN_DETAIL: (articleId: number) => `/plans/${articleId}`,
  REVIEW_CREATE: '/reviews/create',
  REVIEW_DETAIL: (reviewId: number) => `/reviews/${reviewId}`
};

export const APP_QUERIES = {
  PAGE: 'page',
  SIZE: 'size',
  SORT: 'sort',
  KEYWORD: 'keyword',
  NEXT: 'next'
};
