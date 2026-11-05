import { useEffect } from 'react'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import CreditsScroll from '../../components/foundation/CreditsScroll'

export default function CreditsPage() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('cosmic')
    document.title = 'Project Credits — Dhairya: The Unshaken Self'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  return (
    <div className="relative min-h-screen bg-[#07060B] print:bg-white print:text-black">
      {/* Print-only clean header */}
      <div className="hidden print:block p-8 border-b border-black">
        <h1 className="text-3xl font-bold">Psychological Resilience in the Upanishads</h1>
        <p className="text-sm">An Indian Knowledge System (IKS) Research Project — Credits</p>
      </div>

      <CreditsScroll isStaticPage={true} />
    </div>
  )
}
