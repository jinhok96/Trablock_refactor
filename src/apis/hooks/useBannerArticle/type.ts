export interface Location {
  place_id: string;
  address: string;
  city: string;
}

export interface Article {
  article_id: number;
  title: string;
  location: Location[];
  start_at: string;
  end_at: string;
  expense: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  travel_companion: string;
  travel_styles: string[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable: boolean;
}

export type ArticlesResponse = Article[];

export interface Review {
  review_id: number;
  title: string;
  representative_img_url: string;
  location: Location[];
  nickname: string;
  profile_img_url: string | null;
}

export interface ReviewsResponse {
  reviews: Review[];
}
