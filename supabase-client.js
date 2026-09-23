/**
 * POSYTEXTS.COM — Supabase Database Client & Cloud Persistence
 * Handles permanent cloud storage of letters, bouquets, and opened status.
 * Seamlessly falls back to Base64 URLs if Supabase is not yet configured or offline.
 * 
 * Creator: Shruti Arya · miss.shrutiarya@gmail.com
 */

class PosySupabaseClient {
  constructor() {
    // 1. Default config from window, localStorage, or environment
    this.url = window.POSY_SUPABASE_URL || localStorage.getItem('posy_supabase_url') || 'https://vhporunwvvvavynocllt.supabase.co';
    this.anonKey = window.POSY_SUPABASE_ANON_KEY || localStorage.getItem('posy_supabase_anon_key') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocG9ydW53dnZ2YXZ5bm9jbGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNjkwNDgsImV4cCI6MjEwNTc0NTA0OH0.vPnm3nP23_5gMJu1kC2NFlE54YcZD7pDqJ95zeEcEfs';
    this.client = null;

    this.initClient();
  }

  /**
   * Initializes the Supabase JS SDK client if credentials are present.
   */
  initClient() {
    if (this.isConfigured() && window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        this.client = window.supabase.createClient(this.url, this.anonKey);
        console.log('[Supabase] Posytexts cloud database connected! 🌸');
      } catch (err) {
        console.warn('[Supabase] Initialization warning:', err);
        this.client = null;
      }
    }
  }

  /**
   * Checks if valid Supabase credentials are configured.
   */
  isConfigured() {
    return (
      typeof this.url === 'string' &&
      this.url.startsWith('https://') &&
      typeof this.anonKey === 'string' &&
      this.anonKey.length > 20
    );
  }

  /**
   * Updates Supabase credentials dynamically (stored in localStorage).
   */
  setCredentials(url, anonKey) {
    this.url = (url || '').trim();
    this.anonKey = (anonKey || '').trim();

    if (this.url) localStorage.setItem('posy_supabase_url', this.url);
    else localStorage.removeItem('posy_supabase_url');

    if (this.anonKey) localStorage.setItem('posy_supabase_anon_key', this.anonKey);
    else localStorage.removeItem('posy_supabase_anon_key');

    this.initClient();
  }

  /**
   * Generates a clean, friendly posy ID.
   */
  generatePosyId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `posy_${timestamp}_${random}`;
  }

  /**
   * Saves a letter and bouquet to Supabase.
   * If Supabase is unavailable, seamlessly provides Base64 fallback so it NEVER fails.
   */
  async savePosy(letterData) {
    const posyId = this.generatePosyId();
    const row = {
      id: posyId,
      recipient_name: letterData.recipientName || 'Friend',
      recipient_email: letterData.recipientEmail || null,
      sender_name: letterData.senderName || '',
      sender_email: letterData.senderEmail || null,
      message: letterData.message || '',
      paper_style: letterData.paperStyle || 'vintage-cream',
      font_style: letterData.fontStyle || 'font-handwriting',
      stickers: letterData.stickers || [],
      opened: false,
      created_at: new Date().toISOString()
    };

    // 1. If Supabase is connected, save directly to Cloud DB
    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('posies')
          .insert([row])
          .select();

        if (!error) {
          const origin = window.location.origin + window.location.pathname;
          const shareUrl = `${origin}?id=${posyId}`;
          console.log('[Supabase] Saved posy successfully with ID:', posyId);
          return {
            success: true,
            id: posyId,
            shareUrl,
            storage: 'supabase'
          };
        } else {
          console.warn('[Supabase] Insert notice, falling back to local/base64:', error.message);
        }
      } catch (e) {
        console.warn('[Supabase] Request notice, using fallback:', e);
      }
    }

    // 2. Secondary backend sync if server.py is running
    try {
      const resp = await fetch('/api/posy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(letterData)
      });
      if (resp.ok) {
        const json = await resp.json();
        if (json.id) {
          const origin = window.location.origin + window.location.pathname;
          return {
            success: true,
            id: json.id,
            shareUrl: `${origin}?id=${json.id}`,
            storage: 'server'
          };
        }
      }
    } catch (e) {
      // Local server not running or static mode - perfectly fine
    }

    // 3. Bulletproof Fallback: Self-Contained Base64 URL (Never expires!)
    const fallbackUrl = window.shareEngine
      ? window.shareEngine.generateShareUrl(letterData)
      : `${window.location.origin}?posy=${encodeURIComponent(JSON.stringify(letterData))}`;

    return {
      success: true,
      id: null,
      shareUrl: fallbackUrl,
      storage: 'url-payload'
    };
  }

  /**
   * Retrieves a posy by ID from Supabase (or local server).
   */
  async getPosy(posyId) {
    if (!posyId) return null;

    // 1. Try Supabase cloud database
    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('posies')
          .select('*')
          .eq('id', posyId)
          .single();

        if (data && !error) {
          // Asynchronously mark posy as opened
          this.markAsOpened(posyId);

          return {
            id: data.id,
            recipientName: data.recipient_name,
            recipientEmail: data.recipient_email,
            senderName: data.sender_name,
            senderEmail: data.sender_email,
            message: data.message,
            paperStyle: data.paper_style || 'vintage-cream',
            fontStyle: data.font_style || 'font-handwriting',
            stickers: data.stickers || [],
            opened: data.opened,
            createdAt: data.created_at
          };
        }
      } catch (err) {
        console.warn('[Supabase] Fetch error:', err);
      }
    }

    // 2. Try local server API (/api/posy/:id)
    try {
      const resp = await fetch(`/api/posy/${encodeURIComponent(posyId)}`);
      if (resp.ok) {
        const data = await resp.json();
        return {
          id: posyId,
          recipientName: data.recipientName || data.recipient_name,
          recipientEmail: data.recipientEmail || data.recipient_email,
          senderName: data.senderName || data.sender_name,
          senderEmail: data.senderEmail || data.sender_email,
          message: data.message,
          paperStyle: data.paperStyle || data.paper_style || 'vintage-cream',
          fontStyle: data.fontStyle || data.font_style || 'font-handwriting',
          stickers: data.stickers || [],
          opened: data.opened || false,
          createdAt: data.createdAt || data.created_at
        };
      }
    } catch (e) {
      // Offline / static host
    }

    return null;
  }

  /**
   * Marks a posy as unsealed and viewed.
   */
  async markAsOpened(posyId) {
    if (!this.client || !posyId) return;
    try {
      await this.client
        .from('posies')
        .update({
          opened: true,
          opened_at: new Date().toISOString()
        })
        .eq('id', posyId);
    } catch (e) {
      console.warn('[Supabase] Could not update opened status:', e);
    }
  }
}

// Global instance
window.posySupabase = new PosySupabaseClient();
