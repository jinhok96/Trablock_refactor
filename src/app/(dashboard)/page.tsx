'use client';

import { useEffect } from 'react';

import { PostLoginPayload } from '@/apis/services/user/authentication/type';
import { usePostLogin } from '@/apis/services/user/authentication/useService';

export default function Home() {
  // const payload: PostJoinPayload = {
  //   username: 'asdf@asdf.com',
  //   nickname: 'asdf',
  //   password: 'asdfasdf1!',
  //   is_agreement: true,
  //   pw_question_id: 1,
  //   pw_answer: 'asdf'
  // };

  const payload: PostLoginPayload = {
    username: 'asdf@asdf.com',
    password: 'asdfasdf1!'
  };

  // const response = await registrationServices.postJoin(payload);
  // const response = await userAuthenticationServices.postLogin(payload);
  // const response = await userAuthenticationServices.getReissueToken();

  const { mutate, data } = usePostLogin();

  // console.log('response', response);

  useEffect(() => {
    console.log('뮤테이트');
    mutate(payload);
  }, []);

  useEffect(() => {
    console.log('data.body', data?.body);
    console.log('Response.ok', data?.ok);
    console.log('data', data);
  }, [data]);

  return <p>Home</p>;
}
