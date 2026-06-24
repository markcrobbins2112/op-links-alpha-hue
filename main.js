const { Plugin } = require('obsidian');

module.exports = class LinkSpectrumPlugin extends Plugin {
  async onload() {
    console.log('%c[Link Spectrum]%c Initializing Core System Engine...', 'color: #ff4757; font-weight: bold;', 'color: default;');

    // Inject the custom spectrum stylesheet layer into the DOM head
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
    const parentLinks = document.querySelectorAll('.cm-s-obsidian .cm-hmd-internal-link, .cm-s-obsidian .cm-link, .cm-s-obsidian .cm-url');
    
    if (parentLinks.length === 0) {
      return;
    }
    
    parentLinks.forEach((parent) => {
      const lastSpan = parent.querySelector('span:last-child') || parent;
      if (!lastSpan) return;

      const text = lastSpan.textContent || '';
      const match = text.match(/[a-zA-Z]/);

      if (match) {
        const firstLetter = match[0].toLowerCase();
        if (lastSpan.getAttribute('data-alpha-character') !== firstLetter) {
          lastSpan.setAttribute('data-alpha-character', firstLetter);
        }
      }
    });
  }

  injectStyles() {
    if (document.getElementById('obsidian-link-spectrum-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'obsidian-link-spectrum-styles';

    let cssRules = `
      /* State 1: Reset lines, clear text-decorations, and manage base layout values */
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
      
      /* Enforce absolute suppression of underlines on hover states across layouts */
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
      
      /* State 2: Dynamic hover trigger overrides. Turns text transparent ONLY during active hover events */
      .cm-s-obsidian .cm-hmd-internal-link span:hover,
      .cm-s-obsidian .cm-link:hover,
      .cm-s-obsidian .cm-url:hover,
      .internal-link:hover, 
      .external-link:hover, 
      .markdown-preview-view a:hover {
        background-image: linear-gradient(to right, hsl(0, 85%, 65%), hsl(90, 85%, 65%), hsl(180, 85%, 65%), hsl(270, 85%, 65%), hsl(360, 85%, 65%)) !important;
        background-size: 200% auto !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        color: transparent !important;
        animation: linkSpectrumShift 3s linear infinite !important;
      }
    `;

    // Map characters 'a' through 'z' (0 to 25 steps) across 360 degrees of hue for standard link view states
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < alphabet.length; i++) {
      const char = alphabet[i];
      const hue = Math.round((i / alphabet.length) * 360);
      
      // Selectors specifically target only non-hovered items, restoring their proper baseline coloring
      cssRules += `
        .cm-s-obsidian .cm-hmd-internal-link span[data-alpha-character="${char}"]:not(:hover),
        .cm-s-obsidian .cm-link[data-alpha-character="${char}"]:not(:hover),
        .cm-s-obsidian .cm-url[data-alpha-character="${char}"]:not(:hover),
        [data-alpha-character="${char}"]:not(:hover) {
          color: hsl(${hue}, 85%, 65%) !important;
          background-image: none !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
        }
      `;
    }

    // Hardware-accelerated background-position shift pattern sequence
    cssRules += `
      @keyframes linkSpectrumShift {
        0% {
          background-position: 0% center;
        }
        100% {
          background-position: 200% center;
        }
      }
    `;

    styleEl.innerHTML = cssRules;
    document.head.appendChild(styleEl);
    console.log('[Link Spectrum] Global layout CSS color palette variables registered successfully.');
  }
};
