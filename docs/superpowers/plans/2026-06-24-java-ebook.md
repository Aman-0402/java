# Java Ebook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-file static HTML/CSS/JS ebook covering Java Basics, DSA, and Full Stack — warm book theme, sidebar nav, dark mode, copy-code, and search.

**Architecture:** `index.html` is a permanent shell (sidebar + header + content area). Chapter files contain content only (`<article>` fragments). `app.js` fetches chapters on demand, injects into `#content-area`, and updates URL hash for deep linking. Search reads a pre-built `data/search-index.json`.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS (ES6 modules), Prism.js (syntax highlighting)

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Shell: sidebar, header, search bar, content area div, script/CSS links |
| `assets/css/main.css` | Layout (grid), warm theme variables, typography, callouts, chapter nav, sidebar |
| `assets/css/dark.css` | Dark mode overrides via `body[data-theme="dark"]` selectors |
| `assets/css/prism.css` | Prism.js Tomorrow Night theme (code blocks) |
| `assets/js/app.js` | Chapter manifest, fetch loader, hash routing, sidebar active state, prev/next nav, copy-code button injection, Prism re-highlight |
| `assets/js/theme.js` | Dark mode toggle, localStorage persistence, flash-prevention on load |
| `assets/js/search.js` | Load search-index.json, filter on keypress, render results, load chapter on click |
| `assets/js/prism.js` | Prism.js bundle (Java + Bash + JSON + XML languages) |
| `assets/css/prism.css` | Prism Tomorrow Night CSS |
| `assets/img/logo.svg` | Inline SVG logo |
| `data/search-index.json` | Pre-built keyword index for all 40 chapters |
| `chapters/section1-basics/ch01-*.html` → `ch20-*.html` | Java Basics content fragments |
| `chapters/section2-dsa/ch21-*.html` → `ch30-*.html` | DSA content fragments |
| `chapters/section3-fullstack/ch31-*.html` → `ch40-*.html` | Full Stack content fragments |

---

## Task 1: Folder Scaffold

**Files:**
- Create: `index.html` (empty placeholder)
- Create: `assets/css/main.css`, `assets/css/dark.css`, `assets/css/prism.css`
- Create: `assets/js/app.js`, `assets/js/theme.js`, `assets/js/search.js`
- Create: `assets/img/logo.svg`
- Create: `data/search-index.json`
- Create all 40 chapter HTML files (empty)

- [ ] **Step 1: Create folder structure**

Run in project root:
```powershell
New-Item -ItemType Directory -Force assets/css, assets/js, assets/img, data
New-Item -ItemType Directory -Force chapters/section1-basics, chapters/section2-dsa, chapters/section3-fullstack
```

- [ ] **Step 2: Create empty placeholder files**

```powershell
# CSS
"" | Out-File assets/css/main.css
"" | Out-File assets/css/dark.css
"" | Out-File assets/css/prism.css

# JS
"" | Out-File assets/js/app.js
"" | Out-File assets/js/theme.js
"" | Out-File assets/js/search.js

# Data
"[]" | Out-File data/search-index.json

# Chapter files - Section 1
$s1 = @("ch01-what-is-java","ch02-install-jdk","ch03-install-vscode","ch04-hello-world","ch05-variables-datatypes","ch06-operators","ch07-input-output","ch08-if-else-switch","ch09-loops","ch10-arrays","ch11-methods","ch12-oop-classes-objects","ch13-constructors","ch14-inheritance","ch15-polymorphism","ch16-encapsulation-abstraction","ch17-interfaces","ch18-exception-handling","ch19-collections","ch20-string-manipulation")
$s1 | ForEach-Object { "" | Out-File "chapters/section1-basics/$_.html" }

# Chapter files - Section 2
$s2 = @("ch21-big-o-notation","ch22-recursion","ch23-linked-list","ch24-stack","ch25-queue","ch26-binary-search","ch27-sorting-algorithms","ch28-trees-binary-tree","ch29-hashmap-internals","ch30-graphs")
$s2 | ForEach-Object { "" | Out-File "chapters/section2-dsa/$_.html" }

# Chapter files - Section 3
$s3 = @("ch31-what-is-fullstack","ch32-maven-project-setup","ch33-spring-boot-intro","ch34-rest-api-basics","ch35-database-jpa-hibernate","ch36-html-css-for-java-devs","ch37-react-basics","ch38-react-spring-connect","ch39-auth-jwt-spring-security","ch40-deploy-render-railway")
$s3 | ForEach-Object { "" | Out-File "chapters/section3-fullstack/$_.html" }
```

- [ ] **Step 3: Download Prism.js**

Go to https://prismjs.com/download.html — select:
- Theme: **Tomorrow Night**
- Languages: Java, Bash, JSON, Markup (HTML), CSS
- Plugins: **Copy to Clipboard Button** (optional, we do it custom)

Download JS → save as `assets/js/prism.js`
Download CSS → save as `assets/css/prism.css`

- [ ] **Step 4: Review**

Verify folder structure matches the File Map above. All files exist (even if empty).

- [ ] **Step 5: Suggested commit message**
```
chore: scaffold ebook folder structure and empty files
```

---

## Task 2: index.html Shell

**Files:**
- Write: `index.html`

- [ ] **Step 1: Write the shell**

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Java Ebook — Basics to Full Stack</title>
  <link rel="stylesheet" href="assets/css/prism.css" />
  <link rel="stylesheet" href="assets/css/main.css" />
  <link rel="stylesheet" href="assets/css/dark.css" />
