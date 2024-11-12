import Link from 'next/link';

import articleReaderServices from '@/apis/services/article/reader/fetch';
import { Article, BannerArticle } from '@/apis/services/article/reader/type';
import HomeSearchInput from '@/app/(dashboard)/_components/HomeSearchInput';
import Button from '@/components/common/buttons/Button';
import PlanCardList from '@/components/common/cards/PlanCardList';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { SORT_PARAM } from '@/libs/constants/sortOptions';

const HOT_CITY_KEYWORDS_1 = ['서울', '오사카', '도쿄'];
const HOT_CITY_KEYWORDS_2 = ['뉴욕', '런던'];

export default async function HomePage() {
  const hotArticleListRes = await articleReaderServices.getBannerHotArticleList();
  const popularArticleListRes = await articleReaderServices.getBannerLikesArticleList();

  const mapBannerArticleListToArticleList = (list: BannerArticle[] | null) => {
    if (!list || !list.length) return [];

    const newList: Article[] = list.map((item) => {
      const { writer, ...restItem } = item;
      return { ...restItem, name: writer, bookmark_count: 0, is_bookmarked: false, is_editable: false };
    });

    return newList;
  };

  const hotArticleList: Article[] = mapBannerArticleListToArticleList(hotArticleListRes.body.data) || [];
  const popularArticleList: Article[] = mapBannerArticleListToArticleList(popularArticleListRes.body.data) || [];

  return (
    <div className="w-full">
      {/* 히어로 섹션 */}
      <section className="mb-14 bg-primary-01 md:mb-24">히어로</section>
      {/* 검색 섹션 */}
      <section className="px-layout flex-col-center m-auto mb-14 max-w-screen-xl md:mb-24">
        <p className="font-title-3 md:font-title-2 mb-5 text-center md:mb-6">여행을 계획하고 계신가요?</p>
        <HomeSearchInput />
      </section>
      {/* 인기있는 여행지 섹션 */}
      <section className="p-layout mb-14 bg-primary-03 md:mb-24">
        <div className="m-auto max-w-screen-xl">
          <p className="font-title-4 md:font-title-3 mb-5 md:mb-6">⭐️추천 여행지</p>
          <div className="flex-col-center">
            <div className="font-subtitle-2 md:font-subtitle-1 text-center text-white-01">
              <div className="inline-block">
                <div className="flex-row-center">
                  {HOT_CITY_KEYWORDS_1.map((keyword) => (
                    <Link
                      className="relative mx-1.5 block size-20 rounded-full bg-gray-01 md:mx-2 md:size-28"
                      href={APP_URLS.SEARCH + `?${APP_QUERIES.KEYWORD}=${keyword}`}
                      key={keyword}
                    >
                      <span className="absolute-center text-nowrap">{keyword}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="inline-block">
                <div className="flex-row-center justify-center">
                  {HOT_CITY_KEYWORDS_2.map((keyword) => (
                    <Link
                      className="relative mx-1.5 block size-20 rounded-full bg-gray-01 md:mx-2 md:size-28"
                      href={APP_URLS.SEARCH + `?${APP_QUERIES.KEYWORD}=${keyword}`}
                      key={keyword}
                    >
                      <span className="absolute-center text-nowrap">{keyword}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="px-layout">
        {/* Hot 여행 계획 섹션 */}
        <section className="m-auto mb-14 max-w-screen-xl md:mb-24">
          <div className="flex-row-center mb-5 justify-between md:mb-6">
            <p className="font-title-4 md:font-title-3">🔥Hot 여행 계획</p>
            <Link
              className="font-btn-3 md:font-btn-2 text-primary-01"
              href={APP_URLS.SEARCH + `?${APP_QUERIES.SORT}=${SORT_PARAM.createAt}`}
            >
              더보기
            </Link>
          </div>
          <PlanCardList
            cardList={hotArticleList}
            placeholder="네트워크 오류가 발생했습니다."
            priorityNum={10}
            hideBookmark
            forceShape="card"
          />
          <Button className="btn-ghost btn-md md:btn-lg m-auto mt-5 w-full max-w-sm md:mt-7 xl:hidden">
            <Link href={APP_URLS.SEARCH + `?${APP_QUERIES.SORT}=${SORT_PARAM.createAt}`}>최신 여행 계획 더보기</Link>
          </Button>
        </section>
        {/* 인기 여행 계획 섹션 */}
        <section className="m-auto mb-14 max-w-screen-xl md:mb-24">
          <div className="flex-row-center mb-5 justify-between md:mb-6">
            <p className="font-title-4 md:font-title-3">✨인기 여행 계획</p>
            <Link
              className="font-btn-3 md:font-btn-2 text-primary-01"
              href={APP_URLS.SEARCH + `?${APP_QUERIES.SORT}=${SORT_PARAM.popularity}`}
            >
              더보기
            </Link>
          </div>
          <PlanCardList
            cardList={popularArticleList}
            placeholder="네트워크 오류가 발생했습니다."
            priorityNum={0}
            hideBookmark
            forceShape="bar"
          />
          <Button className="btn-ghost btn-md md:btn-lg m-auto mt-5 w-full max-w-sm md:mt-7 xl:hidden">
            <Link href={APP_URLS.SEARCH + `?${APP_QUERIES.SORT}=${SORT_PARAM.popularity}`}>인기 여행 계획 더보기</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
