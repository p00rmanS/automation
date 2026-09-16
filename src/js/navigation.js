const ALL_SECTIONS = ['fundamentals', 'webbasics', 'n8n', 'zapier', 'make', 'ghl', 'powerautomate', 'advanced', 'capstone', 'quiz', 'glossary', 'faq'];
const visited = new Set(JSON.parse(localStorage.getItem('automationMasterclassVisited') || '["fundamentals"]'));

function sectionLabel(id) {
    const btn = document.querySelector('.nav-button[data-section="' + id + '"]');
    return btn ? btn.textContent.trim() : id;
}

// The progress bar doubles as a course map: one clickable segment per
// section, built once and then just re-toggled as "done" — rather than a
// single continuous fill — so a reader can see (and jump to) exactly which
// sections are left, not just what percentage remains.
function buildProgressSegments() {
    const track = document.getElementById('progressTrack');
    if (!track || track.dataset.built) return;
    track.dataset.built = 'true';
    ALL_SECTIONS.forEach(id => {
        const seg = document.createElement('button');
        seg.type = 'button';
        seg.className = 'progress-segment';
        seg.dataset.section = id;
        seg.title = sectionLabel(id);
        seg.setAttribute('aria-label', 'Jump to ' + sectionLabel(id));
        seg.addEventListener('click', () => {
            showSection(id, document.querySelector('.nav-button[data-section="' + id + '"]'));
        });
        track.appendChild(seg);
    });
}

export function updateProgress() {
    document.querySelectorAll('.nav-button').forEach(btn => {
        if (visited.has(btn.dataset.section)) btn.classList.add('visited');
    });
    buildProgressSegments();
    document.querySelectorAll('.progress-segment').forEach(seg => {
        seg.classList.toggle('done', visited.has(seg.dataset.section));
    });
    document.getElementById('progressText').textContent = visited.size + ' / ' + ALL_SECTIONS.length + ' sections viewed';
}

// Auto-built "on this page" jump links, one per top-level .level-section in
// the section being shown, labeled from each level's own badge (BEGINNER,
// INTERMEDIATE, TRY IT, ...). Generic so every tab gets one for free instead
// of hand-authoring 11 near-identical nav strips.
function buildSectionJumpNav(section) {
    const levels = Array.from(section.children).filter(el => el.classList.contains('level-section'));
    let jumpNav = section.querySelector(':scope > .jump-nav');
    if (levels.length < 2) {
        if (jumpNav) jumpNav.remove();
        return;
    }
    if (!jumpNav) {
        jumpNav = document.createElement('nav');
        jumpNav.className = 'jump-nav';
        jumpNav.setAttribute('aria-label', 'On this page');
        const banner = section.querySelector(':scope > .domain-banner');
        if (banner) banner.insertAdjacentElement('afterend', jumpNav);
        else section.insertBefore(jumpNav, section.firstChild);
    }
    jumpNav.innerHTML = '';
    levels.forEach((level, i) => {
        if (!level.id) level.id = section.id + '-level-' + i;
        const badge = level.querySelector('.level-badge');
        const a = document.createElement('a');
        a.href = '#' + level.id;
        a.className = 'jump-link';
        a.textContent = badge ? badge.textContent : 'Part ' + (i + 1);
        a.addEventListener('click', (e) => {
            e.preventDefault();
            level.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        jumpNav.appendChild(a);
    });
}

export function showSection(sectionId, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-button').forEach(b => b.classList.remove('active'));

    const section = document.getElementById(sectionId);
    section.classList.add('active');
    if (btn) btn.classList.add('active');

    buildSectionJumpNav(section);

    visited.add(sectionId);
    localStorage.setItem('automationMasterclassVisited', JSON.stringify(Array.from(visited)));
    updateProgress();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sticky nav gains a background/shadow once the page scrolls under it, and a
// thin bar at the very top tracks how far through the current section the
// reader has scrolled — both purely cosmetic, so failures here shouldn't be loud.
function updateScrollChrome() {
    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        indicator.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + '%';
    }
    const nav = document.querySelector('.nav-tabs');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}

window.addEventListener('scroll', updateScrollChrome, { passive: true });
window.addEventListener('resize', updateScrollChrome);

const initialSection = document.querySelector('.section.active');
if (initialSection) buildSectionJumpNav(initialSection);

// Swipe left/right (touch only) moves to the next/previous lesson tab in
// ALL_SECTIONS order. Deliberately conservative thresholds so it never
// hijacks an ordinary vertical scroll, a tap, or scrolling a wide code
// block — it only fires on a fast, clearly-horizontal, single-finger swipe.
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let touchStartedInScrollableCode = false;

function showSwipeToast(text) {
    let toast = document.getElementById('swipeToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'swipeToast';
        toast.className = 'swipe-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(showSwipeToast._timer);
    showSwipeToast._timer = setTimeout(() => toast.classList.remove('show'), 900);
}

function goToAdjacentSection(offset) {
    const activeId = document.querySelector('.section.active').id;
    const index = ALL_SECTIONS.indexOf(activeId);
    const targetIndex = index + offset;
    if (targetIndex < 0 || targetIndex >= ALL_SECTIONS.length) return;
    const targetId = ALL_SECTIONS[targetIndex];
    showSection(targetId, document.querySelector('.nav-button[data-section="' + targetId + '"]'));
    showSwipeToast((offset < 0 ? '← ' : '') + sectionLabel(targetId) + (offset > 0 ? ' →' : ''));
}

document.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = Date.now();
    const codeBlock = e.target.closest && e.target.closest('.code-block');
    touchStartedInScrollableCode = !!(codeBlock && codeBlock.scrollWidth > codeBlock.clientWidth);
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (touchStartedInScrollableCode) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const elapsed = Date.now() - touchStartTime;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (elapsed < 800 && absX > 70 && absX > absY * 1.5) {
        goToAdjacentSection(deltaX < 0 ? 1 : -1);
    }
}, { passive: true });
