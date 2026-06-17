"use client";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do booking sessions work on SkillBridge?",
    answer:
      "It's simple. You browse through our vetted tutors, check their real-time calendar availability directly on their profile, and book a slot that works for you. Once confirmed, you'll receive an instant link to join your 1-on-1 video session.",
  },
  {
    id: "faq-2",
    question: "Are the tutors on your platform verified?",
    answer:
      "Yes, absolutely. Every single tutor goes through an interview and background screening process. We verify their academic credentials, professional experience, and teaching capabilities before they can accept students.",
  },
  {
    id: "faq-3",
    question: "What happens if I need to cancel or reschedule?",
    answer:
      "We understand that plans change. You can cancel or reschedule any session directly from your dashboard up to 24 hours before the scheduled start time without any penalty.",
  },
  {
    id: "faq-4",
    question: "How do payments work? Is it a monthly subscription?",
    answer:
      "No, there are no mandatory monthly subscriptions. You pay per session based on the individual tutor's hourly rates. This gives you complete flexibility to get help only when you need it.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-background transition-colors duration-300">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Got questions about how SkillBridge works? We have answers.
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((item) => {
          const isOpen = openIndex === item.id;
          return (
            <div
              key={item.id}
              className="border border-border rounded-xl bg-card transition-all overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm sm:text-base text-foreground hover:bg-muted/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isOpen ? "transform rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-60 border-t border-border/60" : "max-h-0"
                } overflow-hidden`}
              >
                <div className="p-5 text-xs sm:text-sm text-muted-foreground leading-relaxed bg-muted/20">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
