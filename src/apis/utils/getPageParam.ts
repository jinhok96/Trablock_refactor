export function getPreviousPageParam(currentPage: number, isEmpty: boolean, isFirst: boolean) {
  if (isEmpty || isFirst) return null;
  return currentPage - 1;
}

export function getNextPageParam(currentPage: number, isEmpty: boolean, isLast: boolean) {
  if (isEmpty || isLast) return null;
  return currentPage + 1;
}
