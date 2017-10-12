import * as THREE from 'three';

let container: HTMLElement;

let renderer: THREE.WebGLRenderer;
let mesh: THREE.Mesh, mesh1: THREE.Mesh, mesh2: THREE.Mesh;
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, light: THREE.DirectionalLight;

let mouseX: number = 0, mouseY: number = 0;
let windowHalfX: number = window.innerWidth / 2;
let windowHalfY: number = window.innerHeight / 2;

class Window_3D {

    constructor() {
        container = <HTMLElement>document.getElementById('container');
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1800;

        scene = new THREE.Scene();
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 0, 1).normalize();
        scene.add(light);

        let loader = new THREE.JSONLoader();
        loader.load("obj/cubecolors/cubecolors.js", this.createScene1);
        loader.load("obj/cubecolors/cube_fvc.js", this.createScene2);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        document.addEventListener('mousemove', this.onDocumentMouseMove, false);
        window.addEventListener('resize', this.onWindowResize, false);
    }

    onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    createScene1(geometry: THREE.Geometry, materials: THREE.Material[]) {
        mesh = new THREE.Mesh(geometry, materials);
        mesh.position.x = 400;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 250;
        scene.add(mesh);
    }

    createScene2(geometry: THREE.Geometry, materials: THREE.Material[]) {
        mesh2 = new THREE.Mesh(geometry, materials);
        mesh2.position.x = - 400;
        mesh2.scale.x = mesh2.scale.y = mesh2.scale.z = 250;
        scene.add(mesh2);
    }

    onDocumentMouseMove(event: MouseEvent) {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.render();
    }

    render() {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-  mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        if (mesh) {
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
        }
        if (mesh2) {
            mesh2.rotation.x += 0.01;
            mesh2.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
    }
}

var window_3d = new Window_3D();
window_3d.animate();