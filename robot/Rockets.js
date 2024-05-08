import * as THREE from 'three';
import{Rocket} from './Rocket.js';
import {Constants} from '../utilities/Constants.js'

class Rockets extends THREE.Object3D {
    constructor(){
        super();

        //Parts
        this.rocket1 = new Rocket();
        this.rocket2 = new Rocket();
        this.rocket3 = new Rocket();
        this.rocket4 = new Rocket();

        //Transformations
        const X_OFFSET = 30;
        const Z_OFFSET = 30;

        this.rocket1.position.x = -X_OFFSET;
        this.rocket2.position.x = -X_OFFSET;
        this.rocket3.position.x = X_OFFSET;
        this.rocket4.position.x = X_OFFSET;

        this.rocket1.position.z = -Z_OFFSET;
        this.rocket2.position.z = Z_OFFSET;
        this.rocket3.position.z = -Z_OFFSET;
        this.rocket4.position.z = Z_OFFSET;

        //Group and Add
        this.add(this.rocket1);
        this.add(this.rocket2);
        this.add(this.rocket3);
        this.add(this.rocket4);
    }

    getRocket1(){
        return this.rocket1;
    }

    getRocket2(){
        return this.rocket2;
    }

    getRocket3(){
        return this.rocket3;
    }

    getRocket4(){
        return this.rocket4;
    }
}

export{Rockets}