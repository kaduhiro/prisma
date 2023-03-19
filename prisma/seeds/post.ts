import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const postsData: Prisma.PostCreateInput[] = [
  {
    body: 'Posts: 10 Reasons to use Prisma.'
  },
  {
    body: 'Intuitive Data Modeling: Prisma makes it easy to define your data model using a powerful and intuitive schema definition language.',
  },
  {
    body: 'Declarative Queries: You can write expressive and declarative queries using Prisma Client that will be automatically translated into efficient SQL queries.',
  },
  {
    body: 'Type-Safe Database Access: Prisma provides type-safe database access by generating strongly typed Prisma Client APIs based on your data model.',
  },
  {
    body: "Realtime Data Sync: Prisma's realtime data sync feature enables you to receive updates to your data in real-time, without having to poll the database.",
  },
  {
    body: 'GraphQL API: Prisma supports generating a GraphQL API for your data model, providing a powerful and flexible way to interact with your data.',
  },
  {
    body: "Migrations: Prisma's migrations feature enables you to evolve your data model over time, while maintaining the integrity of your data.",
  },
  {
    body: 'Database Agnostic: Prisma supports multiple databases, including MySQL, PostgreSQL, and SQLite, making it easy to switch between databases without changing your code.',
  },
  {
    body: 'Prisma Studio: Prisma Studio is a web-based GUI that allows you to explore and manage your data in a user-friendly way.',
  },
  {
    body: 'Authentication and Authorization: Prisma provides built-in support for authentication and authorization, enabling you to secure your data easily.',
  },
  {
    body: 'Performance: Prisma is designed with performance in mind, using modern technologies and best practices to ensure that your database operations are fast and efficient.',
  },
];

const transfer = async () => {
  const posts = [];

  for (const data of postsData) {
    const post = prisma.post.create({
      data: data,
    });
    posts.push(post);
  }

  return await prisma.$transaction(posts);
};

const main = async () => {
  await transfer();
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
