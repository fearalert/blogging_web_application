import app from './app';
import prisma from './models/prismaClient';

const PORT = process.env.PORT || 3000;

const testConnection = async () => {
  try {
    const users = await prisma.user.findMany();
    console.log('Connection successful, users:', users[0].email);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

testConnection();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
