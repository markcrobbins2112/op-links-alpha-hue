const { Plugin } = require('obsidian');

module.exports = class LinkSpectrumPlugin extends Plugin {
  constructor(app, manifest) {
    super(app, manifest);
    this.activeAnimationIntervals = new Map();
    this.observer = null;
  }

  async onload() {
    console.log('%c[Link Spectrum]%c Initializing High-Performance Uniform Engine...', 'color: #ff4757; font-weight: bold;', 'color: default;');

    // 1. Inject the baseline clears and color rules into the global DOM context
    this.injectStyles();

    // 2. FOR ALL EDIT MODES (Live Preview & Source View): Register real-time layout interceptor
    this.initializeObserver();

    // 3. FOR READING VIEW: Standard Markdown Post Processor interface
    this.registerMarkdownPostProcessor((element) => {
      const readingModeLinks = element.querySelectorAll('.internal-link, .external-link, a');
      if (readingModeLinks.length > 0) {
        this.processElementsArray(readingModeLinks);
      }
    });

    // Run an initial structural sweep right at startup to color existing text
    this.app.workspace.onLayoutReady(() => this.sweepActiveViewport());
    this.registerEvent(this.app.workspace.on('layout-change', () => this.sweepActiveViewport()));
    this.registerEvent(this.app.workspace.on('active-leaf-change', () => this.sweepActiveViewport()));
  }

  onunload() {
    console.log('%c[Link Spectrum]%c Removing tracking handlers and restoring styles...', 'color: #ff4757; font-weight: bold;', 'color: default;');
    
    if (this.observer) this.observer.disconnect();

    this.activeAnimationIntervals.forEach((intervalId) => clearInterval(intervalId));
    this.activeAnimationIntervals.clear();

    const styleEl = document.getElementById('obsidian-link-spectrum-styles');
    if (styleEl) styleEl.remove();
  }

  // Monitor DOM modifications instantly to process new links the exact millisecond they hit the viewport
  initializeObserver() {
    this.observer = new MutationObserver((mutations) => {
      let shouldSweep = false;
      for (let i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0) {
          shouldSweep = true;
          break;
        }
      }
      if (shouldSweep) {
        const links = document.querySelectorAll('.cm-s-obsidian .cm-hmd-internal-link, .cm-s-obsidian .cm-hmd-barelink, .cm-s-obsidian .cm-link, .cm-s-obsidian .cm-url, .cm-editor .cm-link, .cm-editor .cm-hmd-internal-link');
        if (links.length > 0) this.processElementsArray(links);
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  sweepActiveViewport() {
    const links = document.querySelectorAll('.cm-s-obsidian .cm-hmd-internal-link, .cm-s-obsidian .cm-hmd-barelink, .cm-s-obsidian .cm-link, .cm-s-obsidian .cm-url, .cm-editor .cm-link, .cm-editor .cm-hmd-internal-link, .internal-link, .external-link, .markdown-preview-view a');
    if (links.length > 0) this.processElementsArray(links);
  }

  // Core array parsing tracker
  processElementsArray(elements) {
    elements.forEach((parent) => {
      // Find the specific text node layer or fallback to the element wrapper itself
      const targetNode = parent.querySelector('span:last-child') || parent;
      if (!targetNode || this.activeAnimationIntervals.has(targetNode)) return;

      const text = targetNode.textContent || '';
      const match = text.match(/[a-zA-Z]/);

      if (match) {
        const firstLetter = match[0].toLowerCase();
        const targetClass = `cm-spectrum-${firstLetter}`;

        // STAMP CLASS ONLY: Mutating the class list string avoids caret reflow glitches entirely
        if (!targetNode.classList.contains(targetClass)) {
          targetNode.className = targetNode.className.replace(/\bcm-spectrum-[a-z]\b/g, '');
          targetNode.classList.add(targetClass);
        }

        // Apply class tracking upstream to parent tokens to break complex theme color cascades
        if (parent !== targetNode && !parent.classList.contains(targetClass)) {
          parent.className = parent.className.replace(/\bcm-spectrum-[a-z]\b/g, '');
          parent.classList.add(targetClass);
        }

        // Securely register the mouse hover tracking listeners
        if (!targetNode.dataset.spectrumBound) {
          targetNode.dataset.spectrumBound = "true";
          targetNode.addEventListener('mouseenter', () => this.startSpectrumRotation(targetNode));
          targetNode.addEventListener('mouseleave', () => this.stopSpectrumRotation(targetNode));
        }
      }
    });
  }

  // Drives the live multi-hued text animation sequence using direct inline style property locks
  startSpectrumRotation(element) {
    if (this.activeAnimationIntervals.has(element)) return;

    let currentHue = 0;
    const intervalId = window.setInterval(() => {
      element.style.setProperty('color', `hsl(${currentHue}, 85%, 65%)`, 'important');
      currentHue = (currentHue + 4) % 360; // Smooth 4-second spin loop
    }, 45);

    this.activeAnimationIntervals.set(element, intervalId);
  }

  // Restores baseline static alphabetical color assignments instantly upon mouse cursor exit
  stopSpectrumRotation(element) {
    if (this.activeAnimationIntervals.has(element)) {
      clearInterval(this.activeAnimationIntervals.get(element));
      this.activeAnimationIntervals.delete(element);
      
      // Wipe the inline modification completely so native CSS engine style sheets resume control
      element.style.removeProperty('color');
    }
  }

  injectStyles() {
    if (document.getElementById('obsidian-link-spectrum-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'obsidian-link-spectrum-styles';

    let cssRules = `
      /* Universal Reset: Clear all underlines and structural text-decorations globally across all views */
      .cm-s-obsidian .cm-hmd-internal-link,
      .cm-s-obsidian .cm-hmd-internal-link span,
      .cm-s-obsidian .cm-hmd-barelink,
      .cm-s-obsidian .cm-hmd-barelink span,
      .cm-s-obsidian .cm-link, 
      .cm-s-obsidian .cm-url,
      .cm-editor .cm-link,
      .cm-editor .cm-hmd-internal-link,
      .internal-link, 
      .external-link, 
      .markdown-preview-view a,
      .cm-underline,
      [class*="cm-spectrum-"] {
        text-decoration: none !important;
        text-decoration-line: none !important;
        border-bottom: none !important;
        transition: color 0.3s ease;
      }
    `;

    // Map characters 'a' through 'z' (0 to 25 steps) across 360 degrees of hue
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < alphabet.length; i++) {
      const char = alphabet[i];
      const hue = Math.round((i / alphabet.length) * 360);
      
      // Hook rules explicitly into both legacy and modern class structures
      cssRules += `
        .cm-s-obsidian .cm-spectrum-${char},
        .cm-editor .cm-spectrum-${char},
        .markdown-preview-view .cm-spectrum-${char},
        .cm-spectrum-${char} {
          color: hsl(${hue}, 85%, 65%) !important;
        }
      `;
    }

    styleEl.innerHTML = cssRules;
    document.head.appendChild(styleEl);
  }
};
