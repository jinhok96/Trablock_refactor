import GnbMenu from '@/components/features/gnb/GnbMenu';

type GnbProps = {
  widthMaxFull?: boolean;
};

export default async function Gnb({ widthMaxFull }: GnbProps) {
  return (
    <>
      <div className="border-b-1-inner flex-col-center px-layout fixed w-full bg-white-01">
        <GnbMenu widthMaxFull={widthMaxFull} />
      </div>
      <div className="h-gnb" />
    </>
  );
}
