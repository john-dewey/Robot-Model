import * as THREE from 'three';
import { Constants } from '../utilities/Constants';

class Support extends THREE.Object3D {
    constructor(){
        super();

        //Texture
        const baseTexture = new THREE.TextureLoader().load(Constants.BASE_PATH); 

        baseTexture.wrapS = THREE.RepeatWrapping;
        baseTexture.repeat.set(4 , 1);

        //Mesh
        const baseMesh = new THREE.MeshStandardMaterial({map: baseTexture});

        //Geometry
        const baseGeometry = new THREE.CylinderGeometry(75, 100, 25, 4);

        //Parts
        this.base = new THREE.Mesh(baseGeometry, baseMesh);

        //Shadow
        this.base.castShadow = true;
        this.base.receiveShadow = true;

        //Group and Add
        this.add(this.base);
    }
}

export{Support}