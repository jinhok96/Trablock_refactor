import Link from 'next/link';

import { APP_URLS } from '@/libs/constants/appPaths';

export default function NotFoundPage() {
  return (
    <div className="px-layout flex-col-center size-full grow justify-center text-center">
      <p className="mb-4 text-8xl font-bold text-primary-01">404</p>
      <p className="font-title-3 break-keep">요청하신 페이지를 찾을 수 없습니다.</p>
      <p className="font-body-2 my-7 !leading-relaxed text-black-03">
        방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수 없습니다. <br className="max-sm:hidden" />
        입력하신 주소가 정확한지 다시 한번 확인해 주세요.
      </p>
      <Link className="btn-md btn-solid flex-row-center px-3" href={APP_URLS.HOME}>
        <p>홈페이지로 이동</p>
      </Link>
    </div>
  );
}
