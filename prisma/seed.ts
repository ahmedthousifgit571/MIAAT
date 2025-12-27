import { PrismaClient, Role } from '@prisma/client'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import ws from 'ws'

// Load environment variables
dotenv.config()

// Configure Neon for WebSocket in Node.js environment
neonConfig.webSocketConstructor = ws

// Create Neon connection pool
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

const prisma = new PrismaClient({
  adapter,
  log: ['error'],
})

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@healingtouch.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@healingtouch.com',
      password: hashedPassword,
      name: 'Dr. Thameem Ansari',
      role: Role.ADMIN,
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create services
  const services = [
    {
      name: 'Traditional Acupuncture',
      slug: 'traditional-acupuncture',
      description: `Traditional acupuncture is a holistic healing practice rooted in ancient Chinese medicine. By inserting thin, sterile needles into specific points on the body, we stimulate the flow of Qi (vital energy) through the meridian pathways. This treatment is effective for a wide range of conditions including chronic pain, stress, anxiety, digestive issues, and hormonal imbalances. Each session is tailored to your individual needs, creating a personalized healing experience that addresses both symptoms and root causes.`,
      shortDesc: 'Ancient healing technique using fine needles to restore energy balance and promote natural healing.',
      duration: 60,
      price: 95.00,
      icon: 'Sparkles',
      sortOrder: 1,
    },
    {
      name: 'Pain Management',
      slug: 'pain-management',
      description: `Our specialized pain management acupuncture targets chronic and acute pain conditions with precision and care. Whether you're dealing with back pain, neck tension, migraines, arthritis, or sports injuries, our treatment protocols are designed to provide relief and promote long-term healing. By addressing both the physical symptoms and underlying energy imbalances, we help reduce inflammation, improve circulation, and activate your body's natural pain-relief mechanisms.`,
      shortDesc: 'Targeted relief for chronic pain, migraines, arthritis, and injury recovery.',
      duration: 75,
      price: 120.00,
      icon: 'Heart',
      sortOrder: 2,
    },
    {
      name: 'Stress & Anxiety Relief',
      slug: 'stress-anxiety-relief',
      description: `In our fast-paced world, stress and anxiety have become increasingly common. Our stress relief acupuncture sessions provide a sanctuary of calm, helping to regulate your nervous system and restore emotional balance. Through carefully selected acupuncture points, we work to calm the mind, improve sleep quality, reduce tension, and enhance overall emotional well-being. Many patients report feeling deeply relaxed and more centered after just one session.`,
      shortDesc: 'Calming treatments to reduce stress, improve sleep, and restore emotional balance.',
      duration: 60,
      price: 95.00,
      icon: 'Brain',
      sortOrder: 3,
    },
    {
      name: 'Fertility Support',
      slug: 'fertility-support',
      description: `Our fertility support program combines the wisdom of traditional Chinese medicine with modern understanding of reproductive health. Acupuncture can help regulate menstrual cycles, improve blood flow to reproductive organs, balance hormones, and reduce stress that may impact fertility. Whether you're trying to conceive naturally or undergoing IVF, our treatments are designed to support your journey to parenthood with compassion and expertise.`,
      shortDesc: 'Supportive care for natural conception and IVF with hormone balancing treatments.',
      duration: 60,
      price: 110.00,
      icon: 'Baby',
      sortOrder: 4,
    },
    {
      name: 'Cupping Therapy',
      slug: 'cupping-therapy',
      description: `Cupping therapy is an ancient technique that uses suction cups placed on the skin to promote healing and relaxation. This treatment is excellent for relieving muscle tension, improving circulation, reducing inflammation, and promoting detoxification. The cups create a vacuum effect that draws blood to the surface, accelerating healing and releasing deep-seated tension. Often combined with acupuncture for enhanced results.`,
      shortDesc: 'Deep tissue therapy using suction cups to release tension and improve circulation.',
      duration: 45,
      price: 75.00,
      icon: 'Circle',
      sortOrder: 5,
    },
    {
      name: 'Cosmetic Acupuncture',
      slug: 'cosmetic-acupuncture',
      description: `Also known as facial rejuvenation acupuncture, this natural anti-aging treatment stimulates collagen production, improves skin elasticity, and promotes a healthy, radiant complexion. Fine needles are placed in specific facial points to increase blood circulation, reduce fine lines and wrinkles, and address concerns like acne, rosacea, and uneven skin tone. A holistic alternative to invasive cosmetic procedures.`,
      shortDesc: 'Natural facial rejuvenation to reduce wrinkles and enhance skin radiance.',
      duration: 90,
      price: 150.00,
      icon: 'Flower',
      sortOrder: 6,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
  }
  console.log('✅ Services created:', services.length)

  // Create default availability (Monday to Friday, 9 AM to 5 PM)
  const defaultAvailability = [
    { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isActive: true }, // Monday
    { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isActive: true }, // Tuesday
    { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isActive: true }, // Wednesday
    { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isActive: true }, // Thursday
    { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isActive: true }, // Friday
    { dayOfWeek: 6, startTime: '10:00', endTime: '14:00', isActive: true }, // Saturday (half day)
    { dayOfWeek: 0, startTime: '00:00', endTime: '00:00', isActive: false }, // Sunday (closed)
  ]

  for (const availability of defaultAvailability) {
    await prisma.availability.upsert({
      where: { dayOfWeek: availability.dayOfWeek },
      update: availability,
      create: availability,
    })
  }
  console.log('✅ Default availability created')

  console.log('🎉 Database seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

