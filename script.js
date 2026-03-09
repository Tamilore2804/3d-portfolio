const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

function createSpaceLayer(color, count, size, spread) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * spread;
        positions[i3 + 1] = (Math.random() - 0.5) * spread;
        positions[i3 + 2] = (Math.random() - 0.5) * spread;
        colors[i3] = baseColor.r + (Math.random() - 0.5) * 0.2;
        colors[i3+1] = baseColor.g + (Math.random() - 0.5) * 0.2;
        colors[i3+2] = baseColor.b + (Math.random() - 0.5) * 0.2;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return new THREE.Points(geometry, new THREE.PointsMaterial({ size, vertexColors: true, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending }));
}

const spaceDust = createSpaceLayer(0x00f2ff, 7000, 0.4, 150);
const coreStars = createSpaceLayer(0x0077ff, 9000, 0.1, 100);
scene.add(spaceDust, coreStars);

window.addEventListener('scroll', () => {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = 30 + (t * 0.05);
    camera.rotation.y = t * 0.0001;
});

function animate() {
    requestAnimationFrame(animate);
    spaceDust.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});