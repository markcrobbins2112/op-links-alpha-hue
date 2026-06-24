const { Plugin } = require('obsidian');

module.exports = class LinkSpectrumPlugin extends Plugin {
  async onload() {
    console.log('%c[Link Spectrum]%c Initializing Core System Engine...', 'color: #ff4757; font-weight: bold;', 'color: default;');

    // Inject the required custom spectrum stylesheet layer into the DOM head
    this.injectStyles();

    // 1. FOR LIVE PREVIEW / EDIT / SOURCE MODE: Polling sweep looking for legacy parent link wrappers
    this.registerInterval(
      window.setInterval(() => this.processLegacyLinkSpans(), 1000)
    );

    // Re-run the processor immediately when the workspace view state changes
    this.registerEvent(
      this.app.workspace.on('layout-change', () => {
        console.log('[Link Spectrum] Layout change event caught, forcing instant viewport sweep.');
        this.processLegacyLinkSpans();
      })
    );
  }

  onunload() {
    console.log('%c[Link Spectrum]%c Unloading components and cleaning DOM trees...', 'color: #ff4757; font-weight: bold;', 'color: default;');
    const styleEl = document.getElementById('obsidian-link-spectrum-styles');
    if (styleEl) styleEl.remove();
  }

  // Locates parent containers, finds the target span, reads it, and stamps the attribute token
  processLegacyLinkSpans() {
    // Select all potential target link parent containers active in the DOM tree across all view modes
    const parentLinks = document.querySelectorAll('.cm-s-obsidian .cm-hmd-internal-link, .cm-s-obsidian .cm-link, .cm-s-obsidian .cm-url');
    
    if (parentLinks.length === 0) {
      console.debug('[Link Spectrum Scan] Heartbeat check: 0 active parent link selectors found in view.');
      return;
    }

    console.log(`[Link Spectrum Scan] Found ${parentLinks.length} target parent link container wrappers in active viewport.`);
    
    parentLinks.forEach((parent, index) => {
      // FIX FOR SOURCE VIEW: Look for the last child span. If none exists (flat link layout), fallback to the parent element itself.
      const lastSpan = parent.querySelector('span:last-child') || parent;
      
      if (!lastSpan) {
        console.warn(`[Link Spectrum Warning] Item [${index}] missing a valid element block mapping layout inside parent:`, parent);
        return;
      }

      const text = lastSpan.textContent || '';
      const match = text.match(/[a-zA-Z]/);

      if (match) {
        // Extract index [0] from the match results array before casting lowercase conversion
        const firstLetter = match[0].toLowerCase();
        
        console.log(`[Link Spectrum Match] Item [${index}] Text: "${text}" ➔ Letter resolved: "${firstLetter}"`);
        
        // Update the mutation state attribute ONLY if it changed to keep rendering fast
        if (lastSpan.getAttribute('data-alpha-character') !== firstLetter) {
          lastSpan.setAttribute('data-alpha-character', firstLetter);
          console.log(`%c[Link Spectrum Mutation]%c Stamped attribute [data-alpha-character="${firstLetter}"] onto target element successfully.`, 'color: #2ed573; font-weight: bold;', 'color: default;');
        }
      } else {
        console.log(`[Link Spectrum Skip] Item [${index}] contains no alphabetical parameters. Raw Text string content read: "${text}"`);
      }
    });
  }

  injectStyles() {
    if (document.getElementById('obsidian-link-spectrum-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'obsidian-link-spectrum-styles';

    let cssRules = `
      /* Clear standard text decorations rules globally across system paths, ensuring zero underlines on hover */
      .cm-s-obsidian .cm-hmd-internal-link span,
      .cm-s-obsidian .cm-link, 
      .cm-s-obsidian .cm-url,
      .internal-link, 
      .external-link, 
      .markdown-preview-view a {
        text-decoration: none !important;
        text-decoration-line: none !important;
        transition: color 0.3s ease;
      }
      
      .cm-s-obsidian span.cm-hmd-internal-link:hover,
      .cm-hmd-internal-link:hover,
      .cm-s-obsidian .cm-link:hover,
      .cm-s-obsidian .cm-url:hover,
      .cm-link .cm-underline, 
      .cm-link .cm-underline:hover, 
      .cm-url .cm-underline,
      .cm-url .cm-underline:hover {
        text-decoration: none !important;
        text-decoration-line: none !important;
      }
    `;

    // Map characters 'a' through 'z' (0 to 25 steps) across 360 degrees of hue
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < alphabet.length; i++) {
      const char = alphabet[i];
      const hue = Math.round((i / alphabet.length) * 360);
      
      // Extended CSS rules to directly hook into flat Source View link classes carrying your attribute token
      cssRules += `
        .cm-s-obsidian .cm-hmd-internal-link span[data-alpha-character="${char}"],
        .cm-s-obsidian .cm-link[data-alpha-character="${char}"],
        .cm-s-obsidian .cm-url[data-alpha-character="${char}"],
        [data-alpha-character="${char}"] {
          color: hsl(${hue}, 85%, 65%) !important;
        }
      `;
    }

    // Pure CSS @keyframes color animation loops for hovered link states across all views
    cssRules += `
      .cm-s-obsidian .cm-hmd-internal-link span:hover,
      .cm-s-obsidian .cm-link:hover,
      .cm-s-obsidian .cm-url:hover,
      .internal-link:hover, 
      .external-link:hover, 
      .markdown-preview-view a:hover {
        animation: linkSpectrumRotate 4s linear infinite !important;
      }

      @keyframes linkSpectrumRotate {
        0%   { color: hsl(0, 85%, 65%) !important; }
        25%  { color: hsl(90, 85%, 65%) !important; }
        50%  { color: hsl(180, 85%, 65%) !important; }
        75%  { color: hsl(270, 85%, 65%) !important; }
        100% { color: hsl(360, 85%, 65%) !important; }
      }
    `;

    styleEl.innerHTML = cssRules;
    document.head.appendChild(styleEl);
    console.log('[Link Spectrum] Global layout CSS color palette variables registered successfully.');
  }
};
