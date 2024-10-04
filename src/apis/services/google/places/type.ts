type Location = {
  latitude: number;
  longitude: number;
};

type AuthorAttributions = {
  displayName: string;
  uri: string;
  photoUri: string;
};

type Photo = {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: AuthorAttributions[];
};

type BasicPlace = {
  id: string;
  primaryType: string;
  name: string;
  formattedAddress: string;
  displayName: {
    text: string;
  };
};

type PlaceDetails = {
  internationalPhoneNumber?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  location?: Location;
  photos?: Photo[];
};

export type PlaceResult = BasicPlace & PlaceDetails;

type TextMatch = {
  startOffset?: number;
  endOffset: number;
};

type TextInfo = {
  text: string;
  matches?: TextMatch[];
};

type StructuredFormat = {
  mainText: TextInfo;
  secondaryText: TextInfo;
};

type PlacePrediction = {
  place: string;
  placeId: string;
  text: TextInfo;
  structuredFormat: StructuredFormat;
  types: string[];
};

type Suggestion = {
  placePrediction: PlacePrediction;
};

type IncludedPrimaryTypes = '(cities)' | '(regions)';

//payload
export type PostGooglePlacesSearchTextPayload = {
  textQuery: string;
};
export type PostGooglePlacesAutocompletePayload = {
  input: string;
  includedPrimaryTypes?: IncludedPrimaryTypes;
};

//response
export type PostGooglePlacesSearchTextResponse = {
  places: PlaceResult[];
  nextPageToken?: string;
};
export type GetGooglePlacesDetailResponse = PlaceResult;
export type GetGooglePlacesPhotosResponse = {
  name: string;
  photoUri: string;
};
export type GetGooglePlacesAutocompleteResponse = {
  suggestions: Suggestion[];
};
