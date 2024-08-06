//payload
export type PutUserProfilePayload = {
  nickname: string;
  introduce: string;
};
export type PutUserProfileImagePayload = { file: File };

//response
export type PutUserProfileResponse = PutUserProfilePayload;
export type PutUserProfileImageResponse = { profile_img_url: string };
