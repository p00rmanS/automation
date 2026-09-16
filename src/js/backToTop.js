// Floating "back to top" button
export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    if (window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
});