</head>
<body>

  <div class="ebook-shell">

    <!-- SIDEBAR -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <img src="assets/img/logo.svg" alt="Java Ebook" class="logo" />
        <span class="ebook-title">Java Ebook</span>
      </div>

      <div class="search-wrapper">
        <input type="text" id="search-input" placeholder="🔍 Search topics..." autocomplete="off" />
        <div id="search-results" class="search-results hidden"></div>
      </div>

      <nav class="chapter-nav-sidebar">

        <div class="section-label">📗 Section 1 — Java Basics</div>
        <ul>
          <li><a href="#ch01-what-is-java">Ch 1. What is Java?</a></li>
          <li><a href="#ch02-install-jdk">Ch 2. Install JDK 21</a></li>
          <li><a href="#ch03-install-vscode">Ch 3. Install VS Code</a></li>
          <li><a href="#ch04-hello-world">Ch 4. Hello World</a></li>
          <li><a href="#ch05-variables-datatypes">Ch 5. Variables &amp; Data Types</a></li>
          <li><a href="#ch06-operators">Ch 6. Operators</a></li>
          <li><a href="#ch07-input-output">Ch 7. Input / Output</a></li>
          <li><a href="#ch08-if-else-switch">Ch 8. if / else / switch</a></li>
          <li><a href="#ch09-loops">Ch 9. Loops</a></li>
          <li><a href="#ch10-arrays">Ch 10. Arrays</a></li>
          <li><a href="#ch11-methods">Ch 11. Methods</a></li>
          <li><a href="#ch12-oop-classes-objects">Ch 12. Classes &amp; Objects</a></li>
          <li><a href="#ch13-constructors">Ch 13. Constructors</a></li>
          <li><a href="#ch14-inheritance">Ch 14. Inheritance</a></li>
          <li><a href="#ch15-polymorphism">Ch 15. Polymorphism</a></li>
          <li><a href="#ch16-encapsulation-abstraction">Ch 16. Encapsulation &amp; Abstraction</a></li>
          <li><a href="#ch17-interfaces">Ch 17. Interfaces</a></li>
          <li><a href="#ch18-exception-handling">Ch 18. Exception Handling</a></li>
          <li><a href="#ch19-collections">Ch 19. Collections</a></li>
          <li><a href="#ch20-string-manipulation">Ch 20. String Manipulation</a></li>
        </ul>

        <div class="section-label">📘 Section 2 — Java DSA</div>
        <ul>
          <li><a href="#ch21-big-o-notation">Ch 21. Big O Notation</a></li>
          <li><a href="#ch22-recursion">Ch 22. Recursion</a></li>
          <li><a href="#ch23-linked-list">Ch 23. Linked List</a></li>
          <li><a href="#ch24-stack">Ch 24. Stack</a></li>
          <li><a href="#ch25-queue">Ch 25. Queue</a></li>
          <li><a href="#ch26-binary-search">Ch 26. Binary Search</a></li>
          <li><a href="#ch27-sorting-algorithms">Ch 27. Sorting Algorithms</a></li>
          <li><a href="#ch28-trees-binary-tree">Ch 28. Trees &amp; Binary Tree</a></li>
          <li><a href="#ch29-hashmap-internals">Ch 29. HashMap Internals</a></li>
          <li><a href="#ch30-graphs">Ch 30. Graphs</a></li>
        </ul>

        <div class="section-label">📙 Section 3 — Java Full Stack</div>
        <ul>
          <li><a href="#ch31-what-is-fullstack">Ch 31. What is Full Stack?</a></li>
          <li><a href="#ch32-maven-project-setup">Ch 32. Maven &amp; Project Setup</a></li>
          <li><a href="#ch33-spring-boot-intro">Ch 33. Spring Boot Intro</a></li>
          <li><a href="#ch34-rest-api-basics">Ch 34. REST API Basics</a></li>
          <li><a href="#ch35-database-jpa-hibernate">Ch 35. Database + JPA/Hibernate</a></li>
          <li><a href="#ch36-html-css-for-java-devs">Ch 36. HTML &amp; CSS Basics</a></li>
          <li><a href="#ch37-react-basics">Ch 37. React Basics</a></li>
          <li><a href="#ch38-react-spring-connect">Ch 38. React + Spring Boot</a></li>
          <li><a href="#ch39-auth-jwt-spring-security">Ch 39. Auth: JWT + Spring Security</a></li>
          <li><a href="#ch40-deploy-render-railway">Ch 40. Deploy to Cloud</a></li>
        </ul>

      </nav>
    </aside>

    <!-- MAIN -->
    <div class="main-wrapper">

      <header class="top-bar">
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
        <span class="top-bar-title" id="top-bar-title">Java Ebook</span>
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">🌙</button>
      </header>

      <main class="content-area" id="content-area">
        <div class="welcome-screen">
          <h1>Welcome to Java Ebook</h1>
          <p>Select a chapter from the sidebar to get started.</p>
          <p>Start from <a href="#ch01-what-is-java">Chapter 1: What is Java?</a> if you're a beginner.</p>
        </div>
      </main>

    </div>
  </div>

  <script src="assets/js/prism.js"></script>
  <script type="module" src="assets/js/theme.js"></script>
  <script type="module" src="assets/js/app.js"></script>
  <script type="module" src="assets/js/search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open with Live Server. Should see: two-column layout shell with sidebar on left, welcome message on right. Sidebar links do nothing yet (JS not implemented). No errors in console.

- [ ] **Step 3: Suggested commit message**
```
feat: add index.html ebook shell with sidebar and chapter links
```

---

## Task 3: Core CSS (main.css)

**Files:**
- Write: `assets/css/main.css`

- [ ] **Step 1: Write main.css**

