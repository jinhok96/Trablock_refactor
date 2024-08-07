import { ResponseGenericBody } from '@/apis/returnFetchJson/returnFetchJson';
import { ResponseWrapper } from '@/apis/types/common';

export default function consoleLogApiResponse(res: ResponseGenericBody<ResponseWrapper<any>>) {
  console.log('▶▷ Ok', res?.ok);
  console.log('▶▷ Status', res?.status);
  console.log('▶▷ Data', res?.body.data);
  console.log('▶▷ Error', res?.body.error);
}
