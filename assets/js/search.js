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
  if (window.loadChapter) window.loadChapter(id);
  else window.location.hash = id;
});

document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrapper')) {
    searchResults.classList.add('hidden');
  }
});

loadIndex();
