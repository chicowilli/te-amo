// ==========================================
// EFECTOS DE CORAZONES FLOTANTES
// ==========================================

function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.zIndex = '1';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `floatHearts ${Math.random() * 3 + 4}s linear forwards`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 7000);
    }, 800);
}

// ==========================================
// EFECTO DE CONFETI
// ==========================================

function createConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffe4e1', '#fff0f5'];
    
    function createPiece() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '2';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 3}s linear forwards`;
        
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
    
    return createPiece;
}

let confettiMaker = createConfetti();

// ==========================================
// LÓGICA DEL BOTÓN DE INICIO
// ==========================================

document.querySelector('.btn-start').addEventListener('click', () => {
    document.querySelector('.intro-section').style.display = 'none';
    document.querySelector('.main-content').style.display = 'block';
    
    // Crear confeti al iniciar
    for (let i = 0; i < 30; i++) {
        setTimeout(() => confettiMaker(), i * 50);
    }
    
    // Scroll suave al inicio del contenido
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// CONTADOR DE DÍAS JUNTOS
// ==========================================

function updateCounter() {
    const dateInput = document.getElementById('startDate');
    const startDate = dateInput.value;
    
    if (!startDate) {
        return;
    }
    
    const start = new Date(startDate);
    const now = new Date();
    
    // Calcular diferencia
    let diff = now - start;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    
    const minutes = Math.floor(diff / (1000 * 60));
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
}

// Actualizar contador cada minuto
const dateInput = document.getElementById('startDate');
dateInput.addEventListener('change', updateCounter);

setInterval(updateCounter, 60000);

// Establecer fecha por defecto (hoy)
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
updateCounter();

// ==========================================
// CORAZONES INTERACTIVOS
// ==========================================

const interactiveHearts = document.querySelectorAll('.interactive-heart');
let clickCount = 0;

interactiveHearts.forEach(heart => {
    heart.addEventListener('click', function(e) {
        const message = this.getAttribute('data-message');
        const messageDisplay = document.getElementById('messageDisplay');
        
        messageDisplay.textContent = message;
        
        // Crear corazones pequeños al hacer clic
        createHeartExplosion(e.clientX, e.clientY);
        
        clickCount++;
        
        // Cada 4 clics, crear confeti
        if (clickCount % 4 === 0) {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => confettiMaker(), i * 20);
            }
        }
    });
});

// ==========================================
// EXPLOSIÓN DE CORAZONES AL HACER CLIC
// ==========================================

function createHeartExplosion(x, y) {
    const container = document.querySelector('.hearts-container');
    const hearts = ['❤️', '💕', '💖'];
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '3';
        
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        container.appendChild(heart);
        
        let posX = x;
        let posY = y;
        let velY = vy - 2;
        let opacity = 1;
        
        const animate = () => {
            posX += vx;
            posY += velY;
            velY += 0.1; // gravedad
            opacity -= 0.02;
            
            heart.style.left = posX + 'px';
            heart.style.top = posY + 'px';
            heart.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        
        animate();
    }
}

// ==========================================
// BOTÓN FINAL - ¿ME DAS UN BESO?
// ==========================================

document.querySelector('.btn-final').addEventListener('click', function() {
    const finalMessage = document.getElementById('finalMessage');
    const messages = [
        '¡Claro que sí! 😘',
        '¡Te amo! ❤️',
        '¡Eres lo mejor! 💕',
        '¡Siempre! 💗',
        '¡Con gusto! 😊'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    finalMessage.textContent = randomMessage;
    
    // Crear muchos corazones
    for (let i = 0; i < 20; i++) {
        setTimeout(() => confettiMaker(), i * 30);
    }
    
    // Efecto de vibración
    this.style.animation = 'none';
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
            }, i * 50);
        }
    }, 0);
});

// ==========================================
// EFECTOS AL CARGAR LA PÁGINA
// ==========================================

window.addEventListener('load', () => {
    // Iniciar corazones flotantes
    createFloatingHearts();
    
    // Crear algunos corazones iniciales
    for (let i = 0; i < 5; i++) {
        setTimeout(() => confettiMaker(), i * 100);
    }
});

// ==========================================
// EFECTOS DE HOVER EN GALERÍA
// ==========================================

const photoPlaceholders = document.querySelectorAll('.photo-placeholder');

photoPlaceholders.forEach(photo => {
    photo.addEventListener('click', function() {
        // Crear explosión de corazones al hacer clic en fotos
        const rect = this.getBoundingClientRect();
        createHeartExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
});

// ==========================================
// SONIDO AL HACER CLIC (OPCIONAL)
// ==========================================

// Función para crear sonido de "pop" simple (sin archivos externos)
function playPopSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Activar sonido al hacer clic en botones
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        try {
            playPopSound();
        } catch (e) {
            // Si falla, no hacer nada
        }
    });
});

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// EFECTOS ADICIONALES AL SCROLL
// ==========================================

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    // Efecto paralax suave en el fondo
    document.body.style.backgroundPosition = `0 ${scrollTop * 0.5}px`;
});

console.log('🎉 ¡Página lista para sorprender a tu amor! ❤️');
