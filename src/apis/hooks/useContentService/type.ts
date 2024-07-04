export interface Article {
  article_id: number;
  title: string;
  location: {
    place_id: string;
    address: string;
    city: string;
  }[];
  start_at: string;
  end_at: string;
  expense: string | null;
  profile_image_url: string;
  cover_image: string | null;
  cover_image_url: string | null;
  travel_companion: string;
  travel_styles: string[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable?: boolean;
}

export interface ArticlesResponse {
  content: Article[];
  pageable: {
    page_number: number;
    page_size: number;
  };
  total_elements: number;
  total_pages: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  empty: boolean;
}

export interface Location {
  place_id: string;
  address: string;
  city: string;
}

export interface Review {
  review_id: number;
  title: string;
  representative_img_url: string;
  location: Location[];
  start_at: string;
  end_at: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  current_page: number;
  page_size: number;
  total_pages: number;
  total_comment: number;
}
