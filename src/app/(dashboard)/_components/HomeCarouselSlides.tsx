import NextServerImage from '@/components/common/NextServerImage';
import Hero1DesktopImg from '@/images/hero-1-desktop.png';
import Hero1MobileImg from '@/images/hero-1-mobile.png';
import Hero1TabletImg from '@/images/hero-1-tablet.png';
import Hero2DesktopImg from '@/images/hero-2-desktop.png';
import Hero2MobileImg from '@/images/hero-2-mobile.png';
import Hero2TabletImg from '@/images/hero-2-tablet.png';
import Hero3DesktopImg from '@/images/hero-3-desktop.png';
import Hero3MobileImg from '@/images/hero-3-mobile.png';
import Hero3TabletImg from '@/images/hero-3-tablet.png';

const HeroImage = {
  1: {
    mobile: Hero1MobileImg,
    tablet: Hero1TabletImg,
    desktop: Hero1DesktopImg
  },
  2: {
    mobile: Hero2MobileImg,
    tablet: Hero2TabletImg,
    desktop: Hero2DesktopImg
  },
  3: {
    mobile: Hero3MobileImg,
    tablet: Hero3TabletImg,
    desktop: Hero3DesktopImg
  }
};

function Slide_1() {
  return (
    <div
      className="flex-col-center size-full justify-center bg-gradient-to-b from-[#EBF2FF] to-[#CDE1FF]"
      key="Home_Slide_1"
    >
      <NextServerImage
        className="px-5 md:hidden"
        src={HeroImage[1].mobile}
        alt="hero-1-mobile"
        width={768}
        height={400}
        priority
      />
      <NextServerImage
        className="max-md:hidden xl:hidden"
        src={HeroImage[1].tablet}
        alt="hero-1-tablet"
        width={1280}
        height={400}
        priority
      />
      <NextServerImage
        className="max-xl:hidden"
        src={HeroImage[1].desktop}
        alt="hero-1-desktop"
        width={1280}
        height={440}
        priority
      />
    </div>
  );
}

function Slide_2() {
  return (
    <div
      className="flex-col-center size-full justify-center bg-gradient-to-b from-[#F0F9F5] to-[#C1E3CD]"
      key="Home_Slide_2"
    >
      <NextServerImage
        className="px-5 md:hidden"
        src={HeroImage[2].mobile}
        alt="hero-2-mobile"
        width={768}
        height={400}
        priority
      />
      <NextServerImage
        className="max-md:hidden xl:hidden"
        src={HeroImage[2].tablet}
        alt="hero-2-tablet"
        width={1280}
        height={400}
        priority
      />
      <NextServerImage
        className="max-xl:hidden"
        src={HeroImage[2].desktop}
        alt="hero-2-desktop"
        width={1280}
        height={440}
        priority
      />
    </div>
  );
}

function Slide_3() {
  return (
    <div
      className="flex-col-center size-full justify-center bg-gradient-to-b from-[#FFF8EA] to-[#FFE9B1]"
      key="Home_Slide_3"
    >
      <NextServerImage
        className="px-5 md:hidden"
        src={HeroImage[3].mobile}
        alt="hero-3-mobile"
        width={768}
        height={400}
        priority
      />
      <NextServerImage
        className="max-md:hidden xl:hidden"
        src={HeroImage[3].tablet}
        alt="hero-3-tablet"
        width={1280}
        height={400}
        priority
      />
      <NextServerImage
        className="max-xl:hidden"
        src={HeroImage[3].desktop}
        alt="hero-3-desktop"
        width={1280}
        height={440}
        priority
      />
    </div>
  );
}

const HomeCarouselSlides: JSX.Element[] = [Slide_1(), Slide_2(), Slide_3()];

export default HomeCarouselSlides;
