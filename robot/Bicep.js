import * as THREE from 'three';
import { Constants } from '../utilities/Constants.js'

class Bicep extends THREE.Object3D {
  constructor() {
    super();

    //Texture
    const bicepTexture = new THREE.TextureLoader().load(Constants.BICEP_PATH);

    bicepTexture.wrapT = THREE.RepeatWrapping;
    bicepTexture.repeat.set(1, 1);

    const jointTexture = new THREE.TextureLoader().load(Constants.JOINT_PATH);

    jointTexture.wrapT = THREE.RepeatWrapping;
    bicepTexture.repeat.set(1, 1);

    //Mesh
    const bicepMesh = new THREE.MeshLambertMaterial({ map: bicepTexture });
    const connectorMesh = new THREE.MeshLambertMaterial({ color: 0x7c7c7c });
    const jointMesh = new THREE.MeshLambertMaterial({ map: jointTexture });

    //Geometry
    const bicepGeometry = new THREE.BoxGeometry(25, 75, 25);
    const connectorGeometry = new THREE.CylinderGeometry(25 / 2, 25 / 2, 20);
    const jointGeometry = new THREE.BoxGeometry(26, 20, 26);
    
    //Parts
    this.bicep = new THREE.Mesh(bicepGeometry, bicepMesh);
    this.connector = new THREE.Mesh(connectorGeometry, connectorMesh);
    this.joint = new THREE.Mesh(jointGeometry, jointMesh);

    //Shadows
    this.bicep.castShadow = true;
    this.connector.castShadow = true;
    this.joint.castShadow = true;

    //Transformations
    this.bicep.position.y = -75 / 2.0 - 15 / 2;
    this.connector.position.y = 0;
    this.joint.position.y = -80;

    //Group and Add
    this.group = new THREE.Group();
    this.group.add(this.bicep);
    this.group.add(this.connector);
    this.group.add(this.joint);
    
    this.add(this.group);
  }
}
export { Bicep }