import { LucideIcon, Sparkles, Heart, Brain, Baby, Circle, Flower2 } from 'lucide-react'

export interface ServiceData {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string
  duration: number
  price: number
  icon: LucideIcon
  benefits: string[]
  conditions: string[]
  whatToExpect: string[]
}

export const services: ServiceData[] = [
  {
    id: '1',
    name: 'Traditional Acupuncture',
    slug: 'traditional-acupuncture',
    description: `Traditional acupuncture is a holistic healing practice rooted in ancient Chinese medicine. By inserting thin, sterile needles into specific points on the body, we stimulate the flow of Qi (vital energy) through the meridian pathways. This treatment is effective for a wide range of conditions including chronic pain, stress, anxiety, digestive issues, and hormonal imbalances.`,
    shortDesc: 'Ancient healing technique using fine needles to restore energy balance and promote natural healing.',
    duration: 60,
    price: 95,
    icon: Sparkles,
    benefits: [
      'Restores natural energy flow',
      'Reduces chronic pain and inflammation',
      'Improves sleep quality',
      'Boosts immune system function',
      'Promotes overall well-being',
    ],
    conditions: [
      'Chronic pain',
      'Stress and anxiety',
      'Digestive issues',
      'Hormonal imbalances',
      'Fatigue and low energy',
    ],
    whatToExpect: [
      'Initial consultation and health assessment',
      'Personalized treatment plan',
      'Relaxing 60-minute session',
      'Minimal discomfort with hair-thin needles',
      'Deep relaxation during treatment',
    ],
  },
  {
    id: '2',
    name: 'Pain Management',
    slug: 'pain-management',
    description: `Our specialized pain management acupuncture targets chronic and acute pain conditions with precision and care. Whether you're dealing with back pain, neck tension, migraines, arthritis, or sports injuries, our treatment protocols are designed to provide relief and promote long-term healing.`,
    shortDesc: 'Targeted relief for chronic pain, migraines, arthritis, and injury recovery.',
    duration: 75,
    price: 120,
    icon: Heart,
    benefits: [
      'Reduces inflammation naturally',
      'Releases muscle tension',
      'Improves blood circulation',
      'Activates natural pain relief',
      'Accelerates injury recovery',
    ],
    conditions: [
      'Back and neck pain',
      'Migraines and headaches',
      'Arthritis and joint pain',
      'Sports injuries',
      'Sciatica',
    ],
    whatToExpect: [
      'Thorough pain assessment',
      'Targeted needle placement',
      'Additional techniques as needed',
      'Take-home care recommendations',
      'Follow-up treatment plan',
    ],
  },
  {
    id: '3',
    name: 'Stress & Anxiety Relief',
    slug: 'stress-anxiety-relief',
    description: `In our fast-paced world, stress and anxiety have become increasingly common. Our stress relief acupuncture sessions provide a sanctuary of calm, helping to regulate your nervous system and restore emotional balance.`,
    shortDesc: 'Calming treatments to reduce stress, improve sleep, and restore emotional balance.',
    duration: 60,
    price: 95,
    icon: Brain,
    benefits: [
      'Calms the nervous system',
      'Reduces cortisol levels',
      'Improves sleep quality',
      'Enhances mental clarity',
      'Promotes emotional balance',
    ],
    conditions: [
      'Chronic stress',
      'Anxiety disorders',
      'Insomnia',
      'Depression symptoms',
      'Burnout',
    ],
    whatToExpect: [
      'Peaceful treatment environment',
      'Gentle, calming techniques',
      'Auricular (ear) acupuncture options',
      'Breathing and relaxation guidance',
      'Stress management tips',
    ],
  },
  {
    id: '4',
    name: 'Fertility Support',
    slug: 'fertility-support',
    description: `Our fertility support program combines the wisdom of traditional Chinese medicine with modern understanding of reproductive health. Acupuncture can help regulate menstrual cycles, improve blood flow to reproductive organs, balance hormones, and reduce stress that may impact fertility.`,
    shortDesc: 'Supportive care for natural conception and IVF with hormone balancing treatments.',
    duration: 60,
    price: 110,
    icon: Baby,
    benefits: [
      'Regulates menstrual cycles',
      'Improves reproductive blood flow',
      'Balances hormones naturally',
      'Reduces fertility-related stress',
      'Supports IVF treatments',
    ],
    conditions: [
      'Irregular cycles',
      'PCOS',
      'Endometriosis',
      'Male fertility support',
      'IVF support',
    ],
    whatToExpect: [
      'Comprehensive fertility assessment',
      'Customized treatment protocols',
      'Coordination with fertility specialists',
      'Lifestyle and nutrition guidance',
      'Ongoing supportive care',
    ],
  },
  {
    id: '5',
    name: 'Cupping Therapy',
    slug: 'cupping-therapy',
    description: `Cupping therapy is an ancient technique that uses suction cups placed on the skin to promote healing and relaxation. This treatment is excellent for relieving muscle tension, improving circulation, reducing inflammation, and promoting detoxification.`,
    shortDesc: 'Deep tissue therapy using suction cups to release tension and improve circulation.',
    duration: 45,
    price: 75,
    icon: Circle,
    benefits: [
      'Releases deep muscle tension',
      'Improves blood circulation',
      'Reduces inflammation',
      'Promotes detoxification',
      'Relieves respiratory issues',
    ],
    conditions: [
      'Muscle tension and knots',
      'Back and shoulder pain',
      'Respiratory congestion',
      'Digestive issues',
      'Fatigue',
    ],
    whatToExpect: [
      'Skin assessment and preparation',
      'Strategic cup placement',
      'Comfortable suction levels',
      'Possible temporary marks (normal)',
      'Post-treatment care instructions',
    ],
  },
  {
    id: '6',
    name: 'Cosmetic Acupuncture',
    slug: 'cosmetic-acupuncture',
    description: `Also known as facial rejuvenation acupuncture, this natural anti-aging treatment stimulates collagen production, improves skin elasticity, and promotes a healthy, radiant complexion. A holistic alternative to invasive cosmetic procedures.`,
    shortDesc: 'Natural facial rejuvenation to reduce wrinkles and enhance skin radiance.',
    duration: 90,
    price: 150,
    icon: Flower2,
    benefits: [
      'Stimulates collagen production',
      'Reduces fine lines and wrinkles',
      'Improves skin elasticity',
      'Enhances natural radiance',
      'Addresses skin conditions',
    ],
    conditions: [
      'Fine lines and wrinkles',
      'Sagging skin',
      'Acne and scarring',
      'Uneven skin tone',
      'Puffiness',
    ],
    whatToExpect: [
      'Facial assessment and consultation',
      'Gentle facial needling',
      'Full body balancing points',
      'Facial massage and care',
      'Skincare recommendations',
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((service) => service.slug === slug)
}

export function getAllServices(): ServiceData[] {
  return services
}

