// Light/dark theme toggle. Dark is the default and the theme the whole
// design system was built for; the stored preference only ever overrides
// that when the user has explicitly asked for light mode.
const STORAGE_KEY = 'automationMasterclassTheme';

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
}

export function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
}

applyTheme(localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark');
