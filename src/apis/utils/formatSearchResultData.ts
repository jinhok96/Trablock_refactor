/* eslint-disable camelcase */
import { SearchResponseContentData, SearchResponseData } from '@/apis/hooks/useSearch/search.type';

export const formatSearchContentDataFromResponse = (content: SearchResponseContentData[]) => {
  return content.map(
    ({
      article_id,
      title,
      bookmark_count,
      cover_image_url,
      start_at,
      end_at,
      is_bookmarked,
      is_editable,
      location,
      price,
      name,
      profile_image_url,
      travel_companion,
      travel_styles
    }) => {
      return {
        articleId: `${article_id}`,
        title,
        city: location.map(({ city }) => city),
        startAt: start_at,
        endAt: end_at,
        travelCompanion: travel_companion,
        travelStyle: travel_styles,
        price: +price,
        name,
        profileImageUrl: profile_image_url,
        thumbnailImageUrl: cover_image_url,
        bookmarkCount: bookmark_count,
        isBookmarked: is_bookmarked,
        isEditable: is_editable
      };
    }
  );
};

export const formatSearchDataFromResponse = (rawData: SearchResponseData) => {
  const resultContentList = formatSearchContentDataFromResponse(rawData.content);

  return {
    content: resultContentList,
    totalElements: rawData.total_elements,
    totalPages: rawData.total_pages,
    currentPage: rawData.pageable.page_number,
    isLastPage: rawData.last
  };
};
