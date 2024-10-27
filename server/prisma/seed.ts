import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.create({
    data: {
      name: 'Technology',
    },
  });

  const tag1 = await prisma.tag.create({
    data: { name: 'JavaScript' },
  });

  const tag2 = await prisma.tag.create({
    data: { name: 'TypeScript' },
  });

  await prisma.blogPost.create({
    data: {
      title: 'Understanding TypeScript',
      content: 'TypeScript is a superset of JavaScript...',
      categoryID: category.id,
      tags: {
        connect: [{ id: tag1.id }, { id: tag2.id }],
      },
      authorID: 1,
    },
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
