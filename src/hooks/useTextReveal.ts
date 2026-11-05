export type RevealOrigin =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center-out'
  | 'depth-in'
  | 'depth-out'
  | 'path'
  | 'portal'
  | 'split-reunite'
  | 'smoke'
  | 'star-assemble'
  | 'auto'

// World-based sequence preferences
const forestSequence: RevealOrigin[] = [
  'bottom',
  'left',
  'depth-in',
  'right',
  'bottom-left',
  'center-out',
  'top-right',
  'depth-out',
  'portal',
]

const caveSequence: RevealOrigin[] = [
  'top',
  'depth-in',
  'depth-out',
  'top-left',
  'top-right',
  'center-out',
  'bottom',
]

const cosmicSequence: RevealOrigin[] = [
  'center-out',
  'star-assemble',
  'depth-in',
  'split-reunite',
  'portal',
  'smoke',
  'depth-out',
]

let autoCounter = 0

export function getAutoOrigin(world: 'forest' | 'cave' | 'cosmic' = 'forest', meaningHint?: string): RevealOrigin {
  // 1. Meaning-driven override (direction follows meaning)
  if (meaningHint) {
    const hint = meaningHint.toLowerCase()
    if (hint.includes('death') || hint.includes('yama') || hint.includes('descent') || hint.includes('grief')) {
      return 'top' // Descent from above
    }
    if (hint.includes('awaken') || hint.includes('rise') || hint.includes('prana') || hint.includes('dawn')) {
      return 'bottom' // Awakening from below
    }
    if (hint.includes('turiya') || hint.includes('atman') || hint.includes('self') || hint.includes('brahman') || hint.includes('non-dual')) {
      return 'center-out' // Self radiates from center
    }
  }

  // 2. World-preference deterministic rotation
  const seq = world === 'cave' ? caveSequence : world === 'cosmic' ? cosmicSequence : forestSequence
  const origin = seq[autoCounter % seq.length]
  autoCounter++
  return origin
}

export function resetAutoOrigin() {
  autoCounter = 0
}

export function resolveRevealOrigin(
  origin: RevealOrigin = 'auto',
  world: 'forest' | 'cave' | 'cosmic' = 'forest',
  meaningHint?: string
): RevealOrigin {
  if (origin === 'auto') {
    return getAutoOrigin(world, meaningHint)
  }
  return origin
}
