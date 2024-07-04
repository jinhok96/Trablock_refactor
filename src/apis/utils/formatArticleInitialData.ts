/* eslint-disable camelcase */
import {
  ArticleFormData,
  ArticleRequestFormData,
  GetArticleFormData,
  GetArticleRequestFormData
} from '@/apis/hooks/useArticle/article.type';
import { dateRequestFormat } from '@/libs/utils/dateFormatter';

export const formatArticleInitialDataForRequest = ({
  title,
  location,
  date,
  expense,
  travelCompanion,
  travelStyle
}: ArticleFormData) => {
  const formatData: ArticleRequestFormData = {
    title,
    location: location.map(({ placeId, address, city }) => ({ place_id: placeId, address, city })),
    start_at: dateRequestFormat(date.from),
    end_at: dateRequestFormat(date.to),
    travel_companion: travelCompanion
  };

  if (expense) {
    formatData.expense = String(expense);
  }

  if (travelStyle.length) {
    formatData.travel_styles = travelStyle;
  }

  return formatData;
};

export const formatArticleInitialDataFromResponse = ({
  title,
  location,
  start_at,
  end_at,
  travel_companion,
  travel_styles,
  expense,
  is_editable
}: GetArticleRequestFormData) => {
  const formatData: GetArticleFormData = {
    title,
    location: location.map(({ place_id, address, city }) => ({ placeId: place_id, address, city })),
    date: {
      from: new Date(start_at),
      to: new Date(end_at)
    },
    travelCompanion: travel_companion,
    travelStyle: travel_styles || [],
    isEditable: is_editable
  };

  if (expense) {
    formatData.expense = Number(expense);
  }

  return formatData;
};
