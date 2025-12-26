import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/50 to-background p-4">
      <div className="text-center max-w-md">
        {/* 404 illustration */}
        <div className="relative mb-8">
          <div className="text-[150px] font-serif font-bold text-primary/10 leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-20 w-20 text-primary/30" />
          </div>
        </div>

        <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or no longer exists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-6"
          >
            <Link href="/services">
              <ArrowLeft className="mr-2 h-5 w-5" />
              View Services
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

