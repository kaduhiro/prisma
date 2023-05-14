import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { singular } from 'pluralize';

import { _ } from '@/constants';
import { generateInclude, paginateNavigation, paginatePrisma } from '@/libraries/_';
import prisma from '@/libraries/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const key = singular(req.query.key?.toString() ?? '');

    const entity: Partial<{ [key: string]: any }> = prisma[key as keyof typeof prisma];
    if (typeof entity === 'undefined') {
      res.status(StatusCodes.FORBIDDEN).json({ message: ReasonPhrases.FORBIDDEN });
    }

    switch (req.method) {
      case 'GET': {
        const prismaArgs = paginatePrisma(req.query);
        if (!prismaArgs) {
          return res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
        }

        const { pagination, ...args } = prismaArgs;

        const data = await entity.findMany({
          ...args,
          ...generateInclude(_.INCLUDE?.[key]),
        });
        const count = await entity.count({ where: args.where });

        const page = paginateNavigation(count, pagination);

        res.status(StatusCodes.OK).json({ data, count, page });
        break;
      }
      case 'POST': {
        const { createdAt, updatedAt, ...body } = JSON.parse(req.body);

        const data = await entity.create({
          data: body,
        });

        res.status(StatusCodes.OK).json({ data });
        break;
      }
      default:
        res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: ReasonPhrases.METHOD_NOT_ALLOWED });
    }
  } catch (error) {
    // FIXME: not working in this version
    // if (error instanceof PrismaClientKnownRequestError) {
    if (error instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
};

export default handler;