```css
/* ── CSS Custom Properties (Light Theme) ── */
:root {
  --color-bg: #fffdf7;
  --color-sidebar-bg: #e8dcc8;
  --color-sidebar-border: #c8b89a;
  --color-sidebar-active-bg: #8B4513;
  --color-sidebar-active-text: #fff;
  --color-sidebar-text: #5c3d1e;
  --color-sidebar-section-label: #8B4513;
  --color-text: #3d2b1f;
  --color-text-muted: #7a6050;
  --color-heading: #2c1810;
  --color-accent: #8B4513;
  --color-border: #c8b89a;
  --color-topbar-bg: #d4c4a8;
  --color-callout-tip-bg: #f5f0e0;
  --color-callout-tip-border: #8B4513;
  --color-callout-warning-bg: #fff4e0;
  --color-callout-warning-border: #cc7700;
  --color-callout-info-bg: #e8f0ff;
  --color-callout-info-border: #4466cc;
  --color-exercise-bg: #eef5ee;
  --color-exercise-border: #2d6a4f;
  --color-code-bg: #1e1e2e;
  --color-code-text: #cdd6f4;
  --font-body: Georgia, 'Times New Roman', serif;
  --font-heading: 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'Cascadia Code', 'Fira Code', Consolas, monospace;
  --sidebar-width: 280px;
  --topbar-height: 52px;
}

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; }
body { font-family: var(--font-body); background: var(--color-bg); color: var(--color-text); line-height: 1.7; }

/* ── Shell Layout ── */
.ebook-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  min-height: 100vh;
}

/* ── Sidebar ── */
.sidebar {
  background: var(--color-sidebar-bg);
  border-right: 2px solid var(--color-sidebar-border);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 14px 12px;
  border-bottom: 1px solid var(--color-sidebar-border);
}

.logo { width: 32px; height: 32px; }

.ebook-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 15px;
  color: var(--color-accent);
}

/* ── Search ── */
.search-wrapper {
  padding: 10px 12px;
  position: relative;
}

#search-input {
  width: 100%;
  padding: 7px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg);
  font-size: 13px;
  color: var(--color-text);
  outline: none;
  font-family: var(--font-body);
}

#search-input:focus { border-color: var(--color-accent); }

.search-results {
  position: absolute;
  top: calc(100% - 6px);
  left: 12px;
  right: 12px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 100;
  max-height: 260px;
  overflow-y: auto;
}

.search-results.hidden { display: none; }

.search-result-item {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 13px;
  border-bottom: 1px solid var(--color-border);
}

.search-result-item:last-child { border-bottom: none; }
.search-result-item:hover { background: var(--color-sidebar-bg); }

.search-result-item .result-title { font-weight: 600; color: var(--color-heading); }
.search-result-item .result-section { font-size: 11px; color: var(--color-text-muted); }

/* ── Chapter Nav Sidebar ── */
.chapter-nav-sidebar { padding: 8px 0 24px; }

.section-label {
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-sidebar-section-label);
  padding: 12px 14px 4px;
}

.chapter-nav-sidebar ul { list-style: none; }

.chapter-nav-sidebar ul li a {
  display: block;
  padding: 5px 14px;
  font-size: 13px;
  color: var(--color-sidebar-text);
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.15s;
}

.chapter-nav-sidebar ul li a:hover {
  background: rgba(139,69,19,0.1);
}

.chapter-nav-sidebar ul li a.active {
  background: var(--color-sidebar-active-bg);
  color: var(--color-sidebar-active-text);
  font-weight: 600;
}

/* ── Main Wrapper ── */
.main-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ── Top Bar ── */
.top-bar {
  height: var(--topbar-height);
  background: var(--color-topbar-bg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.top-bar-title {
  flex: 1;
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-heading);
}

.sidebar-toggle, .theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--color-text);
  transition: background 0.15s;
}

.sidebar-toggle:hover, .theme-toggle:hover { background: rgba(0,0,0,0.08); }
.sidebar-toggle { display: none; }

/* ── Content Area ── */
.content-area {
  flex: 1;
  padding: 40px 52px;
  max-width: 820px;
}

/* ── Welcome Screen ── */
.welcome-screen { padding: 40px 0; }
.welcome-screen h1 { font-family: var(--font-heading); color: var(--color-accent); margin-bottom: 12px; }
.welcome-screen a { color: var(--color-accent); }

/* ── Chapter Content ── */
.chapter-content {}

.chapter-meta {
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--color-border);
}

.section-tag {
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  background: var(--color-sidebar-bg);
  padding: 3px 8px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 10px;
}

.chapter-content h1 {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-heading);
  margin-bottom: 10px;
  line-height: 1.3;
}

.chapter-intro {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  font-style: italic;
}

.chapter-content h2 {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  color: var(--color-heading);
  margin: 32px 0 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--color-border);
}

.chapter-content h3 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  color: var(--color-heading);
  margin: 20px 0 8px;
}

.chapter-content p { margin-bottom: 14px; }

.chapter-content ul, .chapter-content ol {
  margin: 10px 0 14px 24px;
}

.chapter-content li { margin-bottom: 4px; }

.chapter-content code {
  font-family: var(--font-mono);
  font-size: 0.88em;
  background: var(--color-sidebar-bg);
  padding: 2px 5px;
  border-radius: 3px;
  color: var(--color-accent);
}

/* ── Code Blocks ── */
.code-block-wrapper {
  position: relative;
  margin: 16px 0;
}

.code-block-wrapper pre {
  border-radius: 6px;
  margin: 0 !important;
  font-family: var(--font-mono) !important;
  font-size: 0.875rem !important;
}

.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #ccc;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s;
}

.copy-btn:hover { background: rgba(255,255,255,0.2); color: #fff; }
.copy-btn.copied { color: #a6e3a1; border-color: #a6e3a1; }

/* ── Callouts ── */
.callout {
  padding: 12px 16px;
  border-radius: 6px;
  border-left: 4px solid;
  margin: 16px 0;
  font-size: 0.95rem;
}

.callout.tip {
  background: var(--color-callout-tip-bg);
  border-color: var(--color-callout-tip-border);
}

.callout.warning {
  background: var(--color-callout-warning-bg);
  border-color: var(--color-callout-warning-border);
}

.callout.info {
  background: var(--color-callout-info-bg);
  border-color: var(--color-callout-info-border);
}

/* ── Exercise Box ── */
.exercise {
  background: var(--color-exercise-bg);
  border: 2px solid var(--color-exercise-border);
  border-radius: 8px;
  padding: 16px 20px;
  margin: 28px 0;
}

.exercise h3 {
  color: var(--color-exercise-border);
  font-family: var(--font-heading);
  margin-bottom: 8px;
  margin-top: 0;
  border: none;
}

/* ── Chapter Navigation (bottom) ── */
.chapter-nav-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 48px;
  padding-top: 20px;
  border-top: 2px solid var(--color-border);
}

.chapter-nav-bottom a {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
  padding: 8px 14px;
  border: 2px solid var(--color-accent);
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
}

.chapter-nav-bottom a:hover {
  background: var(--color-accent);
  color: #fff;
}

.chapter-nav-bottom a.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.chapter-counter {
  font-family: var(--font-heading);
  font-size: 13px;
  color: var(--color-text-muted);
}

/* ── Sidebar hidden (mobile toggle) ── */
.sidebar.hidden { display: none; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .ebook-shell { grid-template-columns: 1fr; }
  .sidebar {
    position: fixed;
    left: 0; top: 0; bottom: 0;
    width: var(--sidebar-width);
    z-index: 200;
    transform: translateX(-100%);
    transition: transform 0.25s;
  }
  .sidebar.open { transform: translateX(0); }
  .sidebar-toggle { display: block; }
  .content-area { padding: 24px 20px; }
}
```

- [ ] **Step 2: Create logo SVG**

Write `assets/img/logo.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <rect width="40" height="40" rx="8" fill="#8B4513"/>
  <text x="20" y="28" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="#fffdf7">J</text>
</svg>
```

- [ ] **Step 3: Verify in browser**

Open with Live Server. Should see: warm sidebar on left, welcome message on right. Sidebar has three section labels with chapter links. Top bar visible. No layout breaks. Check mobile at 375px width — sidebar should collapse.

- [ ] **Step 4: Suggested commit message**
```
feat: add core CSS warm theme, layout, callouts, and chapter content styles
```

---

## Task 4: Dark Mode CSS

**Files:**
- Write: `assets/css/dark.css`

- [ ] **Step 1: Write dark.css**

```css
body[data-theme="dark"] {
  --color-bg: #1e1e2e;
  --color-sidebar-bg: #181825;
  --color-sidebar-border: #313244;
  --color-sidebar-active-bg: #cba6f7;
  --color-sidebar-active-text: #1e1e2e;
  --color-sidebar-text: #cdd6f4;
  --color-sidebar-section-label: #cba6f7;
  --color-text: #cdd6f4;
  --color-text-muted: #a6adc8;
  --color-heading: #cdd6f4;
  --color-accent: #cba6f7;
  --color-border: #313244;
  --color-topbar-bg: #181825;
  --color-callout-tip-bg: #2a2a3e;
  --color-callout-tip-border: #cba6f7;
  --color-callout-warning-bg: #2a2018;
  --color-callout-warning-border: #fab387;
  --color-callout-info-bg: #1a2040;
  --color-callout-info-border: #89b4fa;
  --color-exercise-bg: #1a2a1a;
  --color-exercise-border: #a6e3a1;
  --color-code-bg: #11111b;
  --color-code-text: #cdd6f4;
}

body[data-theme="dark"] #search-input {
  background: #313244;
  color: #cdd6f4;
  border-color: #45475a;
}

body[data-theme="dark"] .search-results {
  background: #181825;
}

body[data-theme="dark"] .search-result-item:hover {
  background: #313244;
}

body[data-theme="dark"] .chapter-content code {
  background: #313244;
  color: #cba6f7;
}

body[data-theme="dark"] .section-tag {
  background: #313244;
}
```

- [ ] **Step 2: Verify in browser**

In browser console, run: `document.body.dataset.theme = 'dark'`
Page should switch to dark purple/navy theme. Run `document.body.dataset.theme = 'light'` to revert.

- [ ] **Step 3: Suggested commit message**
```
feat: add dark mode CSS theme (Catppuccin-inspired)
```

---

## Task 5: theme.js — Dark Mode Toggle

**Files:**
- Write: `assets/js/theme.js`

- [ ] **Step 1: Write theme.js**

```js
const STORAGE_KEY = 'ebook-theme';
const btn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem(STORAGE_KEY, theme);
}

// Apply saved theme before first paint (no flash)
const saved = localStorage.getItem(STORAGE_KEY) || 'light';
applyTheme(saved);

btn.addEventListener('click', () => {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});
```

