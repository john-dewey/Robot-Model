import * as THREE from 'three';
import {Arm} from './Arm.js'
import {Base} from './Base.js'
import {Body} from './Body.js'
import {Head} from './Head.js'

class Robot extends THREE.Object3D {
	constructor() {
		super();

        //Parts
        this.base = new Base();
        this.body = new Body();
        this.arm1 = new Arm();
        this.arm2 = new Arm();
        this.head = new Head();

        //Transformations
        this.arm1.position.x = -50;
        this.arm2.position.x = 50;

        this.base.position.y = 0;
        this.body.position.y = 125;
        this.arm1.position.y = 220;
        this.arm2.position.y = 220;
        this.head.position.y = 250;

        this.head.position.z = 10;

        //Group and Add
        this.add(this.base);
        this.add(this.body);
        this.add(this.arm1);
        this.add(this.arm2);
        this.add(this.head);
	}
    
    getArm1(){
        return this.arm1;
    }

    getArm2(){
        return this.arm2;
    }

    getHead(){
        return this.head;
    }

    getBase(){
        return this.base;
    }
}

export{Robot}