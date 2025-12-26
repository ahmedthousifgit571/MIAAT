import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Award,
  GraduationCap,
  Heart,
  Users,
  Calendar,
  CheckCircle,
  Leaf,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Meet Dr. Sarah Chen',
  description:
    'Learn about Healing Touch Acupuncture and meet Dr. Sarah Chen, our NCCAOM certified acupuncturist with over 15 years of experience in traditional Chinese medicine.',
  keywords: [
    'about acupuncture clinic',
    'licensed acupuncturist',
    'NCCAOM certified',
    'traditional chinese medicine practitioner',
    'Dr Sarah Chen',
    'acupuncture experience',
  ],
  openGraph: {
    title: 'About Healing Touch Acupuncture',
    description:
      'Meet Dr. Sarah Chen and learn about our mission to provide exceptional acupuncture care.',
  },
}

const credentials = [
  {
    icon: Award,
    title: 'NCCAOM Board Certified',
    description: 'National certification in acupuncture and Chinese medicine',
  },
  {
    icon: GraduationCap,
    title: 'Doctor of Acupuncture',
    description: 'DAOM from Pacific College of Health and Science',
  },
  {
    icon: Users,
    title: 'Masters in TCM',
    description: 'Masters degree in Traditional Chinese Medicine',
  },
  {
    icon: Calendar,
    title: '15+ Years Experience',
    description: 'Dedicated practice and continuous learning',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Compassionate Care',
    description:
      'We treat every patient with empathy, understanding, and respect, creating a safe space for healing.',
  },
  {
    icon: Leaf,
    title: 'Holistic Approach',
    description:
      'We address the whole person—mind, body, and spirit—not just symptoms, for lasting wellness.',
  },
  {
    icon: CheckCircle,
    title: 'Evidence-Based Practice',
    description:
      'We combine ancient wisdom with modern research to provide effective, safe treatments.',
  },
]

const timeline = [
  {
    year: '2008',
    title: 'Journey Begins',
    description:
      'Dr. Chen completes her Masters in Traditional Chinese Medicine and begins her practice.',
  },
  {
    year: '2012',
    title: 'Advanced Training',
    description:
      'Completes specialized training in pain management and fertility support in Beijing, China.',
  },
  {
    year: '2015',
    title: 'Doctorate Achieved',
    description:
      'Earns Doctor of Acupuncture and Oriental Medicine (DAOM) degree.',
  },
  {
    year: '2018',
    title: 'Healing Touch Founded',
    description:
      'Opens Healing Touch Acupuncture clinic to serve the local community.',
  },
  {
    year: '2023',
    title: '2,000+ Patients',
    description:
      'Reaches milestone of helping over 2,000 patients on their healing journeys.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/doctor-portrait.jpg"
                alt="Dr. Sarah Chen - Licensed Acupuncturist"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Fallback gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 mix-blend-overlay" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 bg-primary text-primary-foreground rounded-xl shadow-lg p-6 text-center">
              <div className="font-serif text-4xl font-bold mb-1">15+</div>
              <div className="text-sm text-primary-foreground/80">
                Years of
                <br />
                Excellence
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
              About Your Practitioner
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Dr. Sarah Chen, L.Ac., DAOM
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over 15 years of dedicated practice in Traditional Chinese
              Medicine, Dr. Chen brings a unique blend of ancient wisdom and
              modern understanding to every patient encounter.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Her journey into acupuncture began after witnessing the profound
              healing effects it had on her grandmother&apos;s chronic pain. This
              personal experience ignited a passion that has driven her to help
              thousands of patients find relief and restore balance in their
              lives.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Dr. Chen specializes in pain management, stress and anxiety
              disorders, women&apos;s health, and fertility support. She believes in
              treating the whole person, not just symptoms, and takes time to
              understand each patient&apos;s unique health journey.
            </p>

            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/book">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Credentials & Training
            </h2>
            <p className="text-muted-foreground">
              Dr. Chen&apos;s extensive education and certifications ensure you
              receive the highest quality care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((credential) => (
              <div
                key={credential.title}
                className="bg-card rounded-xl p-6 border border-border text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <credential.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {credential.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {credential.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Guided by Compassion, Driven by Results
            </h2>
            <p className="text-muted-foreground">
              Our values shape every interaction and treatment at Healing Touch
              Acupuncture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Milestones in Healing
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="relative pl-8 pb-12 last:pb-0">
                {/* Line */}
                {index !== timeline.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-primary/20" />
                )}
                {/* Dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                </div>
                {/* Content */}
                <div className="bg-card rounded-xl p-6 border border-border ml-4">
                  <div className="text-sm font-semibold text-primary mb-1">
                    {item.year}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 lg:p-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Experience the difference that compassionate, personalized care
              can make. Book your first appointment today.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full px-8"
            >
              <Link href="/book">
                Book Your Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

