type AvailableResponse = { is_available: boolean };

//payload
export type PostVerifyUsernamePayload = { username: string };
export type PostVerifyNicknamePayload = { nickname: string };

//response
export type PostVerifyUsernameResponse = AvailableResponse;
export type PostVerifyNicknameResponse = AvailableResponse;
