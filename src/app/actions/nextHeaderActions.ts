'use server';

import { headers } from 'next/headers';

export async function handleGetNextHeaders(name: string) {
  const headersList = headers();
  const value = headersList.get(name);
  return value;
}
