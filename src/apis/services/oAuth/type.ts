//payload
export type PostOAuthPayload = {
  profile_nickname: string;
  profile_img_url: string;
  account_email: string;
  is_agreement: boolean;
};

//response
export type PostOAuthResponse = {
  user_id: number;
  nickname: string;
  profile_img_url: string;
};
