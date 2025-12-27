import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, GraduationCap, Users, Calendar } from 'lucide-react'

const credentials = [
  {
    icon: Award,
    title: 'NCCAOM Certified',
    description: 'National certification in acupuncture',
  },
  {
    icon: GraduationCap,
    title: 'Masters in TCM',
    description: 'Advanced traditional Chinese medicine',
  },
  {
    icon: Users,
    title: '2,000+ Patients',
    description: 'Successfully treated and healed',
  },
  {
    icon: Calendar,
    title: '15+ Years',
    description: 'Of dedicated practice',
  },
]

export default function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/doctor.jpg"
                alt="Dr. Thameem Ansari - Licensed Acupuncturist"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Fallback gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 mix-blend-overlay" />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 bg-primary text-primary-foreground rounded-xl shadow-lg p-6 text-center">
              <div className="font-serif text-4xl font-bold mb-1">16+</div>
              <div className="text-sm text-primary-foreground/80">
                Years of
                <br />
                Experience
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
              Meet Your Practitioner
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Dr. Thameem Ansari, L.Ac., DAOM
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over 15 years of experience in traditional Chinese medicine,
              Dr. Chen combines ancient healing wisdom with modern understanding
              to provide personalized care for each patient.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Her holistic approach addresses not just symptoms, but the root
              causes of imbalance, helping patients achieve lasting wellness and
              vitality. She specializes in pain management, stress relief, and
              women&apos;s health, including fertility support.
            </p>

            {/* Credentials grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {credentials.map((credential) => (
                <div
                  key={credential.title}
                  className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <credential.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      {credential.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {credential.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/about">
                Learn More About Dr. Chen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}




