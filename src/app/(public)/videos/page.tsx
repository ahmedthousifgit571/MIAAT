import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, Clock } from 'lucide-react'
import { getVideosByCategory } from '@/data/videos'

export const metadata: Metadata = {
  title: 'Educational Videos About Acupuncture',
  description:
    'Watch informative videos about acupuncture, traditional Chinese medicine, and holistic healing. Learn about treatments, what to expect, and how acupuncture can help you.',
  keywords: [
    'acupuncture videos',
    'learn about acupuncture',
    'acupuncture education',
    'how acupuncture works video',
    'acupuncture treatment video',
    'traditional chinese medicine video',
  ],
  openGraph: {
    title: 'Educational Acupuncture Videos | Healing Touch',
    description:
      'Watch and learn about acupuncture treatments, benefits, and what to expect during your visit.',
  },
}

export default function VideosPage() {
  const educationalVideos = getVideosByCategory('educational')
  const treatmentVideos = getVideosByCategory('treatment')

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
            Learn & Discover
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Educational Videos
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our collection of informative videos about acupuncture,
            traditional Chinese medicine, and how these ancient practices can
            transform your health.
          </p>
        </div>

        {/* Featured video */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg">
            <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <Play className="h-8 w-8 ml-1" />
                </button>
              </div>
              {/* Thumbnail overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="mb-3">Featured</Badge>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                  What is Acupuncture? A Complete Introduction
                </h2>
                <p className="text-muted-foreground text-sm">
                  Everything you need to know about the ancient art of acupuncture
                  and how it can help you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Educational videos */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
              Educational Content
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationalVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* Treatment videos */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
              Treatment Demonstrations
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatmentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20">
          <div className="bg-secondary/50 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Ready to Experience Acupuncture?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Now that you&apos;ve learned about acupuncture, take the next step
              toward better health. Book your first appointment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/book">
                  Book Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

interface VideoCardProps {
  video: {
    id: string
    title: string
    description: string
    youtubeId: string
    duration?: string
    category: string
  }
}

function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg hover:border-primary/30 transition-all">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-14 h-14 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Play className="h-6 w-6 ml-0.5" />
          </button>
        </div>
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs px-2 py-1 rounded flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {video.duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  )
}

