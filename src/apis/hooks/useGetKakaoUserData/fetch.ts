import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

const options: {
  [key: string]: ReturnFetchDefaultOptions;
} = {
  kakaoUserData: {
    baseUrl: 'https://kapi.kakao.com',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
};

const fetchKakaoUser = returnFetch(options.kakaoUserData);

const serviceKakaoUserData = {
  postKakaoUserData: async (token: string) => {
    const response = await fetchKakaoUser('/v2/user/me', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.json();
  }
};

export default serviceKakaoUserData;
