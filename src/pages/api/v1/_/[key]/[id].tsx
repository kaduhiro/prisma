import { PrismaClient } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { singular } from 'pluralize';

import { _ } from '@/constants';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = singular(req.query.key as string);

  const prisma = new PrismaClient();
  if (!Object.keys(prisma).includes(key)) {
    res.status(StatusCodes.FORBIDDEN).json({ message: ReasonPhrases.FORBIDDEN });
  }

  try {
    let id: number | string = Number(req.query.id) ? Number(req.query.id) : String(req.query.id);

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'ID is required.' });
    }

    switch (req.method) {
      case 'GET': {
        const args = _.PRISMA_ARGS?.[key] ?? {};

        const data = await prisma[key].findFirst({
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
        let { id: _, createdAt, updatedAt, ...update } = create;

        const data = await prisma[key].upsert({
          where: { id },
          create,
          update,
        });

        res.status(StatusCodes.OK).json({ data });
        break;
      }
      case 'PATCH': {
        let { id: _, createdAt, updatedAt, ...data } = JSON.parse(req.body);

        data = await prisma[key].update({
          where: { id },
          data,
        });

        res.status(StatusCodes.OK).json({ data });
        break;
      }
      case 'DELETE': {
        const data = await prisma[key].delete({
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
    if (String(error.message).includes('prisma.')) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
};

export default handler;
