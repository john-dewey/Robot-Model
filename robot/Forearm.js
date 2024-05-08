import * as THREE from 'three';
import {Tricep} from './Tricep.js'
import {Hand} from './Hand.js'
import { Utilities } from '../utilities/Utilities.js';

class Forearm extends THREE.Object3D {
    constructor() {
      super();

      //Parts
      this.tricep = new Tricep();
      this.hand = new Hand();
      
      //Transfromations
      this.hand.position.y = -85;

      //Rotation
      this.hand.rotation.x = Utilities.toRadian(90);

      //Group and Add
      this.add(this.tricep);
      this.add(this.hand);
    }
    getHand(){
      return this.hand;
    }
}
export{Forearm}