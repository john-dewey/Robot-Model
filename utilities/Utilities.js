import * as THREE from 'three';

class Utilities extends THREE.Object3D {
    constructor() {
        super();
    }

    static toRadian(degree) {
        return (degree * Math.PI) / 180.0;
    }

    static toDegree(radian) {
        return (degree * 180.0) / Math.PI;
    }


}

export { Utilities };