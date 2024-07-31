import * as THREE from "https://cdn.skypack.dev/three@0.167.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.167.0/examples/jsm/controls/OrbitControls.js";
import * as BufferGeometryUtils from "https://cdn.skypack.dev/three@0.167.0/examples/jsm/utils/BufferGeometryUtils.js";

function initThreeJSAnimation(containerId) {
    // Get the container element
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Element with id "${containerId}" not found`);
        return;
    }

    // Create the scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create a grid of arrows in 3D
    const arrowLength = 1;
    const arrowColor = new THREE.Color();
    const gridSize = 5;
    const arrowSpacing = 1.5;

    for (let i = -gridSize; i <= gridSize; i++) {
        for (let j = -gridSize; j <= gridSize; j++) {
            for (let k = -gridSize; k <= gridSize; k++) {
                // Compute the gradient direction
                const direction = new THREE.Vector3(i, j, k).normalize();

                // Compute the color based on the gradient
                const magnitude = direction.length();
                arrowColor.setHSL(magnitude / Math.sqrt(3), 1, 0.5);

                // Create the arrow helper
                const arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(i * arrowSpacing, j * arrowSpacing, k * arrowSpacing), arrowLength, arrowColor.getHex());
                scene.add(arrow);
            }
        }
    }

    // Add an ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add a point light to illuminate the arrows
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Add orbit controls for mouse interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping for smoother interactions
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 100;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the scene for better visualization
        scene.rotation.y += 0.04;

        // Update controls
        controls.update();

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Initialize the animations
document.addEventListener('DOMContentLoaded', function() {
    initThreeJSAnimation('animationCanvas-1');
    // initThreeJSAnimation('animationCanvas-2');
    initThreeJSAnimation('animationCanvas-3');
    // initThreeJSAnimation('animationCanvas-4');
});
