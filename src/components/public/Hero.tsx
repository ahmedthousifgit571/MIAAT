import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-primary/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Floating decorative circles */}
      <div className="absolute top-40 left-20 w-4 h-4 bg-primary/20 rounded-full animate-pulse-gentle hidden lg:block" />
      <div className="absolute top-60 right-40 w-3 h-3 bg-accent/30 rounded-full animate-pulse-gentle delay-300 hidden lg:block" />
      <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-primary/30 rounded-full animate-pulse-gentle delay-500 hidden lg:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in">
              <Star className="h-4 w-4 fill-current" />
              <span>Trusted by 2,000+ Patients</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6 animate-fade-in-up">
              Experience the{' '}
              <span className="text-primary">Healing Power</span> of Traditional
              Acupuncture
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up delay-100">
              Restore balance to your body and mind with personalized treatments
              rooted in 2,500 years of ancient wisdom. Relief from pain, stress,
              and chronic conditions awaits.
            </p>

            {/* Benefits list */}
            <ul className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 mb-8 animate-fade-in-up delay-200">
              {[
                'Natural Pain Relief',
                'Stress Reduction',
                'Improved Sleep',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-foreground/80">
                  <Check className="h-5 w-5 text-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
              <Button asChild size="lg" className="rounded-full px-8 text-base">
                <Link href="/book">
                  Book Your First Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 text-base"
              >
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 pt-8 border-t border-border animate-fade-in-up delay-400">
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-primary">16+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-primary">2,000+</div>
                  <div className="text-sm text-muted-foreground">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-primary">4.9</div>
                  <div className="text-sm text-muted-foreground">Star Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:order-last animate-fade-in delay-200">
            <div className="relative aspect-[4/5] max-w-lg mx-auto">
              {/* Main image placeholder */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                <Image
                  src="/images/religiousCupping.jpg"
                  alt="Professional acupuncture treatment session"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Fallback gradient if image doesn't load */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 mix-blend-overlay" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-lg p-4 border border-border animate-fade-in-up delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Licensed & Certified</div>
                    <div className="text-sm text-muted-foreground">NCCAOM Board Certified</div>
                  </div>
                </div>
              </div>

              {/* Rating card */}
              <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg p-4 border border-border animate-fade-in-up delay-400">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <div className="text-sm font-medium text-foreground">Excellent Care</div>
                <div className="text-xs text-muted-foreground">Based on 200+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

