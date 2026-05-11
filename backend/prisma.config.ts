import "dotenv/config";

export default {
  schema: "prisma/schema.prisma",

  datasource: {
    url: process.env.MONGODB_URL,
  },

  migrations: {
    path: "prisma/migrations",
  },
};