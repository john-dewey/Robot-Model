import * as THREE from 'three';

class TestSphere extends THREE.Object3D {
	constructor() {
		super();
        const sphereGeometry = new THREE.SphereGeometry(50, 32, 32);
        const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        sphere.castShadow = true;
        this.add(sphere);
	}
}

export{TestSphere}