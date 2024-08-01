type BirthdayType = 'SOLAR' | 'LUNAR';
type Gender = 'male' | 'female';

type Profile = {
  nickname?: string;
  thumbnail_image_url?: string;
  profile_image_url?: string;
  is_default_image?: boolean;
  is_default_nickname?: boolean;
};

type KakaoAccount = {
  profile_needs_agreement?: boolean;
  profile_nickname_needs_agreement?: boolean;
  profile_image_needs_agreement?: boolean;
  profile?: Profile;
  name_needs_agreement?: boolean;
  name?: string;
  email_needs_agreement?: boolean;
  is_email_valid?: boolean;
  is_email_verified?: boolean;
  email?: string;
  age_range_needs_agreement?: boolean;
  age_range?: string;
  birthyear_needs_agreement?: boolean;
  birthyear?: string;
  birthday_needs_agreement?: boolean;
  birthday?: string;
  birthday_type?: BirthdayType;
  gender_needs_agreement?: boolean;
  gender?: Gender;
  phone_number_needs_agreement?: boolean;
  phone_number?: string;
  ci_needs_agreement?: boolean;
  ci?: string;
  ci_authenticated_at?: string;
};

type Partner = { uuid?: string };

//response
export type PostCodeReturnKakaoTokenResponse = {
  token_type: string;
  access_token: string;
  id_token?: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope?: string;
};
export type PostReturnKakaoUserDataResponse = {
  id: number;
  has_signed_up?: boolean;
  connected_at?: Date;
  synched_at?: Date;
  properties?: JSON;
  kakao_account?: KakaoAccount;
  for_partner?: Partner;
};
