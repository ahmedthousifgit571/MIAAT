'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { Menu, Phone } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Videos', href: '/videos' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      )}
    >
      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center group-hover:shadow-md transition-all">
                <Image 
                  src="/images/miatLogo.jpeg" 
                  alt="MIAT Logo" 
                  width={64} 
                  height={64} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-semibold text-foreground tracking-tight">
                Mega Institute of
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                Acupuncture Acupressure Therapy
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors relative py-2',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/book">Book Appointment</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              {/* Accessibility: Hidden title for screen readers */}
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Main navigation menu for mobile devices</SheetDescription>
              </VisuallyHidden>
              
              <div className="flex flex-col h-full">
                {/* Header with Logo */}
                <div className="flex items-center gap-3 p-6 border-b border-border bg-muted/30">
                  <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm">
                      <Image 
                        src="/images/miatLogo.jpeg" 
                        alt="MIAT Logo" 
                        width={48} 
                        height={48} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif text-base font-semibold leading-tight">
                        Mega Institute of Acupuncture
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Acupressure Therapy
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col flex-1 p-6 overflow-y-auto">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all',
                          pathname === item.href
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Footer with CTA */}
                <div className="p-6 border-t border-border bg-muted/30">
                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-full mb-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/book">Book Appointment</Link>
                  </Button>

                  <a
                    href="tel:+919841756639"
                    className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>(+91) 9841756639</span>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

