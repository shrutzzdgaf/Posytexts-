/**
 * POSYTEXTS.COM — Vintage Letter Editor
 * 1980s English stationery paper styles, handwritten font selectors,
 * interactive scrapbooking stickers (washi tape, stamps, pressed blooms),
 * and state management.
 */

class LetterEditor {
  constructor() {
    this.recipientName = '';
    this.recipientEmail = '';
    this.senderName = '';
    this.senderEmail = '';
    this.message = '';
    this.currentPaper = 'vintage-cream';
    this.currentFont = 'font-handwriting';
    this.stickers = [];
    this.stickerCatalog = [
      { id: 'stamp-rose', type: 'stamp', icon: '🌹', label: 'Vintage Rose Stamp' },
      { id: 'stamp-airmail', type: 'stamp', icon: '✈️', label: 'Air Mail Stamp' },
      { id: 'stamp-bee', type: 'stamp', icon: '🐝', label: 'Honeybee Stamp' },
      { id: 'washi-pink', type: 'washi', color: '#FFAAA6', label: 'Blush Washi' },
      { id: 'washi-mint', type: 'washi', color: '#A8D5BA', label: 'Mint Grid Washi' },
      { id: 'washi-yellow', type: 'washi', color: '#FFEAA7', label: 'Daisy Washi' },
      { id: 'sticker-butterfly', type: 'sticker', icon: '🦋', label: 'Blue Butterfly' },
      { id: 'sticker-sparkle', type: 'sticker', icon: '✦', label: 'Gold Sparkle' },
      { id: 'sticker-pressed', type: 'sticker', icon: '🌸', label: 'Pressed Cherry Blossom' },
      { id: 'sticker-heart', type: 'sticker', icon: '💌', label: 'Love Letter' }
    ];
  }

  setRecipient(name) {
    this.recipientName = name || '';
    const toEl = document.getElementById('letterRecipientName');
    const dearEl = document.getElementById('letterDearName');
    if (toEl) toEl.textContent = this.recipientName || 'friend';
    if (dearEl) dearEl.textContent = this.recipientName || 'friend';
  }

