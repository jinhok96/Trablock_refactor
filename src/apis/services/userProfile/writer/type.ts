//payload
export type PatchUserProfilePayload = {
  nickname: string;
  introduce: string;
};
export type PutUserProfileImagePayload = { file: File };

//response
export type PatchUserProfileResponse = PatchUserProfilePayload;
export type PutUserProfileImageResponse = { profile_img_url: string };
