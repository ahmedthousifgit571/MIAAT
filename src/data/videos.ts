import { VideoContent } from '@/types'

export const videos: VideoContent[] = [
  {
    id: '1',
    title: 'What is Acupuncture? An Introduction',
    description:
      'Learn about the ancient art of acupuncture, how it works, and why millions of people trust it for natural healing. This comprehensive introduction covers the basics of traditional Chinese medicine and what to expect from acupuncture treatment.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder - replace with actual video ID
    duration: '8:45',
    category: 'educational',
  },
  {
    id: '2',
    title: 'Your First Acupuncture Session: What to Expect',
    description:
      'Nervous about your first visit? This video walks you through every step of an acupuncture session, from the initial consultation to needle placement and aftercare. See exactly what happens during a typical treatment.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder - replace with actual video ID
    duration: '12:30',
    category: 'educational',
  },
  {
    id: '3',
    title: 'Acupuncture for Pain Relief: The Science',
    description:
      'Discover the scientific evidence behind acupuncture for pain management. Learn how acupuncture triggers your body\'s natural pain-relief mechanisms and why it\'s becoming a preferred alternative to medication.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder - replace with actual video ID
    duration: '10:15',
    category: 'educational',
  },
  {
    id: '4',
    title: 'Cupping Therapy Explained',
    description:
      'Everything you need to know about cupping therapy—how it works, its benefits, and what those circular marks really mean. Watch a live demonstration of this ancient healing technique.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder - replace with actual video ID
    duration: '7:20',
    category: 'treatment',
  },
  {
    id: '5',
    title: 'Managing Stress with Acupuncture',
    description:
      'Chronic stress affects millions. Learn how acupuncture can help regulate your nervous system, reduce cortisol levels, and restore calm. Includes specific acupressure points you can try at home.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder - replace with actual video ID
    duration: '9:00',
    category: 'educational',
  },
  {
    id: '6',
    title: 'Fertility and Acupuncture: A Holistic Approach',
    description:
      'Explore how traditional Chinese medicine supports fertility naturally. This video covers acupuncture protocols for both women and men, and how it can complement IVF and other fertility treatments.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder - replace with actual video ID
    duration: '15:45',
    category: 'educational',
  },
]

export function getVideos(): VideoContent[] {
  return videos
}

export function getVideosByCategory(category: VideoContent['category']): VideoContent[] {
  return videos.filter((video) => video.category === category)
}

export function getVideoById(id: string): VideoContent | undefined {
  return videos.find((video) => video.id === id)
}

