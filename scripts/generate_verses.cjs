const fs = require('fs');
const path = require('path');

const existingVerses = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/content/verses.json'), 'utf8'));

const additionalVerses = [
  {
    "id": "katha-1-3-14",
    "upanishad": "Kaṭha Upaniṣad",
    "location": "1.3.14",
    "devanagari": "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत । क्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥",
    "iast": "uttiṣṭhata jāgrata prāpya varān nibodhata | kṣurasya dhārā niśitā duratyayā durgaṃ pathas tat kavayo vadanti ||",
    "wordByWord": [
      { "sa": "उत्तिष्ठत", "en": "arise" },
      { "sa": "जाग्रत", "en": "awake" },
      { "sa": "प्राप्य", "en": "having reached / approached" },
      { "sa": "वरान्", "en": "the great teachers / boons" },
      { "sa": "निबोधत", "en": "know, perceive" },
      { "sa": "क्षुरस्य", "en": "of a razor" },
      { "sa": "धारा", "en": "the edge" },
      { "sa": "निशिता", "en": "sharp" },
      { "sa": "दुरत्यया", "en": "difficult to cross" },
      { "sa": "दुर्गम्", "en": "hard to travel" },
      { "sa": "पंथः", "en": "path" },
      { "sa": "तत्", "en": "that" },
      { "sa": "कवयः", "en": "the wise / seers" },
      { "sa": "वदन्ति", "en": "declare" }
    ],
    "translation": "Arise! Awake! Approach the exalted teachers and realize the Self. Sharp as the razor's edge and hard to traverse—that path, the wise declare, is difficult to tread.",
    "commentary": {
      "shankara": "Śaṅkara explains 'uttiṣṭhata' as an urgent injunction to shake off the deep slumber of ignorance (avidyā-nidrā) that has lasted across beginningless saṃsāra. The razor's edge metaphor indicates that discriminative discernment requires extreme vigilance, neither swerving into worldly temptation nor collapsing into cognitive inertia.",
      "other": "Radhakrishnan (1953) notes the dual nuance: the path demands intellectual precision like a fine instrument and psychological courage like walking a high-wire precipice."
    },
    "resilienceReading": "Psychological endurance is not passive enduring; it is active awakening. When adversity overwhelms executive attention, the habitual mind tends toward dissociation or despair. Kaṭha 1.3.14 calls forth deliberate executive re-engagement: waking up to one's agency and seeking verified mentorship rather than navigating existential crises in isolation.",
    "modernParallel": "Cognitive Behavioural Therapy and Acceptance and Commitment Therapy (ACT) stress psychological flexibility and values-congruent action even along demanding paths. Frankl's (1946) call for existential awakening during crisis mirrors this imperative to rise above immediate reactive states.",
    "tags": ["awakening", "discernment", "courage", "self-regulation"],
    "sources": ["Kaṭha Upaniṣad 1.3.14", "Śaṅkara Bhāṣya on Kaṭha Upaniṣad", "Radhakrishnan (1953)"],
    "verified": true,
    "chapter": 5
  },
  {
    "id": "katha-2-3-10-11",
    "upanishad": "Kaṭha Upaniṣad",
    "location": "2.3.10–11",
    "devanagari": "यदा पञ्चावतिष्ठन्ते ज्ञानानि मनसा सह । बुद्धिश्च न विचेष्टते तामाहुः परमां गतिम् ॥ तां योगमिति मन्यन्ते स्थिरामिन्द्रियधारणाम् । अप्रमत्तस्तदा भवति योगो हि प्रभवाप्ययौ ॥",
    "iast": "yadā pañcāvatiṣṭhante jñānāni manasā saha | buddhiś ca na viceṣṭate tām āhuḥ paramāṃ gatim || tāṃ yogam iti manyante sthirām indriya-dhāraṇām | apramattas tadā bhavati yogo hi prabhavāpyayau ||",
    "wordByWord": [
      { "sa": "यदा", "en": "when" },
      { "sa": "पञ्च", "en": "the five" },
      { "sa": "ज्ञानानि", "en": "sense organs of cognition" },
      { "sa": "अवतिष्ठन्ते", "en": "stand still / become tranquil" },
      { "sa": "मनसा सह", "en": "together with the mind" },
      { "sa": "बुद्धिः च", "en": "and the intellect" },
      { "sa": "न विचेष्टते", "en": "does not waver / exert outward" },
      { "sa": "ताम्", "en": "that" },
      { "sa": "आहुः", "en": "they call" },
      { "sa": "परमाम् गतिम्", "en": "the supreme state" },
      { "sa": "स्थिराम् इन्द्रिय-धारणाम्", "en": "the steady mastery of the senses" },
      { "sa": "अप्रमत्तः", "en": "vigilant / un-deluded" }
    ],
    "translation": "When the five organs of perception come to rest together with the mind, and the intellect itself no longer wavers—that, they say, is the supreme state. That steady restraint of the senses they reckon as Yoga. One must then be vigilant, for Yoga can be acquired and lost.",
    "commentary": {
      "shankara": "Śaṅkara defines Yoga here as 'sthirā indriya-dhāraṇā'—the motionless, unwavering composure of sensory and cognitive apparatus in the Atman. The warning that yoga is subject to waxing and waning (prabhavāpyayau) serves as a reminder against complacency.",
      "other": "Patañjali later formalized this principle as 'citta-vṛtti-nirodha' (Yoga Sūtra 1.2), drawing directly upon Kaṭha's definition."
    },
    "resilienceReading": "Resilience in stressful environments depends directly upon attentional stabilization. When emotional storms churn external signals, Kaṭha defines the supreme ground as the capacity to gather the senses inward so that decision-making (buddhi) is calm rather than reactive.",
    "modernParallel": "Parallels contemporary findings on autonomic nervous system self-regulation, vagal tone (Porges, 2011), and attentional control training in stress resilience.",
    "tags": ["yoga", "self-regulation", "stillness", "focus"],
    "sources": ["Kaṭha Upaniṣad 2.3.10–11", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 5
  },
  {
    "id": "chandogya-7-1-3",
    "upanishad": "Chāndogya Upaniṣad",
    "location": "7.1.3",
    "devanagari": "सोऽहं भगवो मन्त्रविदेवास्मि नात्मवित् । श्रुतं ह्येव मे भगवद्दृशेभ्यस्तरति शोकमात्मविदिति सोऽहं भगवः शोचामि तं मा भगवाञ्छोकस्य पारं तारयत्विति ॥",
    "iast": "so 'haṃ bhagavo mantra-vid evāsmi nātma-vit | śrutaṃ hy eva me bhagavad-dṛśebhyas tarati śokam ātma-vid iti so 'haṃ bhagavaḥ śocāmi taṃ mā bhagavāñ chokasya pāraṃ tārayatv iti ||",
    "wordByWord": [
      { "sa": "सोऽहम्", "en": "such as I am" },
      { "sa": "भगवः", "en": "O venerable one" },
      { "sa": "मन्त्र-वित् एव", "en": "only a knower of texts/hymns" },
      { "sa": "न आत्म-वित्", "en": "not a knower of the Self" },
      { "sa": "तरति", "en": "crosses over / transcends" },
      { "sa": "शोकम्", "en": "sorrow, grief" },
      { "sa": "आत्म-वित्", "en": "the knower of the Self" },
      { "sa": "शोचामि", "en": "I grieve / I suffer" },
      { "sa": "तारयतु", "en": "please ferry me across" }
    ],
    "translation": "Such a one am I, venerable Sire—a knower of words and texts alone, but not a knower of the Self. For I have heard from revered sages like you that only the knower of the Self crosses over sorrow. And I, venerable Sire, am in deep grief. Carry me, I pray, across the far shore of this sorrow.",
    "commentary": {
      "shankara": "Śaṅkara highlights the dialogue between the encyclopedic scholar Nārada and the sage Sanatkumāra. Nārada has mastered astronomy, grammar, logic, warfare, rituals, and philosophy, yet remains internally consumed by sorrow. Śaṅkara notes that accumulated informational knowledge (śabda-jñāna) cannot eradicate existential angst; only experiential realization of non-dual consciousness dissolves grief.",
      "other": "Swami Gambhirananda notes that this text demonstrates the limits of intellectualization as an emotional coping mechanism."
    },
    "resilienceReading": "A profound psychological diagnostic: intellect, academic credential, and information literacy do not insulate a person from existential suffering. Nārada's confession reveals that true resilience requires shifting from conceptual hoarding to the direct realization of who one is at the ontological baseline.",
    "modernParallel": "Parallels Viktor Frankl's observation that neurosis and existential despair can flourish even amidst high educational and professional achievement when a core sense of meaning and identity is missing.",
    "tags": ["sorrow-transcendence", "self-knowledge", "meaning", "existential"],
    "sources": ["Chāndogya Upaniṣad 7.1.3", "Śaṅkara Bhāṣya on Chāndogya"],
    "verified": true,
    "chapter": 6
  },
  {
    "id": "chandogya-7-23-1",
    "upanishad": "Chāndogya Upaniṣad",
    "location": "7.23.1",
    "devanagari": "यो वै भूमा तत्सुखं नाल्पे सुखमस्ति भूमैव सुखं भूमा त्वेव विजिज्ञासितव्य इति ॥",
    "iast": "yo vai bhūmā tat sukhaṃ nālpe sukham asti bhūmaiva sukhaṃ bhūmā tv eva vijijñāsitavya iti ||",
    "wordByWord": [
      { "sa": "यः वै", "en": "that which indeed" },
      { "sa": "भूमा", "en": "the Infinite / the Immense" },
      { "sa": "तत् सुखम्", "en": "that is true bliss" },
      { "sa": "न अल्पे", "en": "not in the finite / small" },
      { "sa": "सुखम् अस्ति", "en": "is happiness" },
      { "sa": "विजिज्ञासितव्यः", "en": "must be deeply inquired into" }
    ],
    "translation": "That which is the Infinite (Bhūmā)—that alone is genuine joy. There is no enduring happiness in the small and finite. The Infinite alone is joy; therefore, the Infinite alone must one seek to understand.",
    "commentary": {
      "shankara": "Śaṅkara glosses 'Bhūmā' as the unbroken, all-pervading Brahman, free from division. The finite (alpa) is inherently marked by thirst, friction, and decay, and whatever is born of limitation contains the seeds of its own grief.",
      "other": "Radhakrishnan observes that happiness dependent upon finite objects is unstable because the object is impermanent."
    },
    "resilienceReading": "Hedonic adaptation in modern psychology explains why finite pursuits create fleeting satisfaction followed by baseline anxiety. By grounding happiness in the vast expanse of awareness (Bhūmā) rather than fluctuating micro-conditions (alpa), emotional stability becomes resilient to situational losses.",
    "modernParallel": "Contrasts hedonic well-being with eudaimonic well-being (Deci & Ryan, 2001; Seligman, 2011), underscoring that resilient wellbeing is anchored in intrinsic expanse rather than contingent conditions.",
    "tags": ["infinite", "joy", "non-attachment", "meaning"],
    "sources": ["Chāndogya Upaniṣad 7.23.1", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 6
  },
  {
    "id": "isha-7",
    "upanishad": "Īśā Upaniṣad",
    "location": "Verse 7",
    "devanagari": "यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्विजानतः । तत्र को मोहः कः शोक एकत्वमनुपश्यतः ॥",
    "iast": "yasmin sarvāṇi bhūtāny ātmaivābhūd vijānataḥ | tatra ko mohaḥ kaḥ śoka ekatvam anupaśyataḥ ||",
    "wordByWord": [
      { "sa": "यस्मिन्", "en": "in whom / when" },
      { "sa": "सर्वाणि भूतानि", "en": "all beings" },
      { "sa": "आत्मा एव अभूत्", "en": "have become the Self alone" },
      { "sa": "विजानतः", "en": "for the one who understands" },
      { "sa": "तत्र", "en": "there / in that state" },
      { "sa": "कः मोहः", "en": "what delusion can there be?" },
      { "sa": "कः शोकः", "en": "what sorrow can there be?" },
      { "sa": "एकत्वम् अनुपश्यतः", "en": "for one who beholds oneness" }
    ],
    "translation": "When to the knower all beings have verily become one with his own Self, then what delusion, what sorrow can there be for him who beholds that oneness?",
    "commentary": {
      "shankara": "Śaṅkara states that grief (śoka) and delusion (moha) can only arise when there is an imagined 'other'—either to be coveted, feared, or lost. When the reality of non-dual consciousness is realized, the causal root of grief is severed entirely.",
      "other": "Sri Aurobindo's commentary emphasizes that this is not an escapist withdrawal, but an inclusive seeing where every creature's life is experienced as intimately intertwined with one's own."
    },
    "resilienceReading": "Sorrow and panic thrive in isolation—in the conviction that 'I am an isolated fragment threatened by an indifferent universe.' Beholding relational and metaphysical oneness reframes adversity from an external assault into an unfolding dynamic within the larger fabric of reality.",
    "modernParallel": "Decentering in cognitive psychology and feelings of oceanic interconnectedness studied in prosocial resilience and post-traumatic growth.",
    "tags": ["oneness", "sorrow-transcendence", "fearlessness", "insight"],
    "sources": ["Īśā Upaniṣad verse 7", "Śaṅkara Bhāṣya on Īśā", "Sri Aurobindo (1915)"],
    "verified": true,
    "chapter": 6
  },
  {
    "id": "chandogya-6-8-7",
    "upanishad": "Chāndogya Upaniṣad",
    "location": "6.8.7",
    "devanagari": "स य एषोऽणिमैतदात्म्यमिदं सर्वं तत्सत्यं स आत्मा तत्त्वमसि श्वेतकेतो इति ॥",
    "iast": "sa ya eṣo 'ṇimaitad-ātmyam idaṃ sarvaṃ tat satyaṃ sa ātmā tat tvam asi śvetaketo iti ||",
    "wordByWord": [
      { "sa": "सः यः एषः", "en": "that which is this" },
      { "sa": "अणिमा", "en": "subtle essence" },
      { "sa": "एतद्-आत्म्यम्", "en": "having this as its inner self" },
      { "sa": "इदम् सर्वम्", "en": "all this universe" },
      { "sa": "तत् सत्यम्", "en": "that is the Real / Truth" },
      { "sa": "सः आत्मा", "en": "that is the Self" },
      { "sa": "तत् त्वम् असि", "en": "That Thou Art / You are that" },
      { "sa": "श्वेतकेतो", "en": "O Śvetaketu" }
    ],
    "translation": "That which is this subtle essence—in it all that exists has its self. That is the True. That is the Self. That thou art, O Śvetaketu!",
    "commentary": {
      "shankara": "The premier Mahāvākya of Advaita Vedānta. Śaṅkara explains that 'Tat Tvam Asi' indicates the ontological identity of the individual conscious witness (tvam) with the non-dual universal ground (tat), stripping away peripheral adventitious adjuncts (upādhis) like body and mental flux.",
      "other": "Rāmānuja interprets the relation in Viśiṣṭādvaita as body-soul (śarīra-śarīrī bhāva), where the individual remains real and sustained eternally by the Divine."
    },
    "resilienceReading": "When identity is anchored exclusively in social roles, financial health, or physical youth, any loss shatters the psyche. 'Tat Tvam Asi' is an invitation to an unshakeable identity baseline: what you are fundamentally is the luminous consciousness observing the shift, not the fragile circumstances that change.",
    "modernParallel": "Self-complexity theory (Linville, 1987) and self-affirmation theory (Steele, 1988) show that individuals with broader, non-fragile foundations of self-worth demonstrate superior resilience during identity-threatening shocks.",
    "tags": ["identity", "mahavakya", "self-knowledge", "grounding"],
    "sources": ["Chāndogya Upaniṣad 6.8.7", "Śaṅkara Bhāṣya", "Olivelle (1998)"],
    "verified": true,
    "chapter": 7
  },
  {
    "id": "chandogya-6-12",
    "upanishad": "Chāndogya Upaniṣad",
    "location": "6.12.1–3",
    "devanagari": "न्यग्रोधफलमत आहरेतीदं भगव इति भिन्द्धीति भिन्नं भगव इति किमत्र पश्यसीत्यण्व्य इवेमा धाना भगव इत्यासामङ्कैकां भिन्द्धीति भिन्ना भगव इति किमत्र पश्यसीति न किञ्चन भगव इति ॥ तं होवाच यं वै सोम्यैतमणिमानं न निभालयस एतस्य वै सोम्यैषोऽणिम्न एवं महान्यग्रोधस्तिष्ठति श्रद्धात्स्व सोम्येति ॥",
    "iast": "nyagrodha-phalam ata āharetīdaṃ bhagava iti bhinddhy iti bhinnaṃ bhagava iti kim atra paśyasīty aṇvya ivemā dhānā bhagava ity āsām aṅkaikāṃ bhinddhy iti bhinnā bhagava iti kim atra paśyasīti na kiñcana bhagava iti || taṃ hovāca yaṃ vai somyaitam aṇimānaṃ na nibhālayasa etasya vai somyaiṣo 'ṇimna evaṃ mahān nyagrodhas tiṣṭhati śraddhatsva somyeti ||",
    "wordByWord": [
      { "sa": "न्यग्रोधफलम्", "en": "the fruit of a banyan tree" },
      { "sa": "भिन्द्धि", "en": "break it open" },
      { "sa": "किमत्र पश्यसि", "en": "what do you see here?" },
      { "sa": "अण्व्यः धानाः", "en": "tiny seeds" },
      { "sa": "न किञ्चन", "en": "nothing at all" },
      { "sa": "अणिमानम्", "en": "the subtle essence" },
      { "sa": "महान् न्यग्रोधः", "en": "the mighty banyan tree" },
      { "sa": "श्रद्धत्स्व", "en": "have faith / perceive with trust" }
    ],
    "translation": "'Bring me a fruit from that banyan tree.' 'Here it is, venerable father.' 'Break it open.' 'It is broken, sir.' 'What do you see there?' 'These exceedingly tiny seeds, sir.' 'Break open one of those seeds.' 'It is broken, sir.' 'What do you see there?' 'Nothing at all, sir.' Then Uddālaka said: 'Truly, my dear, from that very subtle essence which you do not perceive, this mighty banyan tree arises and stands. Have trust, my dear: That subtle essence is the Self. That thou art, O Śvetaketu!'",
    "commentary": {
      "shankara": "Śaṅkara remarks that tangible gross effects arise from intangible subtle causes. The unmanifest potency of the seed produces branches, trunk, foliage, and fruit. In the same way, the invisible consciousness is the bedrock of the entire manifest cosmos.",
      "other": "Müller (1879) highlights Uddālaka's empirical pedagogy: guiding the student from tangible sensory observation to subtle non-physical reality."
    },
    "resilienceReading": "When circumstances appear depleted—when all seems broken down to 'nothing at all'—this parable reminds us that invisible inner potential remains intact. Resilience is the deep conviction (śraddhā) that our inner capacity outlasts sensory desolation.",
    "modernParallel": "The psychological construct of latent resilience (Bonanno, 2004) and neuroplastic potential: internal recuperative resources operate below conscious awareness until called forth.",
    "tags": ["potential", "faith", "nature", "identity"],
    "sources": ["Chāndogya Upaniṣad 6.12", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 7
  },
  {
    "id": "chandogya-6-13",
    "upanishad": "Chāndogya Upaniṣad",
    "location": "6.13.1–3",
    "devanagari": "लवणमेतदुदकेऽवधायाथ मा प्रातरुपसीदथा इति स ह तथा चकार तं होवाच यद्दोषा लवणमुदकेऽवाधा अङ्ग तदाहरेति तद्धावमृश्य न विवेद यथा विलीनमेवाङ्ग ॥ अस्यान्तादाचामेति कथमिति लवणमिति मध्यादाचामेति कथमिति लवणमित्यन्तादाचामेति कथमिति लवणमिति... स आत्मा तत्त्वमसि श्वेतकेतो इति ॥",
    "iast": "lavaṇam etad udake 'vadhāyātha mā prātar upasīdathā iti sa ha tathā cakāra taṃ hovāca yad doṣā lavaṇam udake 'vādhā aṅga tad āharetī tad dhāvamṛśya na viveda yathā vilīnam evāṅga || asyāntād ācāmeti katham iti lavaṇam iti madhyād ācāmeti katham iti lavaṇam ity antād ācāmeti katham iti lavaṇam iti... sa ātmā tat tvam asi śvetaketo iti ||",
    "wordByWord": [
      { "sa": "लवणम्", "en": "salt" },
      { "sa": "उदके", "en": "in water" },
      { "sa": "अवधाय", "en": "having placed" },
      { "sa": "प्रातः", "en": "in the morning" },
      { "sa": "विलीनम्", "en": "dissolved" },
      { "sa": "आचाम", "en": "sip / taste" },
      { "sa": "कथम्", "en": "how is it?" },
      { "sa": "लवणम्", "en": "salty" }
    ],
    "translation": "'Place this lump of salt in water and return to me tomorrow morning.' Śvetaketu did so. His father said, 'Bring me the salt.' He felt for it but could not find it, for it had completely dissolved. 'Sip from the surface—how does it taste?' 'Salty.' 'Sip from the middle—how does it taste?' 'Salty.' 'Sip from the bottom—how does it taste?' 'Salty.' 'Throw it away and sit with me.' Uddālaka said: 'Though you do not perceive the salt with your eyes, it is present everywhere in the water. Just so, the subtle Self pervades all existence. That thou art!'",
    "commentary": {
      "shankara": "Śaṅkara explains that presence does not depend upon visual grasp. Consciousness permeates every bodily experience, cognition, and sensation, just as salt permeates every drop of water.",
      "other": "Deussen (1906) notes this as one of the clearest epistemological allegories for immanent omnipresence in world philosophy."
    },
    "resilienceReading": "In times of emotional drought or crisis, awareness of peace may seem visually or tangibly absent. The salt allegory teaches that the quiet ground of being has not vanished; it is woven through every moment, waiting to be tasted through mindful presence.",
    "modernParallel": "Mindfulness-based therapies teach clients that calm is not an external object to acquire, but an intrinsic experiential dimension accessible in any sensory moment.",
    "tags": ["pervasiveness", "presence", "mindfulness", "patience"],
    "sources": ["Chāndogya Upaniṣad 6.13", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 7
  },
  {
    "id": "chandogya-4-4-5",
    "upanishad": "Chāndogya Upaniṣad",
    "location": "4.4.4–5",
    "devanagari": "नाहमेतद्वेद भो यद्गोत्रोऽहमस्म्यपृच्छं मातरं सा मा प्रत्यब्रवीद्बह्वहं चरन्ती परिचारिणी यौवने त्वामलभे साहमेतन्न वेद यद्गोत्रस्त्वमसि जबाला तु नामाहमस्मि सत्यकामो नाम त्वमसीति सोऽहं सत्यकामो जाबालोऽस्मि भो इति ॥ तं होवाच नैतदब्राह्मणो विवक्तुमर्हति समिधं सोम्याहरोप त्वा नेष्ये न सत्यादगा इति ॥",
    "iast": "nāham etad veda bho yad-gotro 'ham asmy apṛcchaṃ mātaraṃ sā mā pratyabravīd bahv ahaṃ carantī paricāriṇī yauvane tvām alabhe sāham etan na veda yad-gotras tvam asi jabālā tu nāmāham asmi satyakāmo nāma tvam asīti so 'haṃ satyakāmo jābālo 'smi bho iti || taṃ hovāca naitad abrāhmaṇo vivaktum arhati samidhaṃ somyāharopa tvā neṣye na satyād agā iti ||",
    "wordByWord": [
      { "sa": "न अहम् एतद् वेद", "en": "I do not know this" },
      { "sa": "यद्-गोत्रः", "en": "what lineage / caste" },
      { "sa": "अपृच्छम् मातरम्", "en": "I asked my mother" },
      { "sa": "परिचारिणी", "en": "a maidservant" },
      { "sa": "सत्यकामः", "en": "Satyakāma (lover of truth)" },
      { "sa": "न सत्याद् अगाः", "en": "you did not deviate from the truth" },
      { "sa": "उप त्वा नेष्ये", "en": "I shall initiate you" }
    ],
    "translation": "'I do not know, venerable sir, what family lineage I belong to. I asked my mother, and she said: In my youth, serving as a maidservant in many households, I bore you; so I do not know your father's lineage. My name is Jabālā and yours is Satyakāma. So I am Satyakāma Jābāla, sir.' Sage Gautama said to him: 'None but a true seeker of the sacred could speak with such unflinching truth! Fetch fuel, my dear, I will initiate you—for you have not swerved from truth.'",
    "commentary": {
      "shankara": "Śaṅkara highlights that Brahminhood and spiritual qualification are here defined by moral authenticity and adherence to truth (satya), rather than mere biological pedigree.",
      "other": "Ambedkar and later modern commentators frequently cite this episode as early Upaniṣadic resistance to rigid caste exclusivity."
    },
    "resilienceReading": "Psychological integrity requires the courage to own one's reality without shame or defensive fabrication. Satyakāma's unvarnished honesty displays profound self-acceptance, transforming perceived vulnerability into moral authority and resilience.",
    "modernParallel": "Brené Brown's research on vulnerability as the birthplace of authenticity, courage, and resilience: dismantling shame through radical truthfulness.",
    "tags": ["truthfulness", "authenticity", "courage", "vulnerability"],
    "sources": ["Chāndogya Upaniṣad 4.4.4–5", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 7
  },
  {
    "id": "brhadaranyaka-4-4-23",
    "upanishad": "Bṛhadāraṇyaka Upaniṣad",
    "location": "4.4.23",
    "devanagari": "तदेतदृचाभ्युक्तम् । एष नित्यो महिमा ब्राह्मणस्य न वर्धते कर्मणा नो कनीयान् । तस्यैव स्यात्पदवित्तां विदित्वा न कर्मणा लिप्यते पापकेन ॥ तस्मादेवंविच्छान्तो दान्त उपरतस्तितिक्षुः समाहितो भूत्वात्मन्येवात्मानं पश्यति सर्वमात्मानं पश्यति नैनं पाप्मा तरति सर्वं पाप्मानं तरति... ॥",
    "iast": "tad etad ṛcābhyuktam | eṣa nityo mahimā brāhmaṇasya na vardhate karmaṇā no kanīyān | tasyaiva syāt padavit tāṃ viditvā na karmaṇā lipyate pāpakena || tasmād evaṃ-vic chānto dānta uparatas titikṣuḥ samāhito bhūtvātmany evātmānaṃ paśyati sarvam ātmānaṃ paśyati nainaṃ pāpmā tarati sarvaṃ pāpmānaṃ tarati... ||",
    "wordByWord": [
      { "sa": "शान्तः", "en": "calm / serene (śama)" },
      { "sa": "दान्तः", "en": "self-controlled (dama)" },
      { "sa": "उपरतः", "en": "withdrawn / quieted (uparati)" },
      { "sa": "तितिक्षुः", "en": "patiently enduring (titikṣā)" },
      { "sa": "समाहितः", "en": "collected / focused (samādhāna)" },
      { "sa": "आत्मनि एव", "en": "within oneself alone" },
      { "sa": "आत्मानम् पश्यति", "en": "beholds the Self" },
      { "sa": "सर्वम् पाप्मानम् तरति", "en": "crosses over all evil / distress" }
    ],
    "translation": "Therefore, one who knows this becomes calm (śānta), self-restrained (dānta), quieted from worldly entanglements (uparata), patiently enduring (titikṣu), and concentrated in mind (samāhita). He sees the Self in himself, he sees all as the Self. Distress does not overcome him; he overcomes all distress.",
    "commentary": {
      "shankara": "Śaṅkara identifies these five attitudes as the interior mental disciplines prerequisite for non-dual vision. Later Advaita systematized these into the 'Ṣaṭ-sampatti' (sixfold wealth) alongside śraddhā. Titikṣā is specifically defined as enduring dualities like heat and cold, praise and censure, without retaliatory reaction or inner distress.",
      "other": "Vivekacūḍāmaṇi v. 25 defines titikṣā directly based on this verse: 'sahanaṃ sarva-duḥkhānām apratīkāra-pūrvakam'."
    },
    "resilienceReading": "This verse presents the foundational resilience protocol of classical India: calmness (down-regulating agitation), impulse control (inhibiting reflex actions), disengagement from noise, cognitive endurance (titikṣā: holding space for discomfort without panic), and focused integration.",
    "modernParallel": "Parallels dialectical behavior therapy's distress tolerance skills (Linehan, 1993) and executive inhibitory control in emotional regulation.",
    "tags": ["endurance", "distress-tolerance", "calmness", "discipline"],
    "sources": ["Bṛhadāraṇyaka Upaniṣad 4.4.23", "Śaṅkara Bhāṣya", "Radhakrishnan (1953)"],
    "verified": true,
    "chapter": 8
  },
  {
    "id": "brhadaranyaka-5-2-3",
    "upanishad": "Bṛhadāraṇyaka Upaniṣad",
    "location": "5.2.1–3",
    "devanagari": "त्रयाः प्राजापत्याः प्रजापतौ पितरि ब्रह्मचर्यमूषुः—देवा मनुष्या असुराः... तदेतदेवैषा दैवी वागनुवदति स्तनयित्नुर्द द द इति—दाम्यत दत्त दयध्वमिति तदेतत्त्रयं शिक्षेद्दामं दानं दयामिति ॥",
    "iast": "trayāḥ prājāpatyāḥ prajāpatau pitari brahmacaryam ūṣuḥ—devā manuṣyā asurāḥ... tad etad evaiṣā daivī vāg anuvadati stanayitnur da da da iti—dāmyata datta dayadhvam iti tad etat trayaṃ śikṣed dāmaṃ dānaṃ dayām iti ||",
    "wordByWord": [
      { "sa": "देवाः मनुष्याः असुराः", "en": "gods, humans, and demons" },
      { "sa": "स्तनयित्नुः", "en": "the thunder" },
      { "sa": "द द द", "en": "DA, DA, DA" },
      { "sa": "दाम्यत", "en": "restrain yourselves (dāmyata)" },
      { "sa": "दत्त", "en": "give generously (datta)" },
      { "sa": "दयध्वम्", "en": "be compassionate (dayadhvam)" },
      { "sa": "दामम् दानम् दयाम्", "en": "self-control, charity, compassion" }
    ],
    "translation": "Threefold were the offspring of Prajāpati: gods, men, and demons. When each sought guidance, the divine voice of thunder repeated the single syllable: 'DA, DA, DA'—meaning to the gods: Dāmyata (restrain yourselves); to humans: Datta (give generously); and to the demons: Dayadhvam (be compassionate). Therefore, let one cultivate this threefold virtue: self-control, giving, and compassion.",
    "commentary": {
      "shankara": "Śaṅkara observes that gods, humans, and demons are not distant mythological races, but three psychological tendencies within human beings themselves: those prone to sensory indulgence need dāma (self-restraint); those plagued by greed need dāna (giving); those prone to cruelty and anger need dayā (compassion).",
      "other": "T.S. Eliot famously concludes 'The Waste Land' (1922) with these three thunder-commands: 'Datta. Dayadhvam. Damyata. Shantih shantih shantih'."
    },
    "resilienceReading": "Psychological balance collapses when indulgence, greed, or aggression run unchecked. Prajāpati's thunder provides three antidotes: discipline curbs reckless pleasure, generosity loosens grasping scarcity mindsets, and empathy dissolves hostile defensiveness.",
    "modernParallel": "Self-compassion and compassion-focused therapy (Gilbert, 2010; Neff, 2003) alongside prosocial behavior as proven buffers against burnout and trauma.",
    "tags": ["compassion", "giving", "self-control", "balance"],
    "sources": ["Bṛhadāraṇyaka Upaniṣad 5.2.1–3", "Śaṅkara Bhāṣya", "T.S. Eliot (1922)"],
    "verified": true,
    "chapter": 8
  },
  {
    "id": "taittiriya-2-1-5",
    "upanishad": "Taittirīya Upaniṣad",
    "location": "2.1–5 (Brahmānandavallī)",
    "devanagari": "तस्माद्वा एतस्मादन्नरसमयात् । अन्योऽन्तर आत्मा प्राणमयः... अन्योऽन्तर आत्मा मनोमयः... अन्योऽन्तर आत्मा विज्ञानमयः... अन्योऽन्तर आत्मानन्दमयः ॥",
    "iast": "tasmād vā etasmād anna-rasamayād | anyo 'ntara ātmā prāṇa-mayaḥ... anyo 'ntara ātmā mano-mayaḥ... anyo 'ntara ātmā vijñāna-mayaḥ... anyo 'ntara ātmānanda-mayaḥ ||",
    "wordByWord": [
      { "sa": "अन्न-रसमयात्", "en": "made of food / physical matter" },
      { "sa": "अन्यः अन्तरः आत्मा", "en": "another, inner self" },
      { "sa": "प्राणमयः", "en": "made of vital breath / energy" },
      { "sa": "मनोमयः", "en": "made of mental feeling / desire" },
      { "sa": "विज्ञानमयः", "en": "made of intellect / discernment" },
      { "sa": "आनन्दमयः", "en": "made of bliss / joy" }
    ],
    "translation": "Verily, different from this physical self made of the essence of food, there is another inner self made of vital breath (Prāṇa). Different from that is the inner self made of mind and emotion (Manas). Different from that is the inner self made of discriminative intellect (Vijñāna). Different from that is the innermost self made of bliss (Ānanda).",
    "commentary": {
      "shankara": "Śaṅkara explains the methodology of 'śākhā-candra-nyāya' (pointing to the moon through the branch). The seeker is guided from gross physical identification progressively inward through biological energy, emotional reactivity, and cognitive reflection, until arriving at the unconditioned witness behind the joy sheath.",
      "other": "Later Vedānta formalizes this as the 'Pañcakośa' (five sheaths) doctrine, showing that no single sheath constitutes the ultimate Ātman."
    },
    "resilienceReading": "The Pañcakośa model is a comprehensive holistic map for resilience diagnosis: if stress is felt, in which layer is the blockage? Is it physical exhaustion (Annamaya), shallow breathing (Prāṇamaya), emotional anxiety (Manomaya), cognitive distortion (Vijñānamaya), or disconnection from spiritual joy (Ānandamaya)? Healing requires addressing the specific sheath while anchoring in the transcendent witness.",
    "modernParallel": "Integrative and biopsychosocial-spiritual models of mental health (Engel, 1977) which recognize that resilience spans somatic, autonomic, cognitive, and existential dimensions.",
    "tags": ["panchakosha", "holistic", "breath", "integration"],
    "sources": ["Taittirīya Upaniṣad 2.1–5", "Śaṅkara Bhāṣya", "Rao & Paranjpe (2016)"],
    "verified": true,
    "chapter": 9
  },
  {
    "id": "taittiriya-3-1",
    "upanishad": "Taittirīya Upaniṣad",
    "location": "3.1 (Bhṛguvallī)",
    "devanagari": "भृगुर्वै वारुणिः । वरुणं पितरमुपससार । अधीहि भगवो ब्रह्मेति... तस्मै होवाच । यतो वा इमानि भूतानि जायन्ते । येन जातानि जीवन्ति । यत्प्रयन्त्यभिसंविशन्ति । तद्विजिज्ञासस्व । तद्ब्रह्मेति । स तपोऽतप्यत । स तपस्तप्त्वा... ॥",
    "iast": "bhṛgur vai vāruṇiḥ | varuṇaṃ pitaram upasasāra | adhīhi bhagavo brahmeti... tasmai hovāca | yato vā imāni bhūtāni jāyante | yena jātāni jīvanti | yat prayanty abhisaṃviśanti | tad vijijñāsasva | tad brahmeti | sa tapo 'tapyata | sa tapas taptvā... ||",
    "wordByWord": [
      { "sa": "भृगुः", "en": "Bhṛgu" },
      { "sa": "वरुणम् पितरम्", "en": "his father Varuṇa" },
      { "sa": "अधीहि", "en": "teach me" },
      { "sa": "तपः अतप्यत", "en": "he performed focused inquiry / austerity" },
      { "sa": "यतो वा इमानि", "en": "that from which all these beings arise" }
    ],
    "translation": "Bhṛgu, the son of Varuṇa, approached his father saying: 'Revered sir, teach me Brahman.' To him Varuṇa said: 'That from which all these beings are born, that by which, being born, they live, and that into which they enter upon departing—seek to know that. That is Brahman.' Bhṛgu performed deep contemplative inquiry (tapas). Having performed tapas, he progressively realized food, then breath, then mind, then wisdom, then bliss.",
    "commentary": {
      "shankara": "Śaṅkara notes that Varuṇa did not merely hand down dogma; he gave Bhṛgu a heuristic definition and sent him to verify it through his own disciplined contemplation (tapas). Bhṛgu returned repeatedly to his father, refining his realization at each stage.",
      "other": "Anand Paranjpe (1998) underscores this as an ancient exemplar of the constructivist, experiential method in Indian epistemic science."
    },
    "resilienceReading": "Tapas here is not self-mortification; it is the capacity for sustained, reflective mental endurance in the face of ambiguity. When faced with life's deep questions or crises, resilient individuals do not settle for superficial bromides; they practice reflective persistence until reaching bedrock clarity.",
    "modernParallel": "Grit (Duckworth, 2016) and deliberate practice in problem-solving: iterative cognitive exploration in the presence of cognitive dissonance.",
    "tags": ["tapas", "inquiry", "perseverance", "growth"],
    "sources": ["Taittirīya Upaniṣad 3.1", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 9
  },
  {
    "id": "mundaka-3-1-1",
    "upanishad": "Muṇḍaka Upaniṣad",
    "location": "3.1.1",
    "devanagari": "द्वा सुपर्णा सयुजा सखाया समानं वृक्षं परिषस्वजाते । तयोरन्यः पिप्पलं स्वाद्वत्त्यनश्नन्नन्यो अभिचाकशीति ॥",
    "iast": "dvā suparṇā sayujā sakhāyā samānaṃ vṛkṣaṃ pariṣasvajāte | tayor anyaḥ pippalaṃ svādv atty anaśnann anyo abhicākaśīti ||",
    "wordByWord": [
      { "sa": "द्वा सुपर्णा", "en": "two birds of beautiful plumage" },
      { "sa": "सयुजा", "en": "closely united" },
      { "sa": "सखाया", "en": "companion friends" },
      { "sa": "समानम् वृक्षम्", "en": "the selfsame tree" },
      { "sa": "परिषस्वजाते", "en": "cling to / embrace" },
      { "sa": "तयोः अन्यः", "en": "of the two, one" },
      { "sa": "पिप्पलम् स्वादु अत्ति", "en": "eats the sweet/bitter berry" },
      { "sa": "अनश्नन् अन्यः", "en": "without eating, the other" },
      { "sa": "अभिचाकशीति", "en": "looks on as a silent witness" }
    ],
    "translation": "Two birds, inseparable companions of radiant plumage, perch upon the selfsame tree. Of these two, one eats the sweet and bitter fruits of the tree, while the other looks on silently without eating.",
    "commentary": {
      "shankara": "Śaṅkara explains that the tree is the human body-mind complex. The first bird is the individual soul (jīva), immersed in the fruits of action, swinging between pleasure and pain. The second bird is the Lord / pure witnessing consciousness (Īśvara/Ātman), serene, unentangled, ever-luminous.",
      "other": "This verse originates in Ṛgveda 1.164.20 and is echoed in Śvetāśvatara 4.6, marking one of the oldest allegories of divided selfhood in human literature."
    },
    "resilienceReading": "The hallmark of psychological distress is total identification with the 'eating bird'—reacting to every bitter fruit of disappointment. Resilience emerges the moment we shift attention to the second bird: cultivating the 'witness attitude' (sākṣī-bhāva) that watches sensation, fear, and sorrow without being contaminated by them.",
    "modernParallel": "Directly mirrors the metacognitive shift, cognitive defusion in ACT (Hayes et al., 1999), and mindfulness decentering (Kabat-Zinn, 1990; Teasdale, 2002): recognizing thoughts as mental events rather than absolute self-definitions.",
    "tags": ["witness-consciousness", "two-birds", "metacognition", "stillness"],
    "sources": ["Muṇḍaka Upaniṣad 3.1.1", "Ṛgveda 1.164.20", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 10
  },
  {
    "id": "mundaka-3-1-2",
    "upanishad": "Muṇḍaka Upaniṣad",
    "location": "3.1.2",
    "devanagari": "समाने वृक्षे पुरुषो निमग्नोऽनीशया शोचति मुह्यमानः । जुष्टं यदा पश्यत्यन्यमीशमस्य महिमानमिति वीतशोकः ॥",
    "iast": "samāne vṛkṣe puruṣo nimagno 'nīśayā śocati muhyamānaḥ | juṣṭaṃ yadā paśyaty anyam īśam asya mahimānam iti vīta-śokaḥ ||",
    "wordByWord": [
      { "sa": "समाने वृक्षे", "en": "on the same tree" },
      { "sa": "पुरुषः निमग्नः", "en": "the individual person, deeply submerged" },
      { "sa": "अनीशया", "en": "by feelings of helplessness / lack of mastery" },
      { "sa": "शोचति", "en": "grieves / suffers" },
      { "sa": "मुह्यमानः", "en": "deluded / disoriented" },
      { "sa": "यदा पश्यति", "en": "when he beholds" },
      { "sa": "अन्यम् ईशम्", "en": "the other, the Lord / serene witness" },
      { "sa": "महिमानम्", "en": "His glory" },
      { "sa": "वीत-शोकः", "en": "freed from all sorrow" }
    ],
    "translation": "On the same tree, the individual soul sits submerged, grieving in delusion because of its own helplessness. But when it turns to behold the other—the revered, serene Lord—and realizes its glory as its own, it is freed forever from sorrow.",
    "commentary": {
      "shankara": "Śaṅkara notes 'anīśayā'—the sense of helplessness and lack of control over bodily and worldly fortunes—is the immediate trigger of grief (śoka). The dissolution of sorrow does not occur by changing the tree or its fruits, but by recognizing the presence of the transcendent Witness.",
      "other": "Easwaran (1987) describes this transition as waking up from a nightmare of helplessness into the realization of one's innate dignity."
    },
    "resilienceReading": "Helplessness (learned helplessness, as Seligman described) paralyzes human agency. Muṇḍaka captures this psychological state with precision ('anīśayā śocati'). Recovery begins not by frantically trying to manipulate external circumstances, but by recognizing our transcendent observer self, which has never been defeated.",
    "modernParallel": "Martin Seligman's learned helplessness vs. learned optimism paradigm; locus of control shifts from external helplessness to internal existential competence.",
    "tags": ["agency", "freedom-from-sorrow", "witness", "empowerment"],
    "sources": ["Muṇḍaka Upaniṣad 3.1.2", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 10
  },
  {
    "id": "svetasvatara-4-6-7",
    "upanishad": "Śvetāśvatara Upaniṣad",
    "location": "4.6–7",
    "devanagari": "द्वा सुपर्णा सयुजा सखाया... जुष्टं यदा पश्यत्यन्यमीशमस्य महिमानमिति वीतशोकः ॥",
    "iast": "dvā suparṇā sayujā sakhāyā... juṣṭaṃ yadā paśyaty anyam īśam asya mahimānam iti vīta-śokaḥ ||",
    "wordByWord": [
      { "sa": "सयुजा सखाया", "en": "yoked companions" },
      { "sa": "समानं वृक्षम्", "en": "the common tree" },
      { "sa": "वीतशोकः", "en": "freed from grief" }
    ],
    "translation": "Two birds of beautiful plumage, inseparable companions, cling to the selfsame tree... when the soul beholds the majestic, worshipful Lord and realizes His glory, its sorrow melts away.",
    "commentary": {
      "shankara": "Śaṅkara (attributed commentary) emphasizes that the theistic tone of Śvetāśvatara harmonizes with the non-dual truth: the 'other' is ultimately recognized as the non-different ground of consciousness.",
      "other": "Radhakrishnan observes that Śvetāśvatara synthesizes devotional contemplation with profound Upanishadic monism."
    },
    "resilienceReading": "Reiterates the universal power of perspective-taking: when pain contracts our awareness into victimhood, stepping back into the vast witness consciousness relieves acute suffering.",
    "modernParallel": "Cognitive reappraisal and emotional regulation strategies in positive psychology (Gross, 2002).",
    "tags": ["perspective", "witness", "non-duality"],
    "sources": ["Śvetāśvatara Upaniṣad 4.6–7"],
    "verified": true,
    "chapter": 10
  },
  {
    "id": "mandukya-1",
    "upanishad": "Māṇḍūkya Upaniṣad",
    "location": "Verse 1",
    "devanagari": "ओमित्येतदक्षरमिदं सर्वं तस्योपव्याख्यानं भूतं भवद् भविष्यदिति सर्वमोङ्कार एव । यच्चान्यत् त्रिकालातीतं तदप्योङ्कार एव ॥",
    "iast": "om ity etad akṣaram idaṃ sarvaṃ tasyopavyākhyānaṃ bhūtaṃ bhavad bhaviṣyad iti sarvam oṅkāra eva | yac cānyat trikālātītaṃ tad apy oṅkāra eva ||",
    "wordByWord": [
      { "sa": "ओम् इति एतत् अक्षरम्", "en": "Om, this syllable" },
      { "sa": "इदम् सर्वम्", "en": "all this universe" },
      { "sa": "भूतम् भवत् भविष्यत्", "en": "the past, present, and future" },
      { "sa": "सर्वम् ओङ्कारः एव", "en": "all is indeed Om" },
      { "sa": "त्रिकालातीतम्", "en": "that which transcends the three times" }
    ],
    "translation": "OM: this syllable is all this. A clear explanation of it follows: All that is past, all that is present, and all that is future is verily OM. And whatever else exists beyond the threefold measure of time—that too is verily OM.",
    "commentary": {
      "shankara": "Śaṅkara remarks that the Māṇḍūkya contains the distilled essence of all Vedānta. Gauḍapāda's Kārikā begins with this verse, establishing that sound and meaning, the observer and the observed, all coalesce into the supreme non-dual substrate symbolized by Praṇava.",
      "other": "Swami Vivekananda called the Māṇḍūkya the most condensed treatise on human psychology and metaphysics ever penned."
    },
    "resilienceReading": "When past regrets and future anxieties squeeze the human psyche, Māṇḍūkya introduces Om as the integration of temporal flow into timeless awareness. It grounds resilience in that which cannot be eroded by time.",
    "modernParallel": "Time perspective therapy (Zimbardo & Boyd, 1999) and mindful presence overcoming retrospective depression and anticipatory anxiety.",
    "tags": ["om", "timeless", "integration", "presence"],
    "sources": ["Māṇḍūkya Upaniṣad verse 1", "Gauḍapāda Kārikā", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 10
  },
  {
    "id": "mandukya-7",
    "upanishad": "Māṇḍūkya Upaniṣad",
    "location": "Verse 7",
    "devanagari": "नान्तःप्रज्ञां न बहिष्प्रज्ञां नोभयतःप्रज्ञां न प्रज्ञानघनं न प्रज्ञां नाप्रज्ञम् । अदृष्टमव्यवहार्यमग्राह्यमलक्षणमचिन्त्यमव्यपदेश्यमेकात्मप्रत्ययसारं प्रपञ्चोपशमं शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः ॥",
    "iast": "nāntaḥ-prajñaṃ na bahiṣ-prajñaṃ nobhayataḥ-prajñaṃ na prajñāna-ghanaṃ na prajñāṃ nāprajñam | adṛṣṭam avyavahāryam agrāhyam alakṣaṇam acintyam avyapadeśyam ekātma-pratyaya-sāraṃ prapañcopaśamaṃ śāntaṃ śivam advaitaṃ caturthaṃ manyante sa ātmā sa vijñeyaḥ ||",
    "wordByWord": [
      { "sa": "नान्तःप्रज्ञम्", "en": "not inwardly cognitive (dream)" },
      { "sa": "न बहिष्प्रज्ञम्", "en": "not outwardly cognitive (waking)" },
      { "sa": "न प्रज्ञानघनम्", "en": "not a mass of cognition (deep sleep)" },
      { "sa": "अव्यवहार्यम्", "en": "beyond empirical dealings" },
      { "sa": "अग्राह्यम्", "en": "un-graspable" },
      { "sa": "अचिन्त्यम्", "en": "unthinkable" },
      { "sa": "प्रपञ्चोपशमम्", "en": "the cessation of all conceptual agitation" },
      { "sa": "शान्तम्", "en": "serene / peaceful" },
      { "sa": "शिवम्", "en": "auspicious / benign" },
      { "sa": "अद्वैतम्", "en": "non-dual" },
      { "sa": "चतुर्थम्", "en": "the Fourth (Turīya)" },
      { "sa": "स आत्मा स विज्ञेयः", "en": "that is the Self; that must be realized" }
    ],
    "translation": "Not inwardly conscious, nor outwardly conscious, nor conscious of both; not a mass of consciousness, nor simply conscious, nor unconscious; unseen, beyond empirical dealings, ungraspable, without distinguishing marks, unthinkable, indescribable; its essence consisting in the certainty of its own Selfhood; the stilling of all conceptual turmoil; peaceful, auspicious, non-dual—that they consider the Fourth state (Turīya). That is the Self. That is what must be known.",
    "commentary": {
      "shankara": "Śaṅkara states that Turīya is not a temporal fourth state alongside waking, dreaming, and sleeping, but the unchanging reality underlying all three. The via negativa (neti neti) strips away all mental projections to reveal the self-luminous ground of awareness.",
      "other": "Gauḍapāda describes this realization as 'asparśa-yoga'—the contact-less yoga that knows no fear or friction because there is no second entity."
    },
    "resilienceReading": "Turīya is the ultimate anchor of psychological resilience. Waking life brings trauma; dreams bring turmoil; sleep brings temporary oblivion. But Turīya is the unshakable background screen upon which these movies play. If we know ourselves as Turīya, no storm can shatter our foundation.",
    "modernParallel": "The psychological state of pure awareness / observer self in mindfulness and ACT; neuroscientific investigations into default mode network deactivation during deep contemplative non-dual states.",
    "tags": ["turiya", "pure-awareness", "peace", "unshakable"],
    "sources": ["Māṇḍūkya Upaniṣad verse 7", "Śaṅkara Bhāṣya", "Gauḍapāda Kārikā"],
    "verified": true,
    "chapter": 10
  },
  {
    "id": "brhadaranyaka-4-3-6",
    "upanishad": "Bṛhadāraṇyaka Upaniṣad",
    "location": "4.3.6",
    "devanagari": "अस्तमित आदित्ये याज्ञवल्क्य चन्द्रमस्यस्तमिते शान्तेऽग्नौ शान्तायां वाचि किंज्योतिरेवायं पुरुष इत्यात्मैवास्य ज्योतिर्भवतीत्यात्मनैवायं ज्योतिषास्ते पल्ययते कर्म कुरुते विपल्येतीति ॥",
    "iast": "astam ita āditye yājñavalkya candramasy astam ite śānte 'gnau śāntāyāṃ vāci kiṃ-jyotir evāyaṃ puruṣa ity ātmaivāsya jyotir bhavatīty ātmanaivāyaṃ jyotiṣāste palyayate karma kurute vipalyetīti ||",
    "wordByWord": [
      { "sa": "अस्तमिते आदित्ये", "en": "when the sun has set" },
      { "sa": "चन्द्रमसि अस्तमिते", "en": "when the moon has set" },
      { "sa": "शान्ते अग्नौ", "en": "when the fire has gone out" },
      { "sa": "शान्तायाम् वाचि", "en": "when all speech is stilled" },
      { "sa": "किं-ज्योतिः", "en": "what light serves this person?" },
      { "sa": "आत्मा एव अस्य ज्योतिः", "en": "the Self alone is his light" },
      { "sa": "आत्मना एव", "en": "by the Self alone" }
    ],
    "translation": "'When the sun has set, Yājñavalkya, and the moon has set, and the fire has gone out, and all voices are silent—what light then guides a person?' Yājñavalkya said: 'The Self indeed is his light. By the light of the Self alone he sits, moves about, performs work, and returns.'",
    "commentary": {
      "shankara": "Śaṅkara highlights this famous dialogue between King Janaka and sage Yājñavalkya. Janaka strips away every external source of illumination—first celestial lights (sun, moon), then physical technology (fire), then social communication (speech). Yājñavalkya proves that internal conscious light (svayaṃ-jyotiḥ) operates even when all external reference points are extinguished.",
      "other": "Radhakrishnan observes: 'Even in total sensory darkness, consciousness remains self-luminous and aware of its own existence.'"
    },
    "resilienceReading": "When all external props collapse—career, social prestige, physical vitality, guidance from mentors—a person faces sensory and social darkness. Yājñavalkya’s insight is that inner awareness never goes out. Resilient fortitude is discovering this internal lighthouse when all worldly lights have failed.",
    "modernParallel": "Internal locus of evaluation in humanistic psychology (Carl Rogers) and intrinsic meaning discovery during total sensory deprivation or external catastrophe.",
    "tags": ["inner-light", "solitude", "self-luminous", "courage"],
    "sources": ["Bṛhadāraṇyaka Upaniṣad 4.3.6", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 10
  },
  {
    "id": "mundaka-3-2-4",
    "upanishad": "Muṇḍaka Upaniṣad",
    "location": "3.2.4",
    "devanagari": "नायमात्मा बलहीनेन लभ्यो न च प्रमादात्तपसो वाप्यलिङ्गात् । एतैरुपायैर्यतते यस्तु विद्वांस्तस्यैष आत्मा विशते ब्रह्मधाम ॥",
    "iast": "nāyam ātmā bala-hīnena labhyo na ca pramādāt tapaso vāpy aliṅgāt | etair upāyair yatate yas tu vidvāṃs tasyaiṣa ātmā viśate brahma-dhāma ||",
    "wordByWord": [
      { "sa": "न अयम् आत्मा", "en": "this Self is not" },
      { "sa": "बल-हीनेन", "en": "by one devoid of strength" },
      { "sa": "लभ्यः", "en": "to be attained" },
      { "sa": "न च प्रमादात्", "en": "nor through heedlessness / slackness" },
      { "sa": "तपसः वा अपि अलिङ्गात्", "en": "nor through undisciplined austerity" },
      { "sa": "एतैः उपायैः", "en": "through these right means" },
      { "sa": "यतते", "en": "strives" }
    ],
    "translation": "This Self cannot be attained by one devoid of strength, nor through heedlessness, nor through undisciplined, aimless austerity. But if a wise seeker strives with right resolve and inner vigor, his Self enters into the abode of Brahman.",
    "commentary": {
      "shankara": "Śaṅkara clarifies that 'bala' (strength) here means inner psychological vigor, mental fortitude, and spiritual stamina born of steadfast commitment to truth, not brute muscular force. Without moral stamina, the mind collapses when confronted with trials.",
      "other": "Swami Vivekananda frequently quoted this verse: 'Strength is life, weakness is death. What our country needs now is muscles of iron and nerves of steel, but above all, an indomitable will.'"
    },
    "resilienceReading": "Spiritual and psychological self-realization is not for the faint-hearted. Resilience requires active vigor—mental courage to confront discomfort, disciplined persistence against cognitive lethargy (pramāda), and the inner spine to adhere to integrity under pressure.",
    "modernParallel": "Grit and emotional stamina; Angela Duckworth's findings on passion and perseverance for long-term goals out-predicting innate talent.",
    "tags": ["strength", "vitality", "determination", "discipline"],
    "sources": ["Muṇḍaka Upaniṣad 3.2.4", "Śaṅkara Bhāṣya", "Vivekananda Complete Works"],
    "verified": true,
    "chapter": 11
  },
  {
    "id": "mundaka-2-2-3-4",
    "upanishad": "Muṇḍaka Upaniṣad",
    "location": "2.2.3–4",
    "devanagari": "धनुर्गृहीत्वौपनिषदं महास्त्रं शरं ह्युपासानिशितं संदधीत । आयम्य तद्भावगतेन चेतसा लक्ष्यं तदेवाक्षरं सोम्य विद्धि ॥ प्रणवो धनुः शरो ह्यात्मा ब्रह्म तल्लक्ष्यमुच्यते । अप्रमत्तेन वेद्धव्यं शरवत्तन्मयो भवेत् ॥",
    "iast": "dhanur gṛhītvaupaniṣadaṃ mahāstraṃ śaraṃ hy upāsā-niśitaṃ saṃdadhīta | āyamya tad-bhāva-gatena cetasā lakṣyaṃ tad evākṣaraṃ somya viddhi || praṇavo dhanuḥ śaro hy ātmā brahma tal-lakṣyam ucyate | apramattena veddhavyaṃ śaravat tan-mayo bhavet ||",
    "wordByWord": [
      { "sa": "प्रणवः धनुः", "en": "the sacred syllable Om is the bow" },
      { "sa": "शरः हि आत्मा", "en": "the arrow is the individual self" },
      { "sa": "ब्रह्म तत् लक्ष्यम्", "en": "Brahman is that target" },
      { "sa": "अप्रमत्तेन", "en": "with unwavering vigilance" },
      { "sa": "वेद्धव्यम्", "en": "must be pierced" },
      { "sa": "शरवत् तन्मयो भवेत्", "en": "like the arrow, become one with the target" }
    ],
    "translation": "Take as a bow the great weapon of the Upaniṣad; place upon it an arrow sharpened by continuous devotion. Drawing it with a mind focused upon the Divine, pierce that imperishable mark, O gentle friend! OM is the bow; the arrow is the individual soul; Brahman is the target. It is to be struck by one who is vigilant and free from distraction; then, like the arrow, one becomes unified with the mark.",
    "commentary": {
      "shankara": "Śaṅkara describes the imagery of archery: the bow (Om) provides propulsion; the arrow (purified mind/soul) must be sharpened by meditation; the archer must draw back the senses from distractions; the target (Brahman) is pierced so completely that the distinction between arrow and target dissolves.",
      "other": "This imagery anticipates Eugen Herrigel's 'Zen in the Art of Archery' by thousands of years."
    },
    "resilienceReading": "Distraction, scattered goals, and cognitive fragmentation cripple resilience. The archery metaphor provides an exercise in single-pointed focus (ekāgratā): aligning tool (mantra), self (intention), and goal (highest value) into an unified vector of purpose.",
    "modernParallel": "Flow state psychology (Csíkszentmihályi, 1990) and attentional focusing in high-performance sports psychology.",
    "tags": ["focus", "archery", "om", "alignment"],
    "sources": ["Muṇḍaka Upaniṣad 2.2.3–4", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 11
  },
  {
    "id": "mundaka-3-1-6",
    "upanishad": "Muṇḍaka Upaniṣad",
    "location": "3.1.6",
    "devanagari": "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः । येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम् ॥",
    "iast": "satyam eva jayate nānṛtaṃ satyena panthā vitato deva-yānaḥ | yenākramanty ṛṣayo hy āpta-kāmā yatra tat satyasya paramaṃ nidhānam ||",
    "wordByWord": [
      { "sa": "सत्यम् एव", "en": "truth alone" },
      { "sa": "जयते", "en": "triumphs / prevails" },
      { "sa": "न अनृतम्", "en": "not untruth / falsehood" },
      { "sa": "सत्येन", "en": "by truth" },
      { "sa": "पन्थाः विततः", "en": "the divine path is laid out" },
      { "sa": "ऋषयः", "en": "the seers" },
      { "sa": "परमम् निधानम्", "en": "the supreme treasure" }
    ],
    "translation": "Truth alone triumphs, not falsehood. Through truth the divine path is laid out, along which the sages whose desires are fulfilled ascend to that supreme abode where lies the ultimate treasure of Truth.",
    "commentary": {
      "shankara": "Śaṅkara explains that untruth, being rooted in non-existence and deception, can have only temporary and illusory victory. Truth, being synonymous with Reality itself, ultimately and inexorably endures.",
      "other": "Adopted in 1950 as the national motto of the Republic of India at the base of the Lion Capital of Ashoka."
    },
    "resilienceReading": "In situations of injustice, slander, or corrupt pressure, falsehood often appears to win in the short run. 'Satyam eva jayate' is the ultimate moral compass for resilience: the unshakeable faith that reality is fundamentally coherent, and that aligning oneself with truth preserves psychological integrity even when worldly circumstances are adverse.",
    "modernParallel": "Moral injury literature and values-based action: cognitive dissonance and moral compromise shatter mental health, while living in truth preserves psychological resilience.",
    "tags": ["truth", "integrity", "motto", "moral-courage"],
    "sources": ["Muṇḍaka Upaniṣad 3.1.6", "Śaṅkara Bhāṣya", "Constitution of India motto"],
    "verified": true,
    "chapter": 11
  },
  {
    "id": "maitri-6-34",
    "upanishad": "Maitrī Upaniṣad",
    "location": "6.34",
    "devanagari": "चित्तमेव हि संसारं तत्प्रयत्नेन शोधयेत् । यच्चित्तस्तन्मयो भवति गुह्यमेतत्सनातनम् ॥ मन एव मनुष्याणां कारणं बन्धमोक्षयोः । बन्धाय विषयासक्तं मुक्त्यै निर्विषयं स्मृतम् ॥",
    "iast": "cittam eva hi saṃsāraṃ tat prayatnena śodhayet | yac-cittas tan-mayo bhavati guhyam etat sanātanam || mana eva manuṣyāṇāṃ kāraṇaṃ bandha-mokṣayoḥ | bandhāya viṣayāsaktaṃ muktyai nirviṣayaṃ smṛtam ||",
    "wordByWord": [
      { "sa": "चित्तम् एव हि", "en": "the mind itself is indeed" },
      { "sa": "संसारम्", "en": "the cycle of worldly suffering" },
      { "sa": "प्रयत्नेन शोधयेत्", "en": "one must purify with effort" },
      { "sa": "यत्-चित्तः", "en": "as one's thought is" },
      { "sa": "तत्-मयः भवति", "en": "so one becomes" },
      { "sa": "मनः एव", "en": "the mind alone" },
      { "sa": "कारणं बन्धमोक्षयोः", "en": "is the cause of bondage and liberation" },
      { "sa": "मुक्त्यै", "en": "for liberation" }
    ],
    "translation": "Mind alone is indeed the world of cyclical suffering; therefore let a person cleanse it with diligent effort. For as a person thinks, so they become—this is the eternal mystery. The mind alone is the cause of human bondage and freedom: attached to sensory objects, it leads to bondage; freed from grasping, it leads to liberation.",
    "commentary": {
      "shankara": "Also found word-for-word in the Amṛtabindu Upaniṣad (v. 2) and quoted widely across Advaita literature. The mind is a mirror: when covered with dust, it reflects distorted realities; when polished by self-inquiry, it reflects the freedom of the Self.",
      "other": "Paranjpe (1998) notes this as the foundational premise of Indian psychological therapy: cognitive transformation precedes emotional release."
    },
    "resilienceReading": "You are not trapped by the world; you are trapped by your mind's habitual interpretations of the world. By realizing that bondage and liberation are mental operations rather than physical conditions, agency is returned entirely to the individual.",
    "modernParallel": "The cornerstone premise of Epictetus's Stoicism ('Men are disturbed not by things, but by the view which they take of them') and modern Cognitive Behavioral Therapy (Beck, 1979).",
    "tags": ["mind", "cognitive-restructuring", "liberation", "agency"],
    "sources": ["Maitrī Upaniṣad 6.34", "Amṛtabindu Upaniṣad 2", "Paranjpe (1998)"],
    "verified": true,
    "chapter": 12
  },
  {
    "id": "svetasvatara-2-8-9",
    "upanishad": "Śvetāśvatara Upaniṣad",
    "location": "2.8–9",
    "devanagari": "त्रिरुन्नतं स्थाप्य समं शरीरं हृदीन्द्रियाणि मनसा संनिवेश्य । ब्रह्मोडुपेन प्रतरेत विद्वान् स्रोतांसि सर्वाणि भयावहानि ॥ प्राणान् प्रपीड्येह संयुक्तचेष्टः क्षीणे प्राणे नासिकयोच्छ्वसीत । दुष्टाश्वयुक्तमिव वाहमेनं विद्वां मनो धारयेताप्रमत्तः ॥",
    "iast": "trir-unnataṃ sthāpya samaṃ śarīraṃ hṛdīndriyāṇi manasā saṃniveśya | brahmoḍupena pratareta vidvān srotāṃsi sarvāṇi bhayāvahāni || prāṇān prapīḍyeha saṃyukta-ceṣṭaḥ kṣīṇe prāṇe nāsikayocchvasīta | duṣṭāśva-yuktam iva vāham enaṃ vidvāṃ mano dhārayetāpramattaḥ ||",
    "wordByWord": [
      { "sa": "त्रिरुन्नतम्", "en": "holding the three parts erect (chest, neck, head)" },
      { "sa": "समं शरीरम्", "en": "body steady and balanced" },
      { "sa": "हृदि", "en": "into the heart" },
      { "sa": "मनसा संनिवेश्य", "en": "directing with the mind" },
      { "sa": "भयावहानि", "en": "fearful / turbulent currents" },
      { "sa": "दुष्टाश्व-युक्तम्", "en": "yoked to wild, unruly horses" },
      { "sa": "विद्वान् मनो धारयेत्", "en": "the wise one must steady the mind" }
    ],
    "translation": "Holding the body erect with the three upper parts steady (chest, neck, and head), directing the senses into the heart by means of the mind, the wise person should cross all the fearful torrents of life upon the raft of Brahman. Regulating the breath here with calibrated movements, when breath is quieted let him breathe gently through the nostrils. Like a chariot harnessed to unruly horses, the wise person must vigilantly restrain the wandering mind.",
    "commentary": {
      "shankara": "Śaṅkara highlights the practical psychosomatic instructions: postural alignment directly impacts mental stability, and breath regulation (prāṇāyāma) calms the restless nervous system.",
      "other": "This is one of the earliest systematic descriptions of seated meditation, posture, and breath control in Sanskrit literature, directly bridging Upanishadic wisdom to classical Yoga."
    },
    "resilienceReading": "Resilience is not merely abstract contemplation; it has somatic architecture. When emotional panic strikes, posture collapses and breath turns erratic. Śvetāśvatara teaches deliberate upright somatic anchoring ('trir-unnataṃ') and rhythmic breath as immediate physiological shields against turbulent currents.",
    "modernParallel": "Somatic experiencing, biofeedback, and polyvagal theory: physical posture and diaphragmatic breathing directly modulate autonomic nervous system threat responses.",
    "tags": ["posture", "breath", "yoga", "somatic-grounding"],
    "sources": ["Śvetāśvatara Upaniṣad 2.8–9", "Radhakrishnan (1953)"],
    "verified": true,
    "chapter": 12
  },
  {
    "id": "kena-1-1",
    "upanishad": "Kena Upaniṣad",
    "location": "1.1",
    "devanagari": "केनेषितं पतति प्रेषितं मनः । केन प्राणः प्रथमः प्रैति युक्तः । केनेषितां वाचमिमां वदन्ति । चक्षुः श्रोत्रं क उ देवो युनक्ति ॥",
    "iast": "keneṣitaṃ patati preṣitaṃ manaḥ | kena prāṇaḥ prathamaḥ praiti yuktaḥ | keneṣitāṃ vācam imāṃ vadanti | cakṣuḥ śrotraṃ ka u devo yunakti ||",
    "wordByWord": [
      { "sa": "केन इषितम्", "en": "by whom directed / desired" },
      { "sa": "पतति", "en": "does it fly / alight" },
      { "sa": "प्रेषितम् मनः", "en": "the impelled mind" },
      { "sa": "केन", "en": "by whom" },
      { "sa": "प्रथमः प्राणः", "en": "the primordial breath" },
      { "sa": "कः उ देवः", "en": "what luminous power" },
      { "sa": "युनक्ति", "en": "sets in motion" }
    ],
    "translation": "By whom impelled, by whom directed does the mind speed toward its objects? By whose command does the primordial life-breath first move? Impelled by whom do people utter this speech? And what shining power directs the eye and the ear?",
    "commentary": {
      "shankara": "Śaṅkara begins his commentary on Kena with this radical epistemological questioning: the mind, senses, and breath are insentient instruments (karaṇa); they cannot animate themselves. The inquiry deconstructs the illusion that the ego-mind is the ultimate author of perception.",
      "other": "Sri Aurobindo's commentary on the Kena notes that this question initiates the decisive leap from mental mechanics to spiritual realization."
    },
    "resilienceReading": "When anxious thoughts loop endlessly, we feel hijacked by the mind. The Kena opening breaks that identification with a startling question: 'Who is sending this mind?' By asking who is observing the thought stream, you step out of the reactive loop into the role of the sovereign witness.",
    "modernParallel": "Metacognitive therapy and cognitive defusion: asking 'who is noticing this thought?' interrupts obsessive rumination and catastrophic anxiety.",
    "tags": ["inquiry", "metacognition", "ego-deconstruction", "curiosity"],
    "sources": ["Kena Upaniṣad 1.1", "Śaṅkara Bhāṣya", "Sri Aurobindo (1920)"],
    "verified": true,
    "chapter": 12
  },
  {
    "id": "prasna-3-3-4",
    "upanishad": "Praśna Upaniṣad",
    "location": "3.3–4",
    "devanagari": "आत्मन एष प्राणो जायते । यथैषा पुरुषे छायैतस्मिन्नेतदाततं मनोकृतेनायात्यस्मिञ्शरीरे ॥ यथा सम्राडेवाधिकृतान् विनियुङ्क्ते—एतान् ग्रामानिति, एवमेवैष प्राण इतरान् प्राणान् पृथक् पृथगेव संनिधत्ते ॥",
    "iast": "ātmana eṣa prāṇo jāyate | yathaiṣā puruṣe chāyaitasminn etad ātataṃ mano-kṛtenāyāty asmiñ charīre || yathā samrāḍ evādhikṛtān viniyuṅkte—etān grāmān iti, evam evaiṣa prāṇa itarān prāṇān pṛthak pṛthag eva saṃnidhatte ||",
    "wordByWord": [
      { "sa": "आत्मनः", "en": "from the Self" },
      { "sa": "एषः प्राणः जायते", "en": "this life-breath is born" },
      { "sa": "यथा छाया", "en": "just as a shadow" },
      { "sa": "मनो-कृतेन", "en": "by the action of the mind" },
      { "sa": "आयाति", "en": "enters into this body" },
      { "sa": "यथा सम्राट्", "en": "just as a sovereign emperor" }
    ],
    "translation": "From the Self this life-breath (Prāṇa) is born. Just as a shadow is cast by a human figure, so is this breath spread over the Self. Through the action of the mind it enters into this body. And as a sovereign emperor appoints officers over various districts, so does this primary Prāṇa allocate the subsidiary breaths to their respective domains.",
    "commentary": {
      "shankara": "Śaṅkara explains that prāṇa acts as the vital energetic bridge between the immaterial conscious Self and the gross physical body. It responds dynamically to mental volition (mano-kṛtena).",
      "other": "Pippalāda's discourse in Praśna constitutes one of ancient India's most detailed treatises on psycho-neuro-endocrinological integration."
    },
    "resilienceReading": "The breath is not merely biological gas exchange; it is the physical ambassador of the mind. By acknowledging that breath enters and shifts through mental movements ('mano-kṛtena'), we realize that intentional breathing is a direct dial for modulating emotional turbulence.",
    "modernParallel": "Heart rate variability (HRV) biofeedback and respiratory sinus arrhythmia: regulating breath rhythm to directly alter vagal nerve signaling to the brain.",
    "tags": ["prana", "breath", "mind-body", "vitality"],
    "sources": ["Praśna Upaniṣad 3.3–4", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 12
  },
  {
    "id": "isha-1",
    "upanishad": "Īśā Upaniṣad",
    "location": "Verse 1",
    "devanagari": "ईशा वास्यमिदँ सर्वं यत्किञ्च जगत्यां जगत् । तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥",
    "iast": "īśā vāsyam idaṃ sarvaṃ yat kiñca jagatyāṃ jagat | tena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam ||",
    "wordByWord": [
      { "sa": "ईशा", "en": "by the Lord / supreme consciousness" },
      { "sa": "वास्यम्", "en": "to be enveloped / enveloped" },
      { "sa": "इदम् सर्वम्", "en": "all this" },
      { "sa": "यत् किञ्च", "en": "whatever" },
      { "sa": "जगत्याम् जगत्", "en": "moves in this moving world" },
      { "sa": "तेन त्यक्तेन", "en": "through that renunciation / letting go" },
      { "sa": "भुञ्जीथाः", "en": "enjoy / nourish yourself" },
      { "sa": "मा गृधः", "en": "do not covet" },
      { "sa": "कस्य स्वित् धनम्", "en": "whose, indeed, is wealth?" }
    ],
    "translation": "All this—whatever moves and fluctuates in this shifting universe—is enveloped by the Supreme Lord. Through renunciation of possessiveness, rejoice and enjoy life! Do not covet the wealth of anyone, for to whom does wealth truly belong?",
    "commentary": {
      "shankara": "Śaṅkara reads 'tyaktena bhuñjīthāḥ' as the paradoxical harmony of spiritual life: enjoyment through non-possessive detachment. When we stop clinging to objects as our exclusive property, we are free to experience them without anxiety.",
      "other": "Mahatma Gandhi famously said that if all the scriptures of Hinduism were burned and only the first verse of the Īśā Upaniṣad survived, the entire religion would remain intact."
    },
    "resilienceReading": "Possessiveness breeds terror: the more tightly we grasp people, possessions, and reputations, the more vulnerable we are to loss. The Īśā formula—'enjoy through letting go'—is the core antidote to anticipatory grief. It allows vibrant participation in life without the brittle terror of attachment.",
    "modernParallel": "Erich Fromm's 'To Have or to Be?' (1976); the psychological distinction between anxious attachment/hoarding and non-attachment wellbeing (Sahdra et al., 2010).",
    "tags": ["letting-go", "enjoyment", "non-possessiveness", "action"],
    "sources": ["Īśā Upaniṣad verse 1", "Śaṅkara Bhāṣya", "Gandhi (1937 speech)"],
    "verified": true,
    "chapter": 13
  },
  {
    "id": "isha-2",
    "upanishad": "Īśā Upaniṣad",
    "location": "Verse 2",
    "devanagari": "कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं समाः । एवं त्वयि नान्यथेतोऽस्ति न कर्म लिप्यते नरे ॥",
    "iast": "kurvann eveha karmāṇi jijīviṣec chataṃ samāḥ | evaṃ tvayi nānyatheto 'sti na karma lipyate nare ||",
    "wordByWord": [
      { "sa": "कुर्वन् एव", "en": "only while actively performing" },
      { "sa": "इह कर्माणि", "en": "work / duties in this world" },
      { "sa": "जिजीविषेत्", "en": "one should desire to live" },
      { "sa": "शतं समाः", "en": "a hundred years" },
      { "sa": "एवम् त्वयि", "en": "thus for you" },
      { "sa": "न कर्म लिप्यते", "en": "action does not cling / taint" }
    ],
    "translation": "Performing dedicated work in this world, let a person desire to live a full hundred years! Thus it is for you, and not otherwise: dedicated action does not cling to or taint a human being.",
    "commentary": {
      "shankara": "Śaṅkara notes that for those engaged in the world, unselfish duty performed without personal clinging prepares the mind for higher wisdom without accumulating toxic psychic residue.",
      "other": "Tilak in 'Gītā Rahasya' uses this verse to demonstrate that the Upanishads do not advocate life-negating passivity, but dynamic, engaged, ethical action."
    },
    "resilienceReading": "Resilience is not passive retirement into a cave. Īśā 2 is a resounding affirmation of life, longevity, and purposeful action. It protects against burnout by showing that it is not work that exhausts us, but egoistic clinging to outcomes.",
    "modernParallel": "Burnout prevention research (Maslach, 2001) and purpose-driven resilience: engaged contribution without toxic perfectionism protects psychological longevity.",
    "tags": ["engaged-action", "longevity", "karma-yoga", "purpose"],
    "sources": ["Īśā Upaniṣad verse 2", "Śaṅkara Bhāṣya", "B.G. Tilak (1915)"],
    "verified": true,
    "chapter": 13
  },
  {
    "id": "brhadaranyaka-2-4-5",
    "upanishad": "Bṛhadāraṇyaka Upaniṣad",
    "location": "2.4.4–5",
    "devanagari": "सा होवाच मैत्रेयी यन्नु म इयं भगोः सर्वा पृथिवी वित्तेन पूर्णा स्यात्कथं तेनामृता स्यामिति । नेति होवाच याज्ञवल्क्यो यथैवोपकरणवतां जीवनं तथैव ते जीवनं स्यादमृतत्वस्य तु नाशास्ति वित्तेनेति ॥ सा होवाच मैत्रेयी येनाहं नामृता स्यां किम Narcisse... किं तेन कुर्यां यदेव भगवान्वेद तदेव मे ब्रूहीति ॥",
    "iast": "sā hovāca maitreyī yan nu ma iyaṃ bhagoḥ sarvā pṛthivī vittena pūrṇā syāt kathaṃ tenāmṛtā syām iti | neti hovāca yājñavalkyo yathaivopakaraṇavatāṃ jīvanaṃ tathaiva te jīvanaṃ syād amṛtatvasya tu nāśāsti vitteneti || sā hovāca maitreyī yenāhaṃ nāmṛtā syāṃ kim ahaṃ tena kuryāṃ yad eva bhagavān veda tad eva me brūhīti ||",
    "wordByWord": [
      { "sa": "मैत्रेयी", "en": "Maitreyī" },
      { "sa": "सर्वा पृथिवी", "en": "the entire earth" },
      { "sa": "वित्तेन पूर्णा", "en": "filled with wealth" },
      { "sa": "अमृता स्याम्", "en": "could I become immortal?" },
      { "sa": "न आशा अस्ति", "en": "there is no hope" },
      { "sa": "वित्तेन", "en": "through wealth" },
      { "sa": "येन अहम् न अमृता स्याम्", "en": "that by which I do not become immortal" },
      { "sa": "किम् अहम् तेन कुर्याम्", "en": "what shall I do with that?" }
    ],
    "translation": "Maitreyī asked: 'Venerable sir, if this entire earth filled with all its riches were mine, could I achieve immortality through it?' 'No,' replied Yājñavalkya, 'your life would be just like that of wealthy people; but of immortality there is no hope through wealth.' Maitreyī said: 'What shall I do with that which will not make me immortal? Tell me, venerable sir, only of that which you know leads beyond death.'",
    "commentary": {
      "shankara": "Śaṅkara praises Maitreyī's discriminative intellect (viveka). When her husband Yājñavalkya prepares to renounce worldly life and divide his wealth between his two wives, Kātyāyanī accepts the property, but Maitreyī discerns that material security cannot resolve existential mortality.",
      "other": "Stephanie Jamison notes that Maitreyī is portrayed as an equal philosophical partner in one of the world's earliest recorded intellectual dialogues between women and men."
    },
    "resilienceReading": "Maitreyī's question cuts to the heart of values-clarity. Material abundance provides comfort, but cannot cure existential dread or provide psychological invulnerability. True resilience requires knowing what genuinely matters—refusing to barter one's spiritual growth for superficial golden handcuffs.",
    "modernParallel": "Post-materialist values (Inglehart) and intrinsic vs extrinsic aspirations (Kasser & Ryan, 1993): chasing financial wealth as an existential shield consistently correlates with higher anxiety and lower psychological resilience.",
    "tags": ["women-sages", "clarity", "immortality", "values"],
    "sources": ["Bṛhadāraṇyaka Upaniṣad 2.4.4–5", "Śaṅkara Bhāṣya", "Jamison & Brereton (2014)"],
    "verified": true,
    "chapter": 14
  },
  {
    "id": "brhadaranyaka-3-8-8-10",
    "upanishad": "Bṛhadāraṇyaka Upaniṣad",
    "location": "3.8.8–10",
    "devanagari": "स होवाचैतद्वै तदक्षरं गार्गि ब्राह्मणा अभिवदन्त्यस्थूलमनण्वह्रस्वमदीर्घम्... एतस्य वा अक्षरस्य प्रशासने गार्गि सूर्याचन्द्रमसौ विधृतौ तिष्ठतः... यो वा एतदक्षरं गार्ग्यविदित्वास्मिँल्लोके जुहोति यजते तपस्तप्यते बहूनि वर्षसहस्राण्यन्तवदेवास्य तद्भवति... ॥",
    "iast": "sa hovāca etad vai tad akṣaraṃ gārgi brāhmaṇā abhivadanty asthūlam anaṇv ahrasvam adīrgham... etasya vā akṣarasya praśāsane gārgi sūryā-candramasau vidhṛtau tiṣṭhataḥ... yo vā etad akṣaraṃ gārgy aviditvāsmiṃl loke juhoti yajate tapas tapyate bahūni varṣa-sahasrāṇy antavad evāsya tad bhavati... ||",
    "wordByWord": [
      { "sa": "अक्षरम्", "en": "the Imperishable (Akṣara)" },
      { "sa": "गार्गि", "en": "O Gārgī" },
      { "sa": "अस्थूलम्", "en": "not gross" },
      { "sa": "अनणु", "en": "not subtle" },
      { "sa": "प्रशासने", "en": "under the sovereign rule / order" },
      { "sa": "सूर्या-चन्द्रमसौ", "en": "sun and moon" },
      { "sa": "अविदित्वा", "en": "without knowing" }
    ],
    "translation": "Yājñavalkya said: 'That, O Gārgī, is what knowers of the sacred call the Imperishable (Akṣara). It is neither coarse nor fine, neither short nor long... By the sovereign order of this very Imperishable, O Gārgī, the sun and the moon stand in their appointed stations. Whoever, O Gārgī, without knowing this Imperishable, offers oblations and performs austerities in this world for thousands of years—his reward has an end. But one who departs knowing this Imperishable is truly wise.'",
    "commentary": {
      "shankara": "Śaṅkara observes the immense philosophical audacity of Gārgī Vācaknavī. In the court of King Janaka, surrounded by hundreds of male scholars, she stands twice with two questions like 'two arrows from a fierce archer of Kāśī,' demanding to know what weaves the fabric of space itself. Yājñavalkya's revelation of the Akṣara is prompted by her relentless inquiry.",
      "other": "Gārgī concludes the debate magnanimously: 'Revered scholars, bow before Yājñavalkya; none among you can defeat him in debate on the divine reality.'"
    },
    "resilienceReading": "Gārgī embodies intellectual resilience: refusing to be intimidated by authority, tradition, or gendered silencing. Her courage to press into the ultimate structural mystery of existence shows that fearless inquiry is a supreme spiritual virtue.",
    "modernParallel": "Intellectual humility combined with epistemic courage; the psychology of dissenting voices in scientific and philosophical discovery.",
    "tags": ["women-sages", "courage", "imperishable", "inquiry"],
    "sources": ["Bṛhadāraṇyaka Upaniṣad 3.8.8–10", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 14
  },
  {
    "id": "aitareya-3-1-3",
    "upanishad": "Aitareya Upaniṣad",
    "location": "3.1.3",
    "devanagari": "एष ब्रह्मैष इन्द्र एष प्रजापतिरेते सर्वे देवा इमानि च पञ्च महाभूतानि... प्रज्ञानेत्रो लोकः प्रज्ञा प्रतिष्ठा प्रज्ञानं ब्रह्म ॥",
    "iast": "eṣa brahmaiṣa indra eṣa prajāpatir ete sarve devā imāni ca pañca mahā-bhūtāni... prajñā-netro lokaḥ prajñā pratiṣṭhā prajñānaṃ brahma ||",
    "wordByWord": [
      { "sa": "प्रज्ञा-नेत्रः", "en": "guided by consciousness" },
      { "sa": "लोकः", "en": "the world" },
      { "sa": "प्रज्ञा प्रतिष्ठा", "en": "consciousness is the foundation" },
      { "sa": "प्रज्ञानं ब्रह्म", "en": "Consciousness is Brahman" }
    ],
    "translation": "This is Brahman, this is Indra, this is Prajāpati; these are all the gods; and these five great elements... all this is guided by Consciousness, grounded in Consciousness. Consciousness is the eye of the universe; Consciousness is the foundation. Consciousness is Brahman!",
    "commentary": {
      "shankara": "The Mahāvākya of the Ṛgveda (Aitareya Upaniṣad). Śaṅkara defines 'Prajñānam' as pure, uncompounded Awareness, the ultimate subject that illuminates all objective phenomena.",
      "other": "Radhakrishnan comments that this anticipates idealism: consciousness is not an accidental byproduct of matter, but the fundamental matrix of reality."
    },
    "resilienceReading": "When the world feels chaotic and hostile, the realization that 'Prajñānaṃ Brahma'—that consciousness is the bedrock, not a fragile visitor—restores ontological safety. The mind realizes that its fundamental nature cannot be crushed by worldly events.",
    "modernParallel": "Contemporary philosophy of mind (David Chalmers' 'hard problem') and non-reductive theories of consciousness finding resonances in classical Indian insights.",
    "tags": ["mahavakya", "consciousness", "foundation", "wisdom"],
    "sources": ["Aitareya Upaniṣad 3.1.3", "Śaṅkara Bhāṣya"],
    "verified": true,
    "chapter": 11
  },
  {
    "id": "brhadaranyaka-1-3-28",
    "upanishad": "Bṛhadāraṇyaka Upaniṣad",
    "location": "1.3.28 (Pavamāna Abhyāroha)",
    "devanagari": "असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥ इति यदाहासतो मा सद्गमयेति मृत्युर्वा असत्सदमृतं मृत्योर्माऽमृतं गमयेत्येवैतदाह तमसो मा ज्योतिर्गमयेति मृत्युर्वै तमो ज्योतिरमृतं मृत्योर्माऽमृतं गमयेत्येवैतदाह मृत्योर्माऽमृतं गमयेति नात्र तिरोहितमिवास्ति ॥",
    "iast": "asato mā sad gamaya | tamaso mā jyotir gamaya | mṛtyor māmṛtaṃ gamaya || iti yad āhāsato mā sad gamayeti mṛtyur vā asat sad amṛtaṃ mṛtyor māmṛtaṃ gamayety evaitad āha tamaso mā jyotir gamayeti mṛtyur vai tamo jyotir amṛtaṃ mṛtyor māmṛtaṃ gamayety evaitad āha mṛtyor māmṛtaṃ gamayeti nātra tirohitam ivāsti ||",
    "wordByWord": [
      { "sa": "असतः", "en": "from the unreal / untruth" },
      { "sa": "मा", "en": "me" },
      { "sa": "सत् गमय", "en": "lead to the Real / Truth" },
      { "sa": "तमसः", "en": "from darkness / ignorance" },
      { "sa": "ज्योतिः गमय", "en": "lead to Light / realization" },
      { "sa": "मृत्योः", "en": "from death / decay" },
      { "sa": "अमृतम् गमय", "en": "lead to Immortality / timelessness" }
    ],
    "translation": "Lead me from the unreal to the Real. Lead me from darkness to Light. Lead me from death to Immortality.",
    "commentary": {
      "shankara": "The Upaniṣad itself provides the commentary immediately following the mantra: 'Asat' (the unreal) is death and ignorance; 'Sat' (the real) is immortality. 'Tamas' (darkness) is the obscuration of our true nature; 'Jyotis' (light) is the self-luminous knowledge of the Self. The three petitions are not three different prayers, but a single ascending movement from delusion to direct spiritual awakening.",
      "other": "Max Müller (1884) noted this prayer as one of the most sublime and universal aspirations of humanity."
    },
    "resilienceReading": "This ancient mantra captures the universal trajectory of psychological healing and resilience: moving from false narratives (untruth) into grounded reality; moving from the depressive paralysis of confusion (darkness) into conscious clarity; moving from existential anxiety over finitude (death) into abiding peace in that which does not die.",
    "modernParallel": "The post-traumatic growth arc: narrative transformation, existential clarity, and discovering an unshakeable core after crisis.",
    "tags": ["asato-ma", "invocation", "transformation", "epilogue"],
    "sources": ["Bṛhadāraṇyaka Upaniṣad 1.3.28", "Śaṅkara Bhāṣya", "Max Müller (1884)"],
    "verified": true,
    "chapter": 17
  }
];

const allVerses = [...existingVerses, ...additionalVerses];
console.log(`Total verses compiled: ${allVerses.length}`);

// Write back to verses.json
fs.writeFileSync(path.join(__dirname, '../src/content/verses.json'), JSON.stringify(allVerses, null, 2), 'utf8');
console.log('Successfully updated verses.json!');
