export interface Pagination {
  page: number;
  size: number;
  total: number;
}

export const defaultPagination: Pagination = {
  page: 0,
  size: 10,
  total: 0
};
