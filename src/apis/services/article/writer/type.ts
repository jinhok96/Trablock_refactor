import { Location } from '@/apis/types/common';

export type TravelCompanion =
  | '가족들과'
  | '친구와'
  | '아이와'
  | '연인과'
  | '부모님과'
  | '배우자와'
  | '혼자서'
  | '동료와'
  | '기타';

export type TravelStyle =
  | '호캉스'
  | '힐링'
  | '뚜벅이'
  | '쉴 틈 없이 관광'
  | '카페 투어'
  | '맛집 탐방'
  | '자연과 함께'
  | '쇼핑 러버'
  | '액티비티'
  | '핫플레이스'
  | '남는 건 사진';

type Article = {
  title: string;
  locations: Location[];
  start_at: string; // yyyy-MM-dd
  end_at: string; // yyyy-MM-dd
  expense?: string; // "10000"
  travel_companion: TravelCompanion;
  travel_styles: TravelStyle[];
};

// payload
export type PutArticlePayload = Article;
export type PutArticleCoverImagePayload = { file: File };
export type PostArticlePayload = Article;

//response
export type PutArticleResponse = Article;
export type PutArticleCoverImageResponse = { cover_img_url: string };
export type PostArticleResponse = { article_id: number };
