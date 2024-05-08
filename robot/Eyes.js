import * as THREE from 'three';
import { Eye } from './Eye';

class Eyes extends THREE.Object3D {
    constructor() {
      super();

      //Parts
      this.eyeLeft = new Eye();
      this.eyeRight = new Eye();

      //Transformations
      const OFFSET = 11;
      
      this.eyeLeft.position.x = -OFFSET;
      this.eyeRight.position.x = OFFSET;

      //Group and Add
      this.add(this.eyeLeft);
      this.add(this.eyeRight);
    }

}
export{Eyes}