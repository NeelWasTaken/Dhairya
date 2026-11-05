const fs = require('fs');
const path = require('path');

const chaptersDir = path.join(__dirname, '../src/content/chapters');

const chapters = [
  {
    id: 12,
    devanagariNumeral: "१२",
    title: "Mind as the Cause of Bondage and Freedom",
    subtitle: "The Anatomy of Inner Architecture & Energetic Mastery",
    sanskritTitle: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः",
    epigraph: "चित्तमेव हि संसारं तत्प्रयत्नेन शोधयेत् — The mind itself is the world of flux; therefore let a person purify it with diligent care.",
    content: [
      {
        type: "prose",
        text: "In the psychological cartography of the Upaniṣads, the external world does not possess the inherent power to bind or torment the human spirit. The locus of both subjugation and sovereignty resides squarely within the architecture of the mind (manas and citta). The Maitrī Upaniṣad (6.34) delivers one of the most celebrated aphorisms in world psychology: 'mana eva manuṣyāṇāṃ kāraṇaṃ bandha-mokṣayoḥ'—mind alone is the cause of bondage and liberation. When the mind is passively colonized by sensory attachments and compulsive aversions, it becomes the engine of psychic entrapment; when it is cleansed through discriminative awareness, it serves as the vehicle of liberation."
      },
      {
        type: "verse_ref",
        verseId: "maitri-6-34"
      },
      {
        type: "prose",
        text: "The Upaniṣadic sages were remarkably free from the Cartesian dualism that later plagued Western philosophy. They did not view the mind as an ethereal ghost disconnected from somatic reality, nor did they reduce consciousness to mere biological matter. In the Śvetāśvatara Upaniṣad (2.8–9), we encounter an exquisitely practical psychosomatic discipline: the seeker is instructed to steady the physical frame with the upper three parts (chest, neck, and head) erect, draw the wandering senses into the heart through deliberate mental focus, and calibrate the breath through measured nasal rhythm. Posture and breath are recognized as direct levers for stabilizing mental churn."
      },
      {
        type: "verse_ref",
        verseId: "svetasvatara-2-8-9"
      },
      {
        type: "prose",
        text: "This physiological grounding is deepened in the Praśna Upaniṣad, where the sage Pippalāda responds to the inquiries of six earnest seekers. In the third praśna, Pippalāda explains how the primary life-force (Prāṇa) arises directly from the conscious Self ('ātmana eṣa prāṇo jāyate'), casting an energetic shadow over the body and entering somatic channels through the agency of mental intention ('mano-kṛtena'). Just as a monarch designates regional administrators over distinct towns, so does the master Prāṇa allocate subsidiary currents—Apāna for elimination, Samāna for digestive equilibrium, Vyāna for circulatory distribution, and Udāna for vertical integration and transition. Breath and autonomic balance are thus revealed to be the somatic language of the mind."
      },
      {
        type: "verse_ref",
        verseId: "prasna-3-3-4"
      },
      {
        type: "prose",
        text: "Yet the Upaniṣads deliver an even more radical psychological insight: the mind, for all its dazzling complexity, is not the ultimate sovereign. The opening verse of the Kena Upaniṣad sounds like an ancient deconstructive inquiry: 'keneṣitaṃ patati preṣitaṃ manaḥ?'—By whom impelled, by whom commanded does the mind speed toward its targets? Who animates the eye, who marshals the tongue, who awakens the vital breath? This inquiry shatters our habitual identification with obsessive rumination. The mind is revealed as an instrument (karaṇa)—a sophisticated cognitive apparatus—not the final conscious subject."
      },
      {
        type: "verse_ref",
        verseId: "kena-1-1"
      },
      {
        type: "resilience_insight",
        title: "The Sovereign Observer",
        text: "Resilience collapses whenever we believe that we ARE our anxious thoughts. When cognitive catastrophic loops occur, the Maitrī and Kena insights provide instant therapeutic defusion: the mind is an organ producing mental secretions, just as the stomach produces digestive enzymes. By asking 'who is observing this mental noise?', we step back into the sovereign seat of the witness, regaining executive emotional control."
      },
      {
        type: "modern_parallel",
        title: "Cognitive Defusion and Vagal Modulation",
        text: "This Upaniṣadic synthesis closely mirrors modern polyvagal theory (Porges, 2011) and Acceptance and Commitment Therapy (ACT; Hayes, Strosahl, & Wilson, 1999). Polyvagal research confirms that diaphragmatic breathing and upright postural alignment stimulate the ventral vagal complex, signaling safety to the amygdala. Simultaneously, ACT's concept of 'cognitive defusion'—stepping back from thoughts to see them as ongoing verbal processes rather than literal truths—replicates the Kena inquiry into the observer behind the cognitive apparatus."
      },
      {
        type: "reflect",
        prompt: "When you notice mental worry accelerating today, pause and ask the Kena question: 'Who is the silent one aware of this thought?' Notice what happens to the intensity of the anxiety the moment you become the observer."
      }
    ],
    sources: [
      "Maitrī Upaniṣad 6.34",
      "Śvetāśvatara Upaniṣad 2.8–9",
      "Praśna Upaniṣad 3.3–4",
      "Kena Upaniṣad 1.1",
      "Śaṅkara's Bhāṣya on Kena and Praśna",
      "Anand C. Paranjpe, Self and Identity in Modern Psychology and Indian Thought (1998)"
    ],
    wordCount: 780
  },
  {
    id: 13,
    devanagariNumeral: "१३",
    title: "Action Without Collapse: Engaged Non-Attachment",
    subtitle: "The Īśā Vision of Joyful Longevity & Dynamic Presence",
    sanskritTitle: "कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं समाः",
    epigraph: "तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् — Rejoice through letting go; do not covet the wealth of anyone.",
    content: [
      {
        type: "prose",
        text: "A frequent mischaracterization of Indian philosophy—circulated by early colonial commentators such as Hegel and later repeated in casual literature—is that the Upaniṣads advocate world-negating escapism, passive quietism, or life-denying fatalism. The opening verses of the Īśā Upaniṣad decisively refute this misconception. Embedded directly within the Śukla Yajurveda Saṃhitā, the Īśā begins not with an injunction to flee the world into forest hermitages, but with a magnificent ecological and psychological manifesto: 'īśāvāsyam idaṃ sarvaṃ yat kiñca jagatyāṃ jagat'—All this, whatever moves and fluctuates in this changing cosmos, is enveloped by sacred awareness."
      },
      {
        type: "verse_ref",
        verseId: "isha-1"
      },
      {
        type: "prose",
        text: "From this cosmological vision follows a paradoxical psychological injunction: 'tena tyaktena bhuñjīthāḥ'—enjoy life through letting go; rejoice through non-attachment. The Upaniṣadic seer recognizes that toxic possessiveness is the enemy of genuine enjoyment. When we attempt to possess a person, an achievement, or a status object, our enjoyment is immediately infected by anxiety over its eventual decay or loss. By renouncing possessive clinging (tyāga), we are liberated to experience the beauty of the world with unburdened presence. Renunciation here is not ascetic deprivation; it is the prerequisite for pristine delight."
      },
      {
        type: "prose",
        text: "The very next verse delivers an unapologetic affirmation of human vitality, social responsibility, and longevity: 'kurvann eveha karmāṇi jijīviṣec chataṃ samāḥ'—performing dedicated work in this world, let a person desire to live a full hundred years! The text insists that action (karma) performed without egoistic clinging does not contaminate or exhaust the human soul ('na karma lipyate nare'). Dynamic engagement and inner serenity are not mutually exclusive poles; they are mutually reinforcing partners."
      },
      {
        type: "verse_ref",
        verseId: "isha-2"
      },
      {
        type: "prose",
        text: "This Īśā vision serves as the canonical foundation for the later formulation of Karma Yoga in the Bhagavad Gītā (specifically chapter 2, verses 47–55). In the famous dialogue of the battlefield, Kṛṣṇa synthesizes the Īśā doctrine into the portrait of the Sthitaprajña—the person of unshakable wisdom who acts decisively in the midst of extreme crisis without psychological collapse, having surrendered anxious attachment to outcomes (phala-tṛṣṇā). The Gītā, while traditionally categorized as Smṛti (remembered tradition), is revered as the distilled nectar of the Upaniṣadic cows ('sarvopaniṣado gāvo dogdhā gopāla-nandanaḥ')."
      },
      {
        type: "resilience_insight",
        title: "The Cure for Burnout",
        text: "Modern occupational burnout rarely stems from hard work alone; it stems from toxic outcome-fixation, hyper-vigilance over personal credit, and the frantic terror of failure. The Īśā formula—acting wholeheartedly while releasing possessive clinging—decouples professional effort from existential terror. Work ceases to be a frantic defense of ego-worth and becomes a joyful expression of purposeful energy."
      },
      {
        type: "modern_parallel",
        title: "Intrinsically Motivated Flow vs Extrinsic Anxiety",
        text: "Parallels Self-Determination Theory (Deci & Ryan, 2000) and Mihaly Csíkszentmihályi's flow research (1990). When individuals are extrinsically motivated by outcome-control, ego threat remains perpetually elevated, depleting executive resilience. Conversely, intrinsic task absorption and non-attachment to external reward cultivate durable psychological longevity and high distress tolerance."
      },
      {
        type: "reflect",
        prompt: "Think of an ongoing project or responsibility that feels heavy. What would it look like to perform the necessary actions with total dedication, while completely letting go of the need to control how others respond to the outcome?"
      }
    ],
    sources: [
      "Īśā Upaniṣad verses 1–3",
      "Śaṅkara's Bhāṣya on Īśā Upaniṣad",
      "Mahatma Gandhi, Speech on Īśā Upaniṣad at Kottayam (1937)",
      "B.G. Tilak, Śrīmad Bhagavadgītā Rahasya (1915)",
      "Patrick Olivelle, The Early Upaniṣads (1998)"
    ],
    wordCount: 750
  },
  {
    id: 14,
    devanagariNumeral: "१४",
    title: "Women Sages & Dialectical Audacity: Maitreyī and Gārgī",
    subtitle: "Existential Discernment & The Courage to Interrogate Power",
    sanskritTitle: "येनाहं नामृता स्यां किमहं तेन कुर्याम्",
    epigraph: "सा होवाच मैत्रेयी येनाहं नामृता स्यां किमहं तेन कुर्याम् — What shall I do with that which cannot make me immortal?",
    content: [
      {
        type: "prose",
        text: "The philosophical landscape of the older Upaniṣads—most prominently the majestic Bṛhadāraṇyaka—features an extraordinary presence of female philosopher-sages whose intellect, autonomy, and existential courage fundamentally challenge later stereotypes of Vedic patriarchal exclusivity. In the courts of royal debate and the intimacy of domestic renunciation, figures like Maitreyī and Gārgī Vācaknavī emerge not as decorative observers, but as formidable protagonists of philosophical inquiry."
      },
      {
        type: "verse_ref",
        verseId: "brhadaranyaka-2-4-5"
      },
      {
        type: "prose",
        text: "In Bṛhadāraṇyaka 2.4 (and recurring in 4.5), the sage Yājñavalkya announces his decision to embrace the monastic, wandering life (pravrajyā). Intending to divide his worldly estate between his two wives, Kātyāyanī and Maitreyī, he is stopped by Maitreyī's incisive discernment. Unlike Kātyāyanī, whom the text describes as possessing ordinary domestic wisdom ('strī-prajñā'), Maitreyī possesses the thirst for sacred discourse ('brahma-vādinī'). She asks directly: 'If this entire earth filled with boundless riches were mine, would it make me immortal?' When Yājñavalkya truthfully replies that wealth can secure material comfort but never immortality, Maitreyī utters one of the most luminous declarations in world literature: 'yenāhaṃ nāmṛtā syāṃ kim ahaṃ tena kuryām'—What shall I do with that which cannot grant me immortality? Tell me only of that which leads beyond decay."
      },
      {
        type: "prose",
        text: "Even more politically and intellectually daring is Gārgī Vācaknavī in the grand debate at the court of King Janaka of Videha (Bṛhadāraṇyaka 3.6 and 3.8). Janaka has offered a prize of one thousand cattle, their horns wrapped in gold, to the most illumined sage. Yājñavalkya arrogantly claims the cattle before the debate concludes, prompting a volley of interrogations from the assembled male priests. After several seasoned scholars are defeated and silenced, Gārgī steps forward twice to cross-examine Yājñavalkya."
      },
      {
        type: "verse_ref",
        verseId: "brhadaranyaka-3-8-8-10"
      },
      {
        type: "prose",
        text: "In chapter 3.8, Gārgī addresses the assembly with warrior-like confidence, declaring that she will test Yājñavalkya with two questions like a fierce hero of Kāśī or Videha stringing an unbending bow and rising with two pointed arrows. She interrogates him on the ontological warp and woof of reality: across what is the universe of space and time woven? When Yājñavalkya is driven to reveal the ultimate Imperishable ground—the Akṣara that is neither coarse nor fine, yet under whose sovereignty sun and moon hold their stations—Gārgī magnanimously turns to the male assembly and advises them to bow before Yājñavalkya, displaying an intellectual integrity that values truth above personal ego or competitive victory."
      },
      {
        type: "resilience_insight",
        title: "Moral Clarity and Refusing to be Silenced",
        text: "Maitreyī models values-resilience: the courage to reject golden handcuffs when they stifle the soul's true hunger. Gārgī models voice-resilience: the refusal to succumb to intimidation in spaces of patriarchal authority. Both demonstrate that resilience is not merely passive endurance of hardship, but the active, articulate assertion of truth in the face of conventional compromise."
      },
      {
        type: "modern_parallel",
        title: "Epistemic Agency and Dissent",
        text: "Mirrors contemporary psychological research on epistemic agency, moral courage, and psychological empowerment in marginalized voices (Freire, 1970; hooks, 1989). Cultivating a sense of one's own intellectual and spiritual authority fosters robust resilience against gaslighting, social silencing, and institutional coercion."
      },
      {
        type: "reflect",
        prompt: "Where in your life are you settling for material convenience or social approval at the expense of your deeper existential values? What would it feel like to ask Maitreyī's question of your current compromises?"
      }
    ],
    sources: [
      "Bṛhadāraṇyaka Upaniṣad 2.4, 3.6, 3.8, 4.5",
      "Śaṅkara's Bhāṣya on Bṛhadāraṇyaka Upaniṣad",
      "Stephanie Jamison & Joel Brereton, The Rigveda (2014)",
      "Signe Cohen, The Upaniṣads: A Complete Guide (Routledge, 2018)"
    ],
    wordCount: 820
  },
  {
    id: 15,
    devanagariNumeral: "१५",
    title: "Practices: A Modern Upaniṣadic Resilience Toolkit",
    subtitle: "From Philosophy to Somatic & Contemplative Application",
    sanskritTitle: "श्रोतव्यो मन्तव्यो निदिध्यासितव्यः",
    epigraph: "आत्मा वा अरे द्रष्टव्यः श्रोतव्यो मन्तव्यो निदिध्यासितव्यो मैत्रेयि — The Self, my dear Maitreyī, must be realized: heard, reflected upon, and deeply integrated.",
    content: [
      {
        type: "prose",
        text: "The Upaniṣads were never intended as armchair philosophical speculation or abstract academic treatises. They were lived maps of consciousness, transmitted within rigorous contemplative communities to foster radical psychological liberation. The classical Advaita tradition systematized the Upaniṣadic pedagogical methodology into a threefold progressive protocol: Śravaṇa (attentive listening / intake of transformative wisdom), Manana (rigorous intellectual reflection and doubt-resolution), and Nididhyāsana (deep, sustained assimilation until the realization becomes one's experiential baseline)."
      },
      {
        type: "prose",
        text: "To translate this ancient wisdom into contemporary daily resilience, we can distill six core Upaniṣadic practices that directly modulate cognitive framing, autonomic balance, and existential anchoring:"
      },
      {
        type: "prose",
        text: "1. The Sākṣī Check (Witness Meditation): Drawn from Muṇḍaka 3.1. Whenever emotional reactivity or panic spikes, consciously pause and identify the 'two birds'. Label the sensation ('fear is present', 'irritation is arising') and step back into the witnessing perspective that observes the mental wave without drowning in it."
      },
      {
        type: "prose",
        text: "2. The Charioteer Audit: Drawn from Kaṭha 1.3. When feeling overwhelmed by impulse or distraction, mentally visualize the chariot. Ask: 'Are my sense-horses running wild along reactive roads? Where are my reins of attention (manas)? Is my executive wisdom (buddhi) awake at the helm, or has it fallen asleep?'"
      },
      {
        type: "prose",
        text: "3. Prāṇāyāma Rhythmic Reset: Drawn from Śvetāśvatara 2.8–9 and Praśna 3. Adopt an erect, balanced posture ('trir-unnataṃ'). Breathe smoothly through the nostrils in a 4-4-6 cadence (inhale for 4 counts, hold gently for 4, exhale slowly for 6). This activates the parasympathetic brake, grounding the energetic currents of Prāṇa."
      },
      {
        type: "prose",
        text: "4. Daily Viveka Journaling: Inspired by Bhṛgu's inquiry in Taittirīya 3.1. When confronted with a distressing event, write down: (a) What is changing and impermanent here? (b) What core awareness remains unhurt and constant throughout? Differentiate between the changing circumstance and the unshakable observer."
      },
      {
        type: "prose",
        text: "5. The Praṇava (OM) Anchor: Drawn from Māṇḍūkya 1 and Muṇḍaka 2.2. Use the sacred sound OM as an attentional arrow. On the waking state 'A', acknowledge physical sensation; on the subtle 'U', acknowledge thoughts and feelings; on the silent 'M' and following pause, rest in Turīya—the unconditioned stillness behind all manifestation."
      },
      {
        type: "prose",
        text: "6. Titikṣā Distress Tolerance: Drawn from Bṛhadāraṇyaka 4.4.23. When minor physical or emotional discomfort occurs (heat, cold, waiting, criticism), refrain from immediate reactive complaint. Treat it as a deliberate gym for mental fortitude: hold space for the discomfort with inner composure ('śānto dāntaḥ')."
      },
      {
        type: "resilience_insight",
        title: "Educational Disclaimer & Clinical Boundary",
        text: "The practices in this toolkit are contemplative and philosophical exercises designed for personal self-cultivation, stress regulation, and holistic inquiry. They are NOT a substitute for professional mental health diagnosis, clinical psychotherapy, or psychiatric medical intervention. If you are experiencing acute trauma, severe clinical depression, panic disorders, or suicidal ideation, please consult a qualified mental health healthcare provider immediately."
      },
      {
        type: "modern_parallel",
        title: "Neuroplasticity and Habitual Rewiring",
        text: "The movement from Śravaṇa through Manana to Nididhyāsana perfectly parallels modern neuroplasticity principles: from novel informational exposure (synaptic firing) through cognitive cognitive restructuring (dendritic arborization) to consolidated automaticity through deliberate, recurring contemplative practice (myelination and long-term potentiation)."
      },
      {
        type: "reflect",
        prompt: "Select one practice from the toolkit above to experiment with over the next 48 hours. Notice how conscious commitment to a single practice shifts your emotional equilibrium under pressure."
      }
    ],
    sources: [
      "Bṛhadāraṇyaka Upaniṣad 2.4.5, 4.4.23",
      "Kaṭha Upaniṣad 1.3.3–9",
      "Taittirīya Upaniṣad 3.1",
      "Māṇḍūkya Upaniṣad verses 1–12",
      "Swami Rama, Rudolph Ballentine & Swami Ajaya, Yoga and Psychotherapy (1976)",
      "K. Ramakrishna Rao & Anand C. Paranjpe, Psychology in the Indian Tradition (2016)"
    ],
    wordCount: 810
  },
  {
    id: 16,
    devanagariNumeral: "१६",
    title: "Critiques, Cautions, & Honest Scholarly Limits",
    subtitle: "Guarding Against Spiritual Bypassing & Historical Simplification",
    sanskritTitle: "विवेकः सर्वभावेषु",
    epigraph: "कथं नु भगवन्तो विजिज्ञास्यन्ते — How, revered sirs, are these claims to be critically examined?",
    content: [
      {
        type: "prose",
        text: "A scholarly and intellectually honest presentation of Upaniṣadic psychology must maintain rigorous critical self-awareness. Ancient philosophical frameworks, however luminous, cannot be treated as infallible panaceas or naively collapsed into twentieth-century empirical sciences. To honor the Upaniṣads is to examine their boundaries, recognize their historical context, and guard against prevalent modern distortions."
      },
      {
        type: "prose",
        text: "First and foremost is the grave psychological risk of 'spiritual bypassing'—a term coined by psychologist John Welwood (1984) to describe the use of spiritual ideas and practices to evade dealing with unresolved emotional wounds, psychological trauma, relational dysfunction, and developmental deficits. In contemporary circles, phrases like 'All is an illusion (Māyā)' or 'I am the untainted Atman' are frequently weaponized to invalidate genuine emotional grief, justify emotional detachment, or gaslight victims of abuse. The classical Upaniṣadic tradition itself did not advocate bypassing: as we saw in Chāndogya 7, Nārada's grief was met with meticulous progressive inquiry, and the Taittirīya insists that physical and emotional sheaths (Annamaya, Manomaya) must be healthy and regulated before cognitive wisdom can take root."
      },
      {
        type: "prose",
        text: "Second is the crucial danger of anachronism. The ṛṣis of the Upaniṣads were not modern cognitive neuroscientists, clinical psychotherapists, or evolutionary biologists. Their ultimate inquiry was soteriological and metaphysical—the liberation of the spirit from the cycle of mortal transmigration (mokṣa)—not the enhancement of workplace productivity, corporate resilience, or symptomatic stress reduction. While their keen empirical self-observation yielded profound psychological models, mapping ancient Sanskrit concepts directly onto modern psychometrics (such as DSM-5 categories or autonomic polyvagal scales) must be presented strictly as heuristic dialogue and comparative analogy, never as an equivalence or historical premonition."
      },
      {
        type: "prose",
        text: "Third, we must candidly confront the historical contradictions of social exclusivity. While the older Upaniṣads feature radical egalitarian breakthroughs—such as Sage Gautama accepting the fatherless maidservant's son Satyakāma Jābāla purely on the basis of his truthfulness, and Maitreyī and Gārgī interrogating the highest metaphysical truths—the broader Vedic social matrix was increasingly marked by rigid hereditary caste privileges (varṇa) and gendered ritual restrictions. Later orthodox commentators, including Śaṅkara in his commentary on the Brahma Sūtras (the Apasūdrādhikaraṇa, 1.3.34–38), notoriously maintained orthodox scholastic barriers against direct Vedic recitation by non-initiated classes, even while acknowledging that universal spiritual illumination could occur through secondary narratives and independent devotion."
      },
      {
        type: "prose",
        text: "Finally, one must respect the profound interpretive divergence within Indian tradition itself. There is no single, monolithic 'Upaniṣadic philosophy.' The non-dualism of Śaṅkara (Advaita), the qualified non-dualism of Rāmānuja (Viśiṣṭādvaita), the absolute dualism of Madhva (Dvaita), and the integral synthesis of Sri Aurobindo interpret the selfsame verses with radically different metaphysical implications. A resilient intellect learns to inhabit these creative tensions without demanding forced theological uniformity."
      },
      {
        type: "resilience_insight",
        title: "Intellectual Humility and Non-Dogmatism",
        text: "The greatest safeguard of resilience is intellectual humility. When we idolize any single tradition as having answered every human mystery, we foster brittle fundamentalism. True Upaniṣadic inquiry (mīmāṃsā) invites robust questioning, self-correction, and the courage to hold complex realities without dogmatic defensiveness."
      },
      {
        type: "modern_parallel",
        title: "Integrative Mental Health and Critical Hermeneutics",
        text: "Aligns with contemporary multicultural psychology and critical hermeneutics: honoring the profound experiential depths of indigenous knowledge systems (IKS) while applying critical lenses regarding power structures, historical contexts, and psychological safety."
      },
      {
        type: "reflect",
        prompt: "Have you ever observed yourself using spiritual ideas ('everything happens for a reason', 'it's all just an illusion') to avoid feeling authentic sadness, anger, or moral responsibility? How can you honor both your human feelings and your transcendent awareness?"
      }
    ],
    sources: [
      "John Welwood, Toward a Psychology of Awakening (2000)",
      "Patrick Olivelle, The Early Upaniṣads (1998)",
      "Brahma Sūtra Śāṅkarabhāṣya 1.3.34–38 (Apasūdrādhikaraṇa)",
      "B.R. Ambedkar, Annihilation of Caste (1936)",
      "K. Ramakrishna Rao & Anand C. Paranjpe, Psychology in the Indian Tradition (Springer, 2016)"
    ],
    wordCount: 840
  },
  {
    id: 17,
    devanagariNumeral: "१७",
    title: "Epilogue: Asato Mā Sad Gamaya",
    subtitle: "The Timeless Return to the Self-Luminous Dawn",
    sanskritTitle: "तमसो मा ज्योतिर्गमय मृत्योर्माऽमृतं गमय",
    epigraph: "ॐ असतो मा सद्गमय तमसो मा ज्योतिर्गमय मृत्योर्माऽमृतं गमय — Lead me from the unreal to the Real, from darkness to Light, from death to Immortality.",
    content: [
      {
        type: "prose",
        text: "We arrive at the journey's horizon. From the quiet invocations of peace that opened our inquiry, across the high chariot of Kaṭha, through the deep grief of Nārada and the joyful thunder of Prajāpati, into the silent witnessing chambers of Māṇḍūkya, the Upaniṣads offer a vision of human resilience that stands fundamentally apart from mere survivalism. Resilience in this ancient legacy is not the desperate hardening of an ego-shell against a hostile world; it is the glorious discovery that your bedrock reality is already whole, fearless, and unbroken."
      },
      {
        type: "verse_ref",
        verseId: "brhadaranyaka-1-3-28"
      },
      {
        type: "prose",
        text: "The prayer of the Pavamāna Abhyāroha from the Bṛhadāraṇyaka Upaniṣad (1.3.28) condenses the entire trajectory of the human spirit into three ascending petitions: 'asato mā sad gamaya'—lead me from false, fragile narratives into the Real; 'tamaso mā jyotir gamaya'—lead me from the paralysis of confusion and despair into the Light of clear perception; 'mṛtyor māmṛtaṃ gamaya'—lead me from the panic of mortality and loss into that timeless baseline that knows no death."
      },
      {
        type: "prose",
        text: "The storm will always move the branches of the banyan tree. Circumstances will fluctuate; bodies will age; worldly projects will rise, peak, and dissolve. But the ground in which the tree is rooted remains still, majestic, and unmoved. That ground is your own Atman. May your study be luminous; may you abide in the unshaken self."
      },
      {
        type: "resilience_insight",
        title: "The Final Ground of Dhairya",
        text: "Dhairya (धैर्य) comes from the Sanskrit root 'dhī'—spiritual intellect, steady reflection, that which bears up. True fortitude is not the absence of storms, but the unwavering realization of the unshakeable ground beneath your feet. You are not the storm; you are the sky in which the storm appears and dissolves."
      },
      {
        type: "modern_parallel",
        title: "Post-Traumatic Integration and Transcendent Wholeness",
        text: "Echoes Viktor Frankl's transcendent freedom and Tedeschi & Calhoun's post-traumatic growth: when individuals discover an unshakeable existential core, trauma is integrated not as a fatal wound, but as the crucible through which genuine spiritual maturity is forged."
      },
      {
        type: "reflect",
        prompt: "As you step away from this sanctuary and return to your daily world, carry this single question in your heart: 'The storm moves the tree. Does it move the ground?' Remember who you are."
      }
    ],
    sources: [
      "Bṛhadāraṇyaka Upaniṣad 1.3.28",
      "Śaṅkara's Bhāṣya on Bṛhadāraṇyaka Upaniṣad",
      "Max Müller, Sacred Books of the East, Vol. XV (1884)",
      "Viktor Frankl, Man's Search for Meaning (1946)"
    ],
    wordCount: 520
  }
];

chapters.forEach(ch => {
  const filePath = path.join(chaptersDir, `chapter-${String(ch.id).padStart(2, '0')}.json`);
  fs.writeFileSync(filePath, JSON.stringify(ch, null, 2), 'utf8');
  console.log(`Wrote ${filePath} (words: ~${ch.wordCount})`);
});

console.log('Successfully completed all chapters 12 to 17!');
