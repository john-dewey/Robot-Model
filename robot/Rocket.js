import * as THREE from 'three';
import {Constants} from '../utilities/Constants.js'

class Rocket extends THREE.Object3D {
    constructor(){
        super();

        //Texture

        //Mesh
        const rocketMesh = new THREE.MeshStandardMaterial({color: 0x000000});

        //Geometry
        const rocketGeometry = new THREE.CylinderGeometry(100/4, 100/4, 100/4, 32);
       
        //Parts
        this.rocket = new THREE.Mesh(rocketGeometry,rocketMesh);

        //Shadow
        this.rocket.castShadow = true;
        this.rocket.receiveShadow = true;
        
        //Group and Add
        this.add(this.rocket);
    }
}

export{Rocket}