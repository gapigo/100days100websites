const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

const colors = [
  '#ffffa3',
  '#fff497',
  '#ffe88a',
  '#ffd97f',
  '#ffcc73',
  '#ffb56b',
  '#f89d63',
  '#ef865e',
  '#e36e5c',
  '#d5585c',
  '#c5415d',
  '#b22c5e',
  '#9c155f',
  '#830060',
  '#680060',
  '#48005f',
  '#1f005c',
];
let aux = 0;
circles.forEach((circle, index) => {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[Math.round(aux)];
  aux += colors.length / circles.length;
});

window.addEventListener('mousemove', (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach((circle, index) => {
    circle.style.left = x - 12 + 'px';
    circle.style.top = y - 12 + 'px';

    circle.style.scale = (circles.length - index) / circles.length;
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
