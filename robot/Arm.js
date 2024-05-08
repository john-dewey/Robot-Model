import * as THREE from 'three';
import {Bicep} from './Bicep.js'
import {Forearm} from './Forearm.js'

class Arm extends THREE.Object3D {
    constructor() {
      super();

      //Parts
      this.bicep = new Bicep();
      this.forearm = new Forearm();
      
      //Transformations
      this.forearm.position.y = -75;

      //Group Then Add
      this.add(this.bicep);
      this.add(this.forearm);
    }
    
    getForearm(){
        return this.forearm;
    }
}
export{Arm}