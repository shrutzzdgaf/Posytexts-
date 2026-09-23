/**
 * POSYTEXTS.COM — Organic Bouquet Arrangement Engine
 * Computes organic fanning angles, stem arcs, depth layering,
 * and vintage kraft paper wrap / ribbon bow with name tag.
 */

class BouquetBuilder {
  constructor() {
    this.wrapStyles = ['kraft', 'blush-ribbon', 'mint-twine', 'vintage-newspaper'];
    this.currentWrap = 'kraft';
  }

  /**
   * Sanitizes input into alphabetic characters A-Z.
   */
  parseName(name) {
    if (!name) return [];
    return name
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .split('');
  }

  /**
   * Calculates organic layout properties for N flowers.
   */
  calculateArrangement(letters) {
    const count = letters.length;
    if (count === 0) return [];

    const items = [];
    // Max fan angle based on count
    const maxAngle = Math.min(36, 12 + count * 3.5);

    letters.forEach((letter, index) => {
      let normalizedPos = 0; // -1 (far left) to +1 (far right)
      if (count > 1) {
        normalizedPos = (index / (count - 1)) * 2 - 1;
      }

      // Fan angle
      const rotation = normalizedPos * maxAngle;

      // Stagger heights: center flowers stand proud, outer flowers nestle gracefully
      const centerDist = Math.abs(normalizedPos);
      const yOffset = centerDist * 28 - (index % 2 === 1 ? 12 : 0);

      // Horizontal spacing
      const spreadWidth = Math.min(340, 60 + count * 38);
      const xOffset = normalizedPos * (spreadWidth / 2);

      // Z-index: center and front flowers higher
      const zIndex = 20 - Math.round(centerDist * 10) + (index % 2);

      // Organic scale: subtle natural variations
      const scale = 0.94 + ((index * 7) % 5) * 0.035;

      // Sway timing
      const swayDelay = -((index * 0.73) % 3).toFixed(2) + 's';
      const swayDuration = (3.2 + ((index * 3) % 4) * 0.4).toFixed(2) + 's';

      items.push({
        letter,
        data: FLOWER_DATA[letter] || FLOWER_DATA['A'],
        index,
        xOffset,
        yOffset,
        rotation,
        zIndex,
        scale,
        swayDelay,
        swayDuration
      });
    });

    return items;
  }

