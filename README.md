# POSYTEXTS.COM ✿
*Spell their name. Let it bloom.*

Created with love by **Shruti Arya** · [miss.shrutiarya@gmail.com](mailto:miss.shrutiarya@gmail.com)

---

## Concept
**Posytexts** = **Posy** (bouquet) + **Texts** (letters).

Users type someone's name, and each letter A–Z is permanently assigned a unique flower. As the name is typed, each letter transforms in real-time into its flower and organically arranges into a personalised botanical bouquet. After admiring the bouquet, users write a personal letter on 1980s vintage stationery, place it inside an animated envelope with a wax seal, and send the bouquet + letter to the recipient's inbox.

---

## Aesthetic & Design
- **Style**: Whimsical, quirky, cute, colourful, and Gen-Z scrapbooking inspired by 1980s English stationery, handwritten love notes, pressed wildflowers, and messy digital journaling.
- **Palette**: Strawberry pink, peach coral, sunshine yellow, vintage mint, periwinkle, meadow lavender, and warm paper-cream parchment.
- **Details**: Serrated postage stamps with London 1984 cancellation marks, translucent washi tapes at crooked angles, hand-drawn doodles, sparkles `✦ ✧`, stars, butterflies, and laid paper grain.
- **Audio Synthesizer**: Pure Web Audio API chimes and paper rustling (zero external mp3 files required, works offline).

---

## The 26 Alphabet Flowers (Floriography)

| Letter | Flower | Latin Name | Victorian Sentiment / Meaning |
| :---: | :--- | :--- | :--- |
| **A** | Anemone | *Anemone coronaria* | Anticipation & Gentle Heart |
| **B** | Buttercup | *Ranunculus acris* | Radiance & Childlike Joy |
| **C** | Chamomile | *Matricaria chamomilla* | Patience & Calm in Adversity |
| **D** | Dahlia | *Dahlia pinnata* | Elegance & Inner Dignity |
| **E** | Edelweiss | *Leontopodium nivale* | Noble Courage & Devotion |
| **F** | Forget-Me-Not | *Myosotis sylvatica* | True Love & Cherished Memories |
| **G** | Gardenia | *Gardenia jasminoides* | Secret Grace & Sweet Purity |
| **H** | Hydrangea | *Hydrangea macrophylla* | Gratitude & Heartfelt Emotion |
| **I** | Iris | *Iris germanica* | Hope, Wisdom & Valor |
| **J** | Jasmine | *Jasminum officinale* | Sensuality, Warmth & Grace |
| **K** | King Protea | *Protea cynaroides* | Transformation & Daring Spirit |
| **L** | Lavender | *Lavandula angustifolia* | Serenity, Devotion & Calm |
| **M** | Marigold | *Tagetes erecta* | Warmth, Passion & Sunshine |
| **N** | Narcissus | *Narcissus poeticus* | New Beginnings & Rebirth |
| **O** | Orchid | *Phalaenopsis aphrodite* | Rare Beauty & Quiet Strength |
| **P** | Peony | *Paeonia lactiflora* | Prosperity & Romantic Bliss |
| **Q** | Queen Anne’s Lace | *Daucus carota* | Sanctuary & Delicate Haven |
| **R** | Rose | *Rosa centifolia* | Everlasting Love & Deep Affection |
| **S** | Sweet Pea | *Lathyrus odoratus* | Blissful Pleasure & Fond Farewell |
| **T** | Tulip | *Tulipa gesneriana* | Undying Love & Perfect Affection |
| **U** | Ursinia | *Ursinia calenduliflora* | Innocence & Spontaneous Joy |
| **V** | Violet | *Viola odorata* | Faithfulness & Modest Beauty |
| **W** | Wisteria | *Wisteria sinensis* | Longevity, Welcome & Playfulness |
| **X** | Xeranthemum | *Xeranthemum annuum* | Immortality & Constant Affection |
| **Y** | Yarrow | *Achillea millefolium* | Healing, Protection & Everlasting Bonds |
| **Z** | Zinnia | *Zinnia elegans* | Thoughts of Absent Friends & Daily Joy |

---

## Project Structure

```
posytexts/
├── index.html               # Main website container (Creator & Recipient modes)
├── server.py                # Standalone HTTP & API server with persistence
├── css/
│   ├── style.css            # Scrapbooking design system, layout, typography
│   ├── stationery.css       # Paper styles, fonts, washi tapes, stamps & stickers
│   ├── bouquet.css          # Organic bouquet arrangement, swaying breeze physics
│   └── envelope.css         # 3D origami folding, pocket insertion & wax seal
├── js/
│   ├── flowers-data.js      # All 26 letters A–Z floriography dictionary
│   ├── flower-svgs.js       # Hand-drawn botanical vector SVGs
│   ├── bouquet-builder.js   # Dynamic arrangement engine & luggage name tag
│   ├── letter-editor.js     # Vintage stationery writing editor
│   ├── envelope-anim.js     # 3D folding & unsealing controller
│   ├── alphabet-garden.js   # Interactive A–Z flower encyclopedia
│   ├── audio-synth.js       # Web Audio API chime & rustle synthesizer
│   ├── share-engine.js      # URL compression, mailto & Web Share API
│   └── app.js               # Application coordinator & routing
└── README.md                # Documentation & floriography guide
```

---

## How to Run

### Option 1: Using the Built-in Python Server
Run the local server using Python:
```bash
python server.py
```
Then open:
```
http://localhost:8000
```

### Option 2: Open Directly in Any Browser
Double-click `index.html` or open it directly in Chrome, Safari, Edge, or Firefox. The application is completely self-contained with zero build tools or external server dependencies.

---

## Flow Overview
1. **Homepage / Hero**: Enter someone's name -> watch flowers bloom in real time -> click `"write them something →"`.
2. **Stationery Editor**: Pick your paper style (*Vintage Cream, Blush Rosewater, Mint Grid, Lavender Linen, Airmail*), choose your pen/typewriter, add washi tapes & postal stamps, then click `"seal it? 💌"`.
3. **3D Envelope Sealing**: The letter folds into thirds, slides into the envelope, flap folds down, and a floral wax seal stamps down with sound effects & confetti.
4. **Sending & Sharing**: Enter recipient email or copy the secret bloom link.
5. **Recipient Experience**: Recipient opens link -> sees *"Someone left you something."* -> taps the sealed vintage envelope -> wax seal breaks -> envelope opens -> botanical bouquet blooms -> personal letter unfolds!
6. **Alphabet Garden**: Explore all 26 flowers A–Z, filter by sentiment, and plant them in your posy.
