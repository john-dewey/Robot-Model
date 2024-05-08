import * as THREE from 'three';
import { Eyes } from './Eyes';
import { HeadLight } from './HeadLight';
import { Mouth } from './Mouth';
import { Utilities } from '../utilities/Utilities';
import { Constants } from '../utilities/Constants';

class Plate extends THREE.Object3D {
    constructor() {
      super();

      //Texture
      const plateTexture = new THREE.TextureLoader().load(Constants.PLATE_PATH);
      const computerTexture = new THREE.TextureLoader().load(Constants.COMPUTER_PATH);

      //Mesh
      const plateMesh = new THREE.MeshLambertMaterial({map: plateTexture});
      const computerMesh = new THREE.MeshLambertMaterial({map: computerTexture});

      //Geometry
      const plateGeometry = new THREE.BoxGeometry(50,50,4);
      const plateEndGeometry = new THREE.CylinderGeometry(25, 25, 3.5, 32);
      const plateSupportGeometry = new THREE.CylinderGeometry(20, 20, 29, 32);
      const plateSideGeometry = new THREE.BoxGeometry(20,19,20);
      const chinGeometry = new THREE.CylinderGeometry(20, 20, 20, 32);
      const computerGeometry = new THREE.BoxGeometry(30,20,30,32);

      //Parts
      this.eyes = new Eyes();
      this.headLight = new HeadLight();
      this.mouth = new Mouth();
      this.middle = new THREE.Mesh(plateGeometry, plateMesh);
      this.top = new THREE.Mesh(plateEndGeometry, plateMesh);
      this.bottom = new THREE.Mesh(plateEndGeometry, plateMesh);
      this.support = new THREE.Mesh(plateSupportGeometry, plateMesh);
      this.left = new THREE.Mesh(plateSideGeometry, plateMesh);
      this.right = new THREE.Mesh(plateSideGeometry, plateMesh);
      this.computer = new THREE.Mesh(computerGeometry, computerMesh);
      this.chin = new THREE.Mesh(chinGeometry, plateMesh);

      //Shadows
      this.middle.castShadow=true;
      this.top.castShadow=true;
      this.bottom.castShadow=true;
      this.support.castShadow=true;
      this.left.castShadow=true;
      this.right.castShadow=true;
      this.computer.castShadow=true;
      this.chin.castShadow=true;

      //Transforamtions
      const TB_OFFSET = 15
      const LR_OFFEST = 20;
      const LR_LOFT = -10;

      this.left.position.x = -LR_OFFEST;
      this.right.position.x = LR_OFFEST;

      this.support.position.y = -15;
      this.computer.position.y = -10;
      this.left.position.y = LR_LOFT;
      this.right.position.y = LR_LOFT;
      this.chin.position.y = LR_LOFT;

      this.computer.position.z = -20;
      this.top.position.z = -TB_OFFSET;
      this.bottom.position.z = TB_OFFSET;
      this.chin.position.z = 20;
      this.eyes.position.z = -8;
      this.mouth.position.z = 30;
      this.headLight.position.z = -24;

      //Rotation
      this.middle.rotation.x = Utilities.toRadian(90);


      //group then add
      this.group = new THREE.Group();
      this.group.add(this.support)
      this.group.add(this.top);
      this.group.add(this.middle);
      this.group.add(this.left);
      this.group.add(this.right);
      this.group.add(this.bottom);
      this.group.add(this.eyes);
      this.group.add(this.headLight);
      this.group.add(this.mouth);
      this.group.add(this.computer);
      this.group.add(this.chin);

      this.add(this.group);
    }

    getLight(){
      return this.headLight;
    }

    getEyes(){
      return this.eyes;
    }
}
export{Plate}