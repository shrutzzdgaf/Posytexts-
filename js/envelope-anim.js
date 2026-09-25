/**
 * POSYTEXTS.COM — 3D Envelope Folding & Unsealing Animation Engine
 * Controls letter folding, envelope pocket insertion, flap closure,
 * wax seal stamping, confetti sparkles, and recipient unsealing sequence.
 */

class EnvelopeAnimator {
  constructor() {
    this.isSealed = false;
    this.sealType = 'flower-seal'; // 'flower-seal', 'heart-seal', 'bee-seal'
  }

  /**
   * Triggers the full letter folding & envelope sealing sequence.
   * @param {Function} onComplete - Callback after sealing finishes
   */
  startSealingSequence(onComplete) {
    const stage = document.getElementById('sealingSection') || document.getElementById('sealingStage');
    const foldingLetter = document.getElementById('foldingLetterProxy');
    const envelope = document.getElementById('sealingEnvelope');
    const flap = document.getElementById('sealingFlap');
    const waxSeal = document.getElementById('sealingWaxSeal');

    // Clean reset any prior animations
    if (foldingLetter) {
      foldingLetter.classList.remove('folding-active', 'sliding-into-envelope');
    }
    if (flap) {
      flap.classList.remove('flap-closed');
    }
    if (waxSeal) {
      waxSeal.classList.remove('stamped');
    }
    this.isSealed = false;

    if (!stage || !envelope) {
      console.warn('[Envelope] Stage or envelope not found, executing callback directly');
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    stage.classList.remove('hidden');
    stage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Step 1: Letter paper folding (0ms - 800ms)
    try { audioSynth.playPaperRustle(); } catch (e) {}
    if (foldingLetter) {
      foldingLetter.classList.add('folding-active');
    }

    // Step 2: Slide folded letter into envelope pocket (800ms - 1500ms)
    setTimeout(() => {
      if (foldingLetter) {
        foldingLetter.classList.add('sliding-into-envelope');
      }
      try { audioSynth.playPaperRustle(); } catch (e) {}
    }, 850);

    // Step 3: Envelope flap closes down (1600ms - 2200ms)
    setTimeout(() => {
      if (flap) {
        flap.classList.add('flap-closed');
      }
    }, 1650);

    // Step 4: Wax seal stamps down with bass thud + sparkle (2200ms)
    setTimeout(() => {
      if (waxSeal) {
        waxSeal.classList.add('stamped');
      }
      try { audioSynth.playWaxSeal(); } catch (e) {}
      try { this.fireConfetti(); } catch (e) {}
      this.isSealed = true;

      // Callback to show send options modal / panel
      if (typeof onComplete === 'function') {
        setTimeout(onComplete, 600);
      }
    }, 2250);
  }

  /**
   * Recipient View: Unsealing sequence when recipient taps the envelope.
   */
  startUnsealingSequence(onComplete) {
    const envelope = document.getElementById('recipientEnvelope');
    const waxSeal = document.getElementById('recipientWaxSeal');
    const flap = document.getElementById('recipientFlap');
    const emergingBouquet = document.getElementById('recipientEmergingBouquet');
    const emergingLetter = document.getElementById('recipientEmergingLetter');
    const letterTag = document.getElementById('letterFromEnvelopeTag');
    const prompt = document.getElementById('unsealPromptText');

    try { audioSynth.playSparkleUnseal(); } catch (e) {}
    try { this.fireConfetti(); } catch (e) {}

    // Step 2: Envelope opens with the flowers
    if (waxSeal) {
      waxSeal.classList.add('wax-broken');
    }
    if (flap) {
      flap.classList.remove('flap-closed');
      flap.classList.add('flap-opened');
    }
    if (emergingBouquet) {
      emergingBouquet.classList.add('bouquet-emerged');
    }

    // SIMULTANEOUSLY: Envelope disappears and the flowers stay!
    if (envelope) {
      envelope.classList.add('envelope-disappeared');
    }

    // Simultaneously: Unfold the letter below the flowers
    if (emergingLetter) {
      emergingLetter.classList.add('letter-unfolded');
    }
    if (letterTag) {
      letterTag.classList.add('tag-visible');
    }

    if (prompt) {
      prompt.innerHTML = '✦ unsealed with love ✦';
    }

    // Smoothly scroll down so the recipient immediately sees their standing flowers and letter
    if (emergingLetter) {
      setTimeout(() => {
        emergingLetter.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }

    if (typeof onComplete === 'function') onComplete();
  }

  /**
   * Organic pastel confetti / flower petal burst.
   */
  fireConfetti() {
    const container = document.getElementById('confettiCanvas') || document.body;
    const colors = ['#FF9EAA', '#FFD0EC', '#FFF3CD', '#A8D5BA', '#C8B6FF', '#BDE0FE', '#FFC6FF'];
    const count = 35;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'magical-falling-petal';

      const startX = window.innerWidth / 2 + (Math.random() * 200 - 100);
      const startY = window.innerHeight * 0.45;
      const endX = startX + (Math.random() * 400 - 200);
      const endY = startY + 250 + Math.random() * 300;
      const rot = Math.random() * 720 - 360;
      const scale = 0.5 + Math.random() * 0.8;
      const color = colors[Math.floor(Math.random() * colors.length)];

      petal.style.left = `${startX}px`;
      petal.style.top = `${startY}px`;
      petal.style.backgroundColor = color;
      petal.style.setProperty('--end-x', `${endX}px`);
      petal.style.setProperty('--end-y', `${endY}px`);
      petal.style.setProperty('--end-rot', `${rot}deg`);
      petal.style.setProperty('--scale', scale);
      petal.style.animationDuration = `${1.2 + Math.random() * 1.2}s`;

      container.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, 2500);
    }
  }
}

const envelopeAnimator = new EnvelopeAnimator();
