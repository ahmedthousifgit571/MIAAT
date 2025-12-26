import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react'

const services = [
  { label: 'Traditional Acupuncture', href: '/services/traditional-acupuncture' },
  { label: 'Pain Management', href: '/services/pain-management' },
  { label: 'Stress & Anxiety Relief', href: '/services/stress-anxiety-relief' },
  { label: 'Fertility Support', href: '/services/fertility-support' },
  { label: 'Cupping Therapy', href: '/services/cupping-therapy' },
  { label: 'Cosmetic Acupuncture', href: '/services/cosmetic-acupuncture' },
]

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Book Appointment', href: '/book' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Educational Videos', href: '/videos' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <Image 
                  src="/images/miatLogo.jpeg" 
                  alt="MIAT Logo" 
                  width={64} 
                  height={64} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-background">
                  Mega Institute of
                </span>
                <span className="text-xs text-background/60 uppercase tracking-widest">
                  Acupuncture Acupressure Therapy
                </span>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Experience the ancient art of healing through traditional Chinese medicine. 
              Our licensed practitioners are dedicated to your wellness journey.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-start gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>(123) 456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@healingtouch.com"
                  className="flex items-start gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>info@healingtouch.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>
                  123 Wellness Street, Suite 100
                  <br />
                  Healing City, HC 12345
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-background/70">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <p>&copy; {new Date().getFullYear()} Mega Institute of Acupuncture Acupressure Therapy. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

