import * as THREE from 'three';
import {Rockets} from './Rockets.js'
import {Support} from './Support.js'
import {Computer} from './Computer.js'
import { Utilities } from '../utilities/Utilities.js';


class Base extends THREE.Object3D {
    constructor(){
        super();

        //Parts
        this.rockets = new Rockets();
        this.support = new Support();
        this.computer = new Computer();

        //Transformtions
        this.rockets.position.y = -18;
        this.computer.position.y = 20;

        //Rotations
        this.support.rotation.y = Utilities.toRadian(45);

        //Group and Add
        this.add(this.rockets);
        this.add(this.support);
        this.add(this.computer);
    }

    getRockets(){
        return this.rockets;
    }
}

export{Base}