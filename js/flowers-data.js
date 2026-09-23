/**
 * POSYTEXTS.COM — Floriography Dictionary (A–Z)
 * Curated botanical meanings, color themes, and scrapbook notes for each letter.
 */
const FLOWER_DATA = {
  A: {
    letter: 'A',
    name: 'Anemone',
    latin: 'Anemone coronaria',
    meaning: 'Anticipation & Gentle Heart',
    colorName: 'Crimson Magenta & Plum',
    accentColor: '#E63946',
    petalColors: ['#E63946', '#F77F00', '#2B1E3A'],
    description: 'A delicate windflower that flutters open with the dawn breeze, symbolizing tender anticipation and watchful affection.',
    tags: ['Love', 'Anticipation', 'Tender']
  },
  B: {
    letter: 'B',
    name: 'Buttercup',
    latin: 'Ranunculus acris',
    meaning: 'Radiance & Childlike Joy',
    colorName: 'Sunshine Gold',
    accentColor: '#FFB703',
    petalColors: ['#FFD166', '#FFB703', '#F39A00'],
    description: 'Glossy golden petals reflecting sunny meadow afternoons. Holds secrets of untamed laughter and glowing charm.',
    tags: ['Joy', 'Sunshine', 'Charm']
  },
  C: {
    letter: 'C',
    name: 'Chamomile',
    latin: 'Matricaria chamomilla',
    meaning: 'Patience & Calm in Adversity',
    colorName: 'Daisy White & Golden Pollen',
    accentColor: '#E9C46A',
    petalColors: ['#FFFDF9', '#F4E8C1', '#F4A261'],
    description: 'Soft herbal blossoms that smell of sweet apples and honey. A symbol of quiet inner resilience and peaceful comfort.',
    tags: ['Calm', 'Healing', 'Peace']
  },
  D: {
    letter: 'D',
    name: 'Dahlia',
    latin: 'Dahlia pinnata',
    meaning: 'Elegance & Inner Dignity',
    colorName: 'Peach Sunset & Coral',
    accentColor: '#F77F00',
    petalColors: ['#FF9E80', '#FF6E40', '#FFD180'],
    description: 'Intricately folded velvety rosettes of warm coral and apricot, embodying graceful dignity and unique charisma.',
    tags: ['Elegance', 'Confidence', 'Warmth']
  },
  E: {
    letter: 'E',
    name: 'Edelweiss',
    latin: 'Leontopodium nivale',
    meaning: 'Noble Courage & Devotion',
    colorName: 'Alpine Star White',
    accentColor: '#90E0EF',
    petalColors: ['#FAF9F6', '#E2ECE9', '#90B494'],
    description: 'Velvety star-shaped blossoms discovered only upon highest mountain ridges; a timeless badge of true devotion.',
    tags: ['Courage', 'Devotion', 'Rare']
  },
  F: {
    letter: 'F',
    name: 'Forget-Me-Not',
    latin: 'Myosotis sylvatica',
    meaning: 'True Love & Cherished Memories',
    colorName: 'Cerulean Sky Blue',
    accentColor: '#4EA8DE',
    petalColors: ['#80BEEA', '#4EA8DE', '#FFF3B0'],
    description: 'Dainty sky-blue clusters with golden centers whispered along riverside paths, keeping precious memories forever warm.',
    tags: ['Memories', 'Love', 'Cherished']
  },
  G: {
    letter: 'G',
    name: 'Gardenia',
    latin: 'Gardenia jasminoides',
    meaning: 'Secret Grace & Sweet Purity',
    colorName: 'Ivory Cream',
    accentColor: '#52B788',
    petalColors: ['#FFFDF2', '#F3E9D2', '#74C69D'],
    description: 'Heavily perfumed swirls of creamy velvet leaves that speak of tender, unspoken crushes and poetic secrets.',
    tags: ['Grace', 'Secret Love', 'Purity']
  },
  H: {
    letter: 'H',
    name: 'Hydrangea',
    latin: 'Hydrangea macrophylla',
    meaning: 'Gratitude & Heartfelt Emotion',
    colorName: 'Periwinkle Cloud',
    accentColor: '#7209B7',
    petalColors: ['#B8B8FF', '#9381FF', '#C8B6FF'],
    description: 'Lush clouds of fluttering florets gathering every hue of lavender and dusk; given to express deep, genuine gratitude.',
    tags: ['Gratitude', 'Emotion', 'Friendship']
  },
  I: {
    letter: 'I',
    name: 'Iris',
    latin: 'Iris germanica',
    meaning: 'Hope, Wisdom & Valor',
    colorName: 'Royal Iris Violet',
    accentColor: '#6A4C93',
    petalColors: ['#7B2CBF', '#9D4EDD', '#FFD166'],
    description: 'Arching velvety petals named after the Greek goddess of rainbows, carrying messages of bright faith and poetic insight.',
    tags: ['Wisdom', 'Hope', 'Valor']
  },
  J: {
    letter: 'J',
    name: 'Jasmine',
    latin: 'Jasminum officinale',
    meaning: 'Sensuality, Warmth & Grace',
    colorName: 'Starry Ivory',
    accentColor: '#DDA15E',
    petalColors: ['#FFFFFC', '#E9EDC9', '#CCD5AE'],
    description: 'Star-shaped white blossoms that release their heavenly nectar under midnight moonlight; beloved for gentle warmth.',
    tags: ['Grace', 'Warmth', 'Sweetness']
  },
  K: {
    letter: 'K',
    name: 'King Protea',
    latin: 'Protea cynaroides',
    meaning: 'Transformation & Daring Spirit',
    colorName: 'Dusty Rose & Crown Gold',
    accentColor: '#C9184A',
    petalColors: ['#FF758F', '#FF4D6D', '#A4161A'],
    description: 'An ancient chalice of dramatic spires and dusty blush petals that thrives through wild storms, celebrating courageous reinvention.',
    tags: ['Transformation', 'Daring', 'Strength']
  },
  L: {
    letter: 'L',
    name: 'Lavender',
    latin: 'Lavandula angustifolia',
    meaning: 'Serenity, Devotion & Calm',
    colorName: 'Meadow Lavender',
    accentColor: '#8338EC',
    petalColors: ['#C77DFF', '#9D4EDD', '#5A189A'],
    description: 'Slender purple wands pressed between the pages of 1980s journals, bringing soothing comfort and unwavering loyalty.',
    tags: ['Calm', 'Serenity', 'Devotion']
  },
  M: {
    letter: 'M',
    name: 'Marigold',
    latin: 'Tagetes erecta',
    meaning: 'Warmth, Passion & Sunshine',
    colorName: 'Amber Glow',
    accentColor: '#FB8500',
    petalColors: ['#FFB703', '#FB8500', '#D00000'],
    description: 'Ruffled pompom blooms drenched in autumn gold and fiery amber, glowing like tiny lanterns of passionate affection.',
    tags: ['Sunshine', 'Passion', 'Warmth']
  },
  N: {
    letter: 'N',
    name: 'Narcissus',
    latin: 'Narcissus poeticus',
    meaning: 'New Beginnings & Rebirth',
    colorName: 'Spring Primrose & Cream',
    accentColor: '#E7C667',
    petalColors: ['#FFFBEA', '#FFE494', '#FF9E00'],
    description: 'The first proud trumpet to wake the dormant winter earth, welcoming new chapters, sweet beginnings, and boundless hope.',
    tags: ['New Beginnings', 'Hope', 'Spring']
  },
  O: {
    letter: 'O',
    name: 'Orchid',
    latin: 'Phalaenopsis aphrodite',
    meaning: 'Rare Beauty & Quiet Strength',
    colorName: 'Moth Orchid Mauve',
    accentColor: '#D81159',
    petalColors: ['#F72585', '#B5179E', '#7209B7'],
    description: 'Sculptural petals resembling floating butterflies, holding an exotic grace and timeless, quiet tenacity.',
    tags: ['Beauty', 'Strength', 'Rare']
  },
  P: {
    letter: 'P',
    name: 'Peony',
    latin: 'Paeonia lactiflora',
    meaning: 'Prosperity & Romantic Bliss',
    colorName: 'Blush Coral Pink',
    accentColor: '#FF4D6D',
    petalColors: ['#FFB3C1', '#FF758F', '#C9184A'],
    description: 'Opulent layers of ruffled pastel silk unfurling like confectionary, celebrated for bringing romantic bliss and bountiful good fortune.',
    tags: ['Romance', 'Joy', 'Prosperity']
  },
  Q: {
    letter: 'Q',
    name: 'Queen Anne’s Lace',
    latin: 'Daucus carota',
    meaning: 'Sanctuary & Delicate Haven',
    colorName: 'Lace White & Meadow Fern',
    accentColor: '#6B9080',
    petalColors: ['#F8F9FA', '#E8E8E4', '#A4C3B2'],
    description: 'An intricate parasol of starry miniature florets with a single dark garnet kiss at its heart, offering gentle sanctuary.',
    tags: ['Sanctuary', 'Haven', 'Delicate']
  },
  R: {
    letter: 'R',
    name: 'Rose',
    latin: 'Rosa centifolia',
    meaning: 'Everlasting Love & Deep Affection',
    colorName: 'Velvet Rose Crimson',
    accentColor: '#D90429',
    petalColors: ['#EF233C', '#D90429', '#8D0801'],
    description: 'The queen of poets and stationers alike; velvety crimson petals that whisper timeless romantic love and tender devotion.',
    tags: ['Love', 'Everlasting', 'Classic']
  },
  S: {
    letter: 'S',
    name: 'Sweet Pea',
    latin: 'Lathyrus odoratus',
    meaning: 'Blissful Pleasure & Fond Farewell',
    colorName: 'Coral Berry & Sweet Sugar',
    accentColor: '#FF006E',
    petalColors: ['#FF70A6', '#FF9770', '#FFD670'],
    description: 'Fluttering butterfly petals dancing atop delicate tendrils, filling the garden with sweet perfume and joyful memories.',
    tags: ['Joy', 'Pleasure', 'Farewell']
  },
  T: {
    letter: 'T',
    name: 'Tulip',
    latin: 'Tulipa gesneriana',
    meaning: 'Undying Love & Perfect Affection',
    colorName: 'Apricot Bloom',
    accentColor: '#FB5607',
    petalColors: ['#FF8500', '#FFB703', '#FB5607'],
    description: 'A stately satin cup in warm sunrise hues, treasured through centuries as the purest declaration of genuine, steadfast affection.',
    tags: ['Love', 'Affection', 'Steadfast']
  },
  U: {
    letter: 'U',
    name: 'Ursinia',
    latin: 'Ursinia calenduliflora',
    meaning: 'Innocence & Spontaneous Joy',
    colorName: 'Coppery Orange Daisy',
    accentColor: '#EA580C',
    petalColors: ['#FB923C', '#F97316', '#7C2D12'],
    description: 'A cheerful sun-worshipping daisy with rich copper rays and a jewel-like ruby collar, celebrating carefree spontaneous joy.',
    tags: ['Joy', 'Innocence', 'Playful']
  },
  V: {
    letter: 'V',
    name: 'Violet',
    latin: 'Viola odorata',
    meaning: 'Faithfulness & Modest Beauty',
    colorName: 'Deep Sweet Violet',
    accentColor: '#5E2CA5',
    petalColors: ['#795290', '#5E2CA5', '#240046'],
    description: 'Humble heart-shaped velvety petals tucked in shady woodland moss, symbolizing true modesty, faith, and quiet magic.',
    tags: ['Faithfulness', 'Modesty', 'Gentle']
  },
  W: {
    letter: 'W',
    name: 'Wisteria',
    latin: 'Wisteria sinensis',
    meaning: 'Longevity, Welcome & Playfulness',
    colorName: 'Cascading Lilac Mauve',
    accentColor: '#8E7DBE',
    petalColors: ['#CDB4DB', '#B5A0D6', '#6F568C'],
    description: 'Cascades of fragrant lilac blooms that drape like Victorian lace across cottage doorways, extending a warm and whimsical welcome.',
    tags: ['Welcome', 'Longevity', 'Playful']
  },
  X: {
    letter: 'X',
    name: 'Xeranthemum',
    latin: 'Xeranthemum annuum',
    meaning: 'Immortality & Constant Affection',
    colorName: 'Everlasting Silver Pink',
    accentColor: '#C084FC',
    petalColors: ['#F0ABFC', '#E879F9', '#A855F7'],
    description: 'Paper-textured everlasting petals that retain their vibrant beauty for years, representing unwavering fidelity through time.',
    tags: ['Immortality', 'Fidelity', 'Everlasting']
  },
  Y: {
    letter: 'Y',
    name: 'Yarrow',
    latin: 'Achillea millefolium',
    meaning: 'Healing, Protection & Everlasting Bonds',
    colorName: 'Butter Yellow Umbel',
    accentColor: '#CA8A04',
    petalColors: ['#FDE047', '#EAB308', '#A16207'],
    description: 'Feathery foliage supporting flat, sunny crowns of tiny flowers that mend weary spirits and seal lifelong bonds of friendship.',
    tags: ['Healing', 'Protection', 'Bonds']
  },
  Z: {
    letter: 'Z',
    name: 'Zinnia',
    latin: 'Zinnia elegans',
    meaning: 'Thoughts of Absent Friends & Daily Joy',
    colorName: 'Electric Magenta & Warm Gold',
    accentColor: '#E11D48',
    petalColors: ['#FB7185', '#F43F5E', '#BE123C'],
    description: 'Resilient and exuberantly colorful layers of petals blooming untamed until late autumn, sending love to cherished friends far away.',
    tags: ['Friendship', 'Daily Joy', 'Warmth']
  }
};

if (typeof module !== 'undefined') {
  module.exports = { FLOWER_DATA };
}
