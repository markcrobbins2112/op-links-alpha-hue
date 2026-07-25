---
title: SPEC
---

<!-- # TEMPLATE: SPEC.template.md -->
<!-- markdownlint-disable MD013 -->

# SPEC

<!-- TOC location -->
## 🔍 Table of Contents
<!-- Maintained by script -->
- [SPEC](#a-spec) <a id="toc-spec"></a> ^toc-spec
  - [📑 AI Primary Files](#a-aiprimaryfiles) <a id="toc-aiprimaryfiles"></a> ^toc-aiprimaryfiles
  - [🔗 External Application Protocols & URI Schemes](#a-externalapplicationprotocolsurischemes) <a id="toc-externalapplicationprotocolsurischemes"></a> ^toc-externalapplicationprotocolsurischemes
    - [Obsidian Advanced URI Link Contract](#a-obsidianadvancedurilinkcontract) <a id="toc-obsidianadvancedurilinkcontract"></a> ^toc-obsidianadvancedurilinkcontract
  - [💻 Native OS Integration Details](#a-nativeosintegrationdetails) <a id="toc-nativeosintegrationdetails"></a> ^toc-nativeosintegrationdetails
    - [Chromium Sandbox Architecture Mappings](#a-chromiumsandboxarchitecturemappings) <a id="toc-chromiumsandboxarchitecturemappings"></a> ^toc-chromiumsandboxarchitecturemappings
    - [File & Folder Attribute Masks](#a-filefolderattributemasks) <a id="toc-filefolderattributemasks"></a> ^toc-filefolderattributemasks
  - [📋 Originally Requested Specifications](#a-originallyrequestedspecifications) <a id="toc-originallyrequestedspecifications"></a> ^toc-originallyrequestedspecifications
  - [🎯 Implemented Technical Concerns & Optimization Features](#a-implementedtechnicalconcernsoptimizationfeatures) <a id="toc-implementedtechnicalconcernsoptimizationfeatures"></a> ^toc-implementedtechnicalconcernsoptimizationfeatures
  - [🚦 Internal Function Signatures & System Exit Codes](#a-internalfunctionsignaturessystemexitcodes) <a id="toc-internalfunctionsignaturessystemexitcodes"></a> ^toc-internalfunctionsignaturessystemexitcodes
    - [Engine Error / Exit Status Codes](#a-engineerrorexitstatuscodes) <a id="toc-engineerrorexitstatuscodes"></a> ^toc-engineerrorexitstatuscodes
    - [Data Models & State Layouts](#a-datamodelsstatelayouts) <a id="toc-datamodelsstatelayouts"></a> ^toc-datamodelsstatelayouts
  - [🚀 Go to...](#a-goto) <a id="toc-goto"></a> ^toc-goto

<a id="a-spec"></a>[TOC](#toc-spec)

This document compiles the user requirements and instructions from `AGENTS.md` and related files and provides detailed documentation of how the extension was architected and built.

## 📑 AI Primary Files
<a id="a-aiprimaryfiles"></a>[TOC](#toc-aiprimaryfiles)

- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔸 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

---

---

## 🔗 External Application Protocols & URI Schemes
<a id="a-externalapplicationprotocolsurischemes"></a>[TOC](#toc-externalapplicationprotocolsurischemes)

### Obsidian Advanced URI Link Contract
<a id="a-obsidianadvancedurilinkcontract"></a>[TOC](#toc-obsidianadvancedurilinkcontract)
<a id="obsidian-advanced-uri-link-contract"></a>[TOC](#toc-obsidian-advanced-uri-link-contract)

- **Target Schema:** `obsidian://advanced-uri`
- **Query String Map:**

| Parameter | Type | Required | Description / Constraints |
| :--- | :--- | :--- | :--- |
| `vault` | `String` | Yes | Absolute target vault name directory target. Must be URL-encoded (UTF-8). |
| `setting` | `String` | No | Target plugin settings page navigation selector mapping id (`op-links-alpha-hue`). |

---

## 💻 Native OS Integration Details
<a id="a-nativeosintegrationdetails"></a>[TOC](#toc-nativeosintegrationdetails)

### Chromium Sandbox Architecture Mappings
<a id="a-chromiumsandboxarchitecturemappings"></a>[TOC](#toc-chromiumsandboxarchitecturemappings)
<a id="chromium-sandbox-architecture-mappings"></a>[TOC](#toc-chromium-sandbox-architecture-mappings)

- **System Hook Target:** Internal layout tree structures inside Obsidian desktop wrapper binaries.
- **Properties Mapping:**
  - Hardware Acceleration Render Flag (Default): Enabled via GPU page compositor channels.
  - Active Element Thread Context: Dedicated UI rendering thread isolated from heavy file write streams.

### File & Folder Attribute Masks
<a id="a-filefolderattributemasks"></a>[TOC](#toc-filefolderattributemasks)
<a id="file-and-folder-attribute-masks"></a>[TOC](#toc-file-and-folder-attribute-masks)

- **Configuration Context Target:** `.obsidian/plugins/op-links-alpha-hue/.noindex` (Must be set to active to prevent note index algorithms from crawling internal files).
- **Directory Workspace Parent:** The compiled distribution subfolder maps standard client permissions allowing reading node traversals.

---

## 📋 Originally Requested Specifications
<a id="a-originallyrequestedspecifications"></a>[TOC](#toc-originallyrequestedspecifications)

- **Chronological Alphabetical Spectrum Coloring**: Automatically map links to a sequential progression of colors relative to their starting alphanumeric character string.
- **Keyframe Interactivity**: Introduce hardware-accelerated cyclical transformations on mouse cursor interaction thresholds.
- **Obsidian Native Compatibility**: Provide smooth processing without fracturing native theme cascades or breaking live editor environments.

---

## 🎯 Implemented Technical Concerns & Optimization Features
<a id="a-implementedtechnicalconcernsoptimizationfeatures"></a>[TOC](#toc-implementedtechnicalconcernsoptimizationfeatures)

- **Protection Against CodeMirror Layout Crashing**:
  - **The Problem**: Writing over `.className` strings explicitly strips out engine internal management tokens, destroying live styling structures and throwing cursor caret drop errors.
  - **The Solution / Code Implementation**: Migrated logic to target explicit class list modifications via `element.classList.add()` and `element.classList.remove()`.

- **Asynchronous Event Garbage Collection Management**:
  - **The Problem**: Re-rendering heavy directories creates thousands of detached DOM elements, stranding running animation loops in memory.
  - **The Solution / Code Implementation**: Formed an explicit tracking repository using the `boundMouseHandlers` map cache to capture closure handlers by item references for automated teardown on plugin unloads.

---

## 🚦 Internal Function Signatures & System Exit Codes
<a id="a-internalfunctionsignaturessystemexitcodes"></a>[TOC](#toc-internalfunctionsignaturessystemexitcodes)

### Engine Error / Exit Status Codes
<a id="a-engineerrorexitstatuscodes"></a>[TOC](#toc-engineerrorexitstatuscodes)
<a id="engine-error-exit-status-codes"></a>[TOC](#toc-engine-error-exit-status-codes)

| Code (Integer) | Semantic Definition | Trigger Condition |
| :--- | :--- | :--- |
| `0` | `Success` | Complete flawless lifecycle plugin termination. |
| `1` | `ERR_DOM_UNAVAILABLE` | Script executed inside an inaccessible window context or invalid document layout node leaf. |
| `2` | `ERR_REFERENCE_LEAK` | Element mapping registry tracking fails to clear its tracking queues during layout sweeps. |

---

### Data Models & State Layouts
<a id="a-datamodelsstatelayouts"></a>[TOC](#toc-datamodelsstatelayouts)

<details>
<summary>🖥️ State Registry Map</summary>

```json
{
  "activeAnimationIntervals": {
    "HTMLSpanElement_Reference": 1402
  },
  "boundMouseHandlers": {
    "HTMLSpanElement_Reference": {
      "enter": "FunctionBoundClosure",
      "leave": "FunctionBoundClosure"
    }
  }
}
```
</details>

---

## 🚀 Go to...
<a id="a-goto"></a>[TOC](#toc-goto)

- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔸 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

<!-- TEMPLATE: SPEC.template.md -->
