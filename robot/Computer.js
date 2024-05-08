import * as THREE from 'three';
import {Constants} from '../utilities/Constants.js'

class Computer extends THREE.Object3D {
    constructor() {
        super();

        //Texture
        const texture = new THREE.TextureLoader().load(Constants.COMPUTER_PATH); 

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4 , 4);

        //Mesh
        const computerMesh = new THREE.MeshStandardMaterial({ map: texture });

        //Geometry
        const computerGeometry = new THREE.BoxGeometry(100, 15, 100);
        
        //Parts
        this.computer = new THREE.Mesh(computerGeometry, computerMesh);

        //Shadows
        this.computer.castShadow = true;
        this.computer.receiveShadow = true;

        //Group and Add
        this.add(this.computer);
    }
}

export { Computer }