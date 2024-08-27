import { ResponseGenericBody } from '@/apis/returnFetchJson/returnFetchJson';
import { ResponseWrapper } from '@/apis/types/common';
import { ENV } from '@/libs/constants/env';

export default function consoleLogApiResponse(res: ResponseGenericBody<ResponseWrapper<any>>) {
  if (ENV.DEV) {
    console.log('▶▷ Ok', res?.ok);
    console.log('▶▷ Status', res?.status);
    console.log('▶▷ Data', res?.body.data);
    console.log('▶▷ Error', res?.body.error);
  }
}
