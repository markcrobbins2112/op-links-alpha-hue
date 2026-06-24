const { Plugin } = require('obsidian');

module.exports = class LinkSpectrumPlugin extends Plugin {
  async onload() {
    console.log('%c[Link Spectrum]%c Initializing Core System Engine...', 'color: #ff4757; font-weight: bold;', 'color: default;');

    // Inject the required custom spectrum stylesheet layer into the DOM head
    this.injectStyles();

    // 1. FOR LIVE PREVIEW / EDIT / SOURCE MODE: Polling sweep looking for active editor link elements
    this.registerInterval(
      window.setInterval(() => this.processLegacyLinkSpans(), 1000)
    );

    // Re-run the editor processor immediately when views toggle or files layout changes
    this.registerEvent(
      this.app.workspace.on('layout-change', () => {
        console.log('[Link Spectrum] Layout change event caught, forcing instant viewport sweep.');
        this.processLegacyLinkSpans();
      })
    );

    // 2. FOR READING VIEW: Register Markdown Post Processor to inject attributes onto static HTML anchors
    this.registerMarkdownPostProcessor((element) => {
      // Select all internal, external, and standard HTML link components rendered in the reading container
      const readingModeLinks = element.querySelectorAll('.internal-link, .external-link, a');
      if (readingModeLinks.length > 0) {
        this.attributeReadingElements(readingModeLinks);
      }
    });
  }

  onunload() {
    console.log('%c[Link Spectrum]%c Unloading components and cleaning DOM trees...', 'color: #ff4757; font-weight: bold;', 'color: default;');
    const styleEl = document.getElementById('obsidian-link-spectrum-styles');
    if (styleEl) styleEl.remove();
  }

  // Helper method to scan and attribute static element arrays (Used exclusively for Reading View)
  attributeReadingElements(elements) {
    elements.forEach((el) => {
      const text = el.textContent || '';
      const match = text.match(/[a-zA-Z]/);

      if (match) {
        const firstLetter = match[0].toLowerCase();
        if (el.getAttribute('data-alpha-character') !== firstLetter) {
          el.setAttribute('data-alpha-character', firstLetter);
        }
      }
    });
  }

  // Locates parent containers in active editing buffers, finds target nodes, and stamps tokens
  processLegacyLinkSpans() {
    // Select all potential target link containers active across Editor/Source view states
    const parentLinks = document.querySelectorAll('.cm-s-obsidian .cm-hmd-internal-link, .cm-s-obsidian .cm-link, .cm-s-obsidian .cm-url');
    
    if (parentLinks.length === 0) {
      console.debug('[Link Spectrum Scan] Heartbeat check: 0 active editor link selectors found in view.');
      return;
    }

    console.log(`[Link Spectrum Scan] Found ${parentLinks.length} target parent link container wrappers in active viewport.`);
    
    parentLinks.forEach((parent, index) => {
      // Look for last child span element layer; fallback safely to parent token if layout is flat text string
      const lastSpan = parent.querySelector('span:last-child') || parent;
      
      if (!lastSpan) {
        console.warn(`[Link Spectrum Warning] Item [${index}] missing a valid element block mapping layout inside parent:`, parent);
        return;
      }

      const text = lastSpan.textContent || '';
      const match = text.match(/[a-zA-Z]/);

      if (match) {
        const firstLetter = match[0].toLowerCase();
        
        console.log(`[Link Spectrum Match] Item [${index}] Text: "${text}" ➔ Letter resolved: "${firstLetter}"`);
        
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
      .cm-url .cm-underline:hover,
      .markdown-preview-view a:hover {
        text-decoration: none !important;
        text-decoration-line: none !important;
      }
    `;

    // Map characters 'a' through 'z' (0 to 25 steps) across 360 degrees of hue
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < alphabet.length; i++) {
      const char = alphabet[i];
      const hue = Math.round((i / alphabet.length) * 360);
      
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
