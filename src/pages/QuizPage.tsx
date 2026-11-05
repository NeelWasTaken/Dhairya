import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import quizData from '../content/quiz.json'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions = quizData as Question[]

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  const currentQ = questions[currentIdx]

  const handleSelect = (idx: number) => {
    if (isAnswerSubmitted) return
    setSelectedOption(idx)
  }

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return
    setIsAnswerSubmitted(true)
    if (selectedOption === currentQ.correctAnswer) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((c) => c + 1)
      setSelectedOption(null)
      setIsAnswerSubmitted(false)
    } else {
      setQuizFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentIdx(0)
    setSelectedOption(null)
    setIsAnswerSubmitted(false)
    setScore(0)
    setQuizFinished(false)
  }

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column max-w-4xl">
        <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--saffron)] hover:text-[var(--vermilion)] font-[var(--font-marginalia)]"
        >
          ← Return to Sanctuary
        </Link>
      </div>

      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)]">
          Self-Assessment & Reflection • 15 Inquiries
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 text-[var(--ink)]">
          The Dhairya Resilience Assessment
        </h1>
        <p className="text-base text-[var(--text-muted)] italic max-w-xl mx-auto mt-2">
          Test your comprehension of Upaniṣadic psychology, non-dual resilience, and self-regulation models.
        </p>
      </div>

      {!quizFinished ? (
        <div className="p-6 md:p-10 rounded-xl palm-leaf-border bg-[var(--bg-card)] shadow-lg">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-[var(--font-marginalia)] mb-2">
            <span>Question {currentIdx + 1} of {questions.length}</span>
            <span>Current Score: {score}</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--parchment-dark)] rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--saffron)] to-[var(--gold)] transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-[var(--ink)] leading-snug mb-6">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-[var(--parchment)] border-[var(--border-color)] text-[var(--ink)] hover:bg-[var(--parchment-dark)]/40'

                  if (selectedOption === idx) {
                    btnStyle = 'bg-[var(--saffron)]/15 border-[var(--saffron)] ring-1 ring-[var(--saffron)] text-[var(--ink)]'
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctAnswer) {
                      btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400'
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400'
                    } else {
                      btnStyle = 'opacity-50 bg-[var(--parchment)] border-[var(--border-color)] text-[var(--text-muted)]'
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelect(idx)}
                      className={`w-full p-4 rounded-lg border text-left text-sm md:text-base font-medium transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border border-current">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  )
                })}
              </div>

              {/* Explanation & Action Controls */}
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 rounded-lg bg-[var(--parchment-light)] border border-[var(--border-color)] mb-6 text-sm"
                >
                  <div className="font-bold mb-1 flex items-center gap-2">
                    {selectedOption === currentQ.correctAnswer ? (
                      <span className="text-emerald-600">✓ Correct Understanding</span>
                    ) : (
                      <span className="text-rose-600">✗ Philosophical Note</span>
                    )}
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}

              <div className="flex justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleSubmitAnswer}
                    className="px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider bg-[var(--gold)] text-[#2B1B10] disabled:opacity-40 hover:bg-[var(--gold-light)] shadow transition-all"
                  >
                    Submit Response
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider bg-[var(--vermilion)] text-white hover:bg-[var(--vermilion-dark)] shadow transition-all"
                  >
                    {currentIdx < questions.length - 1 ? 'Next Question →' : 'View Final Results'}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Results View */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 md:p-12 rounded-xl palm-leaf-border bg-[var(--bg-card)] text-center shadow-2xl"
        >
          <div className="text-5xl mb-4">🪷</div>
          <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)]">
            Assessment Completed
          </span>
          <h2 className="text-3xl font-bold text-[var(--ink)] mt-1 mb-4">
            Your Fortitude Score: {score} / {questions.length}
          </h2>

          <p className="text-base text-[var(--text-secondary)] max-w-lg mx-auto mb-8 leading-relaxed">
            {score >= 13
              ? "Exalted discernment (Parama-Viveka). You possess a deep, nuanced grasp of Upaniṣadic psychology, non-dual witness awareness, and classical distress tolerance."
              : score >= 9
              ? "Steadfast inquiry (Śraddhā). You demonstrate a clear understanding of the core chariot, kosha, and abhaya frameworks. Continue deepening your reflection."
              : "Receptive seeker (Śiṣya). The journey into the inner architecture of consciousness is just unfolding. Return to the chapters and verse cards to explore deeper."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider bg-[var(--gold)] text-[#2B1B10] hover:bg-[var(--gold-light)] shadow transition-all"
            >
              Retake Assessment
            </button>
            <Link
              to="/verses"
              className="px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider bg-[var(--parchment-dark)] text-[var(--ink)] hover:bg-[var(--parchment)] border border-[var(--border-color)] transition-all"
            >
              Browse Verse Library
            </Link>
          </div>
        </motion.div>
      )}
      </div>
    </div>
  )
}
