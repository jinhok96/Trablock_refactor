export interface ProfileUserData {
  profile_img_url: string | null;
  name: string;
  introduce: string | null;
  is_editable: boolean;
}

export interface UpdateProfileResponse {
  nickname: string;
  profile_img_url: string | null;
  introduce: string | null;
}
