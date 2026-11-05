import { Link } from 'react-router-dom'
import DoubleLineFrame from './borders/DoubleLineFrame'

export default function FurtherReadingBlock() {
  const curatedSources = [
    {
      author: 'Radhakrishnan, Sarvepalli (1953)',
      title: 'The Principal Upaniṣads',
      detail: 'Monumental bilingual edition with Roman transliteration & Advaitic notes.',
    },
    {
      author: 'Olivelle, Patrick (1998)',
      title: 'The Early Upaniṣads: Annotated Text and Translation',
      detail: 'Critical Oxford University Press edition with philological apparatus.',
    },
    {
      author: 'Swami Gambhirananda (1957)',
      title: 'Eight Upaniṣads with the Commentary of Śaṅkarācārya',
      detail: 'Primary translation of Śaṅkara’s foundational Sanskrit Bhāṣyas.',
    },
    {
      author: 'Rao, K. Ramakrishna & Paranjpe, Anand C. (2016)',
      title: 'Psychology in the Indian Tradition',
      detail: 'Academic synthesis mapping Indian epistemology to cognitive science.',
    },
    {
      author: 'Masten, Ann S. (2001)',
      title: 'Ordinary Magic: Resilience Processes in Development',
      detail: 'Foundational framework linking ordinary human processes to resilience.',
    },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto my-12 text-left">
      <DoubleLineFrame className="p-8 sm:p-10 bg-[var(--surface)]/90 backdrop-blur-md rounded-2xl">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--gold)]/20">
          <div>
            <span className="text-[11px] font-[var(--font-marginalia)] uppercase tracking-[0.25em] text-[var(--gold)] font-bold block mb-1">
              ग्रन्थ सूची · Scholarly Selection
            </span>
            <h3 className="text-xl sm:text-2xl font-[var(--font-heading)] font-bold tracking-wide text-[var(--text-primary)]">
              Further Scholarly Reading
            </h3>
          </div>
          <Link
            to="/bibliography"
            className="text-xs uppercase tracking-wider text-[var(--gold)] hover:underline font-bold"
          >
            All 18 Sources →
          </Link>
        </div>

        <ul className="space-y-4 list-none p-0 m-0">
          {curatedSources.map((item, idx) => (
            <li
              key={idx}
              className="p-3.5 rounded-lg hover:bg-[var(--gold)]/5 transition-colors border border-transparent hover:border-[var(--gold)]/20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
            >
              <div>
                <p className="font-serif italic text-[var(--text-primary)] font-semibold text-sm sm:text-base">
                  {item.title}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.detail}</p>
              </div>
              <span className="text-xs text-[var(--gold)] font-mono whitespace-nowrap self-start sm:self-center">
                {item.author}
              </span>
            </li>
          ))}
        </ul>
      </DoubleLineFrame>
    </div>
  )
}
