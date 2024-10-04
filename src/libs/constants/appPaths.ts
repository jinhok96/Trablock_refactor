export const APP_URLS = {
  HOME: '/',
  LOGIN: '/login',
  PW_INQUIRY: '/pwinquiry',
  JOIN: '/join',
  PROFILE: (userId: number) => `/profile/${userId}`,
  SEARCH: '/search',
  PLAN_LIST: '/plans',
  PLAN_CREATE: '/plans/overview',
  PLAN_EDIT: (articleId: number) => `/plans/overview/${articleId}`,
  PLAN_DETAIL: (articleId: number) => `/plans/${articleId}`,
  REVIEW_CREATE: (articleId: number) => `/reviews/overview/${articleId}`,
  REVIEW_EDIT: (articleId: number, reviewId: number) => `/reviews/overview/${articleId}/${reviewId}`,
  REVIEW_DETAIL: (reviewId: number) => `/reviews/${reviewId}`
};

export const APP_QUERIES = {
  PAGE: 'page',
  SIZE: 'size',
  SORT: 'sort',
  KEYWORD: 'keyword',
  NEXT: 'next'
};
