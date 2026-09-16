document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-item h4').forEach(header => {
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', 'false');

        const toggle = () => {
            const isOpen = header.parentElement.classList.toggle('open');
            header.setAttribute('aria-expanded', String(isOpen));
        };

        header.addEventListener('click', toggle);
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });
});
