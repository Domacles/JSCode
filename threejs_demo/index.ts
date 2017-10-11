import * as THREE from 'three';

class Window_3D {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;

    material: THREE.MeshBasicMaterial;
    geometry: THREE.BoxGeometry;
    plane: THREE.Mesh;
    cube: THREE.Mesh;

    renderer: THREE.CanvasRenderer;

    windowHalfX: number;
    windowHalfY: number;

    constructor(public title: string) {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        var container = document.createElement('div');
        document.body.appendChild(container);

        var info = document.createElement('div');
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        info.innerHTML = title;
        container.appendChild(info);

        this.camera = new THREE.PerspectiveCamera(
            70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.y = 150;
        this.camera.position.z = 500;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);

        this.geometry = new THREE.BoxGeometry(200, 200, 200);
        for (var i = 0; i < this.geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            this.geometry.faces[i].color.setHex(hex);
            this.geometry.faces[i + 1].color.setHex(hex);
        }

        this.material = new THREE.MeshBasicMaterial({
            vertexColors: THREE.FaceColors, overdraw: 0.5
        });

        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.y = 150;
        this.scene.add(this.cube);

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize, false);
        document.addEventListener('touchmove', this.onDocumentTouchMove, false);
        document.addEventListener('mousedown', this.onDocumentMouseDown, false);
        document.addEventListener('touchstart', this.onDocumentTouchStart, false);
    }

    onDocumentMouseDown(event : TouchEvent) : void {

    }

    onDocumentTouchMove(event : TouchEvent) : void {

    }

    onDocumentTouchStart(event : TouchEvent) : void {

    }

    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);


    }
}

var window_3d = new Window_3D("Window_3D");