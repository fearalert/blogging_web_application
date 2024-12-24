import app from './app';
import prisma from './models/prismaClient';

const PORT = process.env.PORT || 3000;

const testConnection = async () => {
  try {
    const users = await prisma.user.findMany();
    if (users.length > 0) {
      console.log(users[0].email);
    } else {
      console.log('No users found in the database.');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

testConnection();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
