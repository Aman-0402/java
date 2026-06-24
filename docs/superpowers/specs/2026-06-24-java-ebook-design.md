# Java Ebook — Design Spec
**Date:** 2026-06-24  
**Stack:** HTML + CSS + JS only (no frameworks, no build step)  
**Audience:** Absolute beginners → intermediate Java students

---

## 1. Goal

Static multi-file ebook covering Java Basics, Java DSA, and Java Full Stack. Students open it in a browser (via VS Code Live Server or `npx serve .`). No login, no backend, no build pipeline.

---

## 2. Layout & Theme

**Style:** Full warm/book tone (V2 — unified parchment feel)  
- Sidebar + main content area
- Sidebar: warm tan (`#e8dcc8`) with chapter list grouped by section
- Content area: off-white parchment (`#fffdf7`) with serif-leaning typography
- Active chapter highlighted in sidebar (`#8B4513` brown accent)
- Dark mode toggle inverts to dark navy/purple scheme
- Prev / Next navigation at bottom of each chapter
- Page indicator (e.g., "Chapter 3 of 40")

---

## 3. Features

| Feature | Implementation |
|---|---|
| **Dark Mode** | `theme.js` toggles `data-theme="dark"` on `<body>`. `dark.css` overrides colors. Preference saved to `localStorage`. |
| **Copy Code** | Each `<pre><code>` block gets a copy button injected by `app.js`. Uses `navigator.clipboard.writeText()`. |
| **Search** | `search.js` reads `data/search-index.json` on load. Filters on keypress. Click result → loads chapter + scrolls to heading anchor. |

No progress tracking (out of scope).

---

## 4. File Structure

```
java-ebook/
├── index.html                        # Shell: sidebar + header + content area
├── assets/
│   ├── css/
│   │   ├── main.css                  # Layout, warm theme, typography
│   │   ├── dark.css                  # Dark mode color overrides
│   │   └── prism.css                 # Syntax highlighting (Prism.js Tomorrow theme)
│   ├── js/
│   │   ├── app.js                    # Chapter loader, hash routing, copy buttons, sidebar active state
│   │   ├── search.js                 # Search index reader + filter UI
│   │   ├── theme.js                  # Dark mode toggle + localStorage persistence
│   │   └── prism.js                  # Prism.js (Java + Bash + JSON languages bundled)
│   └── img/
│       └── logo.svg                  # Ebook logo / brand
├── chapters/
│   ├── section1-basics/
│   │   ├── ch01-what-is-java.html
│   │   ├── ch02-install-jdk.html
│   │   ├── ch03-install-vscode.html
│   │   ├── ch04-hello-world.html
│   │   ├── ch05-variables-datatypes.html
│   │   ├── ch06-operators.html
│   │   ├── ch07-input-output.html
│   │   ├── ch08-if-else-switch.html
│   │   ├── ch09-loops.html
│   │   ├── ch10-arrays.html
│   │   ├── ch11-methods.html
│   │   ├── ch12-oop-classes-objects.html
│   │   ├── ch13-constructors.html
│   │   ├── ch14-inheritance.html
│   │   ├── ch15-polymorphism.html
│   │   ├── ch16-encapsulation-abstraction.html
│   │   ├── ch17-interfaces.html
│   │   ├── ch18-exception-handling.html
│   │   ├── ch19-collections.html
│   │   └── ch20-string-manipulation.html
│   ├── section2-dsa/
│   │   ├── ch21-big-o-notation.html
│   │   ├── ch22-recursion.html
│   │   ├── ch23-linked-list.html
│   │   ├── ch24-stack.html
│   │   ├── ch25-queue.html
│   │   ├── ch26-binary-search.html
│   │   ├── ch27-sorting-algorithms.html
│   │   ├── ch28-trees-binary-tree.html
│   │   ├── ch29-hashmap-internals.html
│   │   └── ch30-graphs.html
│   └── section3-fullstack/
│       ├── ch31-what-is-fullstack.html
│       ├── ch32-maven-project-setup.html
│       ├── ch33-spring-boot-intro.html
│       ├── ch34-rest-api-basics.html
│       ├── ch35-database-jpa-hibernate.html
│       ├── ch36-html-css-for-java-devs.html
│       ├── ch37-react-basics.html
│       ├── ch38-react-spring-connect.html
│       ├── ch39-auth-jwt-spring-security.html
│       └── ch40-deploy-render-railway.html
└── data/
    └── search-index.json             # Pre-built: { chapterId, title, keywords[], headings[] }
```

---

## 5. How Chapter Loading Works

1. `index.html` loads once — sidebar and header are permanent DOM
2. User clicks chapter link → `app.js` intercepts, calls `loadChapter(chapterId)`
3. `fetch('chapters/sectionX/chNN-slug.html')` retrieves content fragment
4. Response HTML injected into `<div id="content-area">`
5. `Prism.highlightAll()` called after inject for syntax highlighting
6. Copy buttons injected into all `<pre><code>` blocks
7. URL hash updated: `index.html#ch02-install-jdk` (shareable, bookmarkable)
8. On page load, hash is read and correct chapter auto-loaded
9. Prev / Next computed from chapter manifest array in `app.js`

**Chapter files contain only content** — no `<html>`, `<head>`, or `<body>`. Just `<article>` with headings, paragraphs, code blocks, tips, and exercises.

---

## 6. Chapter Content Structure (per file)

Each chapter HTML follows this template:

```html
<article class="chapter-content">
  <div class="chapter-meta">
    <span class="section-tag">Section 1 — Java Basics</span>
    <h1>Chapter 2: Install JDK 21</h1>
    <p class="chapter-intro">One-sentence summary of what student will learn.</p>
  </div>

  <!-- Explanation blocks -->
  <h2>What is JDK?</h2>
  <p>...</p>

  <!-- Tip/info callout -->
  <div class="callout tip">
    💡 Always install LTS versions. Currently JDK 21.
  </div>

  <!-- Code block (Prism.js highlights) -->
  <pre><code class="language-bash">java -version</code></pre>

  <!-- Warning callout -->
  <div class="callout warning">
    ⚠️ Do not install JRE only — you need the full JDK to compile.
  </div>

  <!-- Mini exercise at end -->
  <div class="exercise">
    <h3>Try It</h3>
    <p>Install JDK 21, open terminal, run <code>java -version</code>. Share the output.</p>
  </div>

  <!-- Chapter nav -->
  <div class="chapter-nav">
    <a class="nav-prev" href="#">← Ch 1: What is Java?</a>
    <span class="chapter-counter">Chapter 2 of 40</span>
    <a class="nav-next" href="#">Ch 3: Install VS Code →</a>
  </div>
</article>
```

---

## 7. Search Index Format

`data/search-index.json` is hand-authored (updated when chapters are added):

```json
[
  {
    "id": "ch02-install-jdk",
    "title": "Install JDK 21",
    "section": "Java Basics",
    "path": "chapters/section1-basics/ch02-install-jdk.html",
    "keywords": ["jdk", "install", "java home", "path", "javac", "runtime", "jre", "lts", "jdk 21"],
    "headings": ["What is JDK?", "Download & Install", "Set JAVA_HOME", "Verify Installation"]
  }
]
```

---

## 8. Third-Party Libraries (CDN or local copy)

| Library | Purpose | Source |
|---|---|---|
| Prism.js | Syntax highlighting (Java, Bash, JSON, XML) | Local copy in `assets/js/prism.js` + `assets/css/prism.css` |

No other dependencies. No jQuery, no React, no bundler.

---

## 9. Dark Mode Spec

- Toggle button in header (☀️ / 🌙)
- `theme.js` sets `document.body.dataset.theme = 'dark'`
- `dark.css` uses `body[data-theme="dark"] { ... }` selectors
- `localStorage.setItem('theme', 'dark')` persists preference
- On load: check localStorage, apply theme before first paint (prevents flash)

---

## 10. Content Standards (per chapter)

- Start from zero — assume student knows nothing about that topic
- Real-world analogies before technical definitions
- Every concept has a runnable code example
- At least one `callout tip` and one `callout warning` per chapter
- One "Try It" exercise at the end
- No jargon without explanation
- Screenshots for GUI steps (installation, IDE setup)

---

## 11. Running Locally

```bash
# Option 1 — VS Code Live Server extension (recommended for students)
# Right-click index.html → "Open with Live Server"

# Option 2 — npx
npx serve .

# Option 3 — Python
python -m http.server 8080
```

> `fetch()` requires HTTP server — cannot open `index.html` directly as `file://` in Chrome (CORS block). VS Code Live Server is the easiest option for students.

---

## 12. Out of Scope

- User accounts / login
- Progress tracking / bookmarks
- Backend / database
- PDF export
- Comments / discussion
- Mobile app
