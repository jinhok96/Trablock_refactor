import { useQuery } from '@tanstack/react-query';

import bannerService from './fetch';
import reviewService from './reviewFetch';
import { Article, ReviewsResponse } from './type';

const useGetPlanBanners = () => {
  return useQuery<Article[], Error>({
    queryKey: ['banners'],
    queryFn: bannerService.getBannerArticles
  });
};

const useGetReviewBanners = () => {
  return useQuery<ReviewsResponse, Error>({
    queryKey: ['reviewBanners'],
    queryFn: reviewService.getReviews
  });
};

export { useGetPlanBanners, useGetReviewBanners };
