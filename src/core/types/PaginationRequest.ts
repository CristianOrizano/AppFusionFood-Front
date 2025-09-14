import FilterPage from './FilterPage';

export default interface PaginationRequest<T> extends FilterPage {
  filter?: T;
}
