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
