import * as THREE from 'three';
import { Constants } from '../utilities/Constants';

class Eye extends THREE.Object3D {
    constructor() {
        super();

        //Texture
        const plateTexture = new THREE.TextureLoader().load(Constants.EYE_PLATE_PATH);
        const eyeTexture = new THREE.TextureLoader().load(Constants.EYE_PATH);

        //Mesh
        const plateMesh = new THREE.MeshLambertMaterial({ map: plateTexture });
        const eyeMesh = new THREE.MeshLambertMaterial({ map: eyeTexture });

        //Geometry
        const PLATE_WIDTH = 14;
        const PLATE_WIDTH2 = PLATE_WIDTH + 4;
        const EYE_RADIUS = PLATE_WIDTH / 2;
        const PLATE_DEPTH = 2;
        const EYE_DEPTH = 2;

        const plateGeometry = new THREE.BoxGeometry(PLATE_WIDTH, PLATE_DEPTH, PLATE_WIDTH, 32);
        const plateGeometry2 = new THREE.BoxGeometry(PLATE_WIDTH2, PLATE_DEPTH, PLATE_WIDTH, 32);
        const plateEndGeomtery = new THREE.CylinderGeometry(EYE_RADIUS, EYE_RADIUS, 1, 32);
        const eyeGeometry = new THREE.CylinderGeometry(EYE_RADIUS, EYE_RADIUS, EYE_DEPTH, 32);

        //Parts
        this.bottom = new THREE.Mesh(plateEndGeomtery, plateMesh);
        this.middle1 = new THREE.Mesh(plateGeometry, plateMesh);
        this.middle2 = new THREE.Mesh(plateGeometry2, plateMesh);
        this.top = new THREE.Mesh(plateEndGeomtery, plateMesh);
        this.eye = new THREE.Mesh(eyeGeometry, eyeMesh);

        //Shadows
        this.bottom.castShadow=true;
        this.middle1.castShadow=true;
        this.middle2.castShadow=true;
        this.top.castShadow=true;
        this.eye.castShadow=true;

        //Transformations
        this.top.position.y = PLATE_DEPTH;
        this.bottom.position.y = PLATE_DEPTH;
        this.middle1.position.y = PLATE_DEPTH;
        this.middle2.position.y = PLATE_DEPTH;
        this.eye.position.y = PLATE_DEPTH + EYE_DEPTH;

        this.top.position.z = -5;
        this.bottom.position.z = 5;

        //Group and Add
        this.plate = new THREE.Group();
        this.plate.add(this.bottom);
        this.plate.add(this.middle1);
        this.plate.add(this.middle2);
        this.plate.add(this.top);
        this.add(this.plate);
        this.add(this.eye);
    }

}
export { Eye }