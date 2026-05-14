"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
module.exports = {
    schema: "prisma/schema.prisma",
    datasource: {
        url: process.env.MONGODB_URL,
    },
    migrations: {
        path: "prisma/migrations",
    },
};
