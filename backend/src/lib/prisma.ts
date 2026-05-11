import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL || process.env.MONGODB_URL;

let prisma: any;

if (databaseUrl) {
	// Use the environment datasource URL (MONGODB_URL or DATABASE_URL).
	// Prisma will read the URL from the env as configured in prisma/schema.prisma.
	prisma = new PrismaClient();
} else {
	const handler = { get() { throw new Error('No Prisma connection configured. Set MONGODB_URL or DATABASE_URL in .env.'); } };
	prisma = new Proxy({}, handler);
}

export default prisma;