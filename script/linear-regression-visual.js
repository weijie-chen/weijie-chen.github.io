import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

// Function to initialize the econometrics visualization
function initEconometricsVisualization(containerId) {
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
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add orbit controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);

    // Create lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // Data Points
    const dataPoints = [
        { x: 2, y: 3, z: 5 },
        { x: 4, y: 5, z: 7 },
        { x: 6, y: 8, z: 10 },
        { x: 8, y: 7, z: 12 },
        { x: 10, y: 12, z: 15 },
        { x: 12, y: 10, z: 14 },
        { x: 14, y: 13, z: 17 },
        { x: 16, y: 15, z: 20 },
    ];

    // Create a group for the points
    const pointsGroup = new THREE.Group();

    // Create material for the points
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // Add points to the group
    dataPoints.forEach(point => {
        const sphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const sphere = new THREE.Mesh(sphereGeometry, pointMaterial);
        sphere.position.set(point.x, point.y, point.z);
        pointsGroup.add(sphere);
    });

    scene.add(pointsGroup);

    // Regression Plane
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 10, 10);
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
        transparent: true,
        opacity: 0.7,
    });

    const regressionPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    regressionPlane.rotation.x = -Math.PI / 2;
    scene.add(regressionPlane);

    // Adjust the plane to fit the regression model
    function updateRegressionPlane(intercept, slopeX, slopeY) {
        const positions = planeGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = slopeX * x + slopeY * positions.getY(i) + intercept;
            positions.setZ(i, y);
        }
        positions.needsUpdate = true;
        planeGeometry.computeVertexNormals();
    }

    // Set regression model parameters (example: z = 0.5 * x + 0.3 * y + 2)
    const intercept = 2;
    const slopeX = 0.5;
    const slopeY = 0.3;

    updateRegressionPlane(intercept, slopeX, slopeY);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

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

// Initialize the econometrics visualization
document.addEventListener('DOMContentLoaded', function () {
    initEconometricsVisualization('animationCanvas-4');
});
