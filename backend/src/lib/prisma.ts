import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL || process.env.MONGODB_URL;

let prisma: any;

if (databaseUrl) {
	// Pass the direct DB URL to the Prisma client via `adapter` (or use `accelerateUrl`).
	prisma = new PrismaClient({
		adapter: { provider: "mongodb", url: databaseUrl },
	} as any);
} else {
	const handler = { get() { throw new Error('No Prisma connection configured. Set MONGODB_URL or DATABASE_URL in .env.'); } };
	prisma = new Proxy({}, handler);
}

export default prisma;