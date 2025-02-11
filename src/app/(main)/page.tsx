import { Metadata } from 'next';

import { EmblaOptionsType } from 'embla-carousel';
import Link from 'next/link';

import articleReaderServices from '@/apis/services/article/reader/fetch';
import EmblaCarouselSlides from '@/app/(main)/_components/HomeCarouselSlides';
import HomeSearchInput from '@/app/(main)/_components/HomeSearchInput';
import PlanCardList from '@/components/common/cards/PlanCardList';
import { PlanCardArticle } from '@/components/common/cards/type';
import EmblaCarousel from '@/components/features/carousel/EmblaCarousel';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { METADATA } from '@/libs/constants/metadata';
import { SORT_PARAM } from '@/libs/constants/sortOptions';

const EMBLA_CAROUSEL_OPTIONS: EmblaOptionsType = { loop: true };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: METADATA.title
  };
}

export default async function HomePage() {
  const hotArticleListRes = await articleReaderServices.getBannerHotArticleList();
  const popularArticleListRes = await articleReaderServices.getBannerLikesArticleList();

  const hotArticleList: PlanCardArticle[] = hotArticleListRes.body.data || [];
  const popularArticleList: PlanCardArticle[] = popularArticleListRes.body.data || [];

  return (
    <div className="w-full">
      {/* 히어로 섹션 */}
      <EmblaCarousel
        className="aspect-[15/8] size-full max-h-[25rem] max-w-screen-xl xl:max-h-[27.5rem]"
        slides={EmblaCarouselSlides}
        options={EMBLA_CAROUSEL_OPTIONS}
      />
      {/* 검색 섹션 */}
      <section className="p-layout my-layout m-auto">
        <div className="flex-col-center py-layout">
          <p className="font-title-3 md:font-title-2 mb-5 text-center md:mb-6">여행을 계획하고 계신가요?</p>
          <HomeSearchInput />
        </div>
      </section>
      {/* 트렌딩 여행 계획 섹션 */}
      <section className="p-layout my-layout m-auto bg-primary-03">
        <div className="m-auto max-w-screen-xl">
          <div className="flex-row-center mb-5 justify-between md:mb-6">
            <p className="font-title-4 md:font-title-3">트렌딩 여행 계획</p>
            <Link
              className="font-btn-3 md:font-btn-2 text-primary-01"
              href={APP_URLS.SEARCH + `?${APP_QUERIES.SORT}=${SORT_PARAM.createAt}`}
            >
              더보기
            </Link>
          </div>
          <PlanCardList
            cardList={hotArticleList}
            placeholder="트렌딩 여행 계획이 없습니다."
            priorityNum={10}
            hideBookmark
            forceShape="card"
          />
          <div className="my-layout m-auto !mb-0 w-full max-w-sm">
            <Link href={APP_URLS.SEARCH + `?${APP_QUERIES.SORT}=${SORT_PARAM.createAt}`}>
              <div className="btn-ghost btn-md md:btn-lg flex-row-center text-center">
                <span className="w-full">최신 여행 계획 더보기</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* 인기 여행 계획 섹션 */}
      <section className="p-layout my-layout m-auto">
        <div className="m-auto max-w-screen-xl">
          <div className="flex-row-center mb-5 justify-between md:mb-6">
            <p className="font-title-4 md:font-title-3">인기 여행 계획</p>
            <Link
              className="font-btn-3 md:font-btn-2 text-primary-01"
              href={APP_URLS.SEARCH + `?${APP_QUERIES.SORT}=${SORT_PARAM.popularity}`}
            >
              더보기
            </Link>
          </div>
          <PlanCardList
            cardList={popularArticleList}
            placeholder="인기 여행 계획이 없습니다."
            priorityNum={0}
            hideBookmark
            forceShape="bar"
          />
          <div className="my-layout m-auto !mb-0 w-full max-w-sm">
            <Link href={APP_URLS.SEARCH + `?${APP_QUERIES.SORT}=${SORT_PARAM.popularity}`}>
              <div className="btn-ghost btn-md md:btn-lg flex-row-center text-center">
                <span className="w-full">전체 인기 여행 계획 더보기</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
