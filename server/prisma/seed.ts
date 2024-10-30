import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a Category
  const category = await prisma.category.create({
    data: {
      name: 'Technology',
    },
  });

  // Create Tags
  const tag1 = await prisma.tag.create({
    data: { name: 'JavaScript' },
  });

  const tag2 = await prisma.tag.create({
    data: { name: 'TypeScript' },
  });

  // Create a BlogPost
  const blogPost = await prisma.blogPost.create({
    data: {
      title: 'Understanding TypeScript',
      content: 'TypeScript is a superset of JavaScript...',
      categoryID: category.id,
      authorID: 1, // Replace with a valid User ID from your database
    },
  });

  // Link Tags to BlogPost through BlogPostTag model
  await prisma.blogPostTag.createMany({
    data: [
      { blogPostID: blogPost.id, tagID: tag1.id },
      { blogPostID: blogPost.id, tagID: tag2.id },
    ],
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
