import { useEffect, useRef, useState } from 'react'

const effectClasses = {
  'fade-up': 'reveal-fade-up',
  'fade-down': 'reveal-fade-down',
  'fade-left': 'reveal-fade-left',
  'fade-right': 'reveal-fade-right',
  'zoom-in': 'reveal-zoom-in',
  'rotate-in': 'reveal-rotate-in',
}

export default function ScrollReveal({ children, className = '', effect = 'fade-up', once = false }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else {
          setVisible(false)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -20% 0px',
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once])

  const effectClass = effectClasses[effect] || effectClasses['fade-up']

  return (
    <div ref={ref} className={`reveal ${effectClass} ${visible ? 'visible' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
