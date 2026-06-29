document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Efeito de Scroll no Header (Blur ao rolar) ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Animação de Reveal (Fade-in das seções ao rolar) ---
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // --- 3. Efeito Parallax Suave no Hero ---
    const heroBg = document.querySelector('.hero-parallax-bg');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;
        heroBg.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)';
    });

    // --- 4. Sistema de Partículas (Estética Dream-Pop/Poeira Atmosférica) ---
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Classe da Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Partículas muito pequenas
            this.size = Math.random() * 2; 
            // Movimento lento flutuando para cima
            this.speedX = (Math.random() * 0.4) - 0.2;
            this.speedY = (Math.random() * 0.5) - 0.8;
            // Opacidade baixa
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Se a partícula sair pelo topo, ela reaparece embaixo
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
            // Se sair pelos lados
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
        }

        draw() {
            ctx.fillStyle = `rgba(137, 180, 229, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Inicializa o array de partículas
    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Loop de animação
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});

// Dicionário de traduções
const translations = {
    en: {
        nav_home: "Home",
        nav_release: "Release",
        nav_about: "About",
        nav_disco: "Discography",
        nav_gallery: "Gallery",
        hero_subtitle: "sad band from poznań, poland.",
        hero_btn: "Listen Now",
        release_title: "Latest Release",
        release_desc: "Fully DYI made album about love and death.",
        about_title: "About the Band",
        about_influences: "Influences:",
        disco_title: "Discography",
        disco_desc_1: "and now shes dead",
        disco_desc_2: "Fully DYI made album about love and death.",
        gallery_title: "Gallery",
        socials_title: "Connect",
        footer_text: "Created by a fan for the fans. LULU SUICIDE Fan Site © 2026."
    },
    pl: {
        nav_home: "Główna",
        nav_release: "Nowości",
        nav_about: "O zespole",
        nav_disco: "Dyskografia",
        nav_gallery: "Galeria",
        hero_subtitle: "smutny zespół z Poznania, Polska.",
        hero_btn: "Słuchaj teraz",
        release_title: "Najnowsze Wydanie",
        release_desc: "W pełni niezależny (DIY) album o miłości i śmierci.",
        about_title: "O zespole",
        about_influences: "Inspiracje:",
        disco_title: "Dyskografia",
        disco_desc_1: "a teraz ona nie żyje",
        disco_desc_2: "W pełni niezależny (DIY) album o miłości i śmierci.",
        gallery_title: "Galeria",
        socials_title: "Kontakt",
        footer_text: "Stworzone przez fana dla fanów. LULU SUICIDE Fan Site © 2026."
    }
};

// Função para trocar o idioma
function setLanguage(lang) {
    // Pega todos os elementos que têm o atributo data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        // Atualiza o texto do elemento com a tradução correspondente
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Atualiza o estilo dos botões para mostrar qual está ativo
    document.getElementById('lang-en').style.color = lang === 'en' ? 'var(--text-glow)' : 'var(--text-main)';
    document.getElementById('lang-pl').style.color = lang === 'pl' ? 'var(--text-glow)' : 'var(--text-main)';
    document.getElementById('lang-en').style.fontWeight = lang === 'en' ? 'bold' : 'normal';
    document.getElementById('lang-pl').style.fontWeight = lang === 'pl' ? 'bold' : 'normal';
}

// Event Listeners pros botões de idioma
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-pl').addEventListener('click', () => setLanguage('pl'));