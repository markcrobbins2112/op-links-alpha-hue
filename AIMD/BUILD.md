---
title: BUILD
---

<!-- # TEMPLATE: BUILD.template.md -->
<!-- markdownlint-disable MD013 -->

# BUILD

<!-- TOC location -->
## 🔍 Table of Contents
<!-- Maintained by script -->
- [BUILD](#a-build) <a id="toc-build"></a> ^toc-build
  - [📑 AI Primary Files](#a-aiprimaryfiles) <a id="toc-aiprimaryfiles"></a> ^toc-aiprimaryfiles
  - [📋 Prerequisites & Toolchain Setup](#a-prerequisitestoolchainsetup) <a id="toc-prerequisitestoolchainsetup"></a> ^toc-prerequisitestoolchainsetup
  - [🛠️ Build & Packaging Pipeline](#a-buildpackagingpipeline) <a id="toc-buildpackagingpipeline"></a> ^toc-buildpackagingpipeline
    - [📦 Key Components](#a-keycomponents) <a id="toc-keycomponents"></a> ^toc-keycomponents
  - [🚀 Execution & Packing Commands](#a-executionpackingcommands) <a id="toc-executionpackingcommands"></a> ^toc-executionpackingcommands
  - [🧪 Post-Build Verification Rules](#a-postbuildverificationrules) <a id="toc-postbuildverificationrules"></a> ^toc-postbuildverificationrules
  - [🚀 Go to...](#a-goto) <a id="toc-goto"></a> ^toc-goto

<a id="a-build"></a>[TOC](#toc-build)

## 📑 AI Primary Files
<a id="a-aiprimaryfiles"></a>[TOC](#toc-aiprimaryfiles)

- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔸 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
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

## 📋 Prerequisites & Toolchain Setup
<a id="a-prerequisitestoolchainsetup"></a>[TOC](#toc-prerequisitestoolchainsetup)

- **Compiler/Runtime:** Node.js runtime environment (v18.x or higher recommended) and npm package manager.
- **Global System Variables Required:**
  - `OBSIDIAN_TEST_VAULT`: Path to a local test vault's plugin directory (`/.obsidian/plugins/op-links-alpha-hue`) to automate live hot-reloading development sweeps.

---

## 🛠️ Build & Packaging Pipeline
<a id="a-buildpackagingpipeline"></a>[TOC](#toc-buildpackagingpipeline)

- **Dependency Tree Check:** Asserts that devDependencies mirror the Obsidian API types to support robust compilation linting.
- **Source Transpilation:** Bundles `main.js` and `styles.css` using zero-configuration tooling or standard ES6 tree-shaking parameters.
- **Asset Relocation:** Moves the production assets (`main.js`, `manifest.json`, `styles.css`) directly into the target distribution directory layout.

### 📦 Key Components
<a id="a-keycomponents"></a>[TOC](#toc-keycomponents)

- **`obsidian` npm module**: External development API type tracking library utilized for code syntax validation.
- **`esbuild` engine**: Fast JavaScript compiler used to shake unused code branches and package modules down to a single production file.

---

## 🚀 Execution & Packing Commands
<a id="a-executionpackingcommands"></a>[TOC](#toc-executionpackingcommands)

- **Install Dependencies**:
  ```bash
  npm install
  ```
- **Local Dev Server / Watch Mode**:
  ```bash
  npm run dev
  ```
- **Verification / Linting**:
  ```bash
  npm run lint
  ```
- **Production Package Compilation**:
  ```bash
  npm run build
  ```

---

## 🧪 Post-Build Verification Rules
<a id="a-postbuildverificationrules"></a>[TOC](#toc-postbuildverificationrules)

- 1. **Size Checking:** Verify that the output `main.js` file remains under 150KB to maintain ultra-fast initialization and startup speeds inside mobile containers.
- 2. **Path Verification:** Assert that `manifest.json`, `main.js`, and `styles.css` sit at the exact same root level within the compiled plugin folder structure.
- 3. **Smoke Test Command:** Refresh or reload the Obsidian test vault client with the developer console open to guarantee zero runtime exceptions hit the layout pipeline during boot up.

---

## 🚀 Go to...
<a id="a-goto"></a>[TOC](#toc-goto)

- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔸 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

<!-- TEMPLATE: BUILD.template.md -->
