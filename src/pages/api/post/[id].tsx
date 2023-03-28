import { Post } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import prisma from '@/libraries/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let post: Post | null;

  try {
    const id = Number(req.query.id);

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'ID is required.' });
    }

    switch (req.method) {
      case 'GET':
        post = await prisma.post.findFirst({
          where: { id },
        });

        res.status(StatusCodes.OK).json({ post });
        break;
      case 'PUT':
        post = JSON.parse(req.body) as Post;

        post = await prisma.post.upsert({
          where: { id },
          create: post,
          update: { body: post.body },
        });

        res.status(StatusCodes.OK).json({ post });
        break;
      case 'PATCH':
        post = JSON.parse(req.body) as Post;

        post = await prisma.post.update({
          where: { id },
          data: { body: post.body },
        });

        res.status(StatusCodes.OK).json({ post });
        break;
      case 'DELETE':
        post = await prisma.post.delete({
          where: { id },
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
