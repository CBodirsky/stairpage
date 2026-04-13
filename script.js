
// =========================
// CONFIG: COLORS & PHRASES
// =========================
const ghostColorsA = [
    "rgba(150, 80, 0, 0.8)",
    "rgba(120, 40, 20, 0.8)",
    "rgba(100, 60, 20, 0.8)",
    "rgba(140, 20, 0, 0.8)"
];
const ghostColorsB = [
    "rgba(140, 80, 255, 0.8)",   // spectral violet
    "rgba(110, 60, 220, 0.8)",   // dim purple
    "rgba(90, 50, 200, 0.8)",    // deep indigo
    "rgba(70, 40, 170, 0.8)",    // shadow violet
    "rgba(160, 100, 255, 0.8)"   // ghostly lavender
];
const ghostColorsC = [
    "rgba(200, 160, 255, 0.8)",
    "rgba(180, 140, 255, 0.8)"
];

const ghostPhrasesA = [
    "I miss you",
    "come join me",
    "you can be so happy here",
    "you used to love this game",
    "just relax and listen to me",
    "he's not disappointed anymore",
    "you always relax when you're close",
    "you don't need to hide from me",
    "you belong up here",
    "you're so close now",
    "you're starting to remember",
    "it's time now"
]
const ghostPhrasesB = [
    "why are you scared",
    "you look so sad these days",
    "did I say something wrong",
    "everyone hates you there",
    "she's gone but it's not your fault",
    "it's been so cold without you",
    "no one will interrupt us this time",
    "you've been avoiding me again",
    "you were always going to come back",
    "maybe this time it will matter",
    "I know you can hear me",
    "you know how this ends",
    "isn't this what you wanted",
    "you weren't supposed to leave last time",
    "you're breathing faster now"
]
const ghostPhrasesC = [
    "cardinal 23.7b drift error",
    "index out of range",
    "phase containment compromised",
    "OAC uplink: signal lost",
    "UNAUTHORIZED OBSERVER DETECTED: TRACKING..."
];

// =====================
// INITIAL PAGE EFFECTS
// =====================

// Fade-in
window.onload = () => document.body.style.opacity = 1;

// Occasional flicker
setInterval(() => {
    document.body.style.opacity = 0.97;
    setTimeout(() => document.body.style.opacity = 1, 150);
}, 28000);

// Delayed footer reveal
setTimeout(() => {
    document.getElementById('footer').style.opacity = 1;
}, 10000);

// =====================
// SYSTEM ALERT MESSAGE
// =====================

setTimeout(() => {
    const alert = document.getElementById('system-alert');
    alert.innerHTML =
        'UNAUTHORIZED OBSERVER DETECTED: TRACKING<span class="dots"></span>';
    alert.style.opacity = 1;
    
    //Glitch nudge
    alert.style.transform = "translateX(15px)";
    setTimeout(() => alert.style.transform = "translateX(0)", 120);
}, 30000);

// ================
// INVERSION FLASH
// ================

function invertFlash() {
    const flash = document.getElementById('invert-flash');
    flash.style.opacity = 1;

    setTimeout(() => {
        flash.style.opacity = 0;
    }, 80); // duration of the flash

    // schedule next flash
    setTimeout(invertFlash, 10000 + Math.random() * 10000);
}

// ======================
// GHOST TEXT GENERATION
// ======================

function spawnGhostText() {
    const ghost = document.createElement('div');
    ghost.className = 'ghost-text';

    //Phase selection
    const r = Math.random();
    let phraseList, colorList;
    if (r < 0.40) {
        phraseList = ghostPhrasesA;
        colorList = ghostColorsA;
    } else if (r < 0.95) {
        phraseList = ghostPhrasesB;
        colorList = ghostColorsB;
    } else {
        phraseList = ghostPhrasesC;
        colorList = ghostColorsC;
}

    ghost.textContent = phraseList[Math.floor(Math.random() * phraseList.length)];
    ghost.style.color = colorList[Math.floor(Math.random() * colorList.length)];

    // --- Visual randomization ---    
    ghost.style.fontSize = (1 + Math.random() * 0.8) + "rem";
    const rotation = (Math.random() - 0.5) * 4;
    ghost.style.top = 20 + Math.random() * 80 + "%";
    ghost.style.left = 20 + Math.random() * 80 + "%";

    document.getElementById('ghost-container').appendChild(ghost);

    // --- Drift animation ---
    const driftX = (Math.random() - 0.5) * 60;
    const driftY = (Math.random() - 0.5) * 60;
    const driftName = "drift_" + Math.random().toString(36).substring(2, 9);

    const styleSheet = document.getElementById("dynamic-styles").sheet;
    styleSheet.insertRule(`
        @keyframes ${driftName} {
            from { transform: translate(-50%, -50%) rotate(${rotation}deg); }
            to   { transform: translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) rotate(${rotation}deg); }
        }
    `, styleSheet.cssRules.length);

    // Apply animation
    ghost.style.animation = `${driftName} 4s ease-in-out forwards`;

    // --- Fade In/Out
    setTimeout(() => ghost.style.opacity = 0.30 + Math.random() * 0.05, 50);
    setTimeout(() => {
        ghost.style.opacity = 0;
        setTimeout(() => ghost.remove(), 2000);
    }, 4000);

    // --- Schedule next ---
    setTimeout(spawnGhostText, 1000 + Math.random() * 3000);
}

// =================
// MAIN TEXT GLITCH
// =================

function randomShiftGlitch() {
    const el = document.querySelector('.main-text');
    if (!el) return;

    const x1 = (Math.random() - 0.5) * 100;  // -50 to +50
    const y1 = (Math.random() - 0.5) * 100;
    const x2 = (Math.random() - 0.5) * 100;
    const y2 = (Math.random() - 0.5) * 100;

    const animName = "glitch_" + Math.random().toString(36).substring(2, 9);

    const sheet = document.getElementById("dynamic-styles").sheet;
    sheet.insertRule(`
        @keyframes ${animName} {
            0% { transform: translate(0, 0); }
            50% { transform: translate(${x1}px, ${y1}px); }
            100% { transform: translate(${x2}px, ${y2}px); }
        }
    `, sheet.cssRules.length);

    // Apply animation
    el.style.setProperty("--glitch-name", animName);
    el.classList.add('active');

    setTimeout(() => el.classList.remove('active'), 200);

    setTimeout(randomShiftGlitch, 10000 + Math.random() * 5000);
}



// ===============
// STARTUP TIMERS
// ===============

setTimeout(randomShiftGlitch, 8000);
setTimeout(spawnGhostText, 5000);
setTimeout(invertFlash, 12000);
