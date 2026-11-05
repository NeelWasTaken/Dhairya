const fs = require('fs');
const path = require('path');

const JOURNAL_DIR = path.join(__dirname, '../src/content/journal');
if (!fs.existsSync(JOURNAL_DIR)) fs.mkdirSync(JOURNAL_DIR, { recursive: true });

const posts = [
  {
    slug: 'boy-who-argued-with-death',
    title: 'The Boy Who Argued with Death: What Nachiketa Teaches About Grief',
    date: 'October 2026',
    readingTime: '8 min read',
    tags: ['Grief', 'Existential Courage', 'Kaṭha Upaniṣad'],
    relatedChapters: [4, 17],
    relatedVerses: ['katha-1-1-2', 'katha-1-2-18', 'katha-1-3-14'],
    summary: 'When confronted by his father\'s sudden rejection and the terrifying reality of mortality, Nachiketa does not flee or collapse into denial. An inquiry into grief processing and the refusal of palliative distractions in the Kaṭha Upaniṣad.',
    viewOrigin: 'Classical interpretation based on Śaṅkara\'s Kaṭhopaniṣad Bhāṣya and Paul Deussen\'s Sixty Upanishads of the Veda (1897), analyzed through contemporary bereavement psychology (Bonanno 2004; Stroebe & Schut 1999 dual-process model).',
    limits: 'The Kaṭha narrative is an ancient spiritual initiation myth, not a substitute for clinical grief therapy. Bereaved individuals navigating traumatic loss require compassionate psychological accompaniment, not demands for instant philosophical detachment.',
    sections: [
      {
        heading: 'The Rupture: When the Father Speaks in Wrath',
        paragraphs: [
          'The story of the Kaṭha Upaniṣad begins not in an ascetic Himalayan cave, but in the domestic tension of a failed family sacrifice. Vājaśravas, seeking royal prestige and heavenly rewards, performs the Viśvajit sacrifice—a ritual that nominally demanded the renunciation of all worldly possessions. Yet the boy Nachiketa observes with searing clarity that his father is cheating the sacred: the cows being gifted to the priests are exhausted, barren, blind, and broken. "Joyless surely are the worlds to which he goes who offers these," the youth reflects.',
          'Compelled by an instinct for truth (śraddhā), Nachiketa asks his father three times: "Father, to whom will you give me?" In a flash of wounded narcissistic rage, the father snaps: "To Death (Mṛtyu) I give you!" In that single sentence, the child\'s primary developmental anchor—parental protection—is violently severed. Modern attachment theory (Bowlby 1980) identifies this sudden paternal rejection as an acute attachment trauma.',
          'How does the child process this sudden exile to the realm of Death? Nachiketa does not scream, retaliate, or disintegrate into helpless panic. He pauses in reflective interiority: "Among many I walk as the first; among many I walk as the middling. What work of Yama will my father accomplish through me today?" He recognizes transience: "Look back how our ancestors fared, look forward how others fare now. A mortal ripens like corn, and like corn is born again."'
        ]
      },
      {
        heading: 'The Three Nights at the Silent Door',
        paragraphs: [
          'Nachiketa arrives at the house of Death, only to find the god absent. He does not depart, nor does he pound hysterically on the door. He sits quietly upon the stone threshold for three days and three nights without food or water. In the ancient Indian tradition, leaving an uninvited guest unhonored brought grave spiritual ruin upon a household.',
          'Psychologically, this three-night vigil represents the necessary "liminal space" of grief. When an irrecoverable loss occurs—the death of a parent, the end of a identity, the collapse of a cherished world—the immediate reflex is either manic avoidance or desperate bargaining. Nachiketa demonstrates the counter-intuitive capacity of titikṣā (noble endurance): sitting quietly with the unbearable absence until the truth reveals itself.',
          'When Yama returns, horrified that a holy child has starved upon his stoop, he offers three boons to wipe away the transgression. The structure of these three boons charts a complete psychological trajectory: from emotional reconciliation, to practical agency, to ontological liberation.'
        ]
      },
      {
        heading: 'Refusing the Palliative Bribes of the World',
        paragraphs: [
          'The first boon is domestic healing: "May my father\'s wrath be appeased; may he recognize and welcome me with peaceful mind when I return." Nachiketa does not harbor bitter filial resentment; he resolves the relational fracture first. The second boon is the understanding of the sacred fire—the mastery of worldly action and sacrifice.',
          'It is the third boon that shatters the polite conventions of religion: "There is this doubt regarding a man when he has died: some say \'he is\', others say \'he is not\'. This I would know, taught by you. This is the third of my boons." Yama recoils. He offers Nachiketa boundless herds of cattle, golden chariots, celestial nymphs whose music cannot be equaled by mortals, centuries of life, and sovereign rule over the earth. "Ask anything else, Nachiketa, but do not compel me to reveal this."',
          'Nachiketa\'s reply is one of the grandest declarations of existential resilience in world literature: "These things endure only till tomorrow, O Death! They wear away the brightness of all the senses that a mortal possesses. Even a whole lifetime of them is short. Keep your horses, keep your dance and song! No human can ever be satisfied with wealth. Shall we hold wealth when we have seen you? The boon I ask remains that alone."'
        ]
      },
      {
        heading: 'The Discovery of What Never Dies',
        paragraphs: [
          'Because Nachiketa refused the palliative bribes of pleasure (preyas), Yama declares him worthy of the good (śreyas). Yama then unveils the supreme teaching: that which grieves and that which dies is the psycho-physical apparatus—the body and the fleeting ego-mind. But the observing consciousness within is the unborn, ancient Ātman.',
          '"The knowing self is never born, nor does it die. It sprang from nothing, and nothing sprang from it. Unborn, eternal, everlasting, this ancient one is not slain when the body is slain" (Kaṭha 1.2.18). This is not sentimental consolation; it is an ontological shift in perspective.',
          'Grief in the Upanishads is not "cured" by pretending the lost person or body never existed. It is transformed by realizing that our true ground is not a fragile particle trapped in chronological time, but the very conscious sky in which appearances rise and subside.'
        ]
      }
    ],
    sources: [
      'Kaṭha Upaniṣad, text with Śaṅkara\'s Commentary, translated by Swami Gambhirananda, Advaita Ashrama, 1980.',
      'Deussen, Paul. Sixty Upanishads of the Veda, translated by V.M. Bedekar and G.B. Palsule, Motilal Banarsidass, 1980 [1897].',
      'Bonanno, George A. "Loss, Trauma, and Human Resilience: Have We Underestimated the Human Capacity to Thrive After Extremely Aversive Events?" American Psychologist, 59(1), 2004, pp. 20–28.',
      'Bowlby, John. Attachment and Loss: Vol. 3. Loss: Sadness and Depression. Basic Books, 1980.'
    ]
  },
  {
    slug: 'fear-needs-a-second',
    title: 'Fear Needs a Second: A Psychological Reading of Bṛhadāraṇyaka 1.4.2',
    date: 'October 2026',
    readingTime: '7 min read',
    tags: ['Fear', 'Abhaya', 'Bṛhadāraṇyaka Upaniṣad', 'Non-duality'],
    relatedChapters: [3, 7],
    relatedVerses: ['brihadaranyaka-1-4-2', 'taittiriya-2-9-1'],
    summary: 'An exploration of the shortest and most radical formula of anxiety in the Vedic corpus: "dvitīyād vai bhayaṃ bhavati"—fear arises exclusively from the perception of a second.',
    viewOrigin: 'Classical Advaita hermeneutics of Śaṅkara on Bṛhadāraṇyaka 1.4.2, contrasted with cognitive-behavioral accounts of threat appraisal (Beck 1985; LeDoux 1996).',
    limits: 'Evolutionary fear (flight from predators, physical threats) is an adaptive biological defense mechanism. Upanishadic abhaya addresses existential and psychological anxiety born of alienation, not somatic reflexes necessary for survival.',
    sections: [
      {
        heading: 'The Primordial Shiver: Alone in the Void',
        paragraphs: [
          'In the creation narrative of the Bṛhadāraṇyaka Upaniṣad (1.4.1–2), the primordial being (identified as Virāj or the cosmic Self) looks around and sees nothing other than itself. Its first utterance is: "Aham asmīti"—"I am." From this spontaneous self-recognition, the universe of names and forms unfolds.',
          'Yet immediately thereafter, an inexplicable emotion ripples across the cosmic consciousness: "He was afraid; therefore anyone who is lonely is afraid." But then the primordial being reflects: "Since there is nothing other than myself, of what am I afraid?" Thereupon his fear departed, for of what could he be afraid? The Upanishad concludes with the razor-sharp dictum: "Dvitīyād vai bhayaṃ bhavati"—"Verily, fear arises only from a second."'
        ]
      },
      {
        heading: 'The Epistemology of Threat',
        paragraphs: [
          'Consider what is required for fear to occur in human experience. You cannot fear that which is identical with yourself. You do not fear your own left hand, nor do you fear the breath circulating in your own lungs, because you experience them as non-separate.',
          'Fear requires an ontological duality: a "me" inside the skin, and an "other" outside the skin that has the capacity to injure, humiliate, diminish, or destroy me. Modern cognitive psychologist Aaron Beck defined anxiety as a perceived mismatch between threat severity and personal coping resources. But the Upanishad goes vastly deeper than resource estimation: it identifies the primary root of anxiety as the very boundary that establishes the "other".'
        ]
      },
      {
        heading: 'From Duality to Abhaya (Fearlessness)',
        paragraphs: [
          'In Taittirīya Upaniṣad 2.7.1, the sage warns: "Whenever one creates even the slightest fissure or difference (udaram antaram) in this Self, there is fear for him." The moment the ego asserts: "I am this finite bundle of memories and flesh, and the world is an alien force threatening my survival," fear becomes the permanent subterranean tone of existence.',
          'Resilience in the Western lexicon often means building a stronger armor against the hostile other. In the Upanishadic paradigm, true resilience is not thick armor; it is the radical realization that there is no hostile other in the ultimate ground. When the seer recognizes all beings in the Self and the Self in all beings, "tato na vijugupsate"—from that realization, he shrinks away from nothing (Īśā Upaniṣad 6).'
        ]
      }
    ],
    sources: [
      'Bṛhadāraṇyaka Upaniṣad, with Commentary of Śaṅkarācārya, translated by Swami Madhavananda, Advaita Ashrama, 1950.',
      'Radhakrishnan, S. The Principal Upanisads. George Allen & Unwin, 1953.',
      'Beck, Aaron T., and Emery, Gary. Anxiety Disorders and Phobias: A Cognitive Perspective. Basic Books, 1985.',
      'LeDoux, Joseph. The Emotional Brain: The Mysterious Underpinnings of Emotional Life. Simon & Schuster, 1996.'
    ]
  },
  {
    slug: 'chariot-horses-reins-self-regulation',
    title: 'Chariot, Horses, Reins: The Oldest Model of Self-Regulation?',
    date: 'October 2026',
    readingTime: '9 min read',
    tags: ['Self-regulation', 'Executive Function', 'Kaṭha Upaniṣad', 'Cognitive Science'],
    relatedChapters: [5, 12],
    relatedVerses: ['katha-1-3-3', 'katha-1-3-4', 'katha-1-3-9'],
    summary: 'A detailed examination of Kaṭha Upaniṣad 1.3.3–9 as a pioneering hierarchical architecture of executive cognitive control, and a cautious scholarly comparison with Plato\'s Phaedrus.',
    viewOrigin: 'Classical Vedantic psychology via Śaṅkara and Madhva, analyzed alongside contemporary neuropsychological models of prefrontal executive control (Miller & Cohen 2001; Baddeley 2000).',
    limits: 'Do not claim the Kaṭha Upaniṣad "anticipated neuroscience." The chariot is a moral and metaphysical allegory of spiritual liberation, not an empirical neurological hypothesis. Plato\'s parallel in Phaedrus is examined as an instructive philosophical comparison, not historical dependence.',
    sections: [
      {
        heading: 'The Five-Part Architecture',
        paragraphs: [
          'In Kaṭha Upaniṣad 1.3.3–4, Yama provides Nachiketa with a structural blueprint of human embodiment that remains one of the clearest cognitive metaphors in global intellectual history:',
          '"Know the Self (Ātman) as the lord of the chariot (rathinam), and the body (śarīra) as the chariot. Know the intellect (buddhi) as the charioteer (sārathi), and the mind (manas) as the reins (pragraha). The senses (indriyas), they call the horses; the objects of desire (viṣayas) are the roads they traverse."',
          'Notice the hierarchical direction of command. The true master of the journey is not the driver, nor the horses, but the quiet, unmoving passenger in the rear carriage: the Ātman. The intellect (buddhi) is the executive decision-maker holding the reins of sensory attention (manas). When the intellect is asleep or intoxicated, the reins slacken, and the powerful sensory stallions bolt toward the roadside ditch.'
        ]
      },
      {
        heading: 'Modern Executive Function Parallels',
        paragraphs: [
          'In contemporary neuropsychology, executive function (located largely in the prefrontal cortex) encompasses working memory, cognitive flexibility, and inhibitory control (Diamond 2013). The Kaṭha metaphor mirrors this architecture with uncanny functional precision:',
          'The senses (indriyas) correspond to bottom-up sensory impulses and amygdaloid appetites. The mind (manas) corresponds to sensory gating and attention. The intellect (buddhi) corresponds to top-down cognitive governance—the capacity to inhibit an impulse in service of a long-term goal (śreyas).',
          'Importantly, Yama does not advocate shooting or starving the horses. A chariot with dead horses cannot move anywhere. Sensation, passion, and vitality are essential fuel for human life; resilience consists in their intelligent, calibrated governance by a clear and awake intellect.'
        ]
      },
      {
        heading: 'Comparison: Kaṭha and Plato\'s Phaedrus',
        paragraphs: [
          'Roughly a century or two after the Kaṭha\'s compilation, Plato composed the Phaedrus (246a–254e), featuring his famous chariot allegory. While both traditions employ the chariot, their metaphysical assumptions diverge sharply:',
          'Plato describes a charioteer driving two horses: one noble, white, and aspiring toward heaven (thumos / moral courage); the other dark, unruly, and dragging the carriage toward base earthly appetites (epithumia). The soul in Plato is the composite triad of driver and horses.',
          'In the Kaṭha, however, the soul (Ātman) is neither the driver nor the horses. The Ātman is the unmoving passenger who does not act, does not struggle, and does not sweat. The drama of self-regulation belongs entirely to the instrumentation of nature (Prakṛti). This realization provides profound emotional relief: you are not the exhausted driver fighting the horses; you are the silent owner of the carriage in whose luminous presence the journey unfolds.'
        ]
      }
    ],
    sources: [
      'Kaṭha Upaniṣad with the Commentary of Śaṅkara, translated by Swami Gambhirananda, Advaita Ashrama, 1980.',
      'Plato. Phaedrus, translated by Alexander Nehamas and Paul Woodruff, Hackett Publishing, 1995.',
      'Diamond, Adele. "Executive Functions." Annual Review of Psychology, 64, 2013, pp. 135–168.',
      'Miller, Earl K., and Cohen, Jonathan D. "An Integrative Theory of Prefrontal Cortex Function." Annual Review of Neuroscience, 24(1), 2001, pp. 167–202.'
    ]
  },
  {
    slug: 'tarati-shokam-bypassing',
    title: 'Is "Tarati śokam ātmavit" Spiritual Bypassing? An Honest Look',
    date: 'October 2026',
    readingTime: '8 min read',
    tags: ['Grief', 'Spiritual Bypassing', 'Chāndogya Upaniṣad', 'Critical Psychology'],
    relatedChapters: [6, 16],
    relatedVerses: ['chandogya-7-1-3', 'isha-7'],
    summary: 'A critical interrogation of Chāndogya Upaniṣad 7.1.3 ("The knower of the Self crosses over sorrow"). Does claiming oneness invalidate somatic human pain? Examining John Welwood\'s concept of spiritual bypassing alongside ancient Vedantic texts.',
    viewOrigin: 'Critical contemporary synthesis engaging John Welwood (1984), Robert Augustus Masters (2010), and classical Advaita commentaries by Śaṅkara and Ānandagiri.',
    limits: 'Upanishadic teachings were composed for prepared contemplatives under rigorous guru-śiṣya supervision, not as pop-psychology slogans to brush aside clinical trauma, structural oppression, or medical depression.',
    sections: [
      {
        heading: 'Nārada\'s Confession: The Agony of the Polymath',
        paragraphs: [
          'In Chāndogya Upaniṣad 7.1, the sage Nārada approaches Sanatkumāra. Nārada is not an ignorant peasant; he lists his credentials: the Ṛgveda, Yajurveda, Sāmaveda, Atharvaveda, history, grammar, mathematics, astronomy, logic, politics, and the fine arts. Yet despite this astonishing polymathic intellect, Nārada weeps:',
          '"So \'haṃ bhagavo mantravid evāsmi nātmarvit... śocāmi bhagavaḥ taṃ mā bhagavāñ chokasya pāraṃ tārayatv iti." — "I am merely a knower of sacred words, venerable sir, not a knower of the Self. I am in deep sorrow. Pray, venerable sir, ferry me across this sea of grief."',
          'Sanatkumāra does not dismiss Nārada\'s pain. He replies honestly: "Whatever you have studied is merely name (nāma eva etat)." Information, mastery of concepts, and cultural prestige cannot heal the existential fracture of human isolation.'
        ]
      },
      {
        heading: 'The Hazard of Spiritual Bypassing',
        paragraphs: [
          'In 1984, Buddhist psychologist John Welwood coined the term "spiritual bypassing" to describe the tendency to use spiritual ideas and practices to sidestep or avoid unresolved emotional wounds, psychological deficits, and relational difficulties.',
          'In modern spiritual circles, the Upanishadic phrase "tarati śokam ātmavit" (the knower of the Self crosses over sorrow) is frequently weaponized as toxic positivity. When someone experiences grief, divorce, physical disability, or clinical depression, pseudo-advaitins often retort: "Why are you sad? You are the immortal Atman! Pain is an illusion (māyā)!"',
          'This is not enlightenment; it is dissociative intellectual defense. It represses the emotional sheath (Manomaya kosha) under an abstract conceptual dogma, leading to emotional deadness and somatic fragmentation.'
        ]
      },
      {
        heading: 'How the Upanishad Actually Crosses Sorrow',
        paragraphs: [
          'Sanatkumāra does not tell Nārada to snap his fingers and pretend grief is unreal. He walks him through a rigorous, seventeen-step pedagogical ladder: from speech, to mind, to will, to thought, to meditation, to understanding, to vital energy (prāṇa), until arriving at Bhūmā—the Infinite.',
          '"Yo vai bhūmā tat sukham, nālpe sukham asti" — "That which is the Infinite is bliss; there is no joy in the finite" (Chāndogya 7.23.1). Sorrow in the Upanishad is not erased by dissociation; it is outgrown by expanding the horizon of identity.',
          'True spiritual resilience does not invalidate grief. It provides a container vast enough to hold grief without collapsing into despair. The ground does not run away from the rain; it drinks the rain and remains the ground.'
        ]
      }
    ],
    sources: [
      'Chāndogya Upaniṣad with the Commentary of Śaṅkara, translated by Swami Gambhirananda, Advaita Ashrama, 1983.',
      'Welwood, John. "Principles of Inner Work: Psychological and Spiritual." Journal of Transpersonal Psychology, 16(1), 1984, pp. 63–73.',
      'Masters, Robert Augustus. Spiritual Bypassing: When Spirituality Disconnects Us from What Really Matters. North Atlantic Books, 2010.'
    ]
  },
  {
    slug: 'two-birds-witness-mindfulness',
    title: 'Two Birds on One Tree: Witness Consciousness and Modern Mindfulness',
    date: 'October 2026',
    readingTime: '8 min read',
    tags: ['Witness', 'Mindfulness', 'Muṇḍaka Upaniṣad', 'Metacognition'],
    relatedChapters: [10, 15],
    relatedVerses: ['mundaka-3-1-1', 'mundaka-3-1-2'],
    summary: 'An exploration of Muṇḍaka 3.1.1–2 (the two birds of the soul) and its parallels with contemporary metacognition and Mindfulness-Based Stress Reduction (MBSR), along with key epistemological differences.',
    viewOrigin: 'Classical hermeneutics of Muṇḍaka Upaniṣad by Śaṅkara and Madhva, compared with Jon Kabat-Zinn\'s MBSR clinical framework and metacognitive therapy (Wells 2009).',
    limits: 'MBSR is a secularized clinical intervention calibrated for stress reduction and emotional regulation. The Upanishadic Sākṣī is an ontological discovery aimed at absolute liberation (mokṣa), not merely a stress-coping skill.',
    sections: [
      {
        heading: 'The Ancient Allegory: Tasting and Watching',
        paragraphs: [
          'In Muṇḍaka Upaniṣad 3.1.1 (and Śvetāśvatara 4.6), one finds one of the most celebrated poetic allegories of human divided consciousness:',
          '"Dvā suparṇā sayujā sakhāyā samānaṃ vṛkṣaṃ pariṣasvajāte | tayor anyaḥ pippalaṃ svādv atty anaśnann anyo abhicākaśīti ||"',
          '"Two birds, closely united companions, cling to the selfsame tree. Of these two, one eats the sweet fruit, while the other looks on in witness without eating."'
        ]
      },
      {
        heading: 'The Eating Bird and the Witness Bird',
        paragraphs: [
          'The lower bird is the empirical ego (jīva). It pecks furiously at the berries of life: some are sweet (success, praise, love); others are bitter (criticism, grief, sickness). In Muṇḍaka 3.1.2, the Upanishad observes: "Immersed in the selfsame tree, the individual grieves, helpless and deluded." When tasting a bitter berry, it falls into despair; when tasting a sweet berry, it is consumed by the anxiety of running out.',
          'The upper bird is the silent witness (Sākṣī / Ātman). It does not taste. It does not peck. It watches the tree, the berries, and the lower bird with luminous, unruffled serenity. When the lower bird looks up and discovers its companion—realizing that its true identity was the witness all along—"vitav-śokaḥ"—its grief vanishes.'
        ]
      },
      {
        heading: 'Mindfulness vs. Ontological Realization',
        paragraphs: [
          'Modern mindfulness practices (Kabat-Zinn 1990) cultivate "decentering" or metacognitive awareness: observing thoughts, bodily sensations, and emotional surges without reactive judgment.',
          'While the psychological benefits of mindfulness are verified by hundreds of clinical trials, the Upanishadic view makes an ontological claim rather than a behavioral one: the witness is not a technique you practice for twenty minutes on a cushion; it is what you already are before the first thought appears.',
          'Resilience is recognizing: "I am having an experience of anxiety, but I am not the anxiety; I am the vast, untouched space in which anxiety appears and passes away."'
        ]
      }
    ],
    sources: [
      'Muṇḍaka Upaniṣad with the Commentary of Śaṅkara, translated by Swami Gambhirananda, Advaita Ashrama, 1982.',
      'Kabat-Zinn, Jon. Full Catastrophe Living: Using the Wisdom of Your Body and Mind to Face Stress, Pain, and Illness. Delacorte, 1990.',
      'Wells, Adrian. Metacognitive Therapy for Anxiety and Depression. Guilford Press, 2009.'
    ]
  },
  {
    slug: 'maitreyi-question-immortality',
    title: 'Maitreyī\'s Question: What Will Make Me Immortal?',
    date: 'October 2026',
    readingTime: '7 min read',
    tags: ['Women Sages', 'Values', 'Bṛhadāraṇyaka Upaniṣad', 'Immortality'],
    relatedChapters: [14, 2],
    relatedVerses: ['brihadaranyaka-2-4-5'],
    summary: 'When offered worldly wealth and estate upon her husband\'s retirement, Maitreyī cuts through materialism with a single question: "What should I do with that which will not make me immortal?"',
    viewOrigin: 'Bṛhadāraṇyaka Upaniṣad 2.4 & 4.5, drawing on commentary by Sureśvara (Vārttika) and contemporary gender historiography of ancient Indian philosophy (Chakravarti 1989; Olivelle 1998).',
    limits: 'Maitreyī lived in an ancient elite patriarchal context; her dialogue does not imply widespread gender egalitarianism across historical Vedic society.',
    sections: [
      {
        heading: 'The Division of Estate',
        paragraphs: [
          'In Bṛhadāraṇyaka Upaniṣad 2.4, the great sage Yājñavalkya announces to his wife Maitreyī that he is renouncing domestic life to enter the forest as a wandering mendicant (parivrājaka). He proposes to formally divide his estate and cattle between her and his other wife, Kātyāyanī.',
          'Kātyāyanī, the text notes, possessed only the ordinary practical concerns of householders. But Maitreyī was a "brahmavādinī"—a woman engaged in metaphysical inquiry. Instead of accepting the gold and property, she pauses and asks a fundamental question:',
          '"Yan nu ma iyaṃ bhagoḥ sarvā pṛthivī vittena pūrṇā syāt kathaṃ tenāmṛtā syām iti" — "Venerable sir, if this entire earth filled with boundless wealth were mine, could I become immortal through it?"'
        ]
      },
      {
        heading: 'The Illusion of Financial Security',
        paragraphs: [
          'Yājñavalkya answers with uncompromising honesty: "No. Your life would be just like the life of people of means. But of immortality, there is no hope through wealth (amṛtatvasya tu nāśāsti vittena).',
          'Maitreyī\'s famous rejoinder echoes across three millennia: "Yenāhaṃ nāmṛtā syāṃ kim ahaṃ tena kuryām" — "What should I do with that by which I cannot become immortal? Tell me, venerable sir, only that which you know of liberation."',
          'Maitreyī anticipates what contemporary behavioral economists call the "hedonic treadmill" (Brickman & Campbell 1971): the accumulation of material assets raises transient comfort, but leaves the existential core completely vulnerable to death, loss, and sickness.'
        ]
      },
      {
        heading: 'The Locus of Love and Value',
        paragraphs: [
          'Yājñavalkya, overjoyed by her philosophical discernment, delivers the famous discourse on love: "Verily, not for the sake of the husband is the husband dear, but for the sake of the Self (Ātman) is the husband dear... Not for the sake of wealth is wealth dear, but for the sake of the Self is wealth dear."',
          'This is often misunderstood as callous solipsism. In truth, it is the highest psychology of connection: we do not love others merely as external consumer objects; we love them because the same divine, undivided consciousness shines through both lover and beloved.',
          'Resilience is recognizing that true security is not stored in bank accounts, real estate, or social reputation. It is anchored in the indestructible Self.'
        ]
      }
    ],
    sources: [
      'Bṛhadāraṇyaka Upaniṣad with the Commentary of Śaṅkarācārya, translated by Swami Madhavananda, Advaita Ashrama, 1950.',
      'Olivelle, Patrick. The Early Upanisads: Annotated Text and Translation. Oxford University Press, 1998.',
      'Chakravarti, Uma. "The Social Philosophy of the Early Buddhist and Brahmanical Traditions." Economic and Political Weekly, 1989.',
      'Brickman, Philip, and Campbell, Donald T. "Hedonic Relativism and Planning the Good Society." Adaptation-Level Theory, Academic Press, 1971.'
    ]
  },
  {
    slug: 'panchakosha-burnout-five-layers',
    title: 'Panchakosha for Burnout: Five Layers, Five Practices',
    date: 'October 2026',
    readingTime: '9 min read',
    tags: ['Burnout', 'Panchakosha', 'Taittirīya Upaniṣad', 'Practice'],
    relatedChapters: [9, 15],
    relatedVerses: ['taittiriya-2-1', 'taittiriya-2-2-5'],
    summary: 'A contemplative analysis of Taittirīya Upaniṣad\'s Panchakosha (five sheaths) framework as an educational diagnostic for modern occupational burnout and somatic exhaustion.',
    viewOrigin: 'Taittirīya Upaniṣad Brahmānanda Vallī, structured around Śaṅkara\'s commentary, adapted non-clinically as an educational self-reflection framework (Maslach 2001; Freudenberger 1974).',
    limits: 'Educational and philosophical exploration only. Not a medical treatment for clinical depression, chronic fatigue syndrome, or occupational exhaustion.',
    sections: [
      {
        heading: 'The Five Sheaths of Human Embodiment',
        paragraphs: [
          'In Taittirīya Upaniṣad 2.1–5, the human organism is described not as a single solid block, but as five concentric layers or "sheaths" (koshas) nested within one another like russian matryoshka dolls:',
          '1. Annamaya kosha: the physical sheath formed of food and nutrition.\n2. Prāṇamaya kosha: the vital energy sheath of breath and autonomic circulation.\n3. Manomaya kosha: the mental-emotional sheath of sensory perception, desires, and reactive feelings.\n4. Vijñānamaya kosha: the wisdom sheath of intellect, discernment, and ethical orientation.\n5. Ānandamaya kosha: the bliss sheath of deep experiential peace and wholeness.',
          'Suffering occurs when identity gets "glued" to a single outer sheath. Burnout in modern life is almost always a collapse across multiple koshas misdiagnosed as merely "having too many emails."'
        ]
      },
      {
        heading: 'Mapping Burnout Across the Koshas',
        paragraphs: [
          'Layer 1 (Annamaya): Chronic muscle tension, poor sleep, digestive distress, adrenal exhaustion. The practice: radical rest, nourishing diet, grounding contact with the earth.',
          'Layer 2 (Prāṇamaya): Shallow chest breathing, sympathetic nervous system hyperarousal, depletion of vitality. The practice: conscious diaphragmatic pranayama, 4-in / 6-out breath pacing.',
          'Layer 3 (Manomaya): Emotional irritability, cynicism, doom-scrolling, mental churn. The practice: sensory fasting, nature walks, conscious pause before reactive responses.',
          'Layer 4 (Vijñānamaya): Loss of meaning, alienation from values, feelings of futility. The practice: philosophical self-inquiry (viveka), realigning work with enduring purpose.',
          'Layer 5 (Ānandamaya): Disconnection from the silent ground of wholeness. The practice: meditation on the witness (sākṣī), resting in pure awareness.'
        ]
      },
      {
        heading: 'The Unshaken Center',
        paragraphs: [
          'The crowning realization of the Taittirīya model is that the Ātman is not any of the five sheaths. The Self is that which observes all five sheaths.',
          'When your body is fatigued, you can say: "My Annamaya sheath is tired, but the witness of fatigue is not tired." When your mind is anxious, you can say: "The emotional weather in the Manomaya sheath is stormy, but the sky in which the storm rages remains unhurt."',
          'This dis-identification is the supreme technology of resilience: holding the wounded layer with compassion without confusing it with your ultimate reality.'
        ]
      }
    ],
    sources: [
      'Taittirīya Upaniṣad with the Commentary of Śaṅkara, translated by Swami Gambhirananda, Advaita Ashrama, 1980.',
      'Maslach, Christina, Schaufeli, Wilmar B., and Leiter, Michael P. "Job Burnout." Annual Review of Psychology, 52(1), 2001, pp. 397–422.',
      'Freudenberger, Herbert J. "Staff Burn-Out." Journal of Social Issues, 30(1), 1974, pp. 159–165.'
    ]
  },
  {
    slug: 'gargi-courageous-questions',
    title: 'What Gārgī Teaches About Asking Questions That Make Powerful People Uncomfortable',
    date: 'October 2026',
    readingTime: '8 min read',
    tags: ['Women Sages', 'Intellectual Courage', 'Bṛhadāraṇyaka Upaniṣad'],
    relatedChapters: [14, 2],
    relatedVerses: ['brihadaranyaka-2-4-5'],
    summary: 'The dramatic confrontation between Gārgī Vācaknavī and Yājñavalkya in the court of King Janaka: an analysis of dialectical bravery, epistemological boundaries, and questioning authority.',
    viewOrigin: 'Bṛhadāraṇyaka Upaniṣad 3.6 and 3.8, interpreted through historical Indology (Olivelle 1998) and feminist epistemology (Code 1991).',
    limits: 'The text preserves an ancient courtly dialectic; caution is warranted against reading modern twentieth-century feminist political theory uncritically into ancient Sanskrit dialogues.',
    sections: [
      {
        heading: 'The Royal Arena of Janaka',
        paragraphs: [
          'King Janaka of Videha convenes the greatest assembly of Vedic scholars in northern India. He corrals a thousand cows, each horn adorned with ten pieces of pure gold, and declares: "Whoever among you venerable Brahmins is the most erudite philosopher may drive these cows home."',
          'Before any debate can commence, the arrogant Yājñavalkya commands his disciple: "Sāmaśravas, my son, drive these cows to our hermitage!" The assembly erupts in fury. One after another, the royal priests step forward to cross-examine Yājñavalkya: Aśvala the sacrificial priest, Ārtabhāga, Bhujyu, Uṣasta, Kahola. Yājñavalkya demolishes each in turn with razor-sharp scholastic rebuttal.',
          'Then, stepping out from the silent ranks of men, stands Gārgī Vācaknavī.'
        ]
      },
      {
        heading: 'Warp and Woof: Pressing to the Cosmological Wall',
        paragraphs: [
          'Gārgī does not ask theological trivialities. She begins a relentless regress of cosmic foundations: "Yājñavalkya, since all this earth is woven warp and woof on water, upon what is water woven warp and woof?"',
          '"On air, Gārgī."\n"Upon what is air woven?"\n"On the sky, Gārgī."\n"Upon what is the sky woven?"\n"On the worlds of the Gandharvas, Gārgī."\n"Upon what are the Gandharvas woven?"\n"On the sun... on the moon... on the stars... on the gods... on the worlds of Prajāpati... on the worlds of Brahman, Gārgī."',
          'Then Gārgī asks the question that shocks the court: "Upon what, Yājñavalkya, are the worlds of Brahman woven warp and woof?" Yājñavalkya snaps: "Gārgī, do not push inquiry too far, lest your head burst! You are questioning about a deity that cannot be questioned about." Gārgī falls silent. But she is not defeated.'
        ]
      },
      {
        heading: 'The Second Attack: The Two Arrows',
        paragraphs: [
          'In Bṛhadāraṇyaka 3.8, Gārgī rises a second time. She addresses the assembly: "Revered Brahmins, I shall ask this man two questions. If he answers them, not one of you can ever defeat him in debate."',
          'She turns to Yājñavalkya with martial imagery: "Like a fierce warrior of Kāśī or Videha stringing his unbent bow and holding two arrows in hand, I stand before you with two questions. Answer them!"',
          'Her questions extract from Yājñavalkya the crown jewel of the Upanishad: the description of the Akṣara (the Imperishable) that is unseen yet the seer, unheard yet the hearer, unthought yet the thinker. Gārgī then turns to the assembly and declares magnanimously: "You should bow before him; no one among you will ever defeat him." She possesses the intellectual integrity to acknowledge supreme truth when she hears it.'
        ]
      }
    ],
    sources: [
      'Bṛhadāraṇyaka Upaniṣad with the Commentary of Śaṅkara, translated by Swami Madhavananda, Advaita Ashrama, 1950.',
      'Olivelle, Patrick. The Early Upanisads. Oxford University Press, 1998.',
      'Code, Lorraine. What Can She Know? Feminist Theory and the Construction of Knowledge. Cornell University Press, 1991.'
    ]
  },
  {
    slug: 'translation-traps-one-word',
    title: 'Translation Traps: How One Word Changes the Upanishads',
    date: 'October 2026',
    readingTime: '9 min read',
    tags: ['Translation', 'Hermeneutics', 'Philology', 'Comparative Philosophy'],
    relatedChapters: [2, 16],
    relatedVerses: ['chandogya-6-8-7', 'katha-1-2-1'],
    summary: 'A philological investigation of critical Sanskrit terms—ātman, brahman, śreyas/preyas, tapas, śraddhā—and how competing English translations alter the psychological meaning of the texts.',
    viewOrigin: 'Comparative philological study analyzing Max Müller (1879), Paul Deussen (1897), S. Radhakrishnan (1953), and Patrick Olivelle (1998).',
    limits: 'Translation between ancient Sanskrit and modern English inevitably loses tonal nuances; every translation is an act of interpretation that reflects the philosophical commitments of the translator.',
    sections: [
      {
        heading: 'The Danger of the Western Lens',
        paragraphs: [
          'When nineteenth-century European scholars first translated the Upanishads into German and English, they carried theological and philosophical presuppositions that fundamentally warped the texts. Terms rooted in empirical contemplative psychology were translated into Christian theological categories.',
          'Perhaps the most disastrous example is the translation of Ātman as "Soul." In Western Abrahamic theology, the soul is a created, finite entity unique to each individual that can be judged, damned, or saved. In the Upanishads, Ātman is uncreated, infinite, universal consciousness. Translating Ātman as "soul" leads readers to believe the Upanishads promote narcissistic ego-preservation rather than ego-transcendence.'
        ]
      },
      {
        heading: 'Comparing Five Critical Terms',
        paragraphs: [
          '1. Śraddhā: Often translated as "faith." In Christianity, faith frequently denotes believing in dogma without evidence (fides). In the Upanishads, Śaṅkara defines śraddhā as "astikya-buddhi"—a posture of open, rigorous conviction that truth exists and can be directly verified through inquiry. It is closer to the "working hypothesis" of a scientist than blind belief.\n\n2. Tapas: Frequently translated as "penance" or "mortification," conjuring images of flagellation and guilt. In Sanskrit, tapas literally means "heat" or "incandescence"—the concentrated thermal energy of disciplined focus.\n\n3. Śreyas vs Preyas: Often translated as "Good vs Evil." But preyas is not evil; it is merely that which is immediately pleasurable and agreeable (priya). Śreyas is that which leads to lasting flourishing and liberation.\n\n4. Brahman: Translated by Müller as "God" or "Lord." But Brahman derives from the root bṛh (to expand, to swell). It is not a bearded patriarch in heaven, but the infinite, boundless field of existence itself.\n\n5. Māyā: Translated as "illusion" or "delusion," leading Western critics to dismiss Advaita as world-denying nihilism. In classical texts, māyā denotes "that which cannot be categorized as either real or unreal" (anirvacanīya)—the creative, fluctuating appearance of relativity.'
        ]
      },
      {
        heading: 'Translating for Resilience',
        paragraphs: [
          'When we recover the authentic psychological meanings of these words, the Upanishads cease to be obscure mystical poetry and reveal themselves as precision manuals of human resilience.',
          'Resilience is not asking a distant deity for rescue; it is stoking the tapas of attention, cultivating the viveka of discernment, and realizing that your fundamental ground is the boundless, undying Brahman.'
        ]
      }
    ],
    sources: [
      'Müller, F. Max. The Upanishads. Sacred Books of the East, Vols. 1 & 15. Oxford University Press, 1879/1884.',
      'Deussen, Paul. The Philosophy of the Upanishads. T&T Clark, 1906.',
      'Olivelle, Patrick. The Early Upanisads. Oxford University Press, 1998.',
      'Radhakrishnan, S. The Principal Upanisads. George Allen & Unwin, 1953.'
    ]
  },
  {
    slug: 'upanishads-vs-modern-psychology',
    title: 'Upanishads vs. Modern Psychology: Where They Agree, Where They Don\'t',
    date: 'October 2026',
    readingTime: '10 min read',
    tags: ['Comparison', 'Psychology', 'Cognitive Science', 'Philosophy of Mind'],
    relatedChapters: [1, 16],
    relatedVerses: ['katha-1-3-3', 'brihadaranyaka-1-4-2'],
    summary: 'A rigorous comparative dialogue between ancient Vedic contemplative philosophy and contemporary clinical/cognitive psychology. Mapping intersections in cognitive defusion, resilience, and emotional regulation, while marking firm epistemological divergences.',
    viewOrigin: 'Dialogue between contemporary cognitive science (Masten 2001; Hayes et al. 1999 ACT; Frankl 1946) and classical Upanishadic commentaries (Advaita / Viśiṣṭādvaita).',
    limits: 'Avoid anachronistic claims of "scientific anticipation." The Upanishads pursued spiritual liberation (mokṣa) in a pre-modern metaphysical framework; modern psychology pursues functional adaptation within an empirical, secular, and materialist paradigm.',
    sections: [
      {
        heading: 'Points of Remarkable Convergence',
        paragraphs: [
          '1. Cognitive Defusion (ACT): Acceptance and Commitment Therapy (Hayes et al. 1999) teaches clients to observe thoughts as mental events rather than literal truths ("I am having the thought that I am a failure" rather than "I am a failure"). This mirrors the Upanishadic practice of Sākṣī-bhāva (witnessing the mind without identification).\n\n2. Resilience as Ordinary Adaptation: Ann Masten\'s landmark paper "Ordinary Magic" (2001) demonstrated that resilience is not a rare heroic mutation, but normative human adaptive machinery. The Upanishads agree: wholeness (Pūrṇatva) is your original nature, not an artificial skill you must manufacture.\n\n3. Meaning-Making (Frankl): Viktor Frankl\'s logotherapy demonstrated that suffering ceases to cause existential collapse the moment it finds a transcendent purpose. Nachiketa\'s refusal of comfort in service of ultimate truth embodies this principle.'
        ]
      },
      {
        heading: 'Critical Divergences and Disagreements',
        paragraphs: [
          '1. The Nature of Consciousness: Modern neuroscience overwhelmingly views consciousness as an emergent property of neurobiological computation. The Upanishads view consciousness as the primary, uncreated ontological ground of the universe, with the brain acting as an instrument or antenna.\n\n2. The Goal of Life: Modern clinical psychology aims for functional ego-strength, interpersonal adaptation, and symptom reduction within society. The Upanishads aim for Mokṣa—the radical dissolution of the separate egoic identity in universal reality.\n\n3. Methodology: Modern psychology relies on third-person empirical randomized controlled trials (RCTs). The Upanishads rely on rigorous first-person phenomenological inquiry verified through direct experiential realization (anubhūti) guided by scripture.'
        ]
      },
      {
        heading: 'A Mutual Enrichment',
        paragraphs: [
          'Neither tradition renders the other obsolete. Modern psychology provides essential clinical tools for repairing broken attachment styles, healing developmental trauma, and stabilizing neurochemical imbalances.',
          'The Upanishads provide the missing ontological ceiling: answering the existential question of who is doing the healing, and revealing an unshakeable ground of peace that no circumstantial tragedy can extinguish.'
        ]
      }
    ],
    sources: [
      'Masten, Ann S. "Ordinary Magic: Resilience Processes in Development." American Psychologist, 56(3), 2001, pp. 227–238.',
      'Hayes, Steven C., Strosahl, Kirk D., and Wilson, Kelly G. Acceptance and Commitment Therapy: An Experiential Approach to Behavior Change. Guilford Press, 1999.',
      'Frankl, Viktor E. Man\'s Search for Meaning. Beacon Press, 1959 [1946].',
      'Rao, K. Ramakrishna, and Paranjpe, Anand C. Psychology in the Indian Tradition. Springer, 2016.'
    ]
  },
  {
    slug: 'seven-day-upanishadic-reset',
    title: 'A 7-Day Upanishadic Reset (Educational, Not Therapy)',
    date: 'October 2026',
    readingTime: '9 min read',
    tags: ['Practice', 'Daily Reset', 'Contemplation', 'Education'],
    relatedChapters: [15, 0],
    relatedVerses: ['taittiriya-2-9-1', 'katha-1-3-14', 'chandogya-6-8-7'],
    summary: 'A structured, 7-day contemplative exploration applying Upanishadic principles to daily attention, somatic grounding, cognitive discernment, and silent reflection. Educational only.',
    viewOrigin: 'Classical Vedantic pedagogical structure: Śravaṇa (attentive listening), Manana (rational reflection), and Nididhyāsana (experiential integration), adapted for contemporary personal study.',
    limits: 'Educational contemplative guide only. Not clinical mental health therapy or treatment for psychiatric disorders. If experiencing acute distress, seek qualified medical support.',
    sections: [
      {
        heading: 'Structure of the Reset',
        paragraphs: [
          'This 7-day reset offers an invitation to pause the relentless acceleration of contemporary digital life and explore the contemplative technologies of the Upanishads. Each day pairs a verified Sanskrit mantra, a reflective inquiry, and a gentle micro-practice.',
          'Remember: do not rush. The Upanishads are meant to be tasted slowly, like water sipped from a mountain spring.'
        ]
      },
      {
        heading: 'The Daily Pathway',
        paragraphs: [
          'Day 1: Saha Nāvavatu (The Container of Safety)\n• Verse: Taittirīya Śānti Pāṭha\n• Focus: Before solving any crisis, establish shared ontological safety with those around you. Practice non-adversarial dialogue.\n\nDay 2: Abhaya (Fear Needs a Second)\n• Verse: Bṛhadāraṇyaka 1.4.2\n• Focus: Notice where you perceive an "other" today. Can you recognize the shared consciousness behind the person who irritates you?\n\nDay 3: The Charioteer Awakes (Executive Mastery)\n• Verse: Kaṭha 1.3.3\n• Focus: Observe the sensory horses of your smartphone and appetites. Hand the reins back to your quiet intellect (buddhi).\n\nDay 4: Titikṣā (Patience Without Resentment)\n• Verse: Bṛhadāraṇyaka 4.4.23\n• Focus: When delayed in traffic or encountering an inconvenience, practice dropping the inner complaint. Endure with majestic calm.\n\nDay 5: Tat Tvam Asi (Identity That Doesn\'t Break)\n• Verse: Chāndogya 6.8.7\n• Focus: Notice the difference between your temporary social roles (employee, parent, consumer) and the silent awareness that witnesses them.\n\nDay 6: The Witness Bird (Watching Without Tasting)\n• Verse: Muṇḍaka 3.1.1\n• Focus: Spend 10 minutes observing your stream of thoughts like clouds passing through an indifferent sky.\n\nDay 7: Asato Mā Sad Gamaya (Ascent to the Light)\n• Verse: Bṛhadāraṇyaka 1.3.28\n• Focus: Re-enter your life with the quiet knowing: "The storm moves the tree. It does not move the ground."'
        ]
      },
      {
        heading: 'Final Compassionate Counsel',
        paragraphs: [
          'Resilience is not a trophy you win; it is an unshakeable ground you remember. Whenever the world shakes you, return to your breath, return to the witness, and remember that you are that which was never broken.'
        ]
      }
    ],
    sources: [
      'Gambhirananda, Swami. Eight Upanishads with the Commentary of Shankaracharya. Advaita Ashrama, 1989.',
      'Saraswati, Swami Dayananda. Introduction to Vedanta: Understanding the Fundamental Problem. Vision Books, 2005.',
      'Rao, K. Ramakrishna. Consciousness Studies in the Indian Tradition. Indian Council of Philosophical Research, 2002.'
    ]
  }
];

posts.forEach((post) => {
  const filePath = path.join(JOURNAL_DIR, `${post.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf-8');
  console.log(`Generated journal post: ${post.slug}.json`);
});

// Also generate index.json for fast listings
const indexData = posts.map(({ sections, ...summary }) => summary);
fs.writeFileSync(path.join(JOURNAL_DIR, 'index.json'), JSON.stringify(indexData, null, 2), 'utf-8');
console.log('Generated journal index.json successfully!');
