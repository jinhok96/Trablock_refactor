import { Metadata } from 'next/types';

import PrivacyPolicy from '@/components/features/terms/PrivacyPolicy';
import { METADATA } from '@/libs/constants/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: METADATA.title + ' | 개인정보 처리 방침'
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
