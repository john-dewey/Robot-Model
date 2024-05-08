import * as THREE from 'three';
import { Constants } from '../utilities/Constants.js'
import { Utilities } from '../utilities/Utilities.js';

class Hand extends THREE.Object3D {
  constructor() {
    super();

    //Texture
    const texture = new THREE.TextureLoader().load(Constants.HAND_PATH); 

    //Mesh
    const baseMesh = new THREE.MeshLambertMaterial({ map: texture });
    const tongMesh = new THREE.MeshLambertMaterial({ map: texture });
    const connectorMesh = new THREE.MeshLambertMaterial({ map: texture });
    
    //Geometry
    const HANDBAR_LENGTH = 2;
    const HANDBAR_HEIGHT = 7.5 * 2.0;
    const HANDBAR_WIDTH = HANDBAR_HEIGHT + HANDBAR_HEIGHT / 3;

    const TONG_LENGTH = 10;
    const TONG_WIDTH = HANDBAR_LENGTH;
    const TONG_HEIGHT = HANDBAR_HEIGHT;

    const HANDCONNECT_TOP = HANDBAR_HEIGHT / 2.0;
    const HANDCONNECT_BOTTOM = HANDBAR_HEIGHT / 2.0;
    const HANDCONNECT_HEIGHT = HANDBAR_LENGTH;

    const baseGeo = new THREE.BoxGeometry(HANDBAR_WIDTH, HANDBAR_HEIGHT, HANDBAR_LENGTH);
    const tongGeo = new THREE.BoxGeometry(TONG_WIDTH, TONG_HEIGHT, TONG_LENGTH);
    const connectorGeo = new THREE.CylinderGeometry(HANDCONNECT_TOP, HANDCONNECT_BOTTOM, HANDCONNECT_HEIGHT);
    
    //Parts
    this.base = new THREE.Mesh(baseGeo, baseMesh);
    this.tong1 = new THREE.Mesh(tongGeo, tongMesh);
    this.tong2 = new THREE.Mesh(tongGeo, tongMesh);
    this.connector = new THREE.Mesh(connectorGeo, connectorMesh);

    //Shadow
    this.base.castShadow = true;
    this.tong1.castShadow = true;
    this.tong2.castShadow = true;
    this.connector.castShadow = true;

    //Transformations
    this.tong1.position.x = (HANDBAR_WIDTH - (2.0 * TONG_WIDTH)) / 2.0 + (TONG_WIDTH / 2.0);
    this.tong2.position.x = -(HANDBAR_WIDTH - (2.0 * TONG_WIDTH)) / 2.0 - (TONG_WIDTH / 2.0);
    this.tong1.position.z = TONG_LENGTH / 2.0;
    this.tong2.position.z = TONG_LENGTH / 2.0;
    this.connector.position.z = -HANDBAR_LENGTH;

    //Rotations
    this.connector.rotation.x = Utilities.toRadian(90);

    //Group and Add
    this.add(this.base);
    this.add(this.tong1);
    this.add(this.tong2);
    this.add(this.connector);
  }
}
export { Hand }