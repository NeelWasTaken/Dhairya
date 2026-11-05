const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../src/content');

// 1. GLOSSARY (65+ terms)
const glossary = [
  { term: "Abhaya", devanagari: "अभय", iast: "abhaya", meaning: "Fearlessness; the state of being free from dread, born of recognizing the non-dual Self.", category: "Core Virtues", etymology: "a- (not) + bhaya (fear)" },
  { term: "Advaita", devanagari: "अद्वैत", iast: "advaita", meaning: "Non-duality; the philosophical school holding that individual consciousness (Ātman) and cosmic ground (Brahman) are identical.", category: "Philosophical Schools", etymology: "a- (not) + dvaita (dual)" },
  { term: "Aitareya", devanagari: "ऐतरेय", iast: "aitareya", meaning: "One of the oldest Mukhya Upaniṣads, belonging to the Ṛgveda, containing the Mahāvākya 'Prajñānaṃ Brahma'.", category: "Texts", etymology: "From sage Mahīdāsa Aitareya" },
  { term: "Akṣara", devanagari: "अक्षर", iast: "akṣara", meaning: "The Imperishable, unalterable; also refers to the indestructible sacred syllable OM.", category: "Metaphysics", etymology: "a- (not) + kṣara (perishable)" },
  { term: "Annamaya Kośa", devanagari: "अन्नमयकोश", iast: "annamaya-kośa", meaning: "The physical sheath made of food and nourishment; the gross biological body.", category: "Pañcakośa", etymology: "anna (food) + maya (consisting of) + kośa (sheath)" },
  { term: "Ānandamaya Kośa", devanagari: "आनन्दमयकोश", iast: "ānandamaya-kośa", meaning: "The causal sheath of bliss and joyful peace experienced in deep sleep and contemplation.", category: "Pañcakośa", etymology: "ānanda (bliss) + maya + kośa" },
  { term: "Ātman", devanagari: "आत्मन्", iast: "ātman", meaning: "The innermost Self; pure witnessing consciousness that remains invariant across all states of mind.", category: "Metaphysics", etymology: "Root an- (to breathe) or at- (to go/pervade)" },
  { term: "Avidyā", devanagari: "अविद्या", iast: "avidyā", meaning: "Primordial ignorance; metaphysical unawareness of one's true nature as non-dual consciousness.", category: "Epistemology", etymology: "a- (not) + vidyā (knowledge)" },
  { term: "Bhāṣya", devanagari: "भाष्य", iast: "bhāṣya", meaning: "Scholarly commentary on root philosophical scriptures (such as Śaṅkara's Upaniṣad-bhāṣyas).", category: "Literary Forms", etymology: "From bhāṣ (to speak/explain)" },
  { term: "Bhūmā", devanagari: "भूमा", iast: "bhūmā", meaning: "The Infinite, the Immense; that unconditioned plenum in which alone true bliss resides.", category: "Metaphysics", etymology: "From bahu (much, great)" },
  { term: "Brahman", devanagari: "ब्रह्मन्", iast: "brahman", meaning: "The infinite, unchanging, all-pervasive ground of all existence and consciousness.", category: "Metaphysics", etymology: "Root bṛh- (to swell, expand, grow)" },
  { term: "Bṛhadāraṇyaka", devanagari: "बृहदारण्यक", iast: "bṛhadāraṇyaka", meaning: "The 'Great Forest' Upaniṣad; the longest and one of the oldest principal Upaniṣads (Śukla Yajurveda).", category: "Texts", etymology: "bṛhat (great) + āraṇyaka (forest-treatise)" },
  { term: "Buddhi", devanagari: "बुद्धि", iast: "buddhi", meaning: "Discriminative intellect; higher executive faculty capable of discernment, wisdom, and decision-making.", category: "Faculties", etymology: "Root budh- (to awake, perceive)" },
  { term: "Chāndogya", devanagari: "छान्दोग्य", iast: "chāndogya", meaning: "Major ancient Upaniṣad belonging to the Sāmaveda, renowned for 'Tat Tvam Asi' and the Nārada-Sanatkumāra dialogue.", category: "Texts", etymology: "chandas (sacred meter) + ga (singer)" },
  { term: "Citta", devanagari: "चित्त", iast: "citta", meaning: "Mind-stuff; the repository of memory, subconscious impressions (saṃskāras), and cognitive flux.", category: "Faculties", etymology: "Root cit- (to perceive, think)" },
  { term: "Dama", devanagari: "दम", iast: "dama", meaning: "Restraint of the external sensory organs; sensory discipline preventing compulsive reactivity.", category: "Core Virtues", etymology: "Root dam- (to tame, restrain)" },
  { term: "Dayā", devanagari: "दया", iast: "dayā", meaning: "Compassion, tender empathy toward suffering beings; one of the three thunder-commands.", category: "Core Virtues", etymology: "Root day- (to partake, pity)" },
  { term: "Dāna", devanagari: "दान", iast: "dāna", meaning: "Generosity, charitable giving; detachment from possessive hoarding.", category: "Core Virtues", etymology: "Root dā- (to give)" },
  { term: "Dhairya", devanagari: "धैर्य", iast: "dhairya", meaning: "Fortitude, calm resilience, unshakable inner composure born of spiritual wisdom.", category: "Core Virtues", etymology: "From dhīra (steady, wise, calm)" },
  { term: "Dhīra", devanagari: "धीर", iast: "dhīra", meaning: "The steadfast, wise person who remains unshaken amidst pleasures and distress.", category: "Core Virtues", etymology: "From dhī (intellect) + rā (to possess)" },
  { term: "Dvaita", devanagari: "द्वैत", iast: "dvaita", meaning: "Dualism; philosophical school founded by Madhvācārya holding eternal distinction between God, soul, and world.", category: "Philosophical Schools", etymology: "dvi (two)" },
  { term: "Guru", devanagari: "गुरु", iast: "guru", meaning: "Spiritual teacher who dispels darkness; guide on the contemplative journey.", category: "Tradition", etymology: "gu (darkness) + ru (dispeller)" },
  { term: "Indriya", devanagari: "इन्द्रिय", iast: "indriya", meaning: "Sense organ; five cognitive senses (jñānendriya) and five active organs (karmendriya).", category: "Faculties", etymology: "Related to Indra (power, sovereign)" },
  { term: "Īśā", devanagari: "ईशा", iast: "īśā", meaning: "The 'Lord' Upaniṣad; brief 18-verse opening of the Śukla Yajurveda Saṃhitā emphasizing engaged renunciation.", category: "Texts", etymology: "īś (to rule, govern)" },
  { term: "Jāgrat", devanagari: "जाग्रत्", iast: "jāgrat", meaning: "The waking state of consciousness; outward sensory perception of the gross physical realm.", category: "States of Mind", etymology: "Root jāgṛ- (to be awake)" },
  { term: "Jīva", devanagari: "जीव", iast: "jīva", meaning: "The empirical individual living soul, temporarily conditioned by body and mind.", category: "Metaphysics", etymology: "Root jīv- (to live)" },
  { term: "Jñāna", devanagari: "ज्ञान", iast: "jñāna", meaning: "Transformative direct wisdom or spiritual realization, distinguished from factual accumulation.", category: "Epistemology", etymology: "Root jñā- (to know)" },
  { term: "Karma", devanagari: "कर्म", iast: "karma", meaning: "Action, deed; also the psychodynamic law of moral cause and effect.", category: "Ethics", etymology: "Root kṛ- (to do, act)" },
  { term: "Kaṭha", devanagari: "कठ", iast: "kaṭha", meaning: "Principal Upaniṣad telling the story of Nachiketa and Yama, containing the chariot allegory.", category: "Texts", etymology: "Name of a Vedic sage / recension" },
  { term: "Kena", devanagari: "केन", iast: "kena", meaning: "Principal Upaniṣad opening with 'By whom impelled?'; investigates the conscious power behind the senses.", category: "Texts", etymology: "kena (by whom?)" },
  { term: "Kośa", devanagari: "कोश", iast: "kośa", meaning: "Sheath or layer enveloping the pure Self in the Taittirīya psychological model.", category: "Pañcakośa", etymology: "kośa (sheath, scabbard, treasure)" },
  { term: "Madhva", devanagari: "मध्व", iast: "madhva", meaning: "13th-century philosopher-theologian who founded the Dvaita (dualist) school of Vedānta.", category: "Philosophers", etymology: "Personal name" },
  { term: "Mahāvākya", devanagari: "महावाक्य", iast: "mahāvākya", meaning: "Great spiritual proclamation; four premier statements in the Upaniṣads declaring non-duality.", category: "Metaphysics", etymology: "mahā (great) + vākya (sentence)" },
  { term: "Maitrī", devanagari: "मैत्री", iast: "maitrī", meaning: "Late classical Upaniṣad known for profound psychological analysis of mind and yogic breath regulation.", category: "Texts", etymology: "From sage Mitra / Maitri" },
  { term: "Manana", devanagari: "मनन", iast: "manana", meaning: "Rigorous rational reflection and intellectual examination to resolve doubts regarding sacred teachings.", category: "Methodology", etymology: "Root man- (to think, reflect)" },
  { term: "Manas", devanagari: "मनस्", iast: "manas", meaning: "The lower emotional and sensory mind; processes incoming sense data and oscillates in desires.", category: "Faculties", etymology: "Root man- (to think)" },
  { term: "Manomaya Kośa", devanagari: "मनोमयकोश", iast: "manomaya-kośa", meaning: "The mental/emotional sheath consisting of reactive thought, desire, and feelings.", category: "Pañcakośa", etymology: "manas + maya + kośa" },
  { term: "Māṇḍūkya", devanagari: "माण्डूक्य", iast: "māṇḍūkya", meaning: "Condensed 12-verse Upaniṣad analyzing OM and the four states of consciousness (waking, dream, deep sleep, Turīya).", category: "Texts", etymology: "From sage Maṇḍūka" },
  { term: "Māyā", devanagari: "माया", iast: "māyā", meaning: "The creative power of projection; the empirical world of appearance that conceals non-dual truth.", category: "Metaphysics", etymology: "Root mā- (to measure, fashion)" },
  { term: "Mokṣa", devanagari: "मोक्ष", iast: "mokṣa", meaning: "Liberation from ignorance, limitation, and the cycle of suffering; the supreme human goal.", category: "Soteriology", etymology: "Root muc- (to free, release)" },
  { term: "Mukhya Upaniṣad", devanagari: "मुख्य उपनिषद्", iast: "mukhya-upaniṣad", meaning: "The principal 10 to 13 ancient Upaniṣads commented upon by Śaṅkarācārya.", category: "Tradition", etymology: "mukhya (principal, foremost)" },
  { term: "Muṇḍaka", devanagari: "मुण्डक", iast: "muṇḍaka", meaning: "Principal Upaniṣad (Atharvaveda) containing the 'Two Birds' allegory and 'Satyam eva jayate'.", category: "Texts", etymology: "muṇḍa (shaven head; symbol of renunciation)" },
  { term: "Nididhyāsana", devanagari: "निदिध्यासन", iast: "nididhyāsana", meaning: "Deep meditative assimilation; resting continuously in non-dual realization until it becomes spontaneous baseline.", category: "Methodology", etymology: "Intensive form of dhyāna (meditation)" },
  { term: "OM / Praṇava", devanagari: "ॐ / प्रणव", iast: "oṃ / praṇava", meaning: "The primordial sacred syllable representing the totality of consciousness across all dimensions of time.", category: "Mantras", etymology: "pra-nu (to hum, praise)" },
  { term: "Pañcakośa", devanagari: "पञ्चकोश", iast: "pañcakośa", meaning: "The five sheaths of human personality (Annamaya, Prāṇamaya, Manomaya, Vijñānamaya, Ānandamaya).", category: "Pañcakośa", etymology: "pañca (five) + kośa (sheaths)" },
  { term: "Prajñānam", devanagari: "प्रज्ञानम्", iast: "prajñānam", meaning: "Pure Awareness, luminous wisdom; consciousness as the foundation of all reality (Aitareya Up.).", category: "Epistemology", etymology: "pra- (forward/deep) + jñāna (knowing)" },
  { term: "Prāṇa", devanagari: "प्राण", iast: "prāṇa", meaning: "Vital life-force; biological and psychic breath that animates physical and emotional functions.", category: "Physiology", etymology: "pra- + an- (to breathe forth)" },
  { term: "Prāṇamaya Kośa", devanagari: "प्राणमयकोश", iast: "prāṇamaya-kośa", meaning: "The vital energy sheath consisting of the five physiological breaths and autonomic life currents.", category: "Pañcakośa", etymology: "prāṇa + maya + kośa" },
  { term: "Prasthānatrayī", devanagari: "प्रस्थानत्रयी", iast: "prasthānatrayī", meaning: "The three canonical foundations of Vedānta: Upaniṣads (Śruti), Bhagavad Gītā (Smṛti), and Brahma Sūtras (Nyāya).", category: "Tradition", etymology: "prasthāna (departure/foundation) + trayī (triad)" },
  { term: "Preyas", devanagari: "प्रेयस्", iast: "preyas", meaning: "The pleasant, immediate gratification; worldly indulgence that seems attractive but leads to bondage.", category: "Ethics", etymology: "Comparative of priya (dear, pleasing)" },
  { term: "Rāmānuja", devanagari: "रामानुज", iast: "rāmānuja", meaning: "11th-century theologian-philosopher who founded the Viśiṣṭādvaita (qualified non-dualism) school.", category: "Philosophers", etymology: "Personal name" },
  { term: "Ṛṣi", devanagari: "ऋषि", iast: "ṛṣi", meaning: "Seer, sage; ancient contemplative poet who directly perceived eternal cosmic truths.", category: "Tradition", etymology: "Root ṛṣ- (to see, flow)" },
  { term: "Sākṣī", devanagari: "साक्षी", iast: "sākṣī", meaning: "The pure witness; transcendent observing consciousness that notices all thoughts and emotions without involvement.", category: "Metaphysics", etymology: "sa-akṣi (with the eye / direct observer)" },
  { term: "Samādhāna", devanagari: "समाधान", iast: "samādhāna", meaning: "Single-pointed mental focus; integration of cognitive faculties upon spiritual truth.", category: "Core Virtues", etymology: "sam-ā-dhā (to collect, settle)" },
  { term: "Saṃsāra", devanagari: "संसार", iast: "saṃsāra", meaning: "The endless wandering cycle of mundane existence, birth, death, and existential friction.", category: "Metaphysics", etymology: "sam-sṛ (to flow together, wander)" },
  { term: "Satya", devanagari: "सत्य", iast: "satya", meaning: "Truth, reality; unvarnished truthfulness in thought, word, and action; ontological reality.", category: "Ethics", etymology: "From sat (being, reality)" },
  { term: "Śama", devanagari: "शम", iast: "śama", meaning: "Tranquility, mastery of mental agitations; down-regulation of internal emotional churn.", category: "Core Virtues", etymology: "Root śam- (to be quiet, cease)" },
  { term: "Śaṅkara", devanagari: "शङ्कर", iast: "śaṅkara", meaning: "Adi Śaṅkarācārya (c. 8th century CE), premier philosopher-reformer of Advaita Vedānta.", category: "Philosophers", etymology: "śam (auspiciousness) + kara (maker)" },
  { term: "Śiṣya", devanagari: "शिष्य", iast: "śiṣya", meaning: "Student, disciple; earnest seeker under the guidance of a spiritual teacher.", category: "Tradition", etymology: "Root śās- (to instruct, guide)" },
  { term: "Śraddhā", devanagari: "श्रद्धा", iast: "śraddhā", meaning: "Existential trust, deep conviction in truth, sincere intellectual and spiritual faith.", category: "Core Virtues", etymology: "śrat (heart, truth) + dhā (to place)" },
  { term: "Śravaṇa", devanagari: "श्रवण", iast: "śravaṇa", meaning: "Attentive listening; receptive, open absorption of sacred philosophical wisdom from teachers and texts.", category: "Methodology", etymology: "Root śru- (to hear)" },
  { term: "Śreyas", devanagari: "श्रेयस्", iast: "śreyas", meaning: "The good, highest welfare; spiritual excellence and enduring wisdom (contrasted with Preyas).", category: "Ethics", etymology: "Comparative of śrī (auspicious, noble)" },
  { term: "Śruti", devanagari: "श्रुति", iast: "śruti", meaning: "That which is directly heard; primordial revealed literature consisting of the Vedas and Upaniṣads.", category: "Tradition", etymology: "Root śru- (to hear)" },
  { term: "Sthitaprajña", devanagari: "स्थितप्रज्ञ", iast: "sthitaprajña", meaning: "Person of steady, unshakeable wisdom who remains balanced in joy and grief (Bhagavad Gītā 2.54–72).", category: "Core Virtues", etymology: "sthita (firm, established) + prajñā (wisdom)" },
  { term: "Suṣupti", devanagari: "सुषुप्ति", iast: "suṣupti", meaning: "The deep, dreamless sleep state; temporary dissolution of mental objects into undifferentiated peace.", category: "States of Mind", etymology: "su- (well) + svap- (to sleep)" },
  { term: "Svapna", devanagari: "स्वप्न", iast: "svapna", meaning: "The dreaming state of consciousness; inner subjective creation of subtle mental worlds.", category: "States of Mind", etymology: "Root svap- (to sleep)" },
  { term: "Tapas", devanagari: "तपस्", iast: "tapas", meaning: "Spiritual heat, disciplined inquiry, focused contemplative austerity.", category: "Methodology", etymology: "Root tap- (to burn, generate heat)" },
  { term: "Titikṣā", devanagari: "तितिक्षा", iast: "titikṣā", meaning: "Patient endurance; capacity to bear pairs of opposites (heat/cold, praise/censure) without mental collapse or retaliation.", category: "Core Virtues", etymology: "Desiderative of sah- (to bear, endure)" },
  { term: "Turīya", devanagari: "तुरीय", iast: "turīya", meaning: "The Fourth; unconditioned witnessing consciousness underlying and illuminating waking, dream, and deep sleep.", category: "States of Mind", etymology: "catur (four) -> turīya (fourth)" },
  { term: "Upaniṣad", devanagari: "उपनिषद्", iast: "upaniṣad", meaning: "Sitting near a teacher with devotion; secret spiritual wisdom that loosens bondage and destroys ignorance.", category: "Tradition", etymology: "upa (near) + ni (down) + sad (to sit / to loosen)" },
  { term: "Uparati", devanagari: "उपरति", iast: "uparati", meaning: "Quiet withdrawal from worldly busyness; psychological detachment from sensory distractions.", category: "Core Virtues", etymology: "upa + ram- (to cease, delight within)" },
  { term: "Vijñānamaya Kośa", devanagari: "विज्ञानमयकोश", iast: "vijñānamaya-kośa", meaning: "The intellectual sheath consisting of discriminative intellect (buddhi) and reflective wisdom.", category: "Pañcakośa", etymology: "vi-jñāna (discernment) + maya + kośa" },
  { term: "Viśiṣṭādvaita", devanagari: "विशिष्टाद्वैत", iast: "viśiṣṭādvaita", meaning: "Qualified non-dualism; school of Vedānta expounded by Rāmānuja wherein souls and world form the body of God.", category: "Philosophical Schools", etymology: "viśiṣṭa (qualified) + advaita" },
  { term: "Viveka", devanagari: "विवेक", iast: "viveka", meaning: "Discrimination; the capacity to distinguish the permanent from the impermanent, Self from non-Self.", category: "Core Virtues", etymology: "Root vic- (to sift, separate)" },
  { term: "Yoga", devanagari: "योग", iast: "yoga", meaning: "Union; steady control of the mind and senses (Kaṭha 2.3.11); integration of consciousness.", category: "Methodology", etymology: "Root yuj- (to yoke, unite)" }
];

