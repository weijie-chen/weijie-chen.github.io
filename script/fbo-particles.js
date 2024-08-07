import * as THREE from 'https://cdn.jsdelivr.net/npm/three@v0.167.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@v0.167.0/examples/jsm/controls/OrbitControls.js';

function initThreeJSAnimation(containerId) {
    // Get the container element
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Element with id "${containerId}" not found`);
        return;
    }

    // Create the scene
    let scene = new THREE.Scene();

    // Create a camera
    let camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    // Create a renderer
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add orbit controls for mouse interaction
    let controls = new OrbitControls(camera, renderer.domElement);

    // Create a geometry
    let geometry = new THREE.SphereGeometry(2.3, 128, 128);
    let material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    let bubble = new THREE.Mesh(geometry, material);
    scene.add(bubble);

    // Animation function
    function animateBubble(time) {
        requestAnimationFrame(animateBubble);

        const vertices = bubble.geometry.attributes.position.array;
        const length = vertices.length / 3;
        const radius = 1;
        const deformationFactor = 0.5; // Amplitude of deformation

        for (let i = 0; i < length; i++) {
            const x = vertices[i * 3];
            const y = vertices[i * 3 + 1];
            const z = vertices[i * 3 + 2];

            // Calculate distance from the center
            const dist = Math.sqrt(x * x + y * y + z * z);

            // Generate a sinusoidal deformation based on time and position
            const deformation = Math.sin(dist / radius * 2 * Math.PI + time / 1000) * deformationFactor;

            // Apply deformation to the vertices
            vertices[i * 3] += deformation * (Math.random() - 0.5);
            vertices[i * 3 + 1] += deformation * (Math.random() - 0.5);
            vertices[i * 3 + 2] += deformation * (Math.random() - 0.5);
        }

        bubble.geometry.attributes.position.needsUpdate = true;

        controls.update(); // Update controls
        renderer.render(scene, camera);
    }

    animateBubble(0); // Start the animation loop

    // Handle window resize
    window.addEventListener('resize', () => {
        const W = container.clientWidth;
        const H = container.clientHeight;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
    });
}

// Initialize the animations when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initThreeJSAnimation('animationCanvas-4');
});