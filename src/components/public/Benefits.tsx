import { Heart, Zap, Moon, Shield, Leaf, Smile } from 'lucide-react'

const benefits = [
  {
    icon: Heart,
    title: 'Natural Pain Relief',
    description:
      'Reduce chronic pain, headaches, and body aches without medication through targeted acupuncture points.',
  },
  {
    icon: Zap,
    title: 'Restore Energy Flow',
    description:
      'Unblock stagnant Qi energy and revitalize your body\'s natural healing mechanisms for improved vitality.',
  },
  {
    icon: Moon,
    title: 'Better Sleep Quality',
    description:
      'Address insomnia and sleep disorders naturally by calming your nervous system and promoting relaxation.',
  },
  {
    icon: Shield,
    title: 'Boost Immunity',
    description:
      'Strengthen your immune system and enhance your body\'s ability to fight illness and recover faster.',
  },
  {
    icon: Leaf,
    title: 'Reduce Stress & Anxiety',
    description:
      'Find calm in the chaos with treatments that regulate cortisol and promote mental clarity.',
  },
  {
    icon: Smile,
    title: 'Improve Overall Wellness',
    description:
      'Experience holistic healing that addresses root causes, not just symptoms, for lasting health.',
  },
]

export default function Benefits() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
            Why Choose Acupuncture
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Ancient Wisdom for Modern Healing
          </h2>
          <p className="text-lg text-muted-foreground">
            Acupuncture works with your body&apos;s natural healing systems to restore
            balance, reduce pain, and improve your quality of life—without
            medications or invasive procedures.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="h-7 w-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}