// 2. BIBLIOGRAPHY (Annotated scholarly & primary sources)
const bibliography = {
  primarySources: [
    {
      author: "Olivelle, Patrick (trans.)",
      year: 1998,
      title: "The Early Upaniṣads: Annotated Text and Translation",
      publisher: "Oxford University Press",
      location: "New York / Oxford",
      description: "Authoritative contemporary critical edition providing philologically rigorous translations, extensive Sanskrit critical apparatus, and detailed historical introductions for the older prose Upaniṣads."
    },
    {
      author: "Radhakrishnan, Sarvepalli",
      year: 1953,
      title: "The Principal Upaniṣads",
      publisher: "George Allen & Unwin",
      location: "London",
      description: "Monumental bilingual edition with Roman transliteration, comprehensive English rendering, and exhaustive philosophical notes drawing cross-cultural parallels between Vedānta and Western metaphysics."
    },
    {
      author: "Müller, F. Max (trans.)",
      year: 1879,
      volume: "Vol. 1 (1879) & Vol. 15 (1884)",
      title: "The Upaniṣads (Sacred Books of the East)",
      publisher: "Clarendon Press / Oxford University Press",
      location: "Oxford",
      description: "Foundational public-domain translation of the major Upaniṣads in the historic Sacred Books of the East series, providing landmark 19th-century European scholarly engagement with Vedic literature."
    },
    {
      author: "Gambhirananda, Swami (trans.)",
      year: 1957,
      title: "Eight Upaniṣads with the Commentary of Śaṅkarācārya",
      publisher: "Advaita Ashrama",
      location: "Kolkata",
      description: "Standard English rendering of Śaṅkara's authoritative Sanskrit commentaries (Bhāṣyas) on Īśā, Kena, Kaṭha, Taittirīya, Aitareya, Muṇḍaka, Māṇḍūkya, and Praśna Upaniṣads."
    },
    {
      author: "Madhavananda, Swami (trans.)",
      year: 1934,
      title: "The Bṛhadāraṇyaka Upaniṣad with the Commentary of Śaṅkarācārya",
      publisher: "Advaita Ashrama",
      location: "Kolkata",
      description: "Complete, scholarly English translation of the immense Bṛhadāraṇyaka Upaniṣad along with Śaṅkara's extensive philosophical commentary."
    },
    {
      author: "Easwaran, Eknath",
      year: 1987,
      title: "The Upanishads: A Classic Translation",
      publisher: "Nilgiri Press",
      location: "Tomales, California",
      description: "Lyrical, accessible rendering prioritizing contemplative clarity and psychological resonance for general contemporary readers."
    }
  ],
  indianPsychology: [
    {
      author: "Rao, K. Ramakrishna & Paranjpe, Anand C.",
      year: 2016,
      title: "Psychology in the Indian Tradition",
      publisher: "Springer",
      location: "New Delhi / New York",
      description: "Comprehensive academic textbook mapping classical Indian epistemological, cognitive, emotional, and transcendent models to contemporary psychological constructs."
    },
    {
      author: "Paranjpe, Anand C.",
      year: 1998,
      title: "Self and Identity in Modern Psychology and Indian Thought",
      publisher: "Plenum Press",
      location: "New York",
      description: "Groundbreaking comparative study contrasting Western theories of ego development (Erikson, Rogers) with Advaitic and Yogic models of consciousness and identity."
    },
    {
      author: "Swami Akhilananda",
      year: 1948,
      title: "Hindu Psychology: Its Meaning for the West",
      publisher: "Routledge",
      location: "London",
      description: "Pioneering early 20th-century treatise presenting classical Vedāntic mental training, emotion regulation, and meditation to Western clinical psychology audiences."
    },
    {
      author: "Swami Rama, Ballentine, Rudolph & Swami Ajaya",
      year: 1976,
      title: "Yoga and Psychotherapy: The Evolution of Consciousness",
      publisher: "Himalayan Institute",
      location: "Honesdale, PA",
      description: "Synthesis of classical Indian kosha models with Western psychodynamic, behavioral, humanistic, and transpersonal therapeutic paradigms."
    },
    {
      author: "Deussen, Paul",
      year: 1906,
      title: "The Philosophy of the Upanishads",
      publisher: "T&T Clark",
      location: "Edinburgh",
      description: "Masterwork of 19th-century German Indology systematizing the theology, cosmology, and psychology of the Vedic texts."
    },
    {
      author: "Cohen, Signe (ed.)",
      year: 2018,
      title: "The Upaniṣads: A Complete Guide",
      publisher: "Routledge",
      location: "London / New York",
      description: "Comprehensive contemporary reference volume featuring chapters on historical context, philosophy, ritual, gender, and reception history by leading global scholars."
    }
  ],
  modernResilience: [
    {
      author: "Masten, Ann S.",
      year: 2001,
      title: "Ordinary Magic: Resilience Processes in Development",
      journal: "American Psychologist",
      volume: "56(3), 227–238",
      description: "Seminal paper demonstrating that human resilience is not a rare superhuman anomaly, but arises from ordinary, normative adaptive human protective systems."
    },
    {
      author: "Bonanno, George A.",
      year: 2004,
      title: "Loss, Trauma, and Human Resilience: Have We Underestimated the Human Capacity to Thrive?",
      journal: "American Psychologist",
      volume: "59(1), 20–28",
      description: "Landmark longitudinal research distinguishing true resilience (stable trajectories of healthy functioning) from recovery and chronic trauma."
    },
    {
      author: "Frankl, Viktor E.",
      year: 1946,
      title: "Man's Search for Meaning",
      publisher: "Beacon Press",
      location: "Boston",
      description: "Existential psychiatric classic detailing how discovering meaning and an unshakeable inner spiritual freedom enables survival through extreme catastrophic adversity."
    },
    {
      author: "Tedeschi, Richard G. & Calhoun, Lawrence G.",
      year: 2004,
      title: "Posttraumatic Growth: Conceptual Foundations and Empirical Evidence",
      journal: "Psychological Inquiry",
      volume: "15(1), 1–18",
      description: "Empirical framework examining positive psychological transformation, increased personal strength, and existential depth following severe life crises."
    },
    {
      author: "Seligman, Martin E.P.",
      year: 2011,
      title: "Flourish: A Visionary New Understanding of Happiness and Well-being",
      publisher: "Free Press",
      location: "New York",
      description: "Introduces the PERMA model of positive psychology and explores comprehensive soldier fitness and cognitive resilience training."
    },
    {
      author: "Kabat-Zinn, Jon",
      year: 1990,
      title: "Full Catastrophe Living: Using the Wisdom of Your Body and Mind to Face Stress, Pain, and Illness",
      publisher: "Delacorte",
      location: "New York",
      description: "Foundational clinical manual introducing Mindfulness-Based Stress Reduction (MBSR), adapting contemplative attentional and witness practices for modern behavioral medicine."
    }
  ]
};

