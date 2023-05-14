import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { singular } from 'pluralize';

import { _ } from '@/constants';
import { generateInclude } from '@/libraries/_';
import prisma from '@/libraries/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = singular(req.query.key?.toString() ?? '');

  const entity: Partial<{ [key: string]: any }> = prisma[key as keyof typeof prisma];
  if (typeof entity === 'undefined') {
    res.status(StatusCodes.FORBIDDEN).json({ message: ReasonPhrases.FORBIDDEN });
  }

  try {
    const id: number | string = Number(req.query.id) ? Number(req.query.id) : String(req.query.id);

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'ID is required.' });
    }

    switch (req.method) {
      case 'GET': {
        const args = {
          ...generateInclude(_.INCLUDE?.[key]),
        };

        const data = await entity.findFirst({
          ...args,
          where: { id },
        });

        if (!data) {
          return res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
        }

        res.status(StatusCodes.OK).json({ data });
        break;
      }
      case 'PUT': {
        const create = JSON.parse(req.body);
        const { id: _, createdAt, updatedAt, ...update } = create;

        const data = await entity.upsert({
          where: { id },
          create,
          update,
        });

        res.status(StatusCodes.OK).json({ data });
        break;
      }
      case 'PATCH': {
        const { id: _, createdAt, updatedAt, ...body } = JSON.parse(req.body);

        const data = await entity.update({
          where: { id },
          data: body,
        });

        res.status(StatusCodes.OK).json({ data });
        break;
      }
      case 'DELETE': {
        const data = await entity.delete({
          where: { id },
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
