import { LucideIcon, Sparkles, Flower2, Circle, Flame, Leaf, Droplets, Footprints } from 'lucide-react'

export interface ServiceData {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string
  duration: number
  price: number
  icon: LucideIcon
  image: string
  benefits: string[]
  conditions: string[]
  whatToExpect: string[]
}

export const services: ServiceData[] = [
  {
    id: '1',
    name: 'Acupuncture',
    slug: 'acupuncture',
    description: `Traditional acupuncture is a holistic healing practice rooted in ancient Chinese medicine. By inserting thin, sterile needles into specific points on the body, we stimulate the flow of Qi (vital energy) through the meridian pathways. This treatment is effective for a wide range of conditions including chronic pain, stress, anxiety, digestive issues, and hormonal imbalances.`,
    shortDesc: 'Ancient healing technique using fine needles to restore energy balance and promote natural healing.',
    duration: 60,
    price: 95,
    icon: Sparkles,
    image: '/images/accupuncture.jpg',
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
    name: 'Facial/Cosmetic Acupuncture and Cupping',
    slug: 'facial-cosmetic-acupuncture-cupping',
    description: `A comprehensive facial treatment combining cosmetic acupuncture and cupping therapy. This natural anti-aging treatment stimulates collagen production, improves skin elasticity, promotes circulation, and enhances your natural radiance. A holistic alternative to invasive cosmetic procedures that addresses both facial aesthetics and overall wellness.`,
    shortDesc: 'Natural facial rejuvenation combining acupuncture and cupping to reduce wrinkles and enhance skin radiance.',
    duration: 90,
    price: 150,
    icon: Flower2,
    image: '/images/facialAcupuncture.jpg',
    benefits: [
      'Stimulates collagen production',
      'Reduces fine lines and wrinkles',
      'Improves skin elasticity and tone',
      'Enhances facial blood circulation',
      'Promotes natural radiance',
      'Addresses skin conditions',
    ],
    conditions: [
      'Fine lines and wrinkles',
      'Sagging skin',
      'Acne and scarring',
      'Uneven skin tone',
      'Puffiness and dark circles',
      'Dull complexion',
    ],
    whatToExpect: [
      'Facial assessment and consultation',
      'Gentle facial needling',
      'Facial cupping therapy',
      'Full body balancing points',
      'Facial massage and care',
      'Skincare recommendations',
    ],
  },
  {
    id: '3',
    name: 'Dry Cupping',
    slug: 'dry-cupping',
    description: `Dry cupping therapy uses suction cups placed on the skin without any incisions. This ancient technique creates negative pressure to promote healing, release muscle tension, improve circulation, and reduce inflammation. Excellent for relieving pain, enhancing recovery, and promoting detoxification.`,
    shortDesc: 'Suction cup therapy to release muscle tension, improve circulation, and promote healing.',
    duration: 45,
    price: 75,
    icon: Circle,
    image: '/images/drycupping.webp',
    benefits: [
      'Releases deep muscle tension',
      'Improves blood circulation',
      'Reduces inflammation',
      'Promotes detoxification',
      'Relieves respiratory issues',
      'Accelerates recovery',
    ],
    conditions: [
      'Muscle tension and knots',
      'Back and shoulder pain',
      'Respiratory congestion',
      'Sports injuries',
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
    id: '4',
    name: 'Fire Cupping',
    slug: 'fire-cupping',
    description: `Fire cupping is a traditional technique where fire is used to create a vacuum inside glass cups before placing them on the skin. This method enhances blood flow, releases deep tissue tension, and promotes healing. The warmth and suction work together to provide therapeutic benefits for various musculoskeletal conditions.`,
    shortDesc: 'Traditional fire-heated cupping for deep tissue release and enhanced healing.',
    duration: 50,
    price: 85,
    icon: Flame,
    image: '/images/fireCupping.jpg',
    benefits: [
      'Enhances deep blood flow',
      'Releases stubborn muscle tension',
      'Provides warming therapeutic effect',
      'Improves tissue oxygenation',
      'Reduces chronic pain',
      'Promotes faster healing',
    ],
    conditions: [
      'Chronic back pain',
      'Neck and shoulder tension',
      'Arthritis symptoms',
      'Sports-related injuries',
      'Muscle stiffness',
      'Poor circulation',
    ],
    whatToExpect: [
      'Detailed health consultation',
      'Traditional fire cupping technique',
      'Warm, therapeutic sensation',
      'Professional cup placement',
      'Temporary circular marks',
      'Aftercare guidance',
    ],
  },
  {
    id: '5',
    name: 'Herbal Cupping',
    slug: 'herbal-cupping',
    description: `Herbal cupping combines traditional cupping therapy with the therapeutic benefits of Chinese medicinal herbs. The cups are infused with herbal preparations that penetrate the skin during treatment, enhancing healing properties and providing additional therapeutic benefits for various conditions.`,
    shortDesc: 'Cupping therapy enhanced with traditional Chinese medicinal herbs for amplified healing.',
    duration: 60,
    price: 95,
    icon: Leaf,
    image: '/images/herbalCupping.webp',
    benefits: [
      'Combines cupping with herbal medicine',
      'Enhanced therapeutic effects',
      'Promotes deeper detoxification',
      'Nourishes skin and tissues',
      'Reduces inflammation naturally',
      'Strengthens immune response',
    ],
    conditions: [
      'Chronic inflammation',
      'Skin conditions',
      'Respiratory issues',
      'Muscle and joint pain',
      'Weakened immunity',
      'Digestive problems',
    ],
    whatToExpect: [
      'Personalized herbal selection',
      'Custom herbal preparation',
      'Combined cupping treatment',
      'Aromatic therapeutic experience',
      'Herbal skin benefits',
      'Holistic healing approach',
    ],
  },
  {
    id: '6',
    name: 'Wet Cupping (Hijama)',
    slug: 'wet-cupping-hijama',
    description: `Wet cupping, also known as Hijama, is a traditional Islamic medical practice that involves controlled superficial incisions followed by cupping to draw out a small amount of blood. This detoxifying therapy is believed to remove harmful substances from the body, improve circulation, and promote overall health and wellness.`,
    shortDesc: 'Traditional Islamic therapy combining cupping with controlled bloodletting for deep detoxification.',
    duration: 75,
    price: 120,
    icon: Droplets,
    image: '/images/wetCupping.webp',
    benefits: [
      'Deep body detoxification',
      'Removes stagnant blood',
      'Improves blood circulation',
      'Boosts immune function',
      'Reduces chronic pain',
      'Promotes overall wellness',
    ],
    conditions: [
      'Chronic migraines',
      'High blood pressure',
      'Chronic pain conditions',
      'Poor circulation',
      'Detoxification needs',
      'General health maintenance',
    ],
    whatToExpect: [
      'Thorough health screening',
      'Sterile procedure area',
      'Professional hijama technique',
      'Minimal discomfort',
      'Post-procedure care kit',
      'Detailed recovery instructions',
    ],
  },
  {
    id: '7',
    name: 'Reflexology',
    slug: 'reflexology',
    description: `Reflexology is a therapeutic practice that applies pressure to specific points on the feet, hands, and ears. These reflex points correspond to different organs and systems throughout the body. By stimulating these points, reflexology promotes healing, reduces stress, improves circulation, and supports overall health and balance.`,
    shortDesc: 'Therapeutic pressure point therapy on feet, hands, and ears to promote whole-body healing.',
    duration: 60,
    price: 80,
    icon: Footprints,
    image: '/images/reflexology.webp',
    benefits: [
      'Promotes deep relaxation',
      'Improves blood circulation',
      'Reduces stress and tension',
      'Supports organ function',
      'Enhances energy levels',
      'Balances body systems',
    ],
    conditions: [
      'Stress and anxiety',
      'Insomnia',
      'Digestive issues',
      'Headaches and migraines',
      'Hormonal imbalances',
      'Poor circulation',
    ],
    whatToExpect: [
      'Comfortable seating position',
      'Foot, hand, or ear assessment',
      'Targeted pressure point work',
      'Deeply relaxing experience',
      'No oils or lotions needed',
      'Self-care recommendations',
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((service) => service.slug === slug)
}

export function getAllServices(): ServiceData[] {
  return services
}
