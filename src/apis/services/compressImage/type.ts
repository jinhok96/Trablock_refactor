//payload
export type PostImagePayload = File;

//response
export type PostCompressImageResponse = Blob | { error: string };
export type PostImageResponse = File;
