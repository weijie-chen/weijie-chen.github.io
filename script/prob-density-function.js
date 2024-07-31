import * as THREE from "https://cdn.skypack.dev/three@0.167.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.167.0/examples/jsm/controls/OrbitControls.js";
import * as BufferGeometryUtils from "https://cdn.skypack.dev/three@0.167.0/examples/jsm/utils/BufferGeometryUtils.js";


// Function to initialize the Bayesian visualization
function initBayesianVisualization(containerId) {
    // Get the container element
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Element with id "${containerId}" not found`);
        return;
    }

    // Create the scene
    const scene = new THREE.Scene();

    // Create a camera positioned to view the surface horizontally
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 20, 20); // Elevated position to view the surface horizontally
    camera.lookAt(0, 0, 0);

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add ambient and point lights for illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // Gaussian Distribution Function
    function gaussian(x, y, muX, muY, sigmaX, sigmaY, amplitude = 1) {
        const exponent = -((Math.pow(x - muX, 2) / (2 * Math.pow(sigmaX, 2))) + (Math.pow(y - muY, 2) / (2 * Math.pow(sigmaY, 2))));
        return amplitude * Math.exp(exponent);
    }

    // Create geometry for the surface
    const geometry = new THREE.PlaneGeometry(20, 20, 100, 100);

    // Create a material for the solid surface
    const surfaceMaterial = new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
    });

    // Create a wireframe material for the mesh grid overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000, // Black color for the grid lines
        wireframe: true,
    });

    // Create mesh for the surface
    const surface = new THREE.Mesh(geometry, surfaceMaterial);
    scene.add(surface);

    // Create a wireframe overlay and add it to the scene
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(wireframe);

    // Function to update the surface vertices for the posterior distribution
    function updateSurface(priorMuX, priorMuY, priorSigmaX, priorSigmaY, dataX, dataY, dataSigma, dataWeight) {
        const positions = geometry.attributes.position;
        const amplitude = 2; // Amplitude for visualization purposes
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);

            // Compute prior contribution
            const prior = gaussian(x, y, priorMuX, priorMuY, priorSigmaX, priorSigmaY, amplitude);

            // Compute data (likelihood) contribution
            const likelihood = gaussian(x, y, dataX, dataY, dataSigma, dataSigma, amplitude);

            // Compute posterior as a weighted sum
            const posterior = dataWeight * likelihood + (1 - dataWeight) * prior;

            // Update the z value
            positions.setZ(i, posterior);
        }
        positions.needsUpdate = true;
        geometry.computeVertexNormals();
    }

    // Initial parameters for prior and data
    let priorMuX = 0;
    let priorMuY = 0;
    let priorSigmaX = 5;
    let priorSigmaY = 5;

    let dataX = 2;
    let dataY = 2;
    let dataSigma = 1;
    let dataWeight = 0.5; // Initial weight for blending

    // Initial surface update
    updateSurface(priorMuX, priorMuY, priorSigmaX, priorSigmaY, dataX, dataY, dataSigma, dataWeight);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Update the dataWeight over time to show the transition
        dataWeight = (Math.sin(Date.now() * 0.001) + 1) / 2; // Oscillate between 0 and 1
        updateSurface(priorMuX, priorMuY, priorSigmaX, priorSigmaY, dataX, dataY, dataSigma, dataWeight);

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

// Initialize the Bayesian visualization
document.addEventListener('DOMContentLoaded', function () {
    initBayesianVisualization('animationCanvas-2');
});
