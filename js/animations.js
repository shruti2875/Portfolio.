/* ==========================================================
   Portfolio — Hero Animation
   Renders the 3D hero object shown beside the main headline.
   ========================================================== */

(function () {
  const canvas = document.getElementById('hero3d');
  if (!canvas) return;

  const context = canvas.getContext('2d');
  const width = 420;
  const height = 420;
  const centerX = 210;
  const centerY = 210;
  let time = 0;

  const vertices = [
    [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
    [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]
  ];

  const edges = [
    [0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6],
    [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]
  ];

  function rotate(vertex, angleX, angleY) {
    let [x, y, z] = vertex;
    const y2 = y * Math.cos(angleX) - z * Math.sin(angleX);
    const z2 = y * Math.sin(angleX) + z * Math.cos(angleX);
    const x2 = x * Math.cos(angleY) + z2 * Math.sin(angleY);
    const z3 = -x * Math.sin(angleY) + z2 * Math.cos(angleY);
    return [x2, y2, z3];
  }

  function project(vertex) {
    const scale = 200 / (vertex[2] + 5);
    return [centerX + vertex[0] * scale, centerY + vertex[1] * scale];
  }

  function frame() {
    context.clearRect(0, 0, width, height);
    time += .008;

    const rotatedVertices = vertices.map((vertex) => rotate(vertex, time * .7, time));

    context.strokeStyle = 'rgba(255,255,255,.18)';
    context.lineWidth = .8;
    edges.forEach(([start, end]) => {
      const pointA = project(rotatedVertices[start]);
      const pointB = project(rotatedVertices[end]);
      context.beginPath();
      context.moveTo(pointA[0], pointA[1]);
      context.lineTo(pointB[0], pointB[1]);
      context.stroke();
    });

    const smallerVertices = vertices.map((vertex) => rotate(vertex.map((value) => value * .45), time * .5 + 1, time * 1.3));

    context.strokeStyle = 'rgba(255,255,255,.35)';
    context.lineWidth = 1;
    edges.forEach(([start, end]) => {
      const pointA = project(smallerVertices[start]);
      const pointB = project(smallerVertices[end]);
      context.beginPath();
      context.moveTo(pointA[0], pointA[1]);
      context.lineTo(pointB[0], pointB[1]);
      context.stroke();
    });

    rotatedVertices.forEach((vertex) => {
      const point = project(vertex);
      context.beginPath();
      context.arc(point[0], point[1], 2, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255,255,255,.6)';
      context.fill();
    });

    context.strokeStyle = 'rgba(255,255,255,.06)';
    context.lineWidth = .5;
    rotatedVertices.forEach((vertex, index) => {
      const pointA = project(vertex);
      const pointB = project(smallerVertices[index]);
      context.beginPath();
      context.moveTo(pointA[0], pointA[1]);
      context.lineTo(pointB[0], pointB[1]);
      context.stroke();
    });

    requestAnimationFrame(frame);
  }

  frame();
})();
