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
        threshold: 0.15, // Aciona quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Para a animação acontecer apenas uma vez
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // --- 3. Efeito Parallax Suave no Hero ---
    const heroBg = document.querySelector('.hero-parallax-bg');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;
        // Move a imagem de fundo a 40% da velocidade da rolagem
        heroBg.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)';
    });

    // --- 4. Sistema de Partículas (Estética Dream-Pop/Poeira Atmosférica) ---
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    // Ajusta o tamanho do canvas para cobrir a janela
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
            ctx.fillStyle = `rgba(137, 180, 229, ${this.opacity})`; // Cor Azul Claro var(--accent-light)
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Inicializa o array de partículas
    function initParticles() {
        particlesArray = [];
        // Quantidade de partículas baseada na largura da tela para não pesar a performance
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