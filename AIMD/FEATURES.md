---
title: FEATURES
---

<!-- # TEMPLATE: FEATURES.template.md -->
<!-- markdownlint-disable MD013 -->

# FEATURES

<!-- TOC location -->
## 🔍 Table of Contents
<!-- Maintained by script -->
- [FEATURES](#a-features) <a id="toc-features"></a> ^toc-features
  - [📑 AI Primary Files](#a-aiprimaryfiles) <a id="toc-aiprimaryfiles"></a> ^toc-aiprimaryfiles
  - [📦 Feature Groups](#a-featuregroups) <a id="toc-featuregroups"></a> ^toc-featuregroups
    - [🎨 1. Chronological Spectrum Mapping](#a-1chronologicalspectrummapping) <a id="toc-1chronologicalspectrummapping"></a> ^toc-1chronologicalspectrummapping
    - [🔄 2. Dynamic Interactive Mechanics](#a-2dynamicinteractivemechanics) <a id="toc-2dynamicinteractivemechanics"></a> ^toc-2dynamicinteractivemechanics
  - [🗄️ All Features](#a-allfeatures) <a id="toc-allfeatures"></a> ^toc-allfeatures
    - [Alphabetical Color Categorization](#a-alphabeticalcolorcategorization) <a id="toc-alphabeticalcolorcategorization"></a> ^toc-alphabeticalcolorcategorization
    - [Chronos Keyframe Spin Rotation](#a-chronoskeyframespinrotation) <a id="toc-chronoskeyframespinrotation"></a> ^toc-chronoskeyframespinrotation
    - [Leak-Proof Handlers Sanitization](#a-leakproofhandlerssanitization) <a id="toc-leakproofhandlerssanitization"></a> ^toc-leakproofhandlerssanitization
    - [Multi-View DOM Injection](#a-multiviewdominjection) <a id="toc-multiviewdominjection"></a> ^toc-multiviewdominjection
  - [📉 Deprecated / Removed Features](#a-deprecatedremovedfeatures) <a id="toc-deprecatedremovedfeatures"></a> ^toc-deprecatedremovedfeatures
  - [🚀 Go to...](#a-goto) <a id="toc-goto"></a> ^toc-goto

<a id="a-features"></a>[TOC](#toc-features)

Welcome to the Link Spectrum Colorizer! This plugin enhances personal knowledge mapping by automatically categorizing and styling document links using a chronological color wheel. By organizing data visually by alphabetical progression and introducing hover animations, it dramatically accelerates navigation layouts and node parsing speed across heavy note layouts.

---

## 📑 AI Primary Files
<a id="a-aiprimaryfiles"></a>[TOC](#toc-aiprimaryfiles)

- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔸 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

---

---

## 📦 Feature Groups
<a id="a-featuregroups"></a>[TOC](#toc-featuregroups)

### 🎨 1. Chronological Spectrum Mapping
<a id="a-1chronologicalspectrummapping"></a>[TOC](#toc-1chronologicalspectrummapping)
<a id="z1"></a><a id="toc-chronological-spectrum-mapping"></a>
This foundational feature group processes text characters and maps them sequentially to distinct hues across the global browser HSL color spectrum wheel.

- **[Alphabetical Color Categorization](#alphabetical-color-categorization)** - Automatically applies unique static background/foreground HSL hues corresponding to the link text's first letter.
- **[Multi-View DOM Injection](#multi-view-dom-injection)** - Intercepts and parses element layouts across Live Preview, Reading View, and Source View contexts.

### 🔄 2. Dynamic Interactive Mechanics
<a id="a-2dynamicinteractivemechanics"></a>[TOC](#toc-2dynamicinteractivemechanics)
<a id="z2"></a><a id="toc-dynamic-interactive-mechanics"></a>
This group drives the hardware-accelerated user interaction animations, introducing spatial motion cues without impacting typography stability.

- **[Chronos Keyframe Spin Rotation](#chronos-keyframe-spin-rotation)** - Triggers a cyclical 360-degree rainbow hue twist when the cursor passes over link boundaries.
- **[Leak-Proof Handlers Sanitization](#leak-proof-handlers-sanitization)** - Isolates memory reference leaks by binding unique pointer maps to specific active leaf notes.

---

## 🗄️ All Features
<a id="a-allfeatures"></a>[TOC](#toc-allfeatures)

### Alphabetical Color Categorization
<a id="a-alphabeticalcolorcategorization"></a>[TOC](#toc-alphabeticalcolorcategorization)
<a id="alphabetical-color-categorization"></a>[TOC](#toc-chronological-spectrum-mapping)
- **Group:** [Chronological Spectrum Mapping](#z1)
The plugin checks visible alphanumeric string characters on load and assigns targeted signature classes. These hooks divide the English alphabet into distinct morning, midday, evening, and midnight theme segments.

### Chronos Keyframe Spin Rotation
<a id="a-chronoskeyframespinrotation"></a>[TOC](#toc-chronoskeyframespinrotation)
<a id="chronos-keyframe-spin-rotation"></a>[TOC](#toc-dynamic-interactive-mechanics)
- **Group:** [Dynamic Interactive Mechanics](#z2)
Leverages GPU optimization layers using `transform: rotate()` and scale matrices. The link twists 360 degrees and temporarily flares bright, providing an interactive, tactile tracking response.

### Leak-Proof Handlers Sanitization
<a id="a-leakproofhandlerssanitization"></a>[TOC](#toc-leakproofhandlerssanitization)
<a id="leak-proof-handlers-sanitization"></a>[TOC](#toc-dynamic-interactive-mechanics)
- **Group:** [Dynamic Interactive Mechanics](#z2)
Instead of relying on global document hooks, this feature maps precise reference pairs into an internal runtime tracking object. This ensures automated pointer cleanup when switching views or note leaves.

### Multi-View DOM Injection
<a id="a-multiviewdominjection"></a>[TOC](#toc-multiviewdominjection)
<a id="multi-view-dom-injection"></a>[TOC](#toc-chronological-spectrum-mapping)
- **Group:** [Chronological Spectrum Mapping](#z1)
Integrates a continuous layout parser that targets standard CodeMirror 6 inline link tokens alongside Preview markdown anchors, ensuring styling consistency regardless of view state.

---

## 📉 Deprecated / Removed Features
<a id="a-deprecatedremovedfeatures"></a>[TOC](#toc-deprecatedremovedfeatures)

- **[!] Raw Native Class Manipulation:** Overwriting the element `.className` string was legacy tagged and stripped out because it caused caret position drops and broke core CodeMirror syntax parsing engines.
- **Replacement Pattern:** Migrated entirely to target class lists via explicit token manipulation (`classList.add` / `classList.remove`), preserving external framework styles.

---

## 🚀 Go to...
<a id="a-goto"></a>[TOC](#toc-goto)

- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔸 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

<!-- TEMPLATE: FEATURES.template.md -->
