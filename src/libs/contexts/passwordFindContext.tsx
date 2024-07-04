'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useState, useMemo } from 'react';

interface PasswordFindContextType {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  questionId: number;
  setQuestionId: Dispatch<SetStateAction<number>>;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
}

const PasswordFindContext = createContext<PasswordFindContextType>({
  username: '',
  setUsername: () => '',
  questionId: 1,
  setQuestionId: () => '',
  answer: '',
  setAnswer: () => ''
});

function PasswordFindProvider({ children }: { children: ReactNode }) {
  const [questionId, setQuestionId] = useState(0);
  const [username, setUsername] = useState('');
  const [answer, setAnswer] = useState('');

  const value = useMemo(
    () => ({
      questionId,
      setQuestionId,
      username,
      setUsername,
      answer,
      setAnswer
    }),
    [questionId, username, answer]
  );

  return <PasswordFindContext.Provider value={value}>{children}</PasswordFindContext.Provider>;
}

export { PasswordFindContext, PasswordFindProvider };
