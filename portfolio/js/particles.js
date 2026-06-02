/* ==========================================================
   Portfolio — Particle Background
   Recreates the floating particle canvas behind the hero.
   ========================================================== */

(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const context = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  const particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  for (let index = 0; index < 100; index += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .25,
      vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.5 + .5
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function draw() {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255,255,255,.35)';
      context.fill();
    });

    particles.forEach((particle, index) => {
      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(mouseX, mouseY);
        context.strokeStyle = `rgba(255,255,255,${.12 * (1 - distance / 150)})`;
        context.lineWidth = .5;
        context.stroke();
      }

      particles.slice(index + 1).forEach((nextParticle) => {
        const ex = particle.x - nextParticle.x;
        const ey = particle.y - nextParticle.y;
        const edgeDistance = Math.sqrt(ex * ex + ey * ey);

        if (edgeDistance < 100) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(nextParticle.x, nextParticle.y);
          context.strokeStyle = `rgba(255,255,255,${.06 * (1 - edgeDistance / 100)})`;
          context.lineWidth = .5;
          context.stroke();
        }
      });
    });

    requestAnimationFrame(draw);
  }

  draw();
})();
