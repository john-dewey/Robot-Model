import * as THREE from 'three';

class Constants extends THREE.Object3D {
    constructor() {
        super();
    }

    static get SMOKE_PATH() {return '../texture/smoke.png'}
    static get BASE_PATH() { return '../texture/base.png'; }
    static get BICEP_PATH() { return '../texture/bicep.jpg'; }
    static get COMPUTER_PATH() { return '../texture/computer.png'; }
    static get EYE_PATH() { return '../texture/eye.png'; }
    static get EYE_PLATE_PATH() { return '../texture/bar.png'; }
    static get FLOOR_PATH() { return '../texture/cobblestone.png'; }
    static get HAND_PATH() { return '../texture/hand.jpg'; }
    static get JOINT_PATH() { return '../texture/joint.jpg'; }
    static get MOUTH_PATH() { return '../texture/mouth.png'; }
    static get PLATE_PATH() { return '../texture/plate.jpg'; }
    static get STERNUM_PATH() { return '../texture/sternum.jpg'; }
    static get TORSO_PATH() { return '../texture/torso.jpg'; }
    static get TRICEP_PATH() { return '../texture/tricep.jpg'; }
    static get WALL_PATH() { return '../texture/wall.jpg'; }
}

export { Constants };