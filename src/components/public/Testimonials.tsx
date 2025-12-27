import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'Local Patient',
    rating: 5,
    text: "After years of chronic back pain and trying everything from medications to physical therapy, acupuncture was the only thing that truly helped. Dr. Chen's expertise and gentle approach made all the difference. I'm now pain-free and living my best life!",
    condition: 'Chronic Back Pain',
  },
  {
    id: 2,
    name: 'Michael Thompson',
    location: 'Local Patient',
    rating: 5,
    text: "I was skeptical at first, but after just a few sessions, my anxiety levels dropped significantly. The clinic environment is so calming, and the staff truly cares about your wellbeing. I now sleep better than I have in years.",
    condition: 'Anxiety & Insomnia',
  },
  {
    id: 3,
    name: 'Jennifer Garcia',
    location: 'Local Patient',
    rating: 5,
    text: "The fertility support program was life-changing for us. After two years of trying, the combination of acupuncture and guidance helped us conceive naturally. We're forever grateful to the Healing Touch team.",
    condition: 'Fertility Support',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-foreground/80 font-medium text-sm uppercase tracking-widest mb-4 block">
            Patient Stories
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Transforming Lives Through Healing
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Hear from our patients about their journey to wellness and how
            traditional acupuncture has changed their lives.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors"
            >
              {/* Quote icon */}
              <Quote className="h-10 w-10 text-primary-foreground/30 mb-4" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-primary-foreground/90 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-primary-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-primary-foreground/60">
                    {testimonial.location}
                  </div>
                </div>
                <div className="text-xs bg-white/10 px-3 py-1 rounded-full">
                  {testimonial.condition}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}




