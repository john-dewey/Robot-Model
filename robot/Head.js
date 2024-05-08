import * as THREE from 'three';
import {Plate} from './Plate.js'
import { Utilities } from '../utilities/Utilities.js';

class Head extends THREE.Object3D {
    constructor() {
      super();

      //Texture

      //Mesh
      const headBackMesh = new THREE.MeshLambertMaterial({color: 0x7c7c7c});

      //Geometry
      const headBackGeometry = new THREE.BoxGeometry(25, 40, 25);

      //Parts
      this.plate = new Plate();
      this.headBack = new THREE.Mesh(headBackGeometry, headBackMesh);

      //Shadows
      this.headBack.castShadow = true;
    
      //Transformations
      this.headBack.position.y = 20;
      this.plate.position.y = 30;
      this.plate.position.z = 20;

      //Rotations
      this.plate.rotation.x = Utilities.toRadian(90);
      
      //Group and Add
      this.add(this.plate);
      this.add(this.headBack);
    }

    getPlate(){
      return this.plate;
    }

}
export{Head}