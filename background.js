const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
const maxDistance = 100;

const dotDensity = 0.0005; 
let numDots = Math.floor(canvas.width * canvas.height * dotDensity);

function createDots() {
    dots.length = 0;
    for (let i = 0; i < numDots; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
}

function updateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        for (let j = i + 1; j < dots.length; j++) {
            const dist = Math.hypot(dot.x - dots[j].x, dot.y - dots[j].y);
            if (dist < maxDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(25, 255, 255, ${1 - dist / maxDistance})`;
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(updateDots);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    numDots = Math.floor(canvas.width * canvas.height * dotDensity);
    createDots();
});

createDots();
updateDots();