// 3. QUIZ (15 Questions with detailed explanations)
const quiz = [
  {
    id: 1,
    question: "What is the psychological definition of 'Abhaya' (fearlessness) in the Taittirīya and Bṛhadāraṇyaka Upaniṣads?",
    options: [
      "Physical invincibility and fearlessness in armed combat",
      "The complete absence of fear born from realizing non-dual oneness, since fear arises from perceived separateness ('dvitīyād vai bhayam')",
      "Suppression of fearful emotions through stoic willpower",
      "A ritual sacrifice performed to ward off natural disasters"
    ],
    correctAnswer: 1,
    explanation: "In Bṛhadāraṇyaka 1.4.2, the sage declares 'dvitīyād vai bhayaṃ bhavati' (fear arises from a second entity). When there is no perceived threat outside the Self, existential terror dissolves."
  },
  {
    id: 2,
    question: "In the famous chariot metaphor of the Kaṭha Upaniṣad (1.3.3–9), what does the charioteer (sārathi) represent?",
    options: [
      "The physical body (śarīra)",
      "The discriminative intellect (buddhi)",
      "The sensory organs (indriyas)",
      "The wandering mind (manas)"
    ],
    correctAnswer: 1,
    explanation: "The Kaṭha assigns: Ātman = passenger/rider; body = chariot; buddhi = charioteer; manas = reins; indriyas = horses; objects of sense = roads."
  },
  {
    id: 3,
    question: "What distinction does Yama teach Nachiketa regarding human choices in Kaṭha Upaniṣad 1.2.1–2?",
    options: [
      "Dharma vs Adharma",
      "Śreyas (the good/enduring) vs Preyas (the pleasant/immediate gratification)",
      "Vidyā vs Samādhi",
      "Karma vs Bhakti"
    ],
    correctAnswer: 1,
    explanation: "Yama explains that Śreyas and Preyas confront every human being. The wise person discriminates and chooses Śreyas; the short-sighted person clings to Preyas for quick gratification."
  },
  {
    id: 4,
    question: "In Chāndogya Upaniṣad 7.1.3, why does the deeply learned scholar Nārada weep before sage Sanatkumāra?",
    options: [
      "He lost his family in a catastrophic war",
      "Despite knowing all hymns, grammar, and sciences, he is only a 'knower of words' (mantravit) and not a 'knower of the Self' (ātmavit), so grief still consumes him",
      "He was rejected from the royal court of Videha",
      "He failed his Vedic examinations"
    ],
    correctAnswer: 1,
    explanation: "Nārada confesses: 'I am only a knower of texts, not a knower of the Self. I have heard from sages like you that only the knower of Self crosses over sorrow (tarati śokam ātmavit).' Information does not cure existential grief."
  },
  {
    id: 5,
    question: "What is the core pedagogical takeaway from the banyan seed dialogue in Chāndogya Upaniṣad 6.12?",
    options: [
      "Banyan trees should be preserved for forest ecology",
      "From the invisible subtle essence that appears like 'nothing at all', the mighty manifest reality emerges: That subtle essence is the Self",
      "The physical world is completely non-existent",
      "Seeds must be ritually buried before sunrise"
    ],
    correctAnswer: 1,
    explanation: "Uddālaka guides Śvetaketu to break open a banyan seed until he sees 'nothing at all', revealing that invisible, subtle potency is the bedrock of the entire manifest cosmos."
  },
  {
    id: 6,
    question: "How is 'Titikṣā' defined in the context of Upaniṣadic resilience (Bṛhadāraṇyaka 4.4.23)?",
    options: [
      "Passive resignation to injustice",
      "Patient endurance of dualities (heat/cold, pleasure/pain) without retaliation, distress, or psychological collapse",
      "Extreme physical mortification",
      "Blind obedience to religious dogmas"
    ],
    correctAnswer: 1,
    explanation: "Titikṣā is deliberate distress tolerance: holding space for physical or emotional discomfort with inner composure, rather than reacting compulsively."
  },
  {
    id: 7,
    question: "What did the divine thunder 'DA-DA-DA' signify to the gods, humans, and demons in Bṛhadāraṇyaka 5.2?",
    options: [
      "Destroy, Defeat, Dominate",
      "Dāmyata (self-control), Datta (giving), Dayadhvam (compassion)",
      "Dhyāna (meditation), Dharma (duty), Dhṛti (courage)",
      "Devatā, Dāsa, Dāna"
    ],
    correctAnswer: 1,
    explanation: "Prajāpati's thunder gave three psychological antidotes: gods prone to indulgence need self-control (dāmyata); humans prone to greed need giving (datta); demons prone to anger need compassion (dayadhvam)."
  },
  {
    id: 8,
    question: "Which of the following is NOT one of the five sheaths (Pañcakośa) in Taittirīya Upaniṣad 2?",
    options: [
      "Annamaya Kośa (food/physical)",
      "Prāṇamaya Kośa (vital breath)",
      "Kāmamaya Kośa (sensory desire)",
      "Vijñānamaya Kośa (wisdom/intellect)"
    ],
    correctAnswer: 2,
    explanation: "The five sheaths are Annamaya (physical), Prāṇamaya (energy/breath), Manomaya (mind/emotion), Vijñānamaya (intellect/discernment), and Ānandamaya (bliss). 'Kāmamaya' is not one of them."
  },
  {
    id: 9,
    question: "In the 'Two Birds' allegory (Muṇḍaka 3.1.1–2), what do the two birds represent?",
    options: [
      "Good deeds and bad deeds",
      "The active experiencing self (jīva eating fruit) and the silent witnessing consciousness (Īśvara/Ātman looking on)",
      "Male and female spiritual principles",
      "Day and night cycles"
    ],
    correctAnswer: 1,
    explanation: "One bird eats the sweet and bitter fruits of the tree (sensory experiencing jīva), while the other bird sits silently watching without eating (pure witnessing sākṣī)."
  },
  {
    id: 10,
    question: "What is 'Turīya' in the Māṇḍūkya Upaniṣad (verse 7)?",
    options: [
      "A fourth dream state occurring during REM sleep",
      "The unconditioned, non-dual baseline of pure awareness that underlies and illuminates waking, dream, and deep sleep",
      "A trance state achieved only through dangerous drugs",
      "The death of the physical body"
    ],
    correctAnswer: 1,
    explanation: "Turīya is not merely a fourth changing state, but the eternal, unchanging witnessing ground ('śāntaṃ śivam advaitam') upon which waking, dreaming, and deep sleep appear and vanish."
  },
  {
    id: 11,
    question: "What does the famous aphorism 'Nāyam ātmā balahīnena labhyaḥ' (Muṇḍaka 3.2.4) mean in psychological context?",
    options: [
      "Only Olympic weightlifters can understand philosophy",
      "The Self cannot be realized by one devoid of inner spiritual stamina, moral courage, and psychological vigor",
      "Physical violence is necessary for enlightenment",
      "Weak people should be excluded from society"
    ],
    correctAnswer: 1,
    explanation: "Śaṅkara clarifies that 'bala' (strength) signifies inner mental fortitude, psychological stamina, and devotion to truth. Without moral spine, the mind collapses when faced with spiritual trials."
  },
  {
    id: 12,
    question: "According to Maitrī Upaniṣad 6.34, what is the ultimate cause of human bondage and liberation?",
    options: [
      "Astrological planetary alignments",
      "The mind alone ('mana eva manuṣyāṇāṃ kāraṇaṃ bandha-mokṣayoḥ')",
      "Social class and economic wealth",
      "Accidental genetic mutations"
    ],
    correctAnswer: 1,
    explanation: "The mind attached to sensory cravings leads to bondage; the mind clarified and detached from compulsive grasping leads directly to liberation."
  },
  {
    id: 13,
    question: "What is the famous philosophical question asked by Maitreyī to her husband Yājñavalkya in Bṛhadāraṇyaka 2.4?",
    options: [
      "'Where did you hide the gold from King Janaka?'",
      "'What shall I do with that which cannot make me immortal?' ('yenāhaṃ nāmṛtā syāṃ kim ahaṃ tena kuryām')",
      "'Why must you leave me for the forest?'",
      "'Which ritual produces the best harvest?'"
    ],
    correctAnswer: 1,
    explanation: "When offered half of Yājñavalkya's estate, Maitreyī discards material wealth as incapable of curing mortality: 'What shall I do with that which will not make me immortal? Tell me of that which leads beyond decay.'"
  },
  {
    id: 14,
    question: "What is 'spiritual bypassing', and how do the Upaniṣads safeguard against it?",
    options: [
      "Skipping morning prayers; avoided by strict temple attendance",
      "Using spiritual concepts (e.g. 'it's all an illusion') to evade authentic emotional pain or developmental wounds; avoided by holistic kosha integration and honest inquiry",
      "Taking shortcuts on pilgrimages",
      "A clinical term for religious conversion"
    ],
    correctAnswer: 1,
    explanation: "Spiritual bypassing uses metaphysics as an avoidance tactic. The Upaniṣads counter this by demanding somatic grounding, ethical purification, and emotional honesty before higher wisdom can be realized."
  },
  {
    id: 15,
    question: "What is the core message of the website's central tagline: 'The storm moves the tree. It does not move the ground'?",
    options: [
      "Banyan trees have deeper roots than pine trees",
      "External crises and psychological storms inevitably agitate the body-mind, but our deepest identity (Ātman) remains forever motionless, fearless, and unbroken",
      "Meteorological storms are optical illusions",
      "One should never plant trees in windy regions"
    ],
    correctAnswer: 1,
    explanation: "This encapsulates the entire thesis of Dhairya: resilience is not the absence of storms, but anchoring in the unshakeable ground of being while the branches of life sway."
  }
];

