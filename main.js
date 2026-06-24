const { Plugin } = require('obsidian');

module.exports = class LinkSpectrumPlugin extends Plugin {
  constructor(app, manifest) {
    super(app, manifest);
    this.activeAnimationIntervals = new Map();
  }

  async onload() {
    console.log('%c[Link Spectrum]%c Initializing Core System Engine...', 'color: #ff4757; font-weight: bold;', 'color: default;');

    // Inject the baseline text-decoration reset style sheet layers into the DOM head
    this.injectStyles();

    // 1. FOR ALL EDIT MODES (Live Preview, Source View): Standard interval polling loop
    this.registerInterval(
      window.setInterval(() => this.processLegacyLinkSpans(), 1000)
    );

    this.registerEvent(
      this.app.workspace.on('layout-change', () => this.processLegacyLinkSpans())
    );

    // 2. FOR READING VIEW: Core Markdown Post Processor interface
    this.registerMarkdownPostProcessor((element) => {
      const readingModeLinks = element.querySelectorAll('.internal-link, .external-link, a');
      if (readingModeLinks.length > 0) {
        this.attributeAndRegisterHoverEvents(readingModeLinks);
      }
    });
  }

  onunload() {
    console.log('%c[Link Spectrum]%c Removing tracking handlers and restoring styles...', 'color: #ff4757; font-weight: bold;', 'color: default;');
    
    // Clean up all active JavaScript animation frame loops to prevent memory leaks
    this.activeAnimationIntervals.forEach((intervalId) => clearInterval(intervalId));
    this.activeAnimationIntervals.clear();

    const styleEl = document.getElementById('obsidian-link-spectrum-styles');
    if (styleEl) styleEl.remove();
  }

  // Unified logic to read text metrics, stamp structural tokens, and mount hover listeners
  attributeAndRegisterHoverEvents(elements) {
    elements.forEach((el) => {
      const text = el.textContent || '';
      const match = text.match(/[a-zA-Z]/);

      if (match) {
        const firstLetter = match[0].toLowerCase();
        
        // Apply baseline color mapping variable
        if (el.getAttribute('data-alpha-character') !== firstLetter) {
          el.setAttribute('data-alpha-character', firstLetter);
          this.applyAlphabetColor(el, firstLetter);
        }

        // Mount listeners if the target element hasn't been initialized yet
        if (!el.dataset.spectrumBound) {
          el.dataset.spectrumBound = "true";
          
          el.addEventListener('mouseenter', () => this.startSpectrumRotation(el));
          el.addEventListener('mouseleave', () => this.stopSpectrumRotation(el));
        }
      }
    });
  }

  // Deep structural loop processing links inside CodeMirror 5 editors
  processLegacyLinkSpans() {
    // EXTENDED SELECTORS MAP: Adds .cm-hmd-barelink and nested span tracking loops to fully catch Live Preview
    const parentLinks = document.querySelectorAll(
      '.cm-s-obsidian .cm-hmd-internal-link, ' +
      '.cm-s-obsidian .cm-hmd-barelink, ' +
      '.cm-s-obsidian .cm-link, ' +
      '.cm-s-obsidian .cm-url'
    );
    
    if (parentLinks.length === 0) return;
    
    parentLinks.forEach((parent) => {
      // Find text target or fallback cleanly to the element structure itself
      const targetNode = parent.querySelector('span:last-child') || parent;
      if (!targetNode) return;

      const text = targetNode.textContent || '';
      const match = text.match(/[a-zA-Z]/);

      if (match) {
        const firstLetter = match[0].toLowerCase();
        
        if (targetNode.getAttribute('data-alpha-character') !== firstLetter) {
          targetNode.setAttribute('data-alpha-character', firstLetter);
          this.applyAlphabetColor(targetNode, firstLetter);
        }

        // Apply fallback attribute mapping tracking upstream to parent containers to break theme color cascades
        if (parent !== targetNode && parent.getAttribute('data-alpha-character') !== firstLetter) {
          parent.setAttribute('data-alpha-character', firstLetter);
          this.applyAlphabetColor(parent, firstLetter);
        }

        // Mount our smooth JavaScript rotation listeners onto the actionable node
        if (!targetNode.dataset.spectrumBound) {
          targetNode.dataset.spectrumBound = "true";
          targetNode.addEventListener('mouseenter', () => this.startSpectrumRotation(targetNode));
          targetNode.addEventListener('mouseleave', () => this.stopSpectrumRotation(targetNode));
        }
      }
    });
  }

  // Maps individual letters seamlessly into HSL degree configurations
  applyAlphabetColor(element, character) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const idx = alphabet.indexOf(character);
    if (idx !== -1) {
      const hue = Math.round((idx / alphabet.length) * 360);
      element.style.setProperty('color', `hsl(${hue}, 85%, 65%)`, 'important');
    }
  }

  // Drives the live multi-hued text animation sequence safely using an absolute interval timer loop
  startSpectrumRotation(element) {
    if (this.activeAnimationIntervals.has(element)) return;

    let currentHue = 0;
    const intervalId = window.setInterval(() => {
      element.style.setProperty('color', `hsl(${currentHue}, 85%, 65%)`, 'important');
      currentHue = (currentHue + 4) % 360; // 4-degree step increments creates a smooth 4-second spin loop
    }, 45); // ~24 frames per second rendering profile metrics

    this.activeAnimationIntervals.set(element, intervalId);
  }

  // Restores baseline static alphabetical color assignments instantly upon mouse cursor exit
  stopSpectrumRotation(element) {
    if (this.activeAnimationIntervals.has(element)) {
      clearInterval(this.activeAnimationIntervals.get(element));
      this.activeAnimationIntervals.delete(element);
      
      const currentLetter = element.getAttribute('data-alpha-character');
      if (currentLetter) {
        this.applyAlphabetColor(element, currentLetter);
      }
    }
  }

  injectStyles() {
    if (document.getElementById('obsidian-link-spectrum-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'obsidian-link-spectrum-styles';

    // Clears all text lines decoration and structural underlines globally across all view sheets
    styleEl.innerHTML = `
      .cm-s-obsidian .cm-hmd-internal-link,
      .cm-s-obsidian .cm-hmd-internal-link span,
      .cm-s-obsidian .cm-hmd-barelink,
      .cm-s-obsidian .cm-hmd-barelink span,
      .cm-s-obsidian .cm-link, 
      .cm-s-obsidian .cm-url,
      .internal-link, 
      .external-link, 
      .markdown-preview-view a,
      .cm-underline {
        text-decoration: none !important;
        text-decoration-line: none !important;
        border-bottom: none !important;
      }
      
      .cm-s-obsidian .cm-hmd-internal-link:hover,
      .cm-s-obsidian .cm-hmd-internal-link span:hover,
      .cm-s-obsidian .cm-hmd-barelink:hover,
      .cm-s-obsidian .cm-hmd-barelink span:hover,
      .cm-s-obsidian .cm-link:hover,
      .cm-s-obsidian .cm-url:hover,
      .internal-link:hover, 
      .external-link:hover, 
      .markdown-preview-view a:hover,
      .cm-underline:hover {
        text-decoration: none !important;
        text-decoration-line: none !important;
        border-bottom: none !important;
      }
    `;

    document.head.appendChild(styleEl);
  }
};
