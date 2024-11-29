//payload
export type PostJoinPayload = {
  username: string;
  password: string;
  nickname: string;
  is_agreement: boolean;
  pw_question_id: number;
  pw_answer: string;
};

//response
export type PostJoinResponse = {
  id: number;
  nickname: string;
  profile_img_url: string;
};
