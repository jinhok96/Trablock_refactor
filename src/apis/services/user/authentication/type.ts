//payload
export type PostLoginPayload = {
  username: string;
  password: string;
};

//response
export type PostLoginResponse = {
  user_id: number;
  nickname: string;
  profile_img_url: string;
};
export type GetReissueTokenResponse = { is_reissue: boolean };
