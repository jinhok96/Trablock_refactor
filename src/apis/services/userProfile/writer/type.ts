type Profile = {
  nickname: string;
  introduce: string;
};

//payload
export type PutUserProfilePayload = {
  file: File;
  profile: Profile;
};

//response
export type PutUserProfileResponse = Profile & { profile_img_url: string };