- [ ] **Step 2: Verify in browser**

Click 🌙 button — page switches to dark. Refresh — dark persists. Click ☀️ — switches to light. Refresh — light persists.

- [ ] **Step 3: Suggested commit message**
```
feat: add dark mode toggle with localStorage persistence
```

---

## Task 6: app.js — Chapter Loader, Routing, Navigation, Copy Buttons

**Files:**
- Write: `assets/js/app.js`

- [ ] **Step 1: Write app.js**

```js
// Chapter manifest — single source of truth for order + paths
const CHAPTERS = [
  { id: 'ch01-what-is-java',            title: 'Ch 1. What is Java?',              path: 'chapters/section1-basics/ch01-what-is-java.html' },
  { id: 'ch02-install-jdk',             title: 'Ch 2. Install JDK 21',             path: 'chapters/section1-basics/ch02-install-jdk.html' },
  { id: 'ch03-install-vscode',          title: 'Ch 3. Install VS Code',            path: 'chapters/section1-basics/ch03-install-vscode.html' },
  { id: 'ch04-hello-world',             title: 'Ch 4. Hello World',                path: 'chapters/section1-basics/ch04-hello-world.html' },
  { id: 'ch05-variables-datatypes',     title: 'Ch 5. Variables & Data Types',     path: 'chapters/section1-basics/ch05-variables-datatypes.html' },
  { id: 'ch06-operators',               title: 'Ch 6. Operators',                  path: 'chapters/section1-basics/ch06-operators.html' },
  { id: 'ch07-input-output',            title: 'Ch 7. Input / Output',             path: 'chapters/section1-basics/ch07-input-output.html' },
  { id: 'ch08-if-else-switch',          title: 'Ch 8. if / else / switch',         path: 'chapters/section1-basics/ch08-if-else-switch.html' },
  { id: 'ch09-loops',                   title: 'Ch 9. Loops',                      path: 'chapters/section1-basics/ch09-loops.html' },
  { id: 'ch10-arrays',                  title: 'Ch 10. Arrays',                    path: 'chapters/section1-basics/ch10-arrays.html' },
  { id: 'ch11-methods',                 title: 'Ch 11. Methods',                   path: 'chapters/section1-basics/ch11-methods.html' },
  { id: 'ch12-oop-classes-objects',     title: 'Ch 12. Classes & Objects',         path: 'chapters/section1-basics/ch12-oop-classes-objects.html' },
  { id: 'ch13-constructors',            title: 'Ch 13. Constructors',              path: 'chapters/section1-basics/ch13-constructors.html' },
  { id: 'ch14-inheritance',             title: 'Ch 14. Inheritance',               path: 'chapters/section1-basics/ch14-inheritance.html' },
  { id: 'ch15-polymorphism',            title: 'Ch 15. Polymorphism',              path: 'chapters/section1-basics/ch15-polymorphism.html' },
  { id: 'ch16-encapsulation-abstraction', title: 'Ch 16. Encapsulation & Abstraction', path: 'chapters/section1-basics/ch16-encapsulation-abstraction.html' },
  { id: 'ch17-interfaces',              title: 'Ch 17. Interfaces',                path: 'chapters/section1-basics/ch17-interfaces.html' },
  { id: 'ch18-exception-handling',      title: 'Ch 18. Exception Handling',        path: 'chapters/section1-basics/ch18-exception-handling.html' },
  { id: 'ch19-collections',             title: 'Ch 19. Collections',               path: 'chapters/section1-basics/ch19-collections.html' },
  { id: 'ch20-string-manipulation',     title: 'Ch 20. String Manipulation',       path: 'chapters/section1-basics/ch20-string-manipulation.html' },
  { id: 'ch21-big-o-notation',          title: 'Ch 21. Big O Notation',            path: 'chapters/section2-dsa/ch21-big-o-notation.html' },
  { id: 'ch22-recursion',               title: 'Ch 22. Recursion',                 path: 'chapters/section2-dsa/ch22-recursion.html' },
  { id: 'ch23-linked-list',             title: 'Ch 23. Linked List',               path: 'chapters/section2-dsa/ch23-linked-list.html' },
  { id: 'ch24-stack',                   title: 'Ch 24. Stack',                     path: 'chapters/section2-dsa/ch24-stack.html' },
  { id: 'ch25-queue',                   title: 'Ch 25. Queue',                     path: 'chapters/section2-dsa/ch25-queue.html' },
  { id: 'ch26-binary-search',           title: 'Ch 26. Binary Search',             path: 'chapters/section2-dsa/ch26-binary-search.html' },
  { id: 'ch27-sorting-algorithms',      title: 'Ch 27. Sorting Algorithms',        path: 'chapters/section2-dsa/ch27-sorting-algorithms.html' },
  { id: 'ch28-trees-binary-tree',       title: 'Ch 28. Trees & Binary Tree',       path: 'chapters/section2-dsa/ch28-trees-binary-tree.html' },
  { id: 'ch29-hashmap-internals',       title: 'Ch 29. HashMap Internals',         path: 'chapters/section2-dsa/ch29-hashmap-internals.html' },
  { id: 'ch30-graphs',                  title: 'Ch 30. Graphs',                    path: 'chapters/section2-dsa/ch30-graphs.html' },
  { id: 'ch31-what-is-fullstack',       title: 'Ch 31. What is Full Stack?',       path: 'chapters/section3-fullstack/ch31-what-is-fullstack.html' },
  { id: 'ch32-maven-project-setup',     title: 'Ch 32. Maven & Project Setup',     path: 'chapters/section3-fullstack/ch32-maven-project-setup.html' },
  { id: 'ch33-spring-boot-intro',       title: 'Ch 33. Spring Boot Intro',         path: 'chapters/section3-fullstack/ch33-spring-boot-intro.html' },
  { id: 'ch34-rest-api-basics',         title: 'Ch 34. REST API Basics',           path: 'chapters/section3-fullstack/ch34-rest-api-basics.html' },
  { id: 'ch35-database-jpa-hibernate',  title: 'Ch 35. Database + JPA/Hibernate',  path: 'chapters/section3-fullstack/ch35-database-jpa-hibernate.html' },
  { id: 'ch36-html-css-for-java-devs',  title: 'Ch 36. HTML & CSS Basics',         path: 'chapters/section3-fullstack/ch36-html-css-for-java-devs.html' },
  { id: 'ch37-react-basics',            title: 'Ch 37. React Basics',              path: 'chapters/section3-fullstack/ch37-react-basics.html' },
  { id: 'ch38-react-spring-connect',    title: 'Ch 38. React + Spring Boot',       path: 'chapters/section3-fullstack/ch38-react-spring-connect.html' },
  { id: 'ch39-auth-jwt-spring-security',title: 'Ch 39. Auth: JWT + Spring Security',path: 'chapters/section3-fullstack/ch39-auth-jwt-spring-security.html' },
  { id: 'ch40-deploy-render-railway',   title: 'Ch 40. Deploy to Cloud',           path: 'chapters/section3-fullstack/ch40-deploy-render-railway.html' },
];

const contentArea = document.getElementById('content-area');
const topBarTitle  = document.getElementById('top-bar-title');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

// ── Chapter Loader ──
async function loadChapter(id) {
  const chapter = CHAPTERS.find(c => c.id === id);
  if (!chapter) return;

  try {
    const res = await fetch(chapter.path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const idx = CHAPTERS.indexOf(chapter);
    const prev = CHAPTERS[idx - 1] || null;
    const next = CHAPTERS[idx + 1] || null;

    contentArea.innerHTML = html + buildNavBottom(prev, next, idx);
    topBarTitle.textContent = chapter.title;
    window.location.hash = id;

    setActiveSidebarLink(id);
    injectCopyButtons();
    Prism.highlightAll();
    contentArea.scrollTop = 0;
    window.scrollTo(0, 0);
  } catch (err) {
    contentArea.innerHTML = `<p style="color:red">Could not load chapter: ${err.message}</p>`;
  }
}

function buildNavBottom(prev, next, idx) {
  return `
    <div class="chapter-nav-bottom">
      <a href="#${prev ? prev.id : ''}" class="${prev ? '' : 'disabled'}">${prev ? '← ' + prev.title : '← Start'}</a>
      <span class="chapter-counter">Chapter ${idx + 1} of ${CHAPTERS.length}</span>
      <a href="#${next ? next.id : ''}" class="${next ? '' : 'disabled'}">${next ? next.title + ' →' : 'End →'}</a>
    </div>`;
}

// ── Sidebar Active State ──
function setActiveSidebarLink(id) {
  document.querySelectorAll('.chapter-nav-sidebar a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
  });
}

// ── Copy Buttons ──
function injectCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.querySelector('.copy-btn')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code')?.innerText || pre.innerText;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      });
    });
    wrapper.appendChild(btn);
  });
}

// ── Hash Routing ──
function handleHash() {
  const id = window.location.hash.slice(1);
  if (id) loadChapter(id);
}

window.addEventListener('hashchange', handleHash);
document.addEventListener('DOMContentLoaded', handleHash);

// ── Sidebar Link Clicks ──
document.querySelectorAll('.chapter-nav-sidebar a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    loadChapter(id);
    if (window.innerWidth <= 768) sidebar.classList.remove('open');
  });
});

// ── Sidebar Toggle (mobile) ──
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// ── Chapter Nav Bottom Click Delegation ──
contentArea.addEventListener('click', e => {
  const link = e.target.closest('.chapter-nav-bottom a');
  if (!link || link.classList.contains('disabled')) return;
  e.preventDefault();
  const id = link.getAttribute('href').slice(1);
  if (id) loadChapter(id);
});
```

- [ ] **Step 2: Verify in browser**

- Click any sidebar link → chapter content loads
- Active link highlights in sidebar brown
- Top bar title updates to chapter name
- URL hash updates (`#ch01-what-is-java`)
- Prev/Next buttons at bottom work
- First chapter: Prev button disabled; last chapter: Next button disabled
- Refresh page on a chapter → same chapter reloads (hash routing works)

- [ ] **Step 3: Suggested commit message**
```
feat: add chapter loader, hash routing, sidebar active state, prev/next nav, copy buttons
```

---

## Task 7: search.js — Search Feature

**Files:**
- Write: `assets/js/search.js`
- Write: `data/search-index.json` (initial entries for all 40 chapters)

- [ ] **Step 1: Write search.js**

```js
const searchInput   = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

let index = [];

async function loadIndex() {
  try {
    const res = await fetch('data/search-index.json');
    index = await res.json();
  } catch {
    index = [];
  }
}

function query(term) {
  if (!term || term.length < 2) return [];
  const t = term.toLowerCase();
  return index.filter(entry =>
    entry.title.toLowerCase().includes(t) ||
    entry.keywords.some(k => k.includes(t)) ||
    entry.section.toLowerCase().includes(t)
  ).slice(0, 8);
}

function renderResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item"><span class="result-title">No results</span></div>';
    searchResults.classList.remove('hidden');
    return;
  }
  searchResults.innerHTML = results.map(r => `
    <div class="search-result-item" data-chapter-id="${r.id}">
      <div class="result-title">${r.title}</div>
      <div class="result-section">${r.section}</div>
    </div>
  `).join('');
  searchResults.classList.remove('hidden');
}

searchInput.addEventListener('input', () => {
  const term = searchInput.value.trim();
  if (!term) { searchResults.classList.add('hidden'); return; }
  renderResults(query(term));
});

searchResults.addEventListener('click', e => {
  const item = e.target.closest('.search-result-item[data-chapter-id]');
  if (!item) return;
  const id = item.dataset.chapterId;
  searchResults.classList.add('hidden');
  searchInput.value = '';
  // app.js exposes loadChapter on window
  if (window.loadChapter) window.loadChapter(id);
  else window.location.hash = id;
});

document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrapper')) {
    searchResults.classList.add('hidden');
  }
});

loadIndex();
```

- [ ] **Step 2: Export loadChapter from app.js**

Add this line at the bottom of `assets/js/app.js`:
```js
window.loadChapter = loadChapter;
```

- [ ] **Step 3: Write search-index.json**

```json
[
  { "id": "ch01-what-is-java",             "title": "Ch 1. What is Java?",               "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch01-what-is-java.html",             "keywords": ["java", "jvm", "platform", "bytecode", "history", "what is java", "why java"] },
  { "id": "ch02-install-jdk",              "title": "Ch 2. Install JDK 21",              "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch02-install-jdk.html",              "keywords": ["jdk", "install", "java home", "path", "javac", "lts", "jdk 21", "setup", "download"] },
  { "id": "ch03-install-vscode",           "title": "Ch 3. Install VS Code",             "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch03-install-vscode.html",           "keywords": ["vscode", "vs code", "editor", "extension", "java extension pack", "ide"] },
  { "id": "ch04-hello-world",              "title": "Ch 4. Hello World",                 "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch04-hello-world.html",              "keywords": ["hello world", "first program", "main method", "System.out.println", "compile", "run", "class"] },
  { "id": "ch05-variables-datatypes",      "title": "Ch 5. Variables & Data Types",      "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch05-variables-datatypes.html",      "keywords": ["variables", "data types", "int", "double", "boolean", "char", "String", "float", "long", "declare"] },
  { "id": "ch06-operators",               "title": "Ch 6. Operators",                   "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch06-operators.html",               "keywords": ["operators", "arithmetic", "comparison", "logical", "assignment", "ternary", "+", "-", "*", "/", "%"] },
  { "id": "ch07-input-output",            "title": "Ch 7. Input / Output",              "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch07-input-output.html",            "keywords": ["scanner", "input", "output", "System.in", "nextLine", "nextInt", "print", "println"] },
  { "id": "ch08-if-else-switch",          "title": "Ch 8. if / else / switch",          "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch08-if-else-switch.html",          "keywords": ["if", "else", "switch", "condition", "control flow", "case", "break", "default"] },
  { "id": "ch09-loops",                   "title": "Ch 9. Loops",                       "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch09-loops.html",                   "keywords": ["loop", "for", "while", "do while", "iteration", "break", "continue", "repeat"] },
  { "id": "ch10-arrays",                  "title": "Ch 10. Arrays",                     "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch10-arrays.html",                  "keywords": ["array", "index", "length", "arrays", "multidimensional", "2d array", "for loop array"] },
  { "id": "ch11-methods",                 "title": "Ch 11. Methods",                    "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch11-methods.html",                 "keywords": ["method", "function", "parameters", "return", "void", "static", "overloading", "call"] },
  { "id": "ch12-oop-classes-objects",     "title": "Ch 12. Classes & Objects",          "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch12-oop-classes-objects.html",     "keywords": ["class", "object", "oop", "instance", "new", "fields", "attributes", "blueprint"] },
  { "id": "ch13-constructors",            "title": "Ch 13. Constructors",               "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch13-constructors.html",            "keywords": ["constructor", "new", "this", "default constructor", "parameterized", "init"] },
  { "id": "ch14-inheritance",             "title": "Ch 14. Inheritance",                "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch14-inheritance.html",             "keywords": ["inheritance", "extends", "super", "parent", "child", "subclass", "superclass", "reuse"] },
  { "id": "ch15-polymorphism",            "title": "Ch 15. Polymorphism",               "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch15-polymorphism.html",            "keywords": ["polymorphism", "override", "@Override", "runtime", "compile time", "method overriding"] },
  { "id": "ch16-encapsulation-abstraction","title": "Ch 16. Encapsulation & Abstraction","section": "Section 1 — Java Basics",   "path": "chapters/section1-basics/ch16-encapsulation-abstraction.html","keywords": ["encapsulation", "abstraction", "private", "public", "getter", "setter", "abstract", "abstract class"] },
  { "id": "ch17-interfaces",              "title": "Ch 17. Interfaces",                 "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch17-interfaces.html",              "keywords": ["interface", "implements", "contract", "default method", "multiple interface"] },
  { "id": "ch18-exception-handling",      "title": "Ch 18. Exception Handling",         "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch18-exception-handling.html",      "keywords": ["exception", "try", "catch", "finally", "throw", "throws", "RuntimeException", "error handling"] },
  { "id": "ch19-collections",             "title": "Ch 19. Collections",                "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch19-collections.html",             "keywords": ["collections", "ArrayList", "LinkedList", "HashMap", "HashSet", "List", "Map", "Set", "iterator"] },
  { "id": "ch20-string-manipulation",     "title": "Ch 20. String Manipulation",        "section": "Section 1 — Java Basics",    "path": "chapters/section1-basics/ch20-string-manipulation.html",     "keywords": ["string", "substring", "length", "toUpperCase", "toLowerCase", "split", "replace", "StringBuilder", "charAt"] },
  { "id": "ch21-big-o-notation",          "title": "Ch 21. Big O Notation",             "section": "Section 2 — Java DSA",       "path": "chapters/section2-dsa/ch21-big-o-notation.html",             "keywords": ["big o", "time complexity", "space complexity", "O(n)", "O(1)", "O(log n)", "O(n^2)", "efficiency"] },
  { "id": "ch22-recursion",               "title": "Ch 22. Recursion",                  "section": "Section 2 — Java DSA",       "path": "chapters/section2-dsa/ch22-recursion.html",                  "keywords": ["recursion", "recursive", "base case", "call stack", "factorial", "fibonacci"] },
  { "id": "ch23-linked-list",             "title": "Ch 23. Linked List",                "section": "Section 2 — Java DSA",       "path": "chapters/section2-dsa/ch23-linked-list.html",                "keywords": ["linked list", "node", "next", "head", "singly", "doubly", "pointer"] },
  { "id": "ch24-stack",                   "title": "Ch 24. Stack",                      "section": "Section 2 — Java DSA",       "path": "chapters/section2-dsa/ch24-stack.html",                      "keywords": ["stack", "push", "pop", "peek", "LIFO", "last in first out", "Stack class"] },
  { "id": "ch25-queue",                   "title": "Ch 25. Queue",                      "section": "Section 2 — Java DSA",       "path": "chapters/section2-dsa/ch25-queue.html",                      "keywords": ["queue", "enqueue", "dequeue", "FIFO", "first in first out", "LinkedList queue"] },
  { "id": "ch26-binary-search",           "title": "Ch 26. Binary Search",              "section": "Section 2 — Java DSA",       "path": "chapters/section2-dsa/ch26-binary-search.html",              "keywords": ["binary search", "search", "sorted array", "mid", "low", "high", "O(log n)"] },
  { "id": "ch27-sorting-algorithms",      "title": "Ch 27. Sorting Algorithms",         "section": "Section 2 — Java DSA",       "path": "chapters/section2-dsa/ch27-sorting-algorithms.html",         "keywords": ["sort", "bubble sort", "selection sort", "insertion sort", "merge sort", "quick sort", "Arrays.sort"] },
  { "id": "ch28-trees-binary-tree",       "title": "Ch 28. Trees & Binary Tree",        "section": "Section 2 — Java DSA",       "path": "chapters/section2-dsa/ch28-trees-binary-tree.html",          "keywords": ["tree", "binary tree", "root", "leaf", "node", "BST", "binary search tree", "inorder", "preorder", "postorder"] },
  { "id": "ch29-hashmap-internals",       "title": "Ch 29. HashMap Internals",          "section": "Section 2 — Java DSA",       "path": "chapters/section2-dsa/ch29-hashmap-internals.html",          "keywords": ["hashmap", "hash", "bucket", "collision", "put", "get", "hashCode", "equals", "load factor"] },
  { "id": "ch30-graphs",                  "title": "Ch 30. Graphs",                     "section": "Section 2 — Java DSA",       "path": "chapters/section2-dsa/ch30-graphs.html",                     "keywords": ["graph", "vertex", "edge", "BFS", "DFS", "breadth first", "depth first", "adjacency list"] },
  { "id": "ch31-what-is-fullstack",       "title": "Ch 31. What is Full Stack?",        "section": "Section 3 — Java Full Stack","path": "chapters/section3-fullstack/ch31-what-is-fullstack.html",    "keywords": ["full stack", "frontend", "backend", "database", "client server", "web development"] },
  { "id": "ch32-maven-project-setup",     "title": "Ch 32. Maven & Project Setup",      "section": "Section 3 — Java Full Stack","path": "chapters/section3-fullstack/ch32-maven-project-setup.html",  "keywords": ["maven", "pom.xml", "dependency", "build tool", "project structure", "mvn"] },
  { "id": "ch33-spring-boot-intro",       "title": "Ch 33. Spring Boot Intro",          "section": "Section 3 — Java Full Stack","path": "chapters/section3-fullstack/ch33-spring-boot-intro.html",    "keywords": ["spring boot", "spring", "annotation", "@SpringBootApplication", "autoconfigure", "starter"] },
  { "id": "ch34-rest-api-basics",         "title": "Ch 34. REST API Basics",            "section": "Section 3 — Java Full Stack","path": "chapters/section3-fullstack/ch34-rest-api-basics.html",      "keywords": ["rest", "api", "GET", "POST", "PUT", "DELETE", "@RestController", "@GetMapping", "HTTP", "JSON"] },
  { "id": "ch35-database-jpa-hibernate",  "title": "Ch 35. Database + JPA/Hibernate",   "section": "Section 3 — Java Full Stack","path": "chapters/section3-fullstack/ch35-database-jpa-hibernate.html","keywords": ["jpa", "hibernate", "database", "entity", "@Entity", "repository", "spring data", "sql", "mysql"] },
  { "id": "ch36-html-css-for-java-devs",  "title": "Ch 36. HTML & CSS Basics",          "section": "Section 3 — Java Full Stack","path": "chapters/section3-fullstack/ch36-html-css-for-java-devs.html","keywords": ["html", "css", "frontend", "div", "tag", "style", "selector", "flexbox"] },
  { "id": "ch37-react-basics",            "title": "Ch 37. React Basics",               "section": "Section 3 — Java Full Stack","path": "chapters/section3-fullstack/ch37-react-basics.html",         "keywords": ["react", "component", "jsx", "props", "state", "useState", "useEffect", "npm"] },
  { "id": "ch38-react-spring-connect",    "title": "Ch 38. React + Spring Boot",        "section": "Section 3 — Java Full Stack","path": "chapters/section3-fullstack/ch38-react-spring-connect.html", "keywords": ["react", "spring boot", "fetch", "axios", "cors", "api call", "frontend backend"] },
  { "id": "ch39-auth-jwt-spring-security","title": "Ch 39. Auth: JWT + Spring Security", "section": "Section 3 — Java Full Stack","path": "chapters/section3-fullstack/ch39-auth-jwt-spring-security.html","keywords": ["jwt", "spring security", "token", "authentication", "authorization", "login", "bearer"] },
  { "id": "ch40-deploy-render-railway",   "title": "Ch 40. Deploy to Cloud",            "section": "Section 3 — Java Full Stack","path": "chapters/section3-fullstack/ch40-deploy-render-railway.html", "keywords": ["deploy", "render", "railway", "cloud", "hosting", "production", "jar", "dockerfile"] }
]
```

- [ ] **Step 4: Verify in browser**

Type "array" in search box → shows Array chapter + Collections. Type "spring" → shows Spring Boot + related. Click result → chapter loads. Press Escape or click outside → results hide.

- [ ] **Step 5: Suggested commit message**
```
feat: add search feature with pre-built chapter index
```

---

## Task 8: Chapter Template — Write Ch 1 & Ch 2 as Reference Examples

**Files:**
- Write: `chapters/section1-basics/ch01-what-is-java.html`
- Write: `chapters/section1-basics/ch02-install-jdk.html`

These two chapters establish the content pattern for all remaining chapters.

- [ ] **Step 1: Write ch01-what-is-java.html**

```html
<article class="chapter-content">
  <div class="chapter-meta">
    <span class="section-tag">📗 Section 1 — Java Basics</span>
    <h1>Chapter 1: What is Java?</h1>
    <p class="chapter-intro">Understand what Java is, why it was created, and why millions of developers use it today — before writing a single line of code.</p>
  </div>

  <h2>The Simple Answer</h2>
  <p>Java is a <strong>programming language</strong> — a way for you to give instructions to a computer. You write instructions in Java, and the computer follows them.</p>
  <p>Think of it like a recipe. You (the programmer) write the recipe (Java code). The computer (the chef) follows the recipe to produce a result (running program).</p>

  <h2>Why Java?</h2>
  <p>There are hundreds of programming languages. Java is popular for three reasons:</p>
  <ul>
    <li><strong>Write Once, Run Anywhere</strong> — Java code runs on Windows, Mac, Linux, Android, without changes.</li>
    <li><strong>Jobs</strong> — Java is the #1 language for enterprise software and Android apps. High demand.</li>
    <li><strong>Learning foundation</strong> — Java teaches you concepts (OOP, DSA) that transfer to any other language.</li>
  </ul>

  <div class="callout tip">
    💡 <strong>Real-world Java:</strong> Gmail, Twitter's backend, LinkedIn, Netflix, and most Android apps are built with Java or Kotlin (Java's sibling).
  </div>

  <h2>How Java Works (in 30 seconds)</h2>
  <p>Most languages translate your code directly to machine code for one specific operating system. Java does something different:</p>
  <ol>
    <li>You write <code>.java</code> source files.</li>
    <li>The <strong>Java Compiler</strong> (<code>javac</code>) translates them to <strong>bytecode</strong> (<code>.class</code> files).</li>
    <li>The <strong>Java Virtual Machine (JVM)</strong> runs that bytecode on <em>any</em> operating system.</li>
  </ol>

  <div class="callout info">
    ℹ️ <strong>Bytecode</strong> is not machine code. It's a middle format that the JVM understands. The JVM is different for each OS — but your bytecode stays the same.
  </div>

  <h2>Java vs JavaScript</h2>
  <p>They sound similar but are completely different languages, created by different companies, for different purposes.</p>
  <ul>
    <li><strong>Java</strong> — general purpose, compiled, strongly typed, runs on JVM.</li>
    <li><strong>JavaScript</strong> — runs in browsers, loosely typed, interpreted.</li>
  </ul>

  <div class="callout warning">
    ⚠️ <strong>Do not confuse them.</strong> Java and JavaScript share a name for historical marketing reasons. They are as different as "car" and "carpet".
  </div>

  <h2>What You Will Build in This Ebook</h2>
  <ul>
    <li><strong>Section 1 (Basics):</strong> Core Java — variables, loops, OOP, collections.</li>
    <li><strong>Section 2 (DSA):</strong> Data structures and algorithms — linked lists, trees, sorting.</li>
    <li><strong>Section 3 (Full Stack):</strong> Build a full web app with Spring Boot backend and React frontend.</li>
  </ul>

  <div class="exercise">
    <h3>🧠 Think About It</h3>
    <p>Name one app on your phone or computer that you think might be built with Java. Google it to check your guess. (Hint: almost every Android app counts.)</p>
  </div>
</article>
```

- [ ] **Step 2: Write ch02-install-jdk.html**

