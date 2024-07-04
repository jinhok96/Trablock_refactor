export interface SearchResponseContentData {
  article_id: number;
  title: string;
  price: string;
  location: {
    place_id: string;
    address: string;
    city: string;
  }[];
  start_at: string;
  end_at: string;
  expense: string;
  profile_image_url: string;
  cover_image_url: string;
  travel_companion: string;
  travel_styles: string[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable: boolean;
}

export interface SearchResponseData {
  total_elements: number;
  total_pages: number;
  size: number;
  content: SearchResponseContentData[];
  number: 0;
  sort: {
    empty: true;
    sorted: true;
    unsorted: true;
  };
  number_of_elements: 0;
  pageable: {
    offset: 0;
    sort: {
      empty: true;
      sorted: true;
      unsorted: true;
    };
    paged: true;
    page_number: 0;
    page_size: 0;
    unpaged: true;
  };
  first: true;
  last: true;
  empty: true;
}
