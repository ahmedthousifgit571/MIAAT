const dotenv = require('dotenv');
const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const ws = require('ws');

// Load environment variables
dotenv.config();

// Configure Neon for WebSocket in Node.js environment
neonConfig.webSocketConstructor = ws;

async function main() {
  console.log('🌱 Starting quick seed...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
  
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
    
    const admin = await prisma.user.upsert({
      where: { email: process.env.ADMIN_EMAIL || 'admin@healingtouch.com' },
      update: {},
      create: {
        email: process.env.ADMIN_EMAIL || 'admin@healingtouch.com',
        password: hashedPassword,
        name: 'Dr. Thameem Ansari',
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin user created:', admin.email);

    // Verify user was created
    const users = await prisma.user.findMany();
    console.log('Total users in database:', users.length);
    
    console.log('🎉 Quick seed completed!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
