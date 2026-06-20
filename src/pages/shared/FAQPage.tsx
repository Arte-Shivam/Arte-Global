import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import { FAQForm } from '../../components/forms/FAQForm'
import { DEMO_FAQS } from '../../data/content'
import type { FAQ } from '../../types'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

interface FAQPageProps {
  audience?: 'candidate' | 'recruiter'
}

export function FAQPage({ audience = 'candidate' }: FAQPageProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [allFaqs, setAllFaqs] = useState<FAQ[]>(DEMO_FAQS)
  const [faqsLoading, setFaqsLoading] = useState(true)
  const [faqsError, setFaqsError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFaqs() {
      if (!isSupabaseConfigured || !supabase) {
        setFaqsLoading(false)
        return
      }
      setFaqsLoading(true)
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('status', 'active')
        .order('sort_order', { ascending: true })

      if (error) {
        setFaqsError(error.message)
      } else {
        setAllFaqs(data as FAQ[])
      }
      setFaqsLoading(false)
    }
    loadFaqs()
  }, [])

  const faqs = allFaqs.filter(
    (f) => f.audience === audience || f.audience === 'both',
  )

  return (
    <div className="section-padding relative">
      <GeometricShapes variant="section" />
      <div className="container-custom relative z-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1>Frequently Asked Questions</h1>
          <p className="mt-3">Find answers to common questions about our services</p>
        </motion.div>

        {faqsLoading ? (
          <div className="text-center py-10 text-accent/60">Loading FAQs...</div>
        ) : faqsError ? (
          <div className="text-center py-10 text-red-500">Failed to load FAQs: {faqsError}</div>
        ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl border border-border/50 overflow-hidden">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/5 transition-colors"
              >
                <h5 className="pr-4">{faq.question}</h5>
                <img
                  src="/icons/chevron-down.svg"
                  alt=""
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm">{faq.answer}</p>
                      <span className="text-alt text-xs mt-2 inline-block">{faq.category}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        )}

        <div className="mt-16 bg-secondary-light/30 rounded-2xl p-6 md:p-8">
          <h4>Can't find your answer?</h4>
          <p className="text-sm mt-2 mb-6">Submit your question and we'll answer it as soon as possible.</p>
          <FAQForm />
        </div>
      </div>
    </div>
  )
}