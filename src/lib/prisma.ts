import { PrismaClient } from '@prisma/client'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

// Get DATABASE_URL - Next.js loads .env automatically
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL environment variable is not set. Please check your .env file.'
  )
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configure Neon for WebSocket in Node.js environment
neonConfig.webSocketConstructor = ws

// Create Neon connection pool
const pool = new Pool({ connectionString: databaseUrl })

// Create Prisma adapter
const adapter = new PrismaNeon(pool)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma





