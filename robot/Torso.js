import * as THREE from 'three';
import { Constants } from '../utilities/Constants';

class Torso extends THREE.Object3D {
    constructor(){
        super();

        //Texture
        const torsoTexture = new THREE.TextureLoader().load(Constants.TORSO_PATH); 

        torsoTexture.wrapT = THREE.RepeatWrapping;
        torsoTexture.repeat.set(1 , 1);

        //Mesh
        const torsoMesh = new THREE.MeshStandardMaterial({ map: torsoTexture });

        //Geometry
        const torsoGeometry = new THREE.BoxGeometry(48, 200, 48);

        //Parts
        this.torso = new THREE.Mesh(torsoGeometry, torsoMesh);

        //Shadows
        this.torso.castShadow = true;
        this.torso.receiveShadow = true;

        //Group and Add
        this.add(this.torso);
    }
}

export{Torso}