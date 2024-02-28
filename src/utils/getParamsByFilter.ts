import { SORT_PARAMS } from '../consts';
import { IFilter } from '../models/IFilter';

export const getParamsByFilter = (filter: IFilter) => {
  const categoryParams = filter.category ? `&category=${filter.category}` : '';
  const searchParams = filter.search ? `&search=${filter.search}` : '';
  const params = `?sortBy=${SORT_PARAMS[filter.sortBy]}` + categoryParams + searchParams;

  return params;
};
