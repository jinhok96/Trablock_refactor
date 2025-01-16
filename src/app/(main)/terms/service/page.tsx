import { Metadata } from 'next/types';

import TermsOfService from '@/components/features/terms/TermsOfService';
import { METADATA } from '@/libs/constants/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: METADATA.title + ' | 이용 약관'
  };
}

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
