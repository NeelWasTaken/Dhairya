# 🕉️ Dhairya — The Unshaken Self
### Psychological Resilience in the Upaniṣads (Indian Knowledge Systems)

> **"The storm moves the tree. It does not move the ground."**

*Dhairya (धैर्य)* is an immersive, deep-research, museum-grade digital humanities monument demonstrating that the ancient Upaniṣads (c. 800 BCE – 200 BCE) hold one of the world's oldest and most systematic psychologies of resilience. 

Rather than defining resilience merely as "bouncing back" to functional baseline after trauma, the Upaniṣadic paradigm models resilience as **abiding in an unshakeable, fear-free conscious ground (Ātman) while life moves**—through fearlessness (*abhaya*), cognitive distress tolerance (*titikṣā*), discriminative discernment (*viveka*), self-regulation (*manas-nigraha*), values alignment (*śreyas*), and non-dual identity beyond mortal fragility (*ātma-jñāna*).

---

## 🏛️ v4 Feature Expansion & Architectural Additions

### 1. The Contemplative Quote Gate
- Pure, uncompromised gate on deep nocturnal indigo-black (`#07060B`):
  1. `अंतः अस्ति प्रारंभः` (*Devanagari, gold `#D9B45A`*)
  2. `antaḥ asti prārambhaḥ` (*IAST letter-spaced `#FFE4B5`*)
  3. `"The end is the beginning."` (*Cormorant Garamond italic `#E6D8B8`*)
- Followed by an exact 3-second hold and a gentle fade-in of **"Click to Begin"** with **"प्रारम्भ करें"**.
- State machine in `App.tsx`: `gate → transition → site`. The main website DOM is never mounted during the gate.

### 2. The Three Worlds Design System
- **The Cave of Yama:** Charcoal stone `#0D0C10`, ember-orange `#E06328`, deep existential resonance.
- **The Forest Gurukul:** Morning mist moss `#0C120E`, green-gold `#48A36E`, living student-teacher inquiry.
- **The Cosmic Night:** Nocturnal indigo `#060714`, star silver-gold `#D4AF37`, pure witness consciousness (Turīya).

### 3. Museum-Exhibit Gallery Mode
- **Curatorial Placards:** Each chapter begins with a museum gallery placard noting room number, primary scriptural source, historical dating, and curatorial insight.
- **Interactive Floorplan Minimap:** Floating and sticky in navigation, highlighting the active gallery room and filling visited rooms with gold leaf.
- **Audio Guide Narration:** Synthesized voice narration via the browser's Web Speech API.

### 4. 10 Signature Interactions
1. **Kintsugi Crack ("Apply Stress"):** Procedural fracture shockwave with screen shake and glass crack sound, followed by flowing liquid gold along seams.
2. **Offer a Worry:** Ephemeral text input that detaches into stardust particles drifting into a night-sky constellation. Strict zero-retention privacy guarantee.
3. **Scroll Seismograph:** Live corner oscilloscope line hooked into scroll velocity; fast scrolling triggers subtle stress jitter and saturation drain, settling at the end with *"You were the still point."*
4. **Day-Long Scroll (Sky Cycle):** Continuous sky background shifting from pre-dawn → sunrise → noon → golden hour → dusk → midnight → sunrise across chapters.
5. **Yama's Riddle Room:** 3-door stone chamber testing Kaṭha philosophical dilemmas with non-punitive hints and stone door opening animations.
6. **Your Mandala:** 6-question reflection driving generative gold linework mandala with client-side PNG download (1080×1080 and 1080×1350).
7. **Word Gravity:** 10 core Sanskrit concepts orbiting the cursor in a soft 2D gravitational simulation with mass and inspection panels.
8. **The Well Descent:** Vertical spatial descent down a stone well etched with carved shlokas, bottoming at *"What remains when everything falls away?"*
9. **Breath-Synced Page:** Somatic entrainment modulating page illumination and heading letter-spacing to a 4s inhale / 6s exhale cadence.
10. **Palm-Leaf Horizontal Gallery:** Birch-bark manuscript strips bound with tie-string, unrolling into biographies of 7 historical sages.

### 5. Research Journal (Blog)
- Accessible at `/journal` with category filters and full-text search.
- **11 Peer-Informed Long-Form Scholarly Essays:**
  1. *The Boy Who Argued with Death: What Nachiketa Teaches About Grief*
  2. *Fear Needs a Second: A Psychological Reading of Bṛhadāraṇyaka 1.4.2*
  3. *Chariot, Horses, Reins: The Oldest Model of Self-Regulation?*
  4. *Is "Tarati śokam ātmavit" Spiritual Bypassing? An Honest Look*
  5. *Two Birds on One Tree: Witness Consciousness and Modern Mindfulness*
  6. *Maitreyī's Question: What Will Make Me Immortal?*
  7. *Panchakosha for Burnout: Five Layers, Five Practices*
  8. *What Gārgī Teaches About Asking Questions That Make Powerful People Uncomfortable*
  9. *Translation Traps: How One Word Changes the Upanishads*
  10. *Upanishads vs. Modern Psychology: Where They Agree, Where They Don't*
  11. *A 7-Day Upanishadic Reset (Educational, Not Therapy)*
- **Journal Reader Features:**
  - Circular SVG reading-time progress ring.
  - Highlight-to-share: selecting text displays a floating button to export a 1080×1080 manuscript quote card PNG.
  - SpeechSynthesis listen mode with rate controls.
  - Sticky margin rail with live links to referenced Upanishad verse cards.

---

## 🛠️ Developer Guide: How to Add a Post or Interactive Module

### Adding a New Journal Post
1. Create a JSON file in `src/content/journal/<slug>.json` adhering to the schema:
```json
{
  "slug": "my-new-post",
  "title": "Title of Essay",
  "date": "Month Year",
  "readingTime": "X min read",
  "tags": ["Tag1", "Tag2"],
  "relatedChapters": [1, 4],
  "relatedVerses": ["katha-1-2-18"],
  "summary": "Concise summary...",
  "viewOrigin": "Whose interpretation this is...",
  "limits": "Critical boundaries...",
  "sections": [{ "heading": "Heading", "paragraphs": ["..."] }],
  "sources": ["Full citation 1", "Full citation 2"]
}
```
2. Re-run `node scripts/generate_journal.cjs` to update `index.json`.

### Adding a New Interactive Module
1. Create your component in `src/components/emotional/` or `src/components/playful/`.
2. Ensure you import `audioEngine` from `../../lib/audioEngine` for synthesized Web Audio.
3. Include a `prefers-reduced-motion` check with graceful static fallback.
4. Place the component inside the appropriate chapter in `src/pages/Home.tsx` and in `src/pages/ExperiencesPage.tsx`.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
