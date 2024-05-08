import * as THREE from 'three';
import { Constants } from '../utilities/Constants';

class Mouth extends THREE.Object3D {
    constructor() {
      super();

      //Texture
      const mouthpieceTexture = new THREE.TextureLoader().load(Constants.MOUTH_PATH);

      //Mesh
      const mouthpieceMesh = new THREE.MeshLambertMaterial({map: mouthpieceTexture});

      //Geometry
      const mouthpieceGeometry1 = new THREE.BoxGeometry(10,2,6,32);
      const mouthpieceGeometry2 = new THREE.BoxGeometry(28,2,10,32);

      //Parts
      this.mouthpieceBottom = new THREE.Mesh(mouthpieceGeometry1, mouthpieceMesh);
      this.mouthpieceTop = new THREE.Mesh(mouthpieceGeometry2, mouthpieceMesh);

      //Shadows
      this.mouthpieceBottom.castShadow =true;

      //Transformations
      this.mouthpieceTop.position.z = -10;
      this.mouthpieceTop.position.y = 2;

      //Group and Add
      this.add(this.mouthpieceTop);
    }

}
export{Mouth}