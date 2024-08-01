function isEmpty(totalPages: number) {
  return totalPages === 0;
}

function isFirstPage(currentPage: number) {
  return currentPage === 0;
}

function isLastPage(totalPages: number, currentPage: number) {
  return totalPages === currentPage + 1;
}

export function getPreviousPageParam(totalPages: number, currentPage: number) {
  if (isEmpty(totalPages)) return null;
  if (isFirstPage(currentPage)) return null;
  return currentPage - 1;
}

export function getNextPageParam(totalPages: number, currentPage: number) {
  if (isEmpty(totalPages)) return null;
  if (isLastPage(totalPages, currentPage)) return null;
  return currentPage + 1;
}
