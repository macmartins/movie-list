export default interface ListResponse<T> {
  currentPage: number;
  totalPages: number;
  result: T[];
}
