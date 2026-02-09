export interface ListPageState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export const initialListPageState = <T>(): ListPageState<T> => ({
  data: [],
  loading: true,
  error: null
});
