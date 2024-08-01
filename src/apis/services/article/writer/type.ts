import { Location } from '@/apis/types/common';

type Article = {
  title: string;
  location: Location[];
  start_at: string; // yyyy-MM-dd
  end_at: string; // yyyy-MM-dd
  expense?: number;
  travel_companion: string;
  travel_styles: string[];
};

// payload
export type PutArticlePayload = Article;
export type PutArticleCoverImagePayload = { cover_img: File };
export type PostArticlePayload = Article;

//response
export type PutArticleResponse = Article;
export type PutArticleCoverImageResponse = { cover_img_url: string };
export type PostArticleResponse = { article_id: number };
export type PatchArticlePrivacyResponse = { is_private: boolean };
