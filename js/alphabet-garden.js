/**
 * POSYTEXTS.COM — Alphabet Garden (A–Z Flower Library)
 * Interactive botanical floriography encyclopedia.
 * Features hover/tap blooming, keyword searching, and quick-add to bouquet.
 */

class AlphabetGarden {
  constructor() {
    this.modalEl = null;
    this.searchQuery = '';
    this.activeTag = 'all';
  }

  init() {
    this.modalEl = document.getElementById('alphabetGardenModal');
    const openBtn = document.getElementById('openGardenBtn');
    const closeBtn = document.getElementById('closeGardenBtn');
    const searchInput = document.getElementById('gardenSearchInput');
    const tagPills = document.querySelectorAll('.garden-tag-pill');

    if (openBtn) {
      openBtn.addEventListener('click', () => this.open());
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }
    if (this.modalEl) {
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) this.close();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderCards();
      });
    }

    tagPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        tagPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeTag = pill.getAttribute('data-tag');
        this.renderCards();
      });
    });

    this.renderCards();
  }

  open() {
    if (this.modalEl) {
      this.modalEl.classList.remove('hidden');
      document.body.classList.add('modal-open');
      audioSynth.playPaperRustle();
    }
  }

  close() {
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  }

  renderCards() {
    const grid = document.getElementById('gardenGrid');
    if (!grid) return;

    const letters = Object.keys(FLOWER_DATA).sort();
    const filtered = letters.filter((l) => {
      const f = FLOWER_DATA[l];
      const matchSearch =
        l.toLowerCase().includes(this.searchQuery) ||
        f.name.toLowerCase().includes(this.searchQuery) ||
        f.latin.toLowerCase().includes(this.searchQuery) ||
        f.meaning.toLowerCase().includes(this.searchQuery) ||
        f.tags.some(t => t.toLowerCase().includes(this.searchQuery));

      const matchTag =
        this.activeTag === 'all' ||
        f.tags.some(t => t.toLowerCase() === this.activeTag.toLowerCase());

      return matchSearch && matchTag;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="garden-empty-state">
          <p class="garden-empty-icon">🥀</p>
          <p>No flowers found for “${this.searchQuery}”. Try searching for “love”, “joy”, or another letter!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((l) => {
      const f = FLOWER_DATA[l];
      const svg = getFlowerSVG(l, { width: 110, height: 145, customClass: 'garden-item-svg' });

      return `
        <div class="garden-card scrapbook-polaroid" data-letter="${l}">
          <div class="garden-card-washi"></div>
          <div class="garden-card-top">
            <span class="garden-letter-badge" style="background: ${f.accentColor};">${f.letter}</span>
            <span class="garden-tag-label">${f.tags[0] || 'Botanical'}</span>
          </div>

          <div class="garden-flower-display">
            ${svg}
          </div>

          <div class="garden-card-body">
            <h3 class="garden-flower-name">${f.name}</h3>
            <p class="garden-flower-latin"><em>${f.latin}</em></p>
            <p class="garden-flower-meaning">“${f.meaning}”</p>
            <p class="garden-flower-desc">${f.description}</p>
          </div>

          <div class="garden-card-footer">
            <button class="garden-add-btn" data-letter="${l}" title="Add this flower to current posy">
              + plant in posy ✿
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach hover sound + bloom
    grid.querySelectorAll('.garden-card').forEach((card) => {
      const letter = card.getAttribute('data-letter');
      card.addEventListener('mouseenter', () => {
        audioSynth.playBloomNote(letter);
      });

      const addBtn = card.querySelector('.garden-add-btn');
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const nameInput = document.getElementById('nameInput');
          if (nameInput) {
            nameInput.value = (nameInput.value + letter).toUpperCase();
            nameInput.dispatchEvent(new Event('input', { bubbles: true }));
            this.close();
            nameInput.focus();
          }
        });
      }
    });
  }
}

const alphabetGarden = new AlphabetGarden();
