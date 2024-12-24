# Backend Documentation and Guide Blogging Web Application

This document consists of backend documentation for Blogging Web Application.

## File Structure

```sh
server/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── blog.controller.ts
│   │   ├── category.controller.ts
│   │   ├── comment.controller.ts
│   │   └── tag.controller.ts
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   ├── models/
│   │   └── prismaClient.ts
│   ├── routes/
│   │   ├── routes.ts
│   ├── utils/
│   │   └── jwt.utils.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── tsconfig.json
```

## Tools and Technologies Used

`Node.js`,
`Express.js`,
`PostgreSQL`,
`Prisma ORM`,
`TypeScript`

## Project Setup

Initialized the project using the command below:

`npm init -y`

## Install Required Dependencies

`npm install express express-validator jsonwebtoken bcryptjs prisma @prisma/client`

### Dev Dependencies

`npm install -D typescript ts-node @types/express @types/jsonwebtoken @types/bcryptjs nodemon`

## Initialize Prisma

`npx prisma init`

This will give the following output in your terminal:

```sh
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started
```

## Configure TypeScript

Create a `tsconfig.json` file in the server directory

```sh
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "sourceMap": true,
        "noImplicitAny": true,
        "strict": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,}
}
```

This configuration tells TypeScript to compile the code in the `src` directory and output the compiled code in the `dist` directory.

## Configure Nodemon

Add a `nodemon.json` file to automatically restart the server on the code changes

```sh
{
    "watch": ["src/**/*"],
    "ignore": ["node_modules/**/*"],
    "exec": "ts-node src/server.ts",
    "ext": "ts-node src/index.ts"
}
```

## Setting up the Environment Variables

Create a `.env` file to store the database URL and JWT secret.

```sh
DATABASE_URL="your-dburl"
JWT_SECRET="your-jwt-secret"
```

This file is used to store sensitive information such as database URLs and JWT secrets.

## Executing the Project

Run the following command to execute the project

```sh
npm install
npx nodemon
```