// 4. TIMELINE & GEOGRAPHY (Ancient India map & chronology)
const timeline = [
  {
    period: "Early Vedic Period",
    dates: "c. 1500 – 1000 BCE",
    region: "Sapta Sindhu (Northwestern subcontinent / Punjab)",
    keyDevelopments: "Composition of the Ṛgveda Saṃhitā; focus on cosmic order (Ṛta), natural powers (Agni, Indra, Varuṇa), and communal sacrificial hymns.",
    psychologicalFocus: "External harmony with natural and cosmic forces; communal protection and collective prayer."
  },
  {
    period: "Middle to Late Vedic Period",
    dates: "c. 1000 – 800 BCE",
    region: "Kuru-Pañcāla heartland (Ganges-Yamuna Doab)",
    keyDevelopments: "Sāmaveda, Yajurveda, Atharvaveda, and Brāhmaṇa prose manuals. Complex ritual systematization and preliminary interiorization of sacrifice (Prāṇāgnihotra).",
    psychologicalFocus: "Discipline, ritual precision, and early models of breath (Prāṇa) as the internal sacrificial flame."
  },
  {
    period: "Early Upaniṣadic Period",
    dates: "c. 800 – 500 BCE",
    region: "Eastern Gangetic Plain (Videha, Kosala, Magadha, Kāśī)",
    keyDevelopments: "Oldest prose Upaniṣads: Bṛhadāraṇyaka, Chāndogya, Taittirīya, Aitareya, Kena. Rise of royal debate assemblies (King Janaka), forest academies, and women sages (Gārgī, Maitreyī).",
    psychologicalFocus: "Radical inward turn: discovery of Ātman-Brahman non-duality; inquiry into the witness of consciousness; overcoming sorrow through self-knowledge."
  },
  {
    period: "Middle Verse Upaniṣads",
    dates: "c. 500 – 200 BCE",
    region: "Wider northern and central India",
    keyDevelopments: "Metrical Upaniṣads: Kaṭha, Īśā, Śvetāśvatara, Muṇḍaka, Praśna. Integration of early Sāṅkhya and Yoga paradigms; chariot allegory; two birds metaphor.",
    psychologicalFocus: "Self-regulation, attentional mastery, ethical discrimination (Śreyas vs Preyas), and somatic breath coordination."
  },
  {
    period: "Late Classical Upaniṣads & Epics",
    dates: "c. 200 BCE – 200 CE",
    region: "Pan-Indian distribution",
    keyDevelopments: "Māṇḍūkya, Maitrī Upaniṣads; composition of the Bhagavad Gītā (as Smṛti essence of Upaniṣads) and early Brahma Sūtras.",
    psychologicalFocus: "Four states of consciousness (Turīya), Karma Yoga (action without collapse), and systematic methods for mind liberation."
  },
  {
    period: "Classical Scholastic Period",
    dates: "c. 700 – 1300 CE",
    region: "All major regions of India (Kāñcī, Śṛṅgerī, Vārāṇasī, Dvārakā, Badarīnātha)",
    keyDevelopments: "Systematization of the Prasthānatrayī by Ādi Śaṅkara (Advaita), Rāmānuja (Viśiṣṭādvaita), and Madhvācārya (Dvaita).",
    psychologicalFocus: "Epistemological rigor (Śravaṇa-Manana-Nididhyāsana), distress tolerance (Titikṣā), and analytical debate methods."
  }
];

// Write files
fs.writeFileSync(path.join(contentDir, 'glossary.json'), JSON.stringify(glossary, null, 2), 'utf8');
console.log(`Wrote glossary.json with ${glossary.length} terms.`);

fs.writeFileSync(path.join(contentDir, 'bibliography.json'), JSON.stringify(bibliography, null, 2), 'utf8');
console.log('Wrote bibliography.json.');

fs.writeFileSync(path.join(contentDir, 'quiz.json'), JSON.stringify(quiz, null, 2), 'utf8');
console.log(`Wrote quiz.json with ${quiz.length} questions.`);

fs.writeFileSync(path.join(contentDir, 'timeline.json'), JSON.stringify(timeline, null, 2), 'utf8');
console.log(`Wrote timeline.json with ${timeline.length} eras.`);
