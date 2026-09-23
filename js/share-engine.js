/**
 * POSYTEXTS.COM — Share Engine & Link Serialization
 * Packs bouquet & letter into safe URL-encoded parameters,
 * supports Web Share API, clipboard copying, mailto pre-fills,
 * and keepsake export.
 */

class ShareEngine {
  /**
   * Encodes posy package to a URL-safe string.
   */
  encodePayload(data) {
    try {
      const jsonStr = JSON.stringify(data);
      const encoded = btoa(encodeURIComponent(jsonStr));
      return encoded;
    } catch (e) {
      console.error('Encoding error:', e);
      return '';
    }
  }

  /**
   * Decodes posy package from a URL string.
   */
  decodePayload(encoded) {
    try {
      const jsonStr = decodeURIComponent(atob(encoded));
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error('Decoding error:', e);
      return null;
    }
  }

  /**
   * Generates a full shareable URL for the current window location.
   */
  generateShareUrl(payloadData) {
    const encoded = this.encodePayload(payloadData);
    const origin = window.location.origin + window.location.pathname;
    return `${origin}?posy=${encoded}`;
  }

  /**
   * Creates an email mailto: URI.
   */
  generateMailtoUri(recipientEmail, senderName, recipientName, shareUrl) {
    const subject = encodeURIComponent(`A little posy & letter for ${recipientName || 'you'} ✿`);
    const fromLine = senderName ? `From: ${senderName}\n\n` : '';
    const body = encodeURIComponent(
      `Hello ${recipientName || 'friend'}!\n\n` +
      `I created a personalised botanical bouquet and handwritten letter just for you on POSYTEXTS.COM.\n\n` +
      `${fromLine}` +
      `Click your special delivery link below to unseal your vintage envelope:\n` +
      `${shareUrl}\n\n` +
      `Spell their name. Let it bloom. ✿`
    );
    return `mailto:${recipientEmail || ''}?subject=${subject}&body=${body}`;
  }

  /**
   * Generates a direct webmail compose URL for Gmail.
   */
  generateGmailUrl(recipientEmail, senderName, recipientName, shareUrl) {
    const subject = encodeURIComponent(`A little posy & letter for ${recipientName || 'you'} ✿`);
    const fromLine = senderName ? `From: ${senderName}\n\n` : '';
    const body = encodeURIComponent(
      `Hello ${recipientName || 'friend'}!\n\n` +
      `I created a personalised botanical bouquet and handwritten letter just for you on POSYTEXTS.COM.\n\n` +
      `${fromLine}` +
      `Click your special delivery link below to unseal your vintage envelope:\n` +
      `${shareUrl}\n\n` +
      `Spell their name. Let it bloom. ✿`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail || '')}&su=${subject}&body=${body}`;
  }

  /**
   * Generates a direct webmail compose URL for Outlook.com.
   */
  generateOutlookUrl(recipientEmail, senderName, recipientName, shareUrl) {
    const subject = encodeURIComponent(`A little posy & letter for ${recipientName || 'you'} ✿`);
    const fromLine = senderName ? `From: ${senderName}\n\n` : '';
    const body = encodeURIComponent(
      `Hello ${recipientName || 'friend'}!\n\n` +
      `I created a personalised botanical bouquet and handwritten letter just for you on POSYTEXTS.COM.\n\n` +
      `${fromLine}` +
      `Click your special delivery link below to unseal your vintage envelope:\n` +
      `${shareUrl}\n\n` +
      `Spell their name. Let it bloom. ✿`
    );
    return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(recipientEmail || '')}&subject=${subject}&body=${body}`;
  }

  /**
   * Generates a direct WhatsApp web/app link.
   */
  generateWhatsAppUrl(recipientName, shareUrl) {
    const text = encodeURIComponent(
      `A little posy & letter for ${recipientName || 'you'} ✿\n\n` +
      `Open and unseal your vintage envelope here:\n` +
      `${shareUrl}`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  }

  /**
   * Triggers the native Web Share API or falls back to clipboard.
   */
  async sharePosy(data) {
    const url = this.generateShareUrl(data);
    const title = `A posy for ${data.recipientName} ✿`;
    const text = `${data.senderName || 'Someone'} left you a blooming posy and handwritten letter!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
        return { method: 'native', success: true };
      } catch (err) {
        if (err.name !== 'AbortError') {
          return this.copyToClipboard(url);
        }
        return { method: 'native', success: false };
      }
    } else {
      return this.copyToClipboard(url);
    }
  }

  /**
   * Copies text to clipboard and shows toast.
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('💌 Secret bloom link copied to clipboard!');
      return { method: 'clipboard', success: true };
    } catch (e) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      this.showToast('💌 Secret bloom link copied to clipboard!');
      return { method: 'clipboard', success: true };
    }
  }

  showToast(message) {
    let toast = document.getElementById('posyToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'posyToast';
      toast.className = 'posy-toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

const shareEngine = new ShareEngine();
