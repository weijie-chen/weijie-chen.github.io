import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import * as BufferGeometryUtils from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/utils/BufferGeometryUtils.js";

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
    let camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 100);
    camera.position.set(0, 0, 10);

    // Create a renderer
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add orbit controls for mouse interaction
    let controls = new OrbitControls(camera, renderer.domElement);

    // Create a marker sphere
    let marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 8),
        new THREE.MeshBasicMaterial({ color: "red", wireframe: true })
    );
    scene.add(marker);

    // Create an icosahedron geometry and apply modifications
    let g = new THREE.IcosahedronGeometry(4, 20);
    g = BufferGeometryUtils.mergeVertices(g);

    let uniforms = {
        mousePos: { value: new THREE.Vector3() }
    };

    let m = new THREE.PointsMaterial({
        size: 0.1,
        onBeforeCompile: shader => {
            shader.uniforms.mousePos = uniforms.mousePos;
            shader.vertexShader = `
                uniform vec3 mousePos;
                ${shader.vertexShader}
            `.replace(
                `#include <begin_vertex>`,
                `#include <begin_vertex>
                
                vec3 seg = position - mousePos;
                vec3 dir = normalize(seg);
                float dist = length(seg);
                if (dist < 2.){
                    float force = clamp(1. / (dist * dist), 0., 1.);
                    transformed += dir * force;
                }
            
                `
            );
        }
    });

    // Create and add points mesh
    let p = new THREE.Points(g, m);
    scene.add(p);

    // Clock for animation timing
    let clock = new THREE.Clock();

    // Animation loop
    renderer.setAnimationLoop(() => {
        let t = clock.getElapsedTime();
        marker.position.x = Math.sin(t * 0.5) * 5;
        marker.position.y = Math.cos(t * 0.3) * 5;
        uniforms.mousePos.value.copy(marker.position);

        controls.update();
        renderer.render(scene, camera);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Initialize the animation
document.addEventListener('DOMContentLoaded', function () {
    initThreeJSAnimation('animationCanvas-3');
});
