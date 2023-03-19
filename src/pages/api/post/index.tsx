import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import prisma from '@/libraries/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        const posts = await prisma.post.findMany();
        const count = await prisma.post.count();
        res.status(StatusCodes.OK).json({ posts, count });
        break;
      case 'POST':
        const { text } = JSON.parse(req.body);

        const post = await prisma.post.create({
          data: {
            body: text,
          },
        });

        res.status(StatusCodes.OK).json({ post });
        break;
      default:
        res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: ReasonPhrases.METHOD_NOT_ALLOWED });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

export default handler;
