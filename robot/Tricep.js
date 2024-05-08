import * as THREE from 'three';
import { Constants } from '../utilities/Constants.js'

class Tricep extends THREE.Object3D {
  constructor() {
    super();

    //Texture
    const tricepTexture = new THREE.TextureLoader().load(Constants.TRICEP_PATH);

    tricepTexture.wrapT = THREE.RepeatWrapping;
    tricepTexture.repeat.set(1, 1);

    //Mesh
    const tricepMesh = new THREE.MeshLambertMaterial({ map: tricepTexture });
    const connectorMesh = new THREE.MeshLambertMaterial({ color: 0x7c7c7c });

    //Geometry
    const tricepGeometry = new THREE.CylinderGeometry(25/2 - 1, 15/2, 75);
    const connectorGeometry = new THREE.CylinderGeometry(25/2 - 1, 25/2 - 1, 20);

    //Parts
    var tricep = new THREE.Mesh(tricepGeometry, tricepMesh);
    var connector = new THREE.Mesh(connectorGeometry, connectorMesh);

    //Shadows
    tricep.castShadow = true;
    connector.castShadow = true;

    //Transformations
    tricep.position.y = -47;
    connector.position.y = 0;

    //Group and Add
    var group = new THREE.Group();
    group.add(tricep);
    group.add(connector);
    this.add(group);
  }
}
export { Tricep }