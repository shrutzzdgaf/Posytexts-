/**
 * POSYTEXTS.COM — Main Application Controller
 * Orchestrates Creator Flow (Name -> Flowers -> Bouquet -> Letter -> Envelope -> Email)
 * and Recipient Flow ("Someone left you something" -> Unseal -> Bloom -> Letter).
 */

class PosyTextsApp {
  constructor() {
    this.currentName = '';
    this.isRecipientMode = false;
    this.recipientData = null;
  }

  async init() {
    try { this.setupSoundToggle(); } catch (e) { console.warn('Sound toggle init:', e); }
    try { this.setupCloudModal(); } catch (e) { console.warn('Cloud modal init:', e); }
    try { alphabetGarden.init(); } catch (e) { console.warn('Alphabet garden init:', e); }
    try { letterEditor.initEditor(); } catch (e) { console.warn('Letter editor init:', e); }
    try { this.setupCreatorEventListeners(); } catch (e) { console.warn('Creator listeners init:', e); }
    try { this.setupShareModal(); } catch (e) { console.warn('Share modal init:', e); }
    try { await this.checkRoute(); } catch (e) { console.warn('Check route init:', e); }
    console.log('[PosyTexts] App initialized and ready to bloom! 🌸');
  }

  /**
   * Checks if URL contains a ?id= or ?posy= payload.
   */
  async checkRoute() {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const posyId = urlParams.get('id');
    let posyPayload = urlParams.get('posy');

    if (!posyPayload && hash && hash.startsWith('#posy=')) {
      posyPayload = hash.replace('#posy=', '');
    }

    // 1. Cloud-stored or Server-stored Posy ID
    if (posyId) {
      this.showRecipientLoading();
      try {
        const cloudData = await window.posySupabase.getPosy(posyId);
        this.hideRecipientLoading();
        if (cloudData && cloudData.recipientName) {
          this.isRecipientMode = true;
          this.recipientData = cloudData;
          this.renderRecipientMode(cloudData);
          return;
        } else {
          this.renderRecipientNotFound();
          return;
        }
      } catch (err) {
        console.warn('Posy lookup notice:', err);
        this.hideRecipientLoading();
        this.renderRecipientNotFound();
        return;
      }
    }

    // 2. Self-Contained Base64 Payload (Never expires fallback)
    if (posyPayload) {
      const decoded = shareEngine.decodePayload(posyPayload);
      if (decoded && decoded.recipientName) {
        this.isRecipientMode = true;
        this.recipientData = decoded;
        this.renderRecipientMode(decoded);
        return;
      }
    }

    // Default: Creator Mode
    this.renderCreatorMode();
  }

  setupSoundToggle() {
    const soundBtn = document.getElementById('soundToggleBtn');
    if (!soundBtn) return;

    const updateIcon = (muted) => {
      soundBtn.innerHTML = muted ? '🔇 <span class="btn-text">sound off</span>' : '🔊 <span class="btn-text">sound on</span>';
      soundBtn.setAttribute('aria-label', muted ? 'Unmute audio' : 'Mute audio');
    };

    updateIcon(audioSynth.isMuted());

    soundBtn.addEventListener('click', () => {
      const muted = audioSynth.toggleMute();
      updateIcon(muted);
    });
  }

  /**
   * Sets up the interactive Creator Flow.
   */
  setupCreatorEventListeners() {
    const nameInput = document.getElementById('nameInput');
    const bloomBtn = document.getElementById('bloomBtn');
    const bouquetDisplay = document.getElementById('bouquetDisplayArea');
    const proceedToLetterBtn = document.getElementById('proceedToLetterBtn');
    const sealLetterBtn = document.getElementById('sealLetterBtn');
    const backToBouquetBtn = document.getElementById('backToBouquetBtn');

    // Real-time bloom as name is typed
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        const prevLength = this.currentName.length;
        this.currentName = val;

        // Play chime note if new letter added
        if (val.length > prevLength) {
          const lastChar = val[val.length - 1];
          if (/[a-zA-Z]/.test(lastChar)) {
            audioSynth.playBloomNote(lastChar, val.length);
          }
        }

        this.updateBouquetView(val);
      });

      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.focusBouquetOrLetter();
        }
      });
    }

    if (bloomBtn) {
      bloomBtn.addEventListener('click', () => {
        const val = nameInput ? nameInput.value.trim() : '';
        if (!val) {
          nameInput.focus();
          return;
        }
        audioSynth.playSparkleUnseal();
        this.updateBouquetView(val);
        this.focusBouquetOrLetter();
      });
    }

    // "write them something →"
    if (proceedToLetterBtn) {
      proceedToLetterBtn.addEventListener('click', () => {
        if (!this.currentName) {
          if (nameInput) nameInput.focus();
          return;
        }
        letterEditor.setRecipient(this.currentName);
        this.showSection('letterSection');
        audioSynth.playPaperRustle();
      });
    }

    if (backToBouquetBtn) {
      backToBouquetBtn.addEventListener('click', () => {
        this.showSection('heroSection');
      });
    }

    // "seal it? 💌"
    if (sealLetterBtn) {
      sealLetterBtn.addEventListener('click', async () => {
        try {
          const letterData = letterEditor.getLetterData();
          if (!letterData.message && !letterData.recipientName) {
            alert('Write a little message before sealing! 💌');
            return;
          }

          sealLetterBtn.disabled = true;
          sealLetterBtn.textContent = 'sealing... 💌';

          // Initialize audio context on direct user gesture
          try { audioSynth.init(); } catch (e) {}

          // Switch screen view to the 3D sealing section
          this.showSection('sealingSection');

          // Populate the folding proxy letter
          this.populateFoldingProxy(letterData);

          // Initiate Supabase cloud save in background while 3D animation plays
          const savePromise = window.posySupabase.savePosy(letterData);

          // Run 3D sealing animation
          envelopeAnimator.startSealingSequence(async () => {
            sealLetterBtn.disabled = false;
            sealLetterBtn.textContent = 'seal it? 💌';
            let saveResult = null;
            try {
              saveResult = await savePromise;
            } catch (e) {
              console.warn('Cloud save notice:', e);
            }
            this.openShareModal(letterData, saveResult);
          });
        } catch (err) {
          console.error('[Sealing] Error during seal flow:', err);
          sealLetterBtn.disabled = false;
          sealLetterBtn.textContent = 'seal it? 💌';
          const letterData = letterEditor.getLetterData();
          this.openShareModal(letterData, null);
        }
      });
    }
  }

  updateBouquetView(name) {
    const bouquetDisplay = document.getElementById('bouquetDisplayArea');
    const bouquetTitle = document.getElementById('bouquetActionTitle');
    const proceedBtn = document.getElementById('proceedToLetterBtn');

    bouquetBuilder.renderBouquet(name, bouquetDisplay);

    if (name.length > 0) {
      if (bouquetTitle) {
        bouquetTitle.innerHTML = `A little posy for <strong>${name}</strong> ✿`;
      }
      if (proceedBtn) {
        proceedBtn.disabled = false;
        proceedBtn.classList.remove('disabled');
      }
    } else {
      if (bouquetTitle) {
        bouquetTitle.innerHTML = `your posy will bloom here...`;
      }
      if (proceedBtn) {
        proceedBtn.disabled = true;
        proceedBtn.classList.add('disabled');
      }
    }
  }

  focusBouquetOrLetter() {
    const bouquetArea = document.getElementById('bouquetArea');
    if (bouquetArea) {
      bouquetArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  populateFoldingProxy(letterData) {
    const proxyContent = document.getElementById('foldingLetterContent');
    if (!proxyContent) return;

    proxyContent.className = `folding-letter-inner ${letterData.paperStyle} ${letterData.fontStyle}`;
    proxyContent.innerHTML = `
      <div class="letter-stamp-corner">
        <span class="mini-postmark">POSY 80s</span>
        <span class="mini-stamp">🌸</span>
      </div>
      <div class="letter-to-line">To: ${letterData.recipientName || 'Friend'}</div>
      <div class="letter-dear-line">Dear ${letterData.recipientName || 'Friend'},</div>
      <div class="letter-body-line">${letterData.message.replace(/\n/g, '<br/>') || '<em>(a silent blooming posy)</em>'}</div>
      <div class="letter-from-line">With love, ${letterData.senderName || 'Anonymous'}</div>
    `;
  }

  showSection(sectionId) {
    const heroSection = document.getElementById('heroSection');
    const letterSection = document.getElementById('letterSection');
    const sealingSection = document.getElementById('sealingSection');

    if (sectionId === 'heroSection') {
      if (heroSection) heroSection.classList.remove('hidden');
      if (letterSection) letterSection.classList.add('hidden');
      if (sealingSection) sealingSection.classList.add('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'letterSection') {
      if (heroSection) heroSection.classList.add('hidden');
      if (letterSection) letterSection.classList.remove('hidden');
      if (sealingSection) sealingSection.classList.add('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'sealingSection') {
      if (heroSection) heroSection.classList.add('hidden');
      if (letterSection) letterSection.classList.add('hidden');
      if (sealingSection) sealingSection.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  setupShareModal() {
    const modal = document.getElementById('shareModal');
    const closeBtn = document.getElementById('closeShareModalBtn');
    const copyLinkBtn = document.getElementById('copyShareLinkBtn');
    const sendEmailBtn = document.getElementById('sendDirectEmailBtn');
    const webShareBtn = document.getElementById('nativeShareBtn');
    const previewBtn = document.getElementById('previewRecipientBtn');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (modal) modal.classList.add('hidden');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }

    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', () => {
        const linkInput = document.getElementById('shareLinkInput');
        if (linkInput) {
          shareEngine.copyToClipboard(linkInput.value);
        }
      });
    }

    // Send Posy Button (Direct Dispatch + Status)
    if (sendEmailBtn) {
      sendEmailBtn.addEventListener('click', async () => {
        const emailInput = document.getElementById('recipientEmailInput');
        const linkInput = document.getElementById('shareLinkInput');
        const deliveryBox = document.getElementById('deliveryStatusBox');
        const deliveryMsg = document.getElementById('deliveryStatusMsg');
        const email = emailInput ? emailInput.value.trim() : '';
        const url = linkInput ? linkInput.value : window.location.href;
        const letterData = letterEditor.getLetterData();

        if (!email) {
          alert('Please enter recipient email address! 💌');
          if (emailInput) emailInput.focus();
          return;
        }

        sendEmailBtn.disabled = true;
        sendEmailBtn.textContent = 'Sending... 🕊️';

        // Try backend delivery dispatch if available
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              toEmail: email,
              recipientName: letterData.recipientName,
              senderName: letterData.senderName,
              shareUrl: url
            })
          });
        } catch (e) {
          console.warn('Backend email API notice:', e);
        }

        sendEmailBtn.disabled = false;
        sendEmailBtn.textContent = 'Send Posy 💌';

        // Show delivery status banner
        if (deliveryBox && deliveryMsg) {
          deliveryMsg.textContent = `A special delivery link has been prepared for ${email}! You can also launch Gmail or Outlook below.`;
          deliveryBox.classList.remove('hidden');
        }

        // Prepare and trigger mailto
        const mailtoUri = shareEngine.generateMailtoUri(
          email,
          letterData.senderName,
          letterData.recipientName,
          url
        );
        window.location.href = mailtoUri;

        audioSynth.playSparkleUnseal();
        shareEngine.showToast(`💌 Posy prepared for ${email}!`);
      });
    }

    // Gmail Compose Shortcut
    const openGmailBtn = document.getElementById('openGmailBtn');
    if (openGmailBtn) {
      openGmailBtn.addEventListener('click', () => {
        const emailInput = document.getElementById('recipientEmailInput');
        const linkInput = document.getElementById('shareLinkInput');
        const email = emailInput ? emailInput.value.trim() : '';
        const url = linkInput ? linkInput.value : window.location.href;
        const letterData = letterEditor.getLetterData();

        const gmailUrl = shareEngine.generateGmailUrl(
          email,
          letterData.senderName,
          letterData.recipientName,
          url
        );
        window.open(gmailUrl, '_blank');
        shareEngine.showToast('✉️ Opening Gmail compose tab!');
      });
    }

    // Outlook Compose Shortcut
    const openOutlookBtn = document.getElementById('openOutlookBtn');
    if (openOutlookBtn) {
      openOutlookBtn.addEventListener('click', () => {
        const emailInput = document.getElementById('recipientEmailInput');
        const linkInput = document.getElementById('shareLinkInput');
        const email = emailInput ? emailInput.value.trim() : '';
        const url = linkInput ? linkInput.value : window.location.href;
        const letterData = letterEditor.getLetterData();

        const outlookUrl = shareEngine.generateOutlookUrl(
          email,
          letterData.senderName,
          letterData.recipientName,
          url
        );
        window.open(outlookUrl, '_blank');
        shareEngine.showToast('📨 Opening Outlook compose tab!');
      });
    }

    // Default Mail App Shortcut
    const openDefaultMailBtn = document.getElementById('openDefaultMailBtn');
    if (openDefaultMailBtn) {
      openDefaultMailBtn.addEventListener('click', () => {
        const emailInput = document.getElementById('recipientEmailInput');
        const linkInput = document.getElementById('shareLinkInput');
        const email = emailInput ? emailInput.value.trim() : '';
        const url = linkInput ? linkInput.value : window.location.href;
        const letterData = letterEditor.getLetterData();

        const mailtoUri = shareEngine.generateMailtoUri(
          email,
          letterData.senderName,
          letterData.recipientName,
          url
        );
        window.location.href = mailtoUri;
      });
    }

    // WhatsApp Shortcut
    const openWhatsAppBtn = document.getElementById('openWhatsAppBtn');
    if (openWhatsAppBtn) {
      openWhatsAppBtn.addEventListener('click', () => {
        const linkInput = document.getElementById('shareLinkInput');
        const url = linkInput ? linkInput.value : window.location.href;
        const letterData = letterEditor.getLetterData();

        const waUrl = shareEngine.generateWhatsAppUrl(letterData.recipientName, url);
        window.open(waUrl, '_blank');
      });
    }

    if (webShareBtn) {
      webShareBtn.addEventListener('click', () => {
        const letterData = letterEditor.getLetterData();
        shareEngine.sharePosy(letterData);
      });
    }

    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        const linkInput = document.getElementById('shareLinkInput');
        if (linkInput && linkInput.value) {
          window.open(linkInput.value, '_blank');
        }
      });
    }
  }

  openShareModal(letterData, saveResult) {
    const modal = document.getElementById('shareModal');
    const linkInput = document.getElementById('shareLinkInput');
    const emailInput = document.getElementById('recipientEmailInput');
    const nameLabel = document.getElementById('shareRecipientNameLabel');
    const deliveryBox = document.getElementById('deliveryStatusBox');
    const cloudBadge = document.getElementById('shareCloudBadge');

    if (!modal) return;

    let shareUrl = '';
    if (saveResult && saveResult.shareUrl) {
      shareUrl = saveResult.shareUrl;
    } else {
      shareUrl = shareEngine.generateShareUrl(letterData);
    }

    if (linkInput) linkInput.value = shareUrl;
    if (nameLabel) nameLabel.textContent = letterData.recipientName || 'their';
    if (emailInput && letterData.recipientEmail) {
      emailInput.value = letterData.recipientEmail;
    }
    if (deliveryBox) {
      deliveryBox.classList.add('hidden');
    }

    if (cloudBadge) {
      if (saveResult && saveResult.storage === 'supabase') {
        cloudBadge.className = 'share-cloud-badge active';
        cloudBadge.innerHTML = '☁️ <strong>Supabase Cloud Active</strong> — Permanent Link & Read Tracking Enabled';
      } else if (saveResult && saveResult.storage === 'server') {
        cloudBadge.className = 'share-cloud-badge active';
        cloudBadge.innerHTML = '💾 <strong>Saved to Local Database</strong> — Permanent Link Created';
      } else {
        cloudBadge.className = 'share-cloud-badge permanent';
        cloudBadge.innerHTML = '🔒 <strong>Self-Contained Secret Link</strong> — Never expires, opens anywhere';
      }
    }

    modal.classList.remove('hidden');
    audioSynth.playSparkleUnseal();
  }

  /**
   * Supabase Cloud Configuration Modal Handlers
   */
  setupCloudModal() {
    const openBtn = document.getElementById('openCloudSettingsBtn');
    const modal = document.getElementById('cloudModal');
    const closeBtn = document.getElementById('closeCloudModalBtn');
    const saveBtn = document.getElementById('saveCloudConfigBtn');
    const clearBtn = document.getElementById('clearCloudConfigBtn');
    const urlInput = document.getElementById('supabaseUrlInput');
    const keyInput = document.getElementById('supabaseKeyInput');
    const statusBanner = document.getElementById('cloudModalStatusBanner');
    const statusTitle = document.getElementById('cloudModalStatusTitle');
    const statusMsg = document.getElementById('cloudModalStatusMsg');

    const updateStatusUI = () => {
      if (!urlInput || !keyInput) return;
      const currentUrl = window.posySupabase.url || '';
      const currentKey = window.posySupabase.anonKey || '';
      urlInput.value = currentUrl;
      keyInput.value = currentKey;

      if (window.posySupabase.isConfigured()) {
        if (statusBanner) {
          statusBanner.classList.remove('hidden');
          if (statusTitle) statusTitle.textContent = 'Connected to Supabase! ☁️';
          if (statusMsg) statusMsg.textContent = `Project URL: ${currentUrl}`;
        }
      } else {
        if (statusBanner) statusBanner.classList.add('hidden');
      }
    };

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        updateStatusUI();
        if (modal) modal.classList.remove('hidden');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (modal) modal.classList.add('hidden');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const url = urlInput ? urlInput.value.trim() : '';
        const key = keyInput ? keyInput.value.trim() : '';
        if (!url || !key) {
          alert('Please enter both Supabase Project URL and Anon Key.');
          return;
        }
        window.posySupabase.setCredentials(url, key);
        updateStatusUI();
        shareEngine.showToast('☁️ Supabase configured!');
        setTimeout(() => {
          if (modal) modal.classList.add('hidden');
        }, 1200);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.posySupabase.setCredentials('', '');
        updateStatusUI();
        shareEngine.showToast('Reset Supabase settings.');
      });
    }
  }

  showRecipientLoading() {
    const creatorView = document.getElementById('creatorView');
    const recipientView = document.getElementById('recipientView');
    const loadingBox = document.getElementById('recipientLoadingBox');
    const envContainer = document.getElementById('recipientEnvelopeContainer');
    const unfoldedExp = document.querySelector('.recipient-unfolded-experience');

    if (creatorView) creatorView.classList.add('hidden');
    if (recipientView) recipientView.classList.remove('hidden');
    if (loadingBox) loadingBox.classList.remove('hidden');
    if (envContainer) envContainer.classList.add('hidden');
    if (unfoldedExp) unfoldedExp.classList.add('hidden');
  }

  hideRecipientLoading() {
    const loadingBox = document.getElementById('recipientLoadingBox');
    const envContainer = document.getElementById('recipientEnvelopeContainer');
    const unfoldedExp = document.querySelector('.recipient-unfolded-experience');
    if (loadingBox) loadingBox.classList.add('hidden');
    if (envContainer) envContainer.classList.remove('hidden');
    if (unfoldedExp) unfoldedExp.classList.remove('hidden');
  }

  renderRecipientNotFound() {
    const creatorView = document.getElementById('creatorView');
    const recipientView = document.getElementById('recipientView');
    const notFoundBox = document.getElementById('recipientNotFoundBox');
    const envContainer = document.getElementById('recipientEnvelopeContainer');
    const unfoldedExp = document.querySelector('.recipient-unfolded-experience');
    const createBtn = document.getElementById('notFoundCreateBtn');

    if (creatorView) creatorView.classList.add('hidden');
    if (recipientView) recipientView.classList.remove('hidden');
    if (notFoundBox) notFoundBox.classList.remove('hidden');
    if (envContainer) envContainer.classList.add('hidden');
    if (unfoldedExp) unfoldedExp.classList.add('hidden');

    if (createBtn) {
      createBtn.addEventListener('click', () => {
        window.location.href = window.location.origin + window.location.pathname;
      });
    }
  }

  /**
   * Renders the special delivery for the recipient.
   */
  renderRecipientMode(data) {
    const creatorView = document.getElementById('creatorView');
    const recipientView = document.getElementById('recipientView');
    const recipientNameSpan = document.getElementById('recipientHeroName');
    const envelopeName = document.getElementById('recipientEnvelopeName');
    const bouquetContainer = document.getElementById('recipientBouquetArea');
    const letterSheet = document.getElementById('recipientLetterSheet');
    const bloomOwnBtn = document.getElementById('bloomOwnPosyBtn');
    const unsealEnvelopeBtn = document.getElementById('recipientEnvelope');
    const unfoldedExp = document.querySelector('.recipient-unfolded-experience');
    const flap = document.getElementById('recipientFlap');
    const waxSeal = document.getElementById('recipientWaxSeal');
    const emergingBouquet = document.getElementById('recipientEmergingBouquet');
    const emergingLetter = document.getElementById('recipientEmergingLetter');
    const letterTag = document.getElementById('letterFromEnvelopeTag');
    const promptText = document.getElementById('unsealPromptText');

    if (creatorView) creatorView.classList.add('hidden');
    if (recipientView) recipientView.classList.remove('hidden');
    if (unfoldedExp) unfoldedExp.classList.remove('hidden');

    // Step 1: Envelope starts closed with recipient name at right bottom
    if (unsealEnvelopeBtn) {
      unsealEnvelopeBtn.classList.remove('envelope-disappeared');
    }
    if (flap) {
      flap.classList.remove('flap-opened');
      flap.classList.add('flap-closed');
    }
    if (waxSeal) {
      waxSeal.classList.remove('wax-broken');
      waxSeal.classList.add('stamped');
    }
    if (emergingBouquet) {
      emergingBouquet.classList.remove('bouquet-emerged');
    }
    if (emergingLetter) {
      emergingLetter.classList.remove('letter-unfolded');
    }
    if (letterTag) {
      letterTag.classList.remove('tag-visible');
    }
    if (promptText) {
      promptText.innerHTML = 'tap the envelope to open 💌';
      promptText.style.cursor = 'pointer';
    }

    const defaultPoeticMsg = "I had a little dream about you today... so I made you this bouquet. Each flower blooms from the letters of your name.";
    const displayRecipient = (data.recipientName && data.recipientName.trim()) ? data.recipientName.trim() : 'Friend';
    const displaySender = (data.senderName && data.senderName.trim()) ? data.senderName.trim() : 'A Secret Admirer';
    const displayMsg = (data.message && data.message.trim()) ? data.message.trim() : defaultPoeticMsg;

    if (recipientNameSpan) recipientNameSpan.textContent = displayRecipient;
    if (envelopeName) envelopeName.textContent = displayRecipient;

    // Prepare bouquet inside container
    bouquetBuilder.renderBouquet(displayRecipient, bouquetContainer);

    // Prepare handwritten letter sheet
    if (letterSheet) {
      letterSheet.className = `stationery-paper-sheet ${data.paperStyle || 'vintage-cream'} ${data.fontStyle || 'font-handwriting'}`;
      const toEl = document.getElementById('recLetterTo');
      const dearEl = document.getElementById('recLetterDear');
      const bodyEl = document.getElementById('recLetterBody');
      const fromEl = document.getElementById('recLetterFrom');

      if (toEl) toEl.textContent = displayRecipient;
      if (dearEl) dearEl.textContent = displayRecipient;
      if (bodyEl) bodyEl.innerHTML = displayMsg.replace(/\n/g, '<br/>');
      if (fromEl) fromEl.textContent = displaySender;

      // Recreate stickers if any
      const stickerCanvas = document.getElementById('recLetterStickerCanvas');
      if (stickerCanvas && Array.isArray(data.stickers)) {
        stickerCanvas.innerHTML = '';
        data.stickers.forEach((stk) => {
          const stkDef = letterEditor.stickerCatalog.find(s => s.id === stk.id);
          if (!stkDef) return;
          const el = document.createElement('div');
          el.className = `placed-scrapbook-item placed-${stkDef.type}`;
          el.style.left = `${stk.x}%`;
          el.style.top = `${stk.y}%`;
          el.style.transform = `rotate(${stk.rot}deg)`;
          if (stkDef.type === 'washi') {
            el.innerHTML = `<div class="placed-washi-tape" style="background: ${stkDef.color};"><span class="washi-pattern"></span></div>`;
          } else if (stkDef.type === 'stamp') {
            el.innerHTML = `<div class="placed-postage-stamp"><span class="stamp-serrated-border"></span><span class="stamp-art">${stkDef.icon}</span><span class="stamp-postmark">AIR 1984</span></div>`;
          } else {
            el.innerHTML = `<span class="placed-doodle">${stkDef.icon}</span>`;
          }
          stickerCanvas.appendChild(el);
        });
      }
    }

    // Step 2: Clicking the envelope triggers open + simultaneous envelope disappear + flowers stay
    if (unsealEnvelopeBtn) {
      unsealEnvelopeBtn.onclick = () => {
        envelopeAnimator.startUnsealingSequence();
      };

      if (promptText) {
        promptText.onclick = () => {
          envelopeAnimator.startUnsealingSequence();
        };
      }
    }

    const printKeepsakeBtn = document.getElementById('printKeepsakeBtn');
    if (printKeepsakeBtn) {
      printKeepsakeBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (bloomOwnBtn) {
      bloomOwnBtn.addEventListener('click', () => {
        window.location.href = window.location.origin + window.location.pathname;
      });
    }
  }

  renderCreatorMode() {
    const creatorView = document.getElementById('creatorView');
    const recipientView = document.getElementById('recipientView');
    if (creatorView) creatorView.classList.remove('hidden');
    if (recipientView) recipientView.classList.add('hidden');
    this.updateBouquetView('');
  }
}

const app = new PosyTextsApp();
window.posyApp = app;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app.init();
  });
} else {
  // DOM is already ready (e.g. dynamic injection or deferred script)
  app.init();
}
