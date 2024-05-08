import * as THREE from 'three';
import { Utilities } from '../utilities/Utilities';

class HeadLight extends THREE.Object3D {
    constructor() {
        super();

        //Texture

        //Mesh
        const plateMesh = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const lightMesh = new THREE.MeshPhongMaterial({ color: 0xFFC0CB });
        lightMesh.transparent = true;
        lightMesh.opacity = .75;
        lightMesh.shininess = 30;


        //Geometry
        const plateGeometry = new THREE.BoxGeometry(10, 2, 10, 32);
        const extensionGeometry = new THREE.BoxGeometry(8, 2, 8, 32);
        const lightGeometry = new THREE.BoxGeometry(8, 8, 8, 32);

        //Parts
        this.lightBox = new THREE.Mesh(lightGeometry, lightMesh);
        this.plate = new THREE.Mesh(plateGeometry, plateMesh);
        this.extension1 = new THREE.Mesh(extensionGeometry, plateMesh);
        this.extension2 = new THREE.Mesh(extensionGeometry, plateMesh);

        //Shadows

        //Transformations
        this.extension1.position.x = 0;
        this.extension2.position.x = 6;

        this.extension1.position.y = 2;
        this.extension2.position.y = 2;
        this.plate.position.y = 2;

        this.extension1.position.z = -6;
        this.extension2.position.z = -1;
        this.lightBox.position.z = -2;

        //Rotations
        
        this.lightBox.rotation.x = Utilities.toRadian(45);
        this.lightBox.rotation.z = Utilities.toRadian(45);
        this.extension1.rotation.y = Utilities.toRadian(90);
        

        //Group Then Add
        this.plate = new THREE.Group();
        this.plate.add(this.extension1);
        this.plate.add(this.extension2);
        this.plate.add(this.plate);

        this.plate.rotation.y = Utilities.toRadian(45);

        this.add(this.lightBox);
        this.add(this.plate);
    }

    getLightBox() {
        return this.lightBox;
    }

}
export { HeadLight }