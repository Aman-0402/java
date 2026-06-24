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
const ebookShell = document.querySelector('.ebook-shell');

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

// ── Sidebar helpers ──
const mq = window.matchMedia('(max-width: 768px)');
const isMobile = () => mq.matches;
const overlay = document.querySelector('.sidebar-overlay');

function closeSidebar() {
  if (isMobile()) {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  } else {
    ebookShell.classList.add('sidebar-collapsed');
  }
}

function openSidebarMobile() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function toggleSidebar() {
  if (isMobile()) {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebarMobile();
    }
  } else {
    ebookShell.classList.toggle('sidebar-collapsed');
  }
}

// ── Sidebar Link Clicks ──
document.querySelectorAll('.chapter-nav-sidebar a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    loadChapter(id);
    closeSidebar();
  });
});

// ── Sidebar Toggle ──
sidebarToggle.addEventListener('click', toggleSidebar);

// ── Mobile overlay tap closes sidebar ──
document.querySelector('.sidebar-overlay')?.addEventListener('click', closeSidebar);

// ── Chapter Nav Bottom Click Delegation ──
contentArea.addEventListener('click', e => {
  const link = e.target.closest('.chapter-nav-bottom a');
  if (!link || link.classList.contains('disabled')) return;
  e.preventDefault();
  const id = link.getAttribute('href').slice(1);
  if (id) loadChapter(id);
});

// Export for search.js
window.loadChapter = loadChapter;
