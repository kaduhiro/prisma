import { _ } from '@/constants';
import { PrismaFindManyArgs, RequestOrder, RequestPagination, ResponsePagination } from '@/types';

type _Include = { include: _Include } | true;

export const generateInclude = (input?: Record<string, any>): _Include => {
  const include: _Include = {} as _Include;

  if (!input || !Object.keys(input).length) {
    return include;
  }

  Object.keys(input).forEach((key) => {
    if (Object.keys(input[key]).length > 0) {
      include[key] = generateInclude(input[key]);
    } else {
      include[key] = input[key] ? true : false;
    }
  });

  return { include };
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
