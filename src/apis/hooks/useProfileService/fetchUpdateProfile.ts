import API_URL from '@/apis/constants/url';
import getAuthToken from '@/apis/utils/getAuthToken';

const updateProfileService = {
  updateProfile: async (profileData: { nickname: string; introduce: string; file?: File | string }) => {
    const authToken = getAuthToken();
    let response;

    if (profileData.file && typeof profileData.file !== 'string') {
      const formData = new FormData();
      formData.append('file', profileData.file, profileData.file.name);
      const profileBlob = new Blob(
        [
          JSON.stringify({
            nickname: profileData.nickname,
            introduce: profileData.introduce
          })
        ],
        {
          type: 'application/json'
        }
      );
      formData.append('profile', profileBlob);

      console.log('FormData:', formData.get('file'), formData.get('profile'));

      response = await fetch(`${API_URL.API_BASE_URL}api/v1/profile`, {
        method: 'PUT',
        body: formData,
        headers: {
          'authorization-token': authToken
        }
      });
    } else {
      const jsonData = {
        nickname: profileData.nickname,
        introduce: profileData.introduce,
        profile_img_url: typeof profileData.file === 'string' ? profileData.file : undefined
      };

      console.log('JSON Data:', jsonData);

      response = await fetch(`${API_URL.API_BASE_URL}api/v1/profile`, {
        method: 'PUT',
        body: JSON.stringify(jsonData),
        headers: {
          'authorization-token': authToken,
          'Content-Type': 'application/json'
        }
      });
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.log('▷▶▷▶ response error', errorData);
      throw new Error('Failed to update profile');
    }

    const responseData = await response.json();
    console.log('Response Data:', responseData);

    return responseData;
  }
};

export default updateProfileService;
