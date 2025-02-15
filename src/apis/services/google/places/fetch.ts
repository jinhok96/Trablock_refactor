import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { HEADERS } from '@/apis/constants/headers';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import httpClient from '@/apis/httpClient/httpClient';
import {
  GetGooglePlacesAutocompleteResponse,
  GetGooglePlacesDetailResponse,
  GetGooglePlacesPhotosResponse,
  PostGooglePlacesAutocompletePayload,
  PostGooglePlacesSearchTextPayload,
  PostGooglePlacesSearchTextResponse
} from '@/apis/services/google/places/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { ENV } from '@/libs/constants/env';

/* X-Goog-FieldMask
 * 장소ID: places.id
 * 모든유형: places.types
 * 주요유형: places.primaryType
 * 이름: places.displayName
 * 장소식별이름: places.name
 * 주소: places.formattedAddress
 * 국제전화번호: places.internationalPhoneNumber
 * 국내전화번호: places.nationalPhoneNumber
 * 웹사이트: places.websiteUri
 * 위도경도: places.location
 * 사진: places.photos
 */

const API_KEY = ENV.GOOGLE_PLACES_KEY || '';

const options: ReturnFetchOptions<'searchText' | 'detail' | 'photos' | 'autocomplete'> = {
  searchText: {
    baseUrl: ENV.GOOGLE_PLACES_API,
    headers: {
      [HEADERS.X_GOOG_FIELD_MASK]:
        'places.id,places.displayName,places.primaryType,places.name,places.addressComponents,places.formattedAddress,places.internationalPhoneNumber,places.nationalPhoneNumber,places.websiteUri,places.location,places.photos'
    }
  },
  detail: {
    baseUrl: ENV.GOOGLE_PLACES_API,
    headers: {
      [HEADERS.X_GOOG_FIELD_MASK]:
        'id,displayName,primaryType,name,addressComponents,formattedAddress,internationalPhoneNumber,nationalPhoneNumber,websiteUri,location,photos'
    }
  },
  photos: {
    baseUrl: ENV.GOOGLE_PLACES_API
  },
  autocomplete: {
    baseUrl: ENV.GOOGLE_PLACES_API
  }
};

const fetchSearchText = httpClient(options.searchText);
const fetchDetail = httpClient(options.detail);
const fetchPhotos = httpClient(options.photos);
const fetchAutocomplete = httpClient(options.autocomplete);

const googlePlacesServices = {
  postSearchText: async (payload: PostGooglePlacesSearchTextPayload) => {
    const response = await fetchSearchText.post<PostGooglePlacesSearchTextResponse>(
      `/v1/places:searchText?key=${API_KEY}&languageCode=ko`,
      { body: payload }
    );
    return response;
  },
  getDetail: async (placeId: string) => {
    const response = await fetchDetail.get<GetGooglePlacesDetailResponse>(
      `/v1/places/${placeId}?key=${API_KEY}&languageCode=ko`,
      {
        next: {
          tags: CACHE_TAGS.GOOGLE_PLACES.getGooglePlacesDetail(placeId),
          revalidate: REVALIDATE_TIME.MIN_05
        }
      }
    );
    return response;
  },
  getPhotos: async (name: string, options?: { maxWidthPx?: number; maxHeightPx?: number }) => {
    const { maxWidthPx, maxHeightPx } = options || {};
    const maxWidthPxParam = maxWidthPx ? `&maxWidthPx=${maxWidthPx}` : '';
    const maxHeightPxParam = maxHeightPx ? `&maxHeightPx=${maxHeightPx}` : '';
    const response = await fetchPhotos.get<GetGooglePlacesPhotosResponse>(
      `/v1/${name}/media?key=${API_KEY}&skipHttpRedirect=true&${maxWidthPxParam}${maxHeightPxParam}`,
      {
        next: {
          tags: CACHE_TAGS.GOOGLE_PLACES.getGooglePlacesPhotos(name),
          revalidate: REVALIDATE_TIME.HOUR_12
        }
      }
    );
    return response;
  },
  postAutocomplete: async (payload: PostGooglePlacesAutocompletePayload) => {
    const { input, includedPrimaryTypes } = payload;
    const includedPrimaryTypesQuery = includedPrimaryTypes ? `&includedPrimaryTypes=${includedPrimaryTypes}` : '';
    const response = await fetchAutocomplete.post<GetGooglePlacesAutocompleteResponse>(
      `/v1/places:autocomplete?key=${API_KEY}&languageCode=ko&includeQueryPredictions=true${includedPrimaryTypesQuery}`,
      { body: { input } }
    );
    return response;
  }
};

export default googlePlacesServices;
