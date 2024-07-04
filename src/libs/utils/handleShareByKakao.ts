'use client';

interface handleShareByKakaoProps {
  title: string;
  description: string;
  imageUrl: string;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
  buttons: {
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
}

export default function handleShareByKakao(shareData: handleShareByKakaoProps) {
  const { Kakao } = window;

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: shareData.title,
      description: shareData.description,
      imageUrl: shareData.imageUrl,
      link: {
        mobileWebUrl: shareData.link.mobileWebUrl,
        webUrl: shareData.link.webUrl
      }
    },

    buttons: [
      {
        title: '계획 보러가기',
        link: {
          mobileWebUrl: shareData.link.mobileWebUrl,
          webUrl: shareData.link.webUrl
        }
      }
    ]
  });

  return undefined;
}
