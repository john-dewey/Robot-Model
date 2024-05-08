import * as THREE from 'three';
import {Constants} from '../utilities/Constants.js'
import {Utilities} from '../utilities/Utilities.js'


class Sternum extends THREE.Object3D {
    constructor(){
        super();

        //Texture
        const sternumTexture = new THREE.TextureLoader().load(Constants.STERNUM_PATH);

        sternumTexture.wrapT = THREE.RepeatWrapping;
        sternumTexture.repeat.set( 1,1 );

        //Mesh
        const sternumMesh = new THREE.MeshStandardMaterial({ map: sternumTexture });

        //Geometry
        const sternumGeometry = new THREE.BoxGeometry(150, 25, 50);
        const padGeometry = new THREE.CylinderGeometry(15, 30, 10, 4);

        //Parts
        this.sternum = new THREE.Mesh(sternumGeometry, sternumMesh);
        this.pad1 = new THREE.Mesh(padGeometry, sternumMesh);
        this.pad2 = new THREE.Mesh(padGeometry, sternumMesh);
        this.pad3 = new THREE.Mesh(padGeometry, sternumMesh);
        this.pad4 = new THREE.Mesh(padGeometry, sternumMesh);

        //Transformations
        const X_OFFSET = 50;
        const Y_OFFSET = 17;

        this.pad1.position.x = X_OFFSET;
        this.pad2.position.x = -X_OFFSET;
        this.pad3.position.x = X_OFFSET;
        this.pad4.position.x = -X_OFFSET;
        
        this.pad1.position.y = Y_OFFSET;
        this.pad2.position.y = Y_OFFSET;
        this.pad3.position.y = -Y_OFFSET;
        this.pad4.position.y = -Y_OFFSET;

        //Rotations
        this.pad1.rotation.y = Utilities.toRadian(45);
        this.pad2.rotation.y = Utilities.toRadian(45);
        this.pad3.rotation.y = Utilities.toRadian(45);
        this.pad3.rotation.x = Utilities.toRadian(180);
        this.pad4.rotation.y = Utilities.toRadian(45);
        this.pad4.rotation.x = Utilities.toRadian(180);

        //Shadow
        this.sternum.castShadow = true;
        this.sternum.receiveShadow = true;
        this.pad1.castShadow = true;
        this.pad2.castShadow = true;

        //Group and Add
        this.add(this.pad1);
        this.add(this.pad2);
        this.add(this.pad3);
        this.add(this.pad4);
        this.add(this.sternum);
    }
}

export{Sternum}