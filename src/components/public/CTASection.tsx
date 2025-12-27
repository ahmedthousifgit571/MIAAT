import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Calendar, MapPin } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="text-primary-foreground">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                  Ready to Start Your Healing Journey?
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl">
                  Take the first step toward better health. Book your
                  consultation today and discover how acupuncture can transform
                  your life.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="rounded-full px-8 text-base"
                  >
                    <Link href="/book">
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <a href="tel:+1234567890">
                      <Phone className="mr-2 h-5 w-5" />
                     (+91) 9841756639
                    </a>
                  </Button>
                </div>
              </div>

              {/* Contact info cards */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground mb-1">
                        Visit Our Clinic
                      </h3>
                      <p className="text-primary-foreground/70 text-sm">
                        Mega Acu Clinic, - Near Maadi Poonga or Thambu Chetty Bus Stop, 15/1, Venkata Iyer Street, Mannady., 
                        <br />
                        Chennai-600001, Tamil Nadu
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground mb-1">
                        Clinic Hours
                      </h3>
                      <p className="text-primary-foreground/70 text-sm">
                        Mon - Thur: 10:30 AM - 12:30 PM
                        <br />
                        Saturday: 10:30 AM - 12:30 PM
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-center text-primary-foreground/60 text-sm">
                  New patients receive a complimentary 15-minute consultation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

