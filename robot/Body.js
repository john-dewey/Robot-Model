import * as THREE from 'three';
import {Constants} from '../utilities/Constants.js'
import {Torso} from './Torso.js'
import {Sternum} from './Sternum.js'

class Body extends THREE.Object3D {
    constructor(){
        super();
        
        //Texture

        //Mesh
        const neckMesh = new THREE.MeshLambertMaterial({color: 0x7c7c7c});

        //Geometry
        const neckGeometry = new THREE.CylinderGeometry(10, 20, 30, 8);

        //Parts
        this.torso = new Torso();
        this.sternum = new Sternum();
        this.neck = new THREE.Mesh(neckGeometry, neckMesh);

        //Shadows
        this.neck.castShadow = true;

        //Transformations
        this.sternum.position.y = 100;
        this.neck.position.y = 120;

        //Group and Add
        this.add(this.neck);
        this.add(this.torso);
        this.add(this.sternum);
    }
}

export{Body}