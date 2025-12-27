const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables first
dotenv.config();

async function main() {
  console.log('🌱 Starting direct seed...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
  
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // Use pg directly for simple inserts
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
    const email = process.env.ADMIN_EMAIL || 'admin@healingtouch.com';
    
    // Check if user exists
    const checkResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (checkResult.rows.length > 0) {
      console.log('✅ Admin user already exists:', email);
    } else {
      // Insert admin user
      const result = await pool.query(
        `INSERT INTO users (id, email, password, name, role, "createdAt", "updatedAt") 
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, NOW(), NOW()) 
         RETURNING *`,
        [email, hashedPassword, 'Dr. Thameem Ansari', 'ADMIN']
      );
      console.log('✅ Admin user created:', result.rows[0].email);
    }

    // Verify users
    const users = await pool.query('SELECT email, name, role FROM users');
    console.log('Total users in database:', users.rows.length);
    users.rows.forEach(u => console.log(`  - ${u.email} (${u.role})`));
    
    console.log('🎉 Direct seed completed!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
