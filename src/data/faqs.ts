import { FAQItem } from '@/types'

export const faqs: FAQItem[] = [
  {
    question: 'What is acupuncture?',
    answer:
      'Acupuncture is a traditional Chinese medicine practice that involves inserting thin, sterile needles into specific points on the body to stimulate healing. It works by restoring the flow of Qi (vital energy) through the body\'s meridian pathways, promoting natural healing and improving overall function. This practice has been used for over 2,500 years and is now recognized by the World Health Organization as an effective treatment for various conditions.',
  },
  {
    question: 'Does acupuncture hurt?',
    answer:
      'Most patients experience minimal to no discomfort during acupuncture. The needles used are extremely thin—about the width of a human hair—much thinner than hypodermic needles used for injections. You may feel a slight pinch or tingling sensation when the needle is inserted, but many patients find the treatment deeply relaxing and even fall asleep during sessions.',
  },
  {
    question: 'Is acupuncture safe?',
    answer:
      'Yes, acupuncture is very safe when performed by a licensed and trained practitioner. We use only sterile, single-use, disposable needles. Side effects are rare and usually mild, such as slight bruising or temporary soreness at needle sites. Acupuncture is a natural treatment with an excellent safety record spanning thousands of years.',
  },
  {
    question: 'What conditions can acupuncture treat?',
    answer:
      'Acupuncture is effective for a wide range of conditions including chronic pain (back, neck, knee, arthritis), headaches and migraines, stress and anxiety, insomnia, digestive disorders, allergies, fertility issues, menstrual problems, and many more. The World Health Organization recognizes acupuncture as an effective treatment for over 40 medical conditions.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'The number of sessions varies depending on your condition, its severity, and how long you\'ve had it. Acute conditions may respond quickly in 2-4 sessions, while chronic conditions often require 8-12 sessions or more. During your initial consultation, we\'ll create a personalized treatment plan with an estimated timeline. Many patients notice improvement after their first few sessions.',
  },
  {
    question: 'How should I prepare for my acupuncture treatment?',
    answer:
      'For the best results, eat a light meal 1-2 hours before your appointment—don\'t come on an empty stomach or immediately after a heavy meal. Wear loose, comfortable clothing that can be rolled up above your elbows and knees. Avoid alcohol and caffeine before your session. Come with a list of your current medications and health concerns.',
  },
  {
    question: 'What should I expect during my first visit?',
    answer:
      'Your first visit will include a comprehensive health consultation lasting about 15-20 minutes. We\'ll discuss your health history, current concerns, lifestyle, and treatment goals. Then, you\'ll relax on a comfortable treatment table while thin needles are placed in specific points. The needles remain in place for about 20-30 minutes. Most patients feel deeply relaxed during and after treatment.',
  },
  {
    question: 'Are there any side effects?',
    answer:
      'Side effects are rare and typically mild. Some patients experience temporary drowsiness, slight dizziness, or minor bruising at needle sites. These effects usually resolve quickly. Many patients report feeling very relaxed or even euphoric after treatment. We recommend avoiding strenuous exercise immediately after your session.',
  },
  {
    question: 'Is acupuncture covered by insurance?',
    answer:
      'Many health insurance plans now cover acupuncture treatments. Coverage varies by provider and plan. We recommend contacting your insurance company directly to verify your benefits. We can provide detailed receipts and documentation for insurance reimbursement. We also offer affordable self-pay options and package discounts.',
  },
  {
    question: 'How is acupuncture different from dry needling?',
    answer:
      'While both use thin needles, they come from different traditions and have different approaches. Acupuncture is a comprehensive system of traditional Chinese medicine that treats the whole person by balancing energy flow through meridians. Dry needling is a modern Western technique focused specifically on releasing trigger points in muscles. Our practitioners are trained in traditional acupuncture, which offers a more holistic approach to healing.',
  },
  {
    question: 'Can acupuncture help with fertility?',
    answer:
      'Yes, acupuncture has been shown to support fertility in both women and men. It can help regulate menstrual cycles, improve blood flow to reproductive organs, balance hormones, reduce stress, and improve the quality of eggs and sperm. Many fertility specialists recommend acupuncture as a complementary treatment alongside IVF and other assisted reproductive technologies.',
  },
  {
    question: 'How often should I receive acupuncture?',
    answer:
      'Treatment frequency depends on your condition and goals. For acute conditions, we may recommend 2-3 sessions per week initially. For chronic conditions, weekly sessions are common. As symptoms improve, we typically reduce frequency to bi-weekly, then monthly maintenance sessions. We\'ll work with you to find a schedule that fits your needs and budget.',
  },
]

export function getFAQs(): FAQItem[] {
  return faqs
}

