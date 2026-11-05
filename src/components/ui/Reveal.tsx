import { useState, useEffect, useRef, useId } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useDevicePerformance } from '../../hooks/useDevicePerformance'
import { usePageReady, registerRevealItem, updateRevealItemState, unregisterRevealItem } from '../../hooks/usePageReady'
import { resolveRevealOrigin } from '../../hooks/useTextReveal'
import type { RevealOrigin } from '../../hooks/useTextReveal'
import { useWorld } from '../foundation/ThreeWorldsProvider'

export type RevealType =
  | 'heading'
  | 'kinetic-title'
  | 'devanagari-title'
  | 'eyebrow'
  | 'subtitle'
  | 'body'
  | 'quote'
  | 'verse-devanagari'
  | 'iast-translation'
  | 'cascade-cells'
  | 'pop-tags'
  | 'unfold-box'
  | 'star-assemble'
  | 'fade-rise'
  | 'statement'
  | 'accent'

interface RevealProps {
  children: ReactNode
  type?: RevealType
  origin?: RevealOrigin
  trigger?: 'mount' | 'scroll' | 'auto'
  stepId?: string | number
  delay?: number
  meaningHint?: string
  className?: string
  ariaLabel?: string
  debugLabel?: string
}

export default function Reveal({
  children,
  type = 'body',
  origin = 'auto',
  trigger = 'auto',
  stepId,
  delay = 0,
  meaningHint,
  className = '',
  ariaLabel,
  debugLabel,
}: RevealProps) {
  const instanceId = useId()
  const elementRef = useRef<HTMLDivElement>(null)
  const { isLite, prefersReduced } = useDevicePerformance()
  const { activeWorldId } = useWorld()
  const pageReady = usePageReady(stepId)

  const resolvedOrigin = resolveRevealOrigin(origin, activeWorldId, meaningHint)
  const effectiveTrigger: 'mount' | 'scroll' =
    trigger === 'auto'
      ? stepId !== undefined || type === 'kinetic-title' || type === 'devanagari-title' || type === 'eyebrow' || type === 'subtitle'
        ? 'mount'
        : 'scroll'
      : trigger

  const [state, setState] = useState<'pending' | 'playing' | 'done'>('pending')
  const [failsafeTriggered, setFailsafeTriggered] = useState(false)
  const [inView, setInView] = useState(false)
  const [replayCount, setReplayCount] = useState(0)

  // 1. REGISTER WITH ?debug=text STORE
  useEffect(() => {
    const label = debugLabel || ariaLabel || (typeof children === 'string' ? children.slice(0, 30) : type)
    registerRevealItem({
      id: instanceId,
      label,
      type,
      origin: resolvedOrigin,
      triggerMode: effectiveTrigger,
      state: 'pending',
      failsafeTriggered: false,
      replay: () => {
        setState('pending')
        setReplayCount(c => c + 1)
      },
    })

    return () => {
      unregisterRevealItem(instanceId)
    }
  }, [instanceId, debugLabel, ariaLabel, children, type, resolvedOrigin, effectiveTrigger])

  // 2. 2-SECOND FAILSAFE (Guarantees text can NEVER remain stuck or hidden)
  useEffect(() => {
    if (state === 'done') return

    const timer = setTimeout(() => {
      if (state === 'pending' || state === 'playing') {
        setState('done')
        setFailsafeTriggered(true)
        updateRevealItemState(instanceId, 'done', true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [state, instanceId, replayCount])

  // 3. TRIGGER DETECTION (Mount vs Scroll)
  useEffect(() => {
    if (effectiveTrigger === 'mount') {
      if (pageReady) {
        const timer = setTimeout(() => {
          setInView(true)
          setState('playing')
          updateRevealItemState(instanceId, 'playing', false)
        }, delay * 1000)
        return () => clearTimeout(timer)
      }
    } else {
      // trigger === 'scroll'
      const el = elementRef.current
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && pageReady) {
            setInView(true)
            setState('playing')
            updateRevealItemState(instanceId, 'playing', false)
            observer.unobserve(el)
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
      )

      observer.observe(el)
      return () => observer.disconnect()
    }
  }, [effectiveTrigger, pageReady, delay, instanceId, stepId, replayCount])

  const handleAnimationComplete = () => {
    setState('done')
    updateRevealItemState(instanceId, 'done', failsafeTriggered)
  }

  // 4. ACCESSIBILITY / REDUCED MOTION / LITE MODE FALLBACKS
  if (prefersReduced) {
    return (
      <div
        ref={elementRef}
        className={`transition-opacity duration-300 ${inView || state === 'done' ? 'opacity-100' : 'opacity-0'} ${className}`}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    )
  }

  // 5. EXTRACT PLAIN TEXT FOR SPLIT RUNS
  const textContent = typeof children === 'string' ? children : ''

  // 6. EFFECT-SPECIFIC VARIANTS & RENDERING

  // A. KINETIC PAGE TITLE (letters rise from clip mask with X-rotation, overshoot, gold sheen)
  if (type === 'kinetic-title' && textContent) {
    const letters = textContent.split('')
    return (
      <div
        ref={elementRef}
        className={`reveal-wrapper relative select-text ${state === 'pending' ? 'reveal-pending' : state === 'done' ? 'reveal-done' : 'reveal-active'} ${className}`}
        aria-label={textContent}
      >
        <span aria-hidden="true" className="inline-flex flex-wrap justify-center overflow-hidden py-1">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              className={`kinetic-letter ${state === 'done' ? 'gold-sheen-sweep' : ''}`}
              initial={{ y: '120%', rotateX: -65, opacity: 0 }}
              animate={inView ? { y: '0%', rotateX: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.85,
                delay: delay + i * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
              onAnimationComplete={i === letters.length - 1 ? handleAnimationComplete : undefined}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      </div>
    )
  }

  // B. DEVANAGARI TITLE (calligraphic stroke-draw / clip reveal + gold fill)
  if (type === 'devanagari-title') {
    return (
      <div
        ref={elementRef}
        className={`reveal-wrapper relative text-center select-text ${state === 'pending' ? 'reveal-pending' : state === 'done' ? 'reveal-done' : 'reveal-active'} ${className}`}
        aria-label={ariaLabel}
      >
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0, filter: 'blur(3px)' }}
          animate={inView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
          onAnimationComplete={handleAnimationComplete}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  // C. EYEBROW / SUBTITLE (letter-spacing contracts from wide to normal + fade-up)
  if (type === 'eyebrow' || type === 'subtitle') {
    return (
      <div
        ref={elementRef}
        className={`reveal-wrapper relative select-text ${state === 'pending' ? 'reveal-pending' : state === 'done' ? 'reveal-done' : 'reveal-active'} ${className}`}
        aria-label={ariaLabel}
      >
        <motion.div
          initial={{ letterSpacing: '0.35em', y: 16, opacity: 0 }}
          animate={inView ? { letterSpacing: type === 'eyebrow' ? '0.25em' : 'normal', y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
          onAnimationComplete={handleAnimationComplete}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  // D. STEP HEADING (Scramble-decode into final text or mask-rise)
  if (type === 'heading' && textContent) {
    return (
      <div
        ref={elementRef}
        className={`reveal-wrapper relative select-text ${state === 'pending' ? 'reveal-pending' : state === 'done' ? 'reveal-done' : 'reveal-active'} ${className}`}
        aria-label={textContent}
      >
        <ScrambleText
          text={textContent}
          inView={inView}
          delay={delay}
          onComplete={handleAnimationComplete}
        />
      </div>
    )
  }

  // E. PULL QUOTE (Word-highlight wave 15% -> 100% opacity)
  if (type === 'quote' && textContent) {
    const words = textContent.split(' ')
    return (
      <div
        ref={elementRef}
        className={`reveal-wrapper relative select-text ${state === 'pending' ? 'reveal-pending' : state === 'done' ? 'reveal-done' : 'reveal-active'} ${className}`}
        aria-label={textContent}
      >
        <span aria-hidden="true" className="inline-block text-balance">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.28em]"
              initial={{ opacity: 0.15, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: delay + i * 0.04,
                ease: 'easeOut',
              }}
              onAnimationComplete={i === words.length - 1 ? handleAnimationComplete : undefined}
            >
              {w}
            </motion.span>
          ))}
        </span>
      </div>
    )
  }

  // F. SANSKRIT VERSE (Calligraphic write-on with ember spark point)
  if (type === 'verse-devanagari') {
    return (
      <div
        ref={elementRef}
        className={`reveal-wrapper relative select-text ${state === 'pending' ? 'reveal-pending' : state === 'done' ? 'reveal-done' : 'reveal-active'} ${className}`}
        aria-label={ariaLabel}
      >
        <motion.div
          className="relative inline-block w-full"
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          animate={inView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : {}}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay }}
          onAnimationComplete={handleAnimationComplete}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  // G. IAST & TRANSLATION (Ink-bleed typewriter: scale 1.35 to 1, opacity, subtle blur)
  if (type === 'iast-translation' && textContent) {
    const words = textContent.split(' ')
    return (
      <div
        ref={elementRef}
        className={`reveal-wrapper relative select-text ${state === 'pending' ? 'reveal-pending' : state === 'done' ? 'reveal-done' : 'reveal-active'} ${className}`}
        aria-label={textContent}
      >
        <span aria-hidden="true" className="inline-block text-balance">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ scale: 1.3, opacity: 0, filter: 'blur(3px)' }}
              animate={inView ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : {}}
              transition={{
                duration: 0.4,
                delay: delay + i * 0.03,
                ease: 'easeOut',
              }}
              onAnimationComplete={i === words.length - 1 ? handleAnimationComplete : undefined}
            >
              {w}
            </motion.span>
          ))}
        </span>
      </div>
    )
  }

  // H. POP-TAGS (Pop-in cascade from center)
  if (type === 'pop-tags') {
    return (
      <div
        ref={elementRef}
        className={`reveal-wrapper relative select-text ${state === 'pending' ? 'reveal-pending' : state === 'done' ? 'reveal-done' : 'reveal-active'} ${className}`}
        aria-label={ariaLabel}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            type: 'spring',
            stiffness: 170,
            damping: 18,
            delay,
          }}
          onAnimationComplete={handleAnimationComplete}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  // I. UNFOLD-BOX (Marginalia / insight boxes unfold with 3D rotate + clip-path)
  if (type === 'unfold-box') {
    return (
      <div
        ref={elementRef}
        className={`reveal-wrapper relative select-text ${state === 'pending' ? 'reveal-pending' : state === 'done' ? 'reveal-done' : 'reveal-active'} ${className}`}
        aria-label={ariaLabel}
      >
        <motion.div
          initial={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            rotateX: -14,
            opacity: 0,
            transformPerspective: 1000,
          }}
          animate={inView ? {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            rotateX: 0,
            opacity: 1,
          } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
          onAnimationComplete={handleAnimationComplete}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  // J. STANDARD DIRECTIONAL ORIGIN / BODY / FADE-RISE
  const getDirectionalVariants = () => {
    if (isLite) {
      return {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: 'easeOut', delay },
        },
      }
    }

    switch (resolvedOrigin) {
      case 'left':
        return {
          hidden: { x: '-20vw', opacity: 0, skewX: -4 },
          visible: {
            x: 0,
            opacity: 1,
            skewX: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
          },
        }

      case 'right':
        return {
          hidden: { x: '20vw', opacity: 0, skewX: 4 },
          visible: {
            x: 0,
            opacity: 1,
            skewX: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
          },
        }

      case 'top':
        return {
          hidden: { y: '-22vh', opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', damping: 20, stiffness: 120, delay },
          },
        }

      case 'bottom':
        return {
          hidden: { y: '22vh', opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', damping: 20, stiffness: 120, delay },
          },
        }

      case 'center-out':
        return {
          hidden: { scale: 0.4, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { type: 'spring', damping: 18, stiffness: 140, delay },
          },
        }

      case 'depth-in':
        return {
          hidden: { scale: 0.6, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
          },
        }

      case 'depth-out':
        return {
          hidden: { scale: 1.5, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: 'easeOut', delay },
          },
        }

      case 'portal':
        return {
          hidden: { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
          visible: {
            clipPath: 'circle(130% at 50% 50%)',
            opacity: 1,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
          },
        }

      case 'star-assemble':
        return {
          hidden: { scale: 0.8, y: 15, opacity: 0 },
          visible: {
            scale: 1,
            y: 0,
            opacity: 1,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
          },
        }

      default:
        return {
          hidden: { y: 24, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
          },
        }
    }
  }

  const variants: any = getDirectionalVariants()

  return (
    <div
      ref={elementRef}
      className={`reveal-wrapper relative select-text ${state === 'pending' ? 'reveal-pending' : state === 'done' ? 'reveal-done' : 'reveal-active'} ${className}`}
      aria-label={ariaLabel}
    >
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variants}
        onAnimationComplete={handleAnimationComplete}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

// ── SCRAMBLE-DECODE SUB-COMPONENT ───────────────────────────────
const GLYPHS = 'के न अ ध ॐ ० १ २ 3 A X # &'

function ScrambleText({
  text,
  inView,
  delay = 0,
  onComplete,
}: {
  text: string
  inView: boolean
  delay: number
  onComplete: () => void
}) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    if (!inView) return

    let frame = 0
    const totalFrames = 28
    const glyphChars = GLYPHS.split(' ')

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        const revealedCount = Math.floor(progress * text.length)

        const scrambled = text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < revealedCount) return char
            return glyphChars[Math.floor(Math.random() * glyphChars.length)]
          })
          .join('')

        setDisplayText(scrambled)

        if (frame >= totalFrames) {
          clearInterval(interval)
          setDisplayText(text)
          onComplete()
        }
      }, 25)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [inView, text, delay, onComplete])

  return <span>{displayText}</span>
}