```html
<article class="chapter-content">
  <div class="chapter-meta">
    <span class="section-tag">📗 Section 1 — Java Basics</span>
    <h1>Chapter 2: Install JDK 21</h1>
    <p class="chapter-intro">Set up your Java development environment from scratch. After this chapter you can compile and run Java programs on your computer.</p>
  </div>

  <h2>What is JDK?</h2>
  <p>JDK stands for <strong>Java Development Kit</strong>. It contains:</p>
  <ul>
    <li><code>javac</code> — the <strong>compiler</strong> that turns your <code>.java</code> files into bytecode</li>
    <li><code>java</code> — the <strong>runtime</strong> that runs your compiled programs</li>
    <li>Standard libraries (the built-in tools Java gives you for free)</li>
  </ul>

  <div class="callout tip">
    💡 <strong>Always install the JDK</strong>, not just the JRE. JRE (Java Runtime Environment) can only run programs — it cannot compile them. You need both.
  </div>

  <h2>Which Version to Install?</h2>
  <p>Install <strong>JDK 21</strong>. It is the current <strong>LTS (Long-Term Support)</strong> version — meaning it receives security updates for years. Avoid non-LTS versions for learning.</p>

  <h2>Step 1: Download JDK 21</h2>
  <ol>
    <li>Go to <strong>adoptium.net</strong> (Eclipse Temurin — free, open source)</li>
    <li>Select: <strong>Version 21 (LTS)</strong></li>
    <li>Your OS should auto-detect. Click <strong>Download Temurin 21</strong></li>
  </ol>

  <div class="callout info">
    ℹ️ Adoptium (Temurin) is the recommended free JDK. Oracle's JDK is also fine but has a commercial licence for production use.
  </div>

  <h2>Step 2: Install</h2>
  <p><strong>Windows:</strong> Run the <code>.msi</code> installer. Follow the wizard. When asked, check <strong>"Set JAVA_HOME variable"</strong> if that option appears.</p>
  <p><strong>Mac:</strong> Run the <code>.pkg</code> installer. Follow the wizard.</p>
  <p><strong>Linux (Ubuntu/Debian):</strong></p>
  <pre><code class="language-bash">sudo apt update
sudo apt install temurin-21-jdk</code></pre>

  <h2>Step 3: Verify Installation</h2>
  <p>Open <strong>Terminal</strong> (Mac/Linux) or <strong>Command Prompt / PowerShell</strong> (Windows) and run:</p>
  <pre><code class="language-bash">java -version</code></pre>
  <p>You should see something like:</p>
  <pre><code class="language-bash">openjdk version "21.0.3" 2024-04-16
OpenJDK Runtime Environment Temurin-21.0.3+9</code></pre>
  <p>Also verify the compiler:</p>
  <pre><code class="language-bash">javac -version</code></pre>
  <p>Expected output: <code>javac 21.0.3</code></p>

  <div class="callout warning">
    ⚠️ If you get <strong>"java is not recognized"</strong> or <strong>"command not found"</strong>, Java is not in your PATH. See the fix below.
  </div>

  <h2>Fixing PATH (Windows)</h2>
  <ol>
    <li>Search for <strong>"Environment Variables"</strong> in Start menu → click <em>Edit the system environment variables</em></li>
    <li>Click <strong>Environment Variables</strong> button</li>
    <li>Under <em>System variables</em>, find <strong>Path</strong> → click Edit</li>
    <li>Click <strong>New</strong> → add: <code>C:\Program Files\Eclipse Adoptium\jdk-21\bin</code> (adjust path to match your install location)</li>
    <li>Click OK, restart terminal</li>
  </ol>

  <h2>Set JAVA_HOME (optional but recommended)</h2>
  <p>Some tools (Maven, Spring Boot) need <code>JAVA_HOME</code>.</p>
  <p><strong>Windows:</strong> Add system variable <code>JAVA_HOME</code> = <code>C:\Program Files\Eclipse Adoptium\jdk-21</code></p>
  <p><strong>Mac/Linux:</strong> Add to <code>~/.bashrc</code> or <code>~/.zshrc</code>:</p>
  <pre><code class="language-bash">export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH=$JAVA_HOME/bin:$PATH</code></pre>

  <div class="exercise">
    <h3>✅ Try It</h3>
    <p>Open your terminal and run <code>java -version</code>. Confirm you see version 21. Then run <code>javac -version</code>. Both should succeed. If not, fix the PATH and try again.</p>
  </div>
</article>
```

- [ ] **Step 3: Verify in browser**

Click Ch 1 and Ch 2 in sidebar. Content loads correctly. Code blocks have copy buttons. Callout boxes (tip/warning/info) show correct colors. Exercise box at bottom shows green border. Prev/Next navigation works.

- [ ] **Step 4: Suggested commit message**
```
content: add Ch 1 (What is Java) and Ch 2 (Install JDK 21) with full content
```

---

## Tasks 9–11: Remaining Chapter Content (by section)

Each remaining chapter follows the same structure as Ch 1 & Ch 2. Use this template for every chapter file:

```html
<article class="chapter-content">
  <div class="chapter-meta">
    <span class="section-tag">[Section tag]</span>
    <h1>Chapter N: [Title]</h1>
    <p class="chapter-intro">[One sentence — what student will learn]</p>
  </div>

  <h2>[First concept]</h2>
  <p>[Explain from scratch. Real analogy first, then technical definition.]</p>

  <div class="callout tip">💡 [Practical tip]</div>

  <pre><code class="language-java">[Runnable code example]</code></pre>

  <div class="callout warning">⚠️ [Common mistake to avoid]</div>

  <div class="exercise">
    <h3>✅ Try It</h3>
    <p>[Specific hands-on task the student can do right now]</p>
  </div>
</article>
```

### Task 9: Section 1 Remaining Chapters (Ch 3–Ch 20)

Write content for each of:
`ch03-install-vscode.html`, `ch04-hello-world.html`, `ch05-variables-datatypes.html`, `ch06-operators.html`, `ch07-input-output.html`, `ch08-if-else-switch.html`, `ch09-loops.html`, `ch10-arrays.html`, `ch11-methods.html`, `ch12-oop-classes-objects.html`, `ch13-constructors.html`, `ch14-inheritance.html`, `ch15-polymorphism.html`, `ch16-encapsulation-abstraction.html`, `ch17-interfaces.html`, `ch18-exception-handling.html`, `ch19-collections.html`, `ch20-string-manipulation.html`

- [ ] Write and review each file (one at a time)
- [ ] After every 3-4 chapters, verify in browser
- [ ] **Suggested commit message after each group:**
```
content: add Section 1 chapters [range] — Java Basics
```

### Task 10: Section 2 Chapters (Ch 21–Ch 30)

Write content for each of:
`ch21-big-o-notation.html`, `ch22-recursion.html`, `ch23-linked-list.html`, `ch24-stack.html`, `ch25-queue.html`, `ch26-binary-search.html`, `ch27-sorting-algorithms.html`, `ch28-trees-binary-tree.html`, `ch29-hashmap-internals.html`, `ch30-graphs.html`

- [ ] Write and review each file
- [ ] DSA chapters must include: visual diagram (ASCII art in a `<pre>` block), step-by-step trace of algorithm, full Java implementation
- [ ] **Suggested commit message:**
```
content: add Section 2 chapters — Java DSA
```

### Task 11: Section 3 Chapters (Ch 31–Ch 40)

Write content for each of:
`ch31-what-is-fullstack.html` through `ch40-deploy-render-railway.html`

- [ ] Write and review each file
- [ ] Full Stack chapters must include: terminal commands in `language-bash` blocks, config files (pom.xml, application.properties) in `language-xml` / `language-properties` blocks
- [ ] **Suggested commit message:**
```
content: add Section 3 chapters — Java Full Stack
```

---

## Task 12: Final Polish & QA

- [ ] **Test all 40 chapter links** — click every sidebar link, confirm chapter loads
- [ ] **Test hash routing** — paste `index.html#ch15-polymorphism` in browser, correct chapter loads
- [ ] **Test search** — try 10 different keywords, results are relevant
- [ ] **Test dark mode** — toggle on/off, refresh, persists
- [ ] **Test copy buttons** — copy code from 3 different chapters, paste into VS Code, code is correct
- [ ] **Test mobile (375px)** — sidebar hidden by default, hamburger works, chapter loads, readable
- [ ] **Test prev/next** — navigate ch01→ch40 via Next button only, all 40 load in order
- [ ] **Verify Ch 1 Prev disabled, Ch 40 Next disabled**
- [ ] **Suggested commit message:**
```
chore: QA pass — verify all 40 chapters, routing, search, and dark mode
```

---

## Running the Ebook Locally

```bash
# Option 1 (easiest — VS Code)
# Right-click index.html → Open with Live Server

# Option 2
npx serve .

# Option 3
python -m http.server 8080
```

> **Note:** `fetch()` requires HTTP. Opening `index.html` as `file://` in Chrome will fail with CORS error. Always use Live Server.
