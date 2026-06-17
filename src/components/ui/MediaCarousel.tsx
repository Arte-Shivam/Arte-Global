import { motion } from 'framer-motion'
import type { MediaItem } from '../../types'

interface MediaCarouselProps {
  items: MediaItem[]
}

export function MediaCarousel({ items }: MediaCarouselProps) {
  const activeItems = items.filter((i) => i.is_active)

  if (activeItems.length === 0) return null

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2>See Arte in Action</h2>
          <p className="mt-3">Watch our success stories and candidate journeys</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative aspect-video rounded-2xl overflow-hidden bg-accent shadow-lg group"
            >
              {item.type === 'video' || item.type === 'reel' ? (
                <iframe
                  src={`${item.url}?autoplay=0&mute=1&loop=1&playlist=${item.url.split('/').pop()}`}
                  title={item.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent/80 to-transparent p-4">
                <p className="text-white text-sm font-medium">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
