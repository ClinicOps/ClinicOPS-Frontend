export interface ListQuery {
  page: number;
  size: number;
  sort?: string;
  direction?: 'asc' | 'desc';
}