  initEditor() {
    const textarea = document.getElementById('letterTextarea');
    const senderInput = document.getElementById('letterSenderInput');
    const recipientEmailInput = document.getElementById('letterRecipientEmail');
    const senderEmailInput = document.getElementById('letterSenderEmail');
    const paperButtons = document.querySelectorAll('.stationery-paper-option');
    const fontButtons = document.querySelectorAll('.stationery-font-option');
    const stickerDrawer = document.getElementById('stickerDrawerItems');
    const paperSheet = document.getElementById('stationeryPaperSheet');

    if (textarea) {
      const defaultPoeticMsg = "I had a little dream about you today... so I made you this bouquet. Each flower blooms from the letters of your name.";
      if (!textarea.value.trim()) {
        textarea.value = defaultPoeticMsg;
        this.message = defaultPoeticMsg;
      }
      // Auto-resize on input
      textarea.addEventListener('input', () => {
        this.message = textarea.value;
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(140, textarea.scrollHeight) + 'px';
      });
    }

    if (senderInput) {
      senderInput.addEventListener('input', () => {
        this.senderName = senderInput.value;
      });
    }

    if (recipientEmailInput) {
      recipientEmailInput.addEventListener('input', () => {
        this.recipientEmail = recipientEmailInput.value;
      });
    }

    if (senderEmailInput) {
      senderEmailInput.addEventListener('input', () => {
        this.senderEmail = senderEmailInput.value;
      });
    }

    // Paper styling switcher
    paperButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        paperButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const style = btn.getAttribute('data-paper');
        this.currentPaper = style;
        if (paperSheet) {
          paperSheet.className = `stationery-paper-sheet ${style} ${this.currentFont}`;
        }
        audioSynth.playPaperRustle();
      });
    });

    // Font switcher
    fontButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        fontButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const font = btn.getAttribute('data-font');
        this.currentFont = font;
        if (paperSheet) {
          paperSheet.className = `stationery-paper-sheet ${this.currentPaper} ${font}`;
        }
      });
    });

    // Render sticker tray
    if (stickerDrawer) {
      stickerDrawer.innerHTML = this.stickerCatalog.map((stk) => {
        if (stk.type === 'washi') {
          return `
            <button class="scrapbook-sticker-btn washi-btn" data-stk-id="${stk.id}" title="${stk.label}" style="background: ${stk.color};">
              <span class="washi-preview"></span>
            </button>
          `;
        }
        return `
          <button class="scrapbook-sticker-btn" data-stk-id="${stk.id}" title="${stk.label}">
            <span class="stk-icon">${stk.icon}</span>
          </button>
        `;
      }).join('');

      stickerDrawer.querySelectorAll('.scrapbook-sticker-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-stk-id');
          this.addStickerToLetter(id);
          audioSynth.playPaperRustle();
        });
      });
    }

    // Clear stickers button
    const clearStickersBtn = document.getElementById('clearStickersBtn');
    if (clearStickersBtn) {
      clearStickersBtn.addEventListener('click', () => {
        this.clearStickers();
      });
    }
  }

  addStickerToLetter(stickerId) {
    const stkDef = this.stickerCatalog.find(s => s.id === stickerId);
    if (!stkDef) return;

    const canvas = document.getElementById('letterStickerCanvas');
    if (!canvas) return;

    // Random organic scatter position near letter margins
    const randomX = Math.floor(10 + Math.random() * 75);
    const randomY = Math.floor(8 + Math.random() * 82);
    const randomRot = Math.floor(-18 + Math.random() * 36);

    const stickerEl = document.createElement('div');
    stickerEl.className = `placed-scrapbook-item placed-${stkDef.type}`;
    stickerEl.style.left = `${randomX}%`;
    stickerEl.style.top = `${randomY}%`;
    stickerEl.style.transform = `rotate(${randomRot}deg)`;

    if (stkDef.type === 'washi') {
      stickerEl.innerHTML = `
        <div class="placed-washi-tape" style="background: ${stkDef.color};">
          <span class="washi-pattern"></span>
        </div>
      `;
    } else if (stkDef.type === 'stamp') {
      stickerEl.innerHTML = `
        <div class="placed-postage-stamp">
          <span class="stamp-serrated-border"></span>
          <span class="stamp-art">${stkDef.icon}</span>
          <span class="stamp-postmark">AIR 1984</span>
        </div>
      `;
    } else {
      stickerEl.innerHTML = `<span class="placed-doodle">${stkDef.icon}</span>`;
    }

    // Click to remove sticker
    stickerEl.title = 'Click to peel off';
    stickerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      stickerEl.remove();
      this.stickers = this.stickers.filter(s => s.el !== stickerEl);
      audioSynth.playPaperRustle();
    });

    canvas.appendChild(stickerEl);

    this.stickers.push({
      id: stickerId,
      x: randomX,
      y: randomY,
      rot: randomRot,
      el: stickerEl
    });
  }

  clearStickers() {
    const canvas = document.getElementById('letterStickerCanvas');
    if (canvas) canvas.innerHTML = '';
    this.stickers = [];
  }

  getLetterData() {
    const textarea = document.getElementById('letterTextarea');
    const senderInput = document.getElementById('letterSenderInput');
    const recipientEmailInput = document.getElementById('letterRecipientEmail');
    const senderEmailInput = document.getElementById('letterSenderEmail');

    const defaultPoeticMsg = "I had a little dream about you today... so I made you this bouquet. Each flower blooms from the letters of your name.";
    const userMessage = (textarea && textarea.value.trim()) ? textarea.value.trim() : (this.message.trim() || defaultPoeticMsg);
    const userSender = (senderInput && senderInput.value.trim()) ? senderInput.value.trim() : (this.senderName.trim() || 'A Secret Admirer');

    return {
      recipientName: this.recipientName || 'Friend',
      recipientEmail: recipientEmailInput ? recipientEmailInput.value.trim() : this.recipientEmail,
      senderName: userSender,
      senderEmail: senderEmailInput ? senderEmailInput.value.trim() : this.senderEmail,
      message: userMessage,
      paperStyle: this.currentPaper || 'vintage-cream',
      fontStyle: this.currentFont || 'font-handwriting',
      stickers: this.stickers.map(s => ({
        id: s.id,
        x: s.x,
        y: s.y,
        rot: s.rot
      }))
    };
  }

  loadLetterData(data) {
    if (!data) return;
    this.setRecipient(data.recipientName || '');
    this.recipientEmail = data.recipientEmail || '';
    this.senderName = data.senderName || '';
    this.senderEmail = data.senderEmail || '';
    this.message = data.message || '';
    this.currentPaper = data.paperStyle || 'vintage-cream';
    this.currentFont = data.fontStyle || 'font-handwriting';

    const textarea = document.getElementById('letterTextarea');
    const senderInput = document.getElementById('letterSenderInput');
    const recipientEmailInput = document.getElementById('letterRecipientEmail');
    const senderEmailInput = document.getElementById('letterSenderEmail');
    const paperSheet = document.getElementById('stationeryPaperSheet');

    if (textarea) {
      textarea.value = this.message;
      textarea.style.height = 'auto';
      textarea.style.height = Math.max(140, textarea.scrollHeight) + 'px';
    }
    if (senderInput) senderInput.value = this.senderName;
    if (recipientEmailInput) recipientEmailInput.value = this.recipientEmail;
    if (senderEmailInput) senderEmailInput.value = this.senderEmail;

    if (paperSheet) {
      paperSheet.className = `stationery-paper-sheet ${this.currentPaper} ${this.currentFont}`;
    }

    this.clearStickers();
    if (Array.isArray(data.stickers)) {
      data.stickers.forEach((stk) => {
        this.addStickerToLetter(stk.id);
      });
    }
  }
}

const letterEditor = new LetterEditor();