  /**
   * Renders the complete bouquet HTML into a target element.
   */
  renderBouquet(name, container, options = {}) {
    if (!container) return;
    const letters = this.parseName(name);

    if (letters.length === 0) {
      container.innerHTML = `
        <div class="empty-bouquet-prompt">
          <div class="empty-posy-illustration">
            <span class="doodle-sparkle">✦</span>
            <span class="empty-icon">🌱</span>
            <span class="doodle-sparkle">✧</span>
          </div>
          <p class="empty-text">type a name above to watch their posy bloom...</p>
        </div>
      `;
      return;
    }

    const arrangement = this.calculateArrangement(letters);
    const displayName = name.trim();

    let flowersHtml = '';
    arrangement.forEach((item) => {
      const flowerSvg = getFlowerSVG(item.letter, {
        width: 140,
        height: 210,
        delay: `${item.index * 0.08}s`,
        customClass: 'in-bouquet'
      });

      flowersHtml += `
        <div class="bouquet-stem-wrapper swaying-stem" 
             data-letter="${item.letter}"
             data-name="${item.data.name}"
             data-meaning="${item.data.meaning}"
             data-color="${item.data.colorName}"
             style="
               --stem-x: ${item.xOffset}px;
               --stem-y: ${item.yOffset}px;
               --stem-rot: ${item.rotation}deg;
               --stem-scale: ${item.scale};
               --stem-z: ${item.zIndex};
               --sway-delay: ${item.swayDelay};
               --sway-dur: ${item.swayDuration};
               z-index: ${item.zIndex};
             ">
          <div class="stem-interactive-target">
            ${flowerSvg}
            <div class="flower-letter-pip">${item.letter}</div>
          </div>
        </div>
      `;
    });

    // Wrapping wrap & luggage name tag
    const wrapHtml = `
      <div class="bouquet-wrap-base">
        <!-- Botanical Kraft Paper / Ribbon Wrap -->
        <div class="bouquet-kraft-sleeve">
          <svg class="kraft-paper-svg" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M25,10 L80,105 L135,10 Z" fill="#E6CCB2" stroke="#B08968" stroke-width="1.5"/>
            <path d="M30,10 L80,95 L130,10" fill="#DDB892" opacity="0.6"/>
            <!-- Twine tie bow -->
            <ellipse cx="80" cy="50" rx="20" ry="8" fill="none" stroke="#7F5539" stroke-width="2.2"/>
            <ellipse cx="80" cy="50" rx="8" ry="16" fill="none" stroke="#7F5539" stroke-width="2"/>
            <circle cx="80" cy="50" r="4" fill="#9C6644"/>
            <!-- Hanging twine strings -->
            <path d="M80,52 Q72,75 66,95" stroke="#7F5539" stroke-width="1.8" fill="none"/>
            <path d="M80,52 Q88,75 94,95" stroke="#7F5539" stroke-width="1.8" fill="none"/>
          </svg>
        </div>

        <!-- Scrapbook Luggage Tag with Hand-Lettered Name -->
        <div class="posy-luggage-tag">
          <div class="tag-eyelet"></div>
          <div class="tag-twine"></div>
          <div class="tag-content">
            <span class="tag-stamp">✿ POSYTEXTS</span>
            <span class="tag-label">A little posy for</span>
            <strong class="tag-name">${displayName}</strong>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = `
      <div class="bouquet-stage" id="bouquetStage">
        <div class="bouquet-flowers-cluster">
          ${flowersHtml}
        </div>
        ${wrapHtml}
      </div>
    `;

    // Attach hover / tap listeners for floriography inspect popup
    this.attachInspectListeners(container);
  }

  /**
   * Attaches tooltip & popup inspection to every blossom.
   */
  attachInspectListeners(container) {
    const stems = container.querySelectorAll('.bouquet-stem-wrapper');
    const tooltip = document.getElementById('floriographyTooltip') || this.createGlobalTooltip();

    stems.forEach((stem) => {
      const showInfo = (e) => {
        const letter = stem.getAttribute('data-letter');
        const flower = FLOWER_DATA[letter];
        if (!flower) return;

        tooltip.innerHTML = `
          <div class="tooltip-badge" style="background: ${flower.accentColor};">${flower.letter}</div>
          <div class="tooltip-body">
            <h4 class="tooltip-flower-name">${flower.name} <span class="tooltip-latin">(${flower.latin})</span></h4>
            <p class="tooltip-meaning">“${flower.meaning}”</p>
            <span class="tooltip-palette">✦ ${flower.colorName}</span>
          </div>
        `;

        tooltip.classList.add('visible');
        this.positionTooltip(e, tooltip);
      };

      const hideInfo = () => {
        tooltip.classList.remove('visible');
      };

      stem.addEventListener('mouseenter', showInfo);
      stem.addEventListener('mousemove', (e) => this.positionTooltip(e, tooltip));
      stem.addEventListener('mouseleave', hideInfo);
      stem.addEventListener('touchstart', (e) => {
        showInfo(e.touches[0]);
        e.stopPropagation();
      }, { passive: true });
    });

    document.addEventListener('touchstart', () => {
      tooltip.classList.remove('visible');
    }, { passive: true });
  }

  createGlobalTooltip() {
    let tip = document.getElementById('floriographyTooltip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'floriographyTooltip';
      tip.className = 'floriography-hover-tag';
      document.body.appendChild(tip);
    }
    return tip;
  }

  positionTooltip(e, tooltip) {
    if (!tooltip) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 100;
    const y = e.clientY || (e.touches && e.touches[0].clientY) || 100;

    const tipWidth = 240;
    const tipHeight = 90;
    let left = x + 15;
    let top = y - tipHeight - 10;

    if (left + tipWidth > window.innerWidth - 12) {
      left = x - tipWidth - 15;
    }
    if (top < 10) {
      top = y + 20;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }
}

const bouquetBuilder = new BouquetBuilder();
