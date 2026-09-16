// Glossary tab: live search across every term card
export function filterGlossary() {
    const query = document.getElementById('glossarySearch').value.toLowerCase().trim();
    const terms = document.querySelectorAll('.glossary-term');
    let visibleCount = 0;
    terms.forEach(term => {
        const match = term.textContent.toLowerCase().indexOf(query) !== -1;
        term.style.display = match ? '' : 'none';
        if (match) visibleCount++;
    });
    document.getElementById('glossaryEmpty').style.display = visibleCount === 0 ? 'block' : 'none';
}
