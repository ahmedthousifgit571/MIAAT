'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions about our services or ready to start your healing
            journey? Reach out to us and we&apos;ll get back to you promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact form */}
          <div className="bg-card rounded-2xl p-8 lg:p-10 border border-border shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Message Sent!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Thank you for contacting us. We&apos;ll get back to you within
                  24 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="rounded-full"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your health concerns or questions..."
                      rows={5}
                      required
                      className="rounded-lg resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            {/* Direct contact */}
            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <a
                  href="tel:+1234567890"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-1">Phone</div>
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                      (123) 456-7890
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:info@healingtouch.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-1">Email</div>
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                      info@healingtouch.com
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-1">
                      Address
                    </div>
                    <div className="text-muted-foreground">
                      123 Wellness Street, Suite 100
                      <br />
                      Healing City, HC 12345
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Clinic Hours
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground">Monday - Friday</span>
                  <span className="text-muted-foreground">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground">Saturday</span>
                  <span className="text-muted-foreground">
                    10:00 AM - 2:00 PM
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-foreground">Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </div>
            </div>

            {/* Quick book CTA */}
            <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
              <h3 className="font-serif text-xl font-semibold mb-3">
                Ready to Book?
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Skip the wait and book your appointment online in just a few
                clicks.
              </p>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="w-full rounded-full"
              >
                <Link href="/book">
                  Book Online Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16">
          <div className="rounded-2xl overflow-hidden h-96 bg-secondary/50 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary/40 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Interactive map would be embedded here
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                123 Wellness Street, Suite 100, Healing City, HC 12345
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

