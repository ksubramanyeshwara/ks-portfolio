// Tab Switching Functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Add subtle animation to tech items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe tech items and project cards for animation
    document.querySelectorAll('.tech-item, .project-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Console easter egg
    console.log('%c$ whoami', 'color: #238636; font-family: monospace; font-size: 14px;');
    console.log('%cK Subramanyeshwara - DevOps & Cloud Engineer', 'color: #f0f6fc; font-family: monospace; font-size: 12px;');
    console.log('%c$ cat skills.txt', 'color: #238636; font-family: monospace; font-size: 14px;');
    console.log('%cLinux | AWS | Docker | Kubernetes | Terraform | CI/CD', 'color: #8b949e; font-family: monospace; font-size: 12px;');
});
