import { _ } from '@/constants';
import {
  PrismaFindManyArgs,
  RequestOrder,
  RequestPagination,
  ResponsePagination,
  _IncludeType,
  _IncludeTypeObject,
} from '@/types';

export const generateInclude = (input?: _IncludeType): _IncludeTypeObject => {
  const include: _IncludeType = {};

  switch (typeof input) {
    case 'undefined':
    case 'boolean':
      break;
    case 'object':
      Object.keys(input).forEach((key) => {
        const value = generateInclude(input[key]);

        include[key] = Object.keys(value).length ? value : true;
      });
      break;
  }

  return Object.keys(include).length ? { include } : include;
};

export const paginatePrisma = (
  query: Partial<{ [key: string]: string | string[] }>
): PrismaFindManyArgs | undefined => {
  // where
  let where = {};
  if (typeof query.where === 'string') {
    where = JSON.parse(query.where);
  }

  // limit, offset
  let take = typeof query.limit === 'string' ? Number(query.limit) : _.PER_PAGE;
  let skip = typeof query.offset === 'string' ? Number(query.offset) : 0;

  // order
  const orderBy: RequestOrder = {};
  if (typeof query.order === 'string') {
    const order = JSON.parse(query.order);
    Object.keys(order).map((key) => {
      orderBy[key] = typeof order[key] === 'boolean' ? (order[key] ? 'asc' : 'desc') : order[key];
    });
  }

  // pagination
  const page = typeof query.page === 'string' ? Number(query.page) : undefined;

  let perPage: number | undefined;
  if (page !== undefined) {
    perPage = typeof query.perPage === 'string' ? Number(query.perPage) : _.PER_PAGE;
    if (!page || !perPage) {
      return;
    }
  }

  let pagination: RequestPagination | undefined;
  if (page && perPage) {
    take = perPage;
    skip = (page - 1) * perPage;

    pagination = { page, perPage };
  }

  if (!take || isNaN(skip)) {
    return;
  }

  return {
    where,
    take,
    skip,
    orderBy,
    pagination,
  };
};

export const paginateNavigation = (count: number, page?: RequestPagination): ResponsePagination | undefined => {
  if (!page?.page || !page?.perPage) {
    return;
  }

  const pageCount = Math.ceil(count / page.perPage);

  return {
    prev: page.page - 1 >= 1 ? page.page - 1 : undefined,
    next: page.page + 1 <= pageCount ? page.page + 1 : undefined,
    count: pageCount,
  };
};
