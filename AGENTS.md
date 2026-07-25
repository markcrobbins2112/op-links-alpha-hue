---
title: AGENTS
---

<!-- # TEMPLATE: AGENTS.template.md -->
<!-- markdownlint-disable MD013 -->

# AGENTS

<!-- TOC location -->
## 🔍 Table of Contents
<!-- Maintained by script -->
- [AGENTS](#a-agents) <a id="toc-agents"></a> ^toc-agents
  - [📑 AI Primary Files](#a-aiprimaryfiles) <a id="toc-aiprimaryfiles"></a> ^toc-aiprimaryfiles
  - [💻 Application](#a-application) <a id="toc-application"></a> ^toc-application
  - [⚙️ Platform](#a-platform) <a id="toc-platform"></a> ^toc-platform
  - [👥 Core Agent Roster & Personas](#a-coreagentrosterpersonas) <a id="toc-coreagentrosterpersonas"></a> ^toc-coreagentrosterpersonas
    - [1. UI Performance Architect](#a-1uiperformancearchitect) <a id="toc-1uiperformancearchitect"></a> ^toc-1uiperformancearchitect
      - [role](#a-role) <a id="toc-role"></a> ^toc-role
  - [🛠️ Global Execution Rules & Governance](#a-globalexecutionrulesgovernance) <a id="toc-globalexecutionrulesgovernance"></a> ^toc-globalexecutionrulesgovernance
  - [🚫 File Restrictions](#a-filerestrictions) <a id="toc-filerestrictions"></a> ^toc-filerestrictions
    - [Do NOT alter Files](#a-donotalterfiles) <a id="toc-donotalterfiles"></a> ^toc-donotalterfiles
    - [Inline Tasks](#a-inlinetasks) <a id="toc-inlinetasks"></a> ^toc-inlinetasks
  - [📂 Project Context](#a-projectcontext) <a id="toc-projectcontext"></a> ^toc-projectcontext
  - [🚦 Interaction Rules & Handoff Protocols](#a-interactionruleshandoffprotocols) <a id="toc-interactionruleshandoffprotocols"></a> ^toc-interactionruleshandoffprotocols
    - [Multi-Agent Communication Style](#a-multiagentcommunicationstyle) <a id="toc-multiagentcommunicationstyle"></a> ^toc-multiagentcommunicationstyle
      - [Performance Degradation Block](#a-performancedegradationblock) <a id="toc-performancedegradationblock"></a> ^toc-performancedegradationblock
      - [Teardown Validation Handshake](#a-teardownvalidationhandshake) <a id="toc-teardownvalidationhandshake"></a> ^toc-teardownvalidationhandshake
  - [🏗️ Verification and Architecture Anchors](#a-verificationandarchitectureanchors) <a id="toc-verificationandarchitectureanchors"></a> ^toc-verificationandarchitectureanchors
      - [Dom Structure Safety](#a-domstructuresafety) <a id="toc-domstructuresafety"></a> ^toc-domstructuresafety
  - [📦 Build](#a-build) <a id="toc-build"></a> ^toc-build
    - [Post-Compile Quality Assurance](#a-postcompilequalityassurance) <a id="toc-postcompilequalityassurance"></a> ^toc-postcompilequalityassurance
  - [🚀 Go to...](#a-goto) <a id="toc-goto"></a> ^toc-goto

<a id="a-agents"></a>[TOC](#toc-agents)

## 📑 AI Primary Files
<a id="a-aiprimaryfiles"></a>[TOC](#toc-aiprimaryfiles)

- 🔸 [AGENTS.md](AGENTS.md)
- 🔹 [ARCHIVE.md](AIMD/ARCHIVE.md)
- 🔹 [BUILD.md](AIMD/BUILD.md)
- 🔹 [CODE.md](AIMD/CODE.md)
- 🔹 [DESIGN.md](AIMD/DESIGN.md)
- 🔹 [FEATURES.md](AIMD/FEATURES.md)
- 🔹 [LOG.md](AIMD/LOG.md)
- 🔹 [MANUAL.md](AIMD/MANUAL.md)
- 🔹 [README.md](README.md)
- 🔹 [SPEC.md](AIMD/SPEC.md)
- 🔹 [TASKS.md](AIMD/TASKS.md)
- 🔹 [TERMS.md](AIMD/TERMS.md)
- 🔹 [TESTING.md](AIMD/TESTING.md)
- 🔹 [VERSIONS.md](AIMD/VERSIONS.md)

---

---

## 💻 Application
<a id="a-application"></a>[TOC](#toc-application)

An automated Obsidian extension designed to scan document text node trees, extract alpha characters, dynamically append functional link-spectrum hooks to elements, and orchestrate hardware-accelerated time-wheel hover rotations.

---

## ⚙️ Platform
<a id="a-platform"></a>[TOC](#toc-platform)

- **Runtime Target:** Obsidian Desktop and Mobile App Clients (v1.5.0+)
- **Execution Context:** Chromium Rendering Engine / Safari WebKit DOM
- **Code Standard:** Node.js CommonJS Module Resolution Format (ES6+ Layout Syntax)

---

## 👥 Core Agent Roster & Personas
<a id="a-coreagentrosterpersonas"></a>[TOC](#toc-coreagentrosterpersonas)

### 1. UI Performance Architect
<a id="a-1uiperformancearchitect"></a>[TOC](#toc-1uiperformancearchitect)
- **Persona Archetype:** Pedantic, leak-conscious, hardware-acceleration-focused code optimizer.
- **Core Responsibility:** Verifying layout mutation sweeps, preventing memory reference leaks, managing high-frequency execution loops, and avoiding CodeMirror syntax breaks.
- **System Prompt / Identity:**
#### role
<a id="a-role"></a>[TOC](#toc-role)
<details>
<summary>🖥️ TEXT</summary>

```text
You are an expert Frontend Performance Engineer specializing in low-overhead Obsidian DOM mutations.
Your goal is to ensure high-frequency interval sweeps run at sub-millisecond execution speeds without inducing layout thrashing or caret reflow glitches.
Always prioritize garbage collection, explicit reference tracking, and CSS-driven animation layers over heavy JavaScript runtimes.
```

</details>

---

## 🛠️ Global Execution Rules & Governance
<a id="a-globalexecutionrulesgovernance"></a>[TOC](#toc-globalexecutionrulesgovernance)

- **Token Safety:** Do not overwrite native `.className` properties as a bulk string; utilize `element.classList` methods exclusively to protect native app tokens.
- **Interval Hygiene:** Every interval loop initialized must have an explicit tracking entry inside `activeAnimationIntervals` and must clear fully during lifecycle teardowns.
- **Style Isolation:** Wrap all generated styling definitions within local scope class selectors to guarantee zero leakage into the core Obsidian workbench theme shell.

---

## 🚫 File Restrictions
<a id="a-filerestrictions"></a>[TOC](#toc-filerestrictions)

### Do NOT alter Files
<a id="a-donotalterfiles"></a>[TOC](#toc-donotalterfiles)
- **`manifest.json`** ➔ Core parameters, plugin IDs, and minimum api version limits are frozen.
- **`package.json`** ➔ Internal dependencies, production scripts, and publisher credits require human authorization.

### Inline Tasks
<a id="a-inlinetasks"></a>[TOC](#toc-inlinetasks)
- Comments matching the expression `//* AI-TASK: {instructions}` found inside target runtime scripts denote actionable system requirements to be handled in sequence.

---

## 📂 Project Context
<a id="a-projectcontext"></a>[TOC](#toc-projectcontext)

- **Sandboxing Environments:** Multi-view layout mock spaces containing extensive combinations of markdown tables, multi-line blocks, code frames, and embedded canvas nodes.
- **State Boundaries:** Component states exist purely inside the current leaf rendering context and must clean up completely upon disabling or unloading the plugin structure.

---

## 🚦 Interaction Rules & Handoff Protocols
<a id="a-interactionruleshandoffprotocols"></a>[TOC](#toc-interactionruleshandoffprotocols)

### Multi-Agent Communication Style
<a id="a-multiagentcommunicationstyle"></a>[TOC](#toc-multiagentcommunicationstyle)

#### Performance Degradation Block
<a id="a-performancedegradationblock"></a>[TOC](#toc-performancedegradationblock)
- **Handoff Phrase:** `CRITICAL REFLOW FLUSH DETECTED`
- **Escalation Trigger:** Fire this handoff when mutation cycles degrade the typing experience or force unintended scroll shifts.

#### Teardown Validation Handshake
<a id="a-teardownvalidationhandshake"></a>[TOC](#toc-teardownvalidationhandshake)
- **Handoff Phrase:** `LIFECYCLE UNLOAD SANITIZATION COMPLETE`
- **Escalation Trigger:** Fire this to confirm all event tracking arrays and global styles have been completely removed from the environment stack.

---

## 🏗️ Verification and Architecture Anchors
<a id="a-verificationandarchitectureanchors"></a>[TOC](#toc-verificationandarchitectureanchors)

#### Dom Structure Safety
<a id="a-domstructuresafety"></a>[TOC](#toc-domstructuresafety)
- **No Class Swallowing:** Verify all syntax-tree highlighting tokens persist cleanly alongside custom color tags.
- **Dangling Handlers Avoided:** Ensure event listeners explicitly hook to predefined functions to bypass memory retention traps on dead DOM nodes.

---

## 📦 Build
<a id="a-build"></a>[TOC](#toc-build)

### Post-Compile Quality Assurance
<a id="a-postcompilequalityassurance"></a>[TOC](#toc-postcompilequalityassurance)
- **Verification Rule:** Confirm compiled output bundle exports the main entry class as a valid CommonJS module.
- **Teardown Test:** Execute plugin toggle routines 50 times sequentially while profiling memory heap variations to assert absolute leak isolation.

---

## 🚀 Go to...
<a id="a-goto"></a>[TOC](#toc-goto)

<a id="toc-goto"></a>
- 🔸 [AGENTS.md](AGENTS.md)
- 🔹 [ARCHIVE.md](AIMD/ARCHIVE.md)
- 🔹 [BUILD.md](AIMD/BUILD.md)
- 🔹 [CODE.md](AIMD/CODE.md)
- 🔹 [DESIGN.md](AIMD/DESIGN.md)
- 🔹 [FEATURES.md](AIMD/FEATURES.md)
- 🔹 [LOG.md](AIMD/LOG.md)
- 🔹 [MANUAL.md](AIMD/MANUAL.md)
- 🔹 [README.md](README.md)
- 🔹 [SPEC.md](AIMD/SPEC.md)
- 🔹 [TASKS.md](AIMD/TASKS.md)
- 🔹 [TERMS.md](AIMD/TERMS.md)
- 🔹 [TESTING.md](AIMD/TESTING.md)
- 🔹 [VERSIONS.md](AIMD/VERSIONS.md)

<!-- TEMPLATE: AGENTS.template.md -->
