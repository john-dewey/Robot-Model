import * as THREE from 'three';

import { GUI } from 'dat.gui'
import { Utilities } from './utilities/Utilities.js';
import { Robot } from './robot/Robot.js'
import { Constants } from './utilities/Constants.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

let CAMERA, camera, camera2, camera3;
let controls, controls2, controls3;
let scene, renderer, clock;

let ambientLight, dirLight, headlight, spotLight, robotLight, pointLight;
let robotLightHelper, dirLightHelper, pointLightHelper, spotLightHelper, cameraHelper;


let robot;
let rl_X, rl_Z, rl_Y, targetObject;
let head, headlightBox;
let leftArm, leftForearm, leftHand, rightArm, rightForearm, rightHand;

function init() {
    //Renderer parts
    clock = new THREE.Clock();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(200, 700, 500);

    camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera3  = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera3.position.set(0, 300, 500);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;




    controls = new OrbitControls(camera, renderer.domElement);

    controls2 = new FirstPersonControls(camera2, renderer.domElement);

    controls3 = new FlyControls(camera, renderer.domElement);
    controls3.movementSpeed = 100;
    controls3.rollSpeed = Math.PI / 24;
    controls3.autoForward = false;
    controls3.dragToLook = true;

    CAMERA = camera;


    cameraHelper = new THREE.CameraHelper(camera2);
    //scene.add(cameraHelper)






    //Lights----------------------------------
    ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
    dirLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    pointLight = new THREE.PointLight(0xFFFFFF, 1, 1000, 0);
    spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 6, 1, 0);
    headlight = new THREE.PointLight(0xFFFFFF, 10.0, 100);
    robotLight = new THREE.SpotLight(0xFFC0CB, 1, 0, Utilities.toRadian(45), 0.25, 0);

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    robotLight.shadow.camera.near = 500;
    robotLight.shadow.camera.far = 4000;
    robotLight.shadow.camera.fov = 50;

    dirLight.position.set(100, 100, 100);
    pointLight.position.set(0, 750, 100);
    spotLight.position.set(0, 0, 500);

    dirLightHelper = new THREE.CameraHelper(dirLight.shadow.camera);
    pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera);
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    robotLightHelper = new THREE.SpotLightHelper(robotLight);

    scene.add(dirLight);
    scene.add(headlight);
    scene.add(ambientLight);
    scene.add(pointLight);
    scene.add(spotLight);
    scene.add(robotLight);

    scene.add(dirLightHelper);
    scene.add(pointLightHelper);
    scene.add(spotLightHelper);
    scene.add(robotLightHelper);




    //Mesh-------------------------------
    const INITIAL_LOFT = 25;
    robot = new Robot();
    robot.position.y = INITIAL_LOFT;

    const boxTexture = new THREE.TextureLoader().load('texture/box.png');

    const boxMaterial = new THREE.MeshStandardMaterial({ map: boxTexture });
    const boxGeometry = new THREE.BoxGeometry(75, 75, 75);

    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    const box2 = new THREE.Mesh(boxGeometry, boxMaterial);
    const box3 = new THREE.Mesh(boxGeometry, boxMaterial);

    box2.position.x = -90;
    box2.rotation.y = Utilities.toRadian(45);

    box3.position.y = 75;
    box3.position.x = -50;
    box3.position.z = -15;



    const boxes = new THREE.Group();
    boxes.add(box);
    boxes.add(box2);
    boxes.add(box3);

    boxes.position.y = INITIAL_LOFT;
    boxes.position.x = -100;
    boxes.position.z = 250;

    scene.add(boxes);


    const monolithMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const monolithGeometry = new THREE.BoxGeometry(75, 300, 75);
    const monolith = new THREE.Mesh(monolithGeometry, monolithMaterial);

    monolith.position.z = 200;
    monolith.position.y = 150;





    const floorTexture = new THREE.TextureLoader().load(Constants.FLOOR_PATH);
    const wallTexture = new THREE.TextureLoader().load(Constants.WALL_PATH);

    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(5, 5);

    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(1, 1);

    const planeMaterial = new THREE.MeshStandardMaterial({ map: floorTexture, side: THREE.DoubleSide })
    const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide })

    const PLANE_SIZE = 1000;
    const WALL_SIZE = 1000;
    const Z_OFFSET = PLANE_SIZE - (WALL_SIZE / 2);
    const Y_OFFSET = PLANE_SIZE - (WALL_SIZE / 2) - 10;

    const planeGeometry = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 32, 32);
    const wallGeometry = new THREE.PlaneGeometry(WALL_SIZE, WALL_SIZE, 32, 32);

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);

    wall2.position.x = -Z_OFFSET;

    plane.position.y = -10;
    wall1.position.y = Y_OFFSET;
    wall2.position.y = Y_OFFSET;

    wall1.position.z = -Z_OFFSET;

    plane.rotation.x = Utilities.toRadian(90);
    wall2.rotation.y = Utilities.toRadian(90);

    scene.add(robot);
    //scene.add(monolith);
    scene.add(plane);
    scene.add(wall1);
    scene.add(wall2);




    //Shadows------------------------------------

    plane.receiveShadow = true;
    wall1.receiveShadow = true;
    wall2.receiveShadow = true;


    pointLight.castShadow = true;
    spotLight.castShadow = true;
    dirLight.castShadow = true;
    robotLight.castShadow = true;
    box.castShadow = true;
    box2.castShadow = true;
    box3.castShadow = true;
    boxes.castShadow = true;





    //Particle system
    const smokeTexture = new THREE.TextureLoader().load('texture/smoke.jpg');
    smokeTexture.wrapS = THREE.RepeatWrapping;
    smokeTexture.wrapT = THREE.RepeatWrapping;
    smokeTexture.repeat.set(8, 8);

    const particlesGeometry = new THREE.CylinderGeometry(25, 50, 50, 64, 32);
    const particlesMaterial = new THREE.PointsMaterial({ size: 5, sizeAttenuation: true, map: smokeTexture });

    //Points
    const particle1 = new THREE.Points(particlesGeometry, particlesMaterial);
    const particle2 = new THREE.Points(particlesGeometry, particlesMaterial);
    const particle3 = new THREE.Points(particlesGeometry, particlesMaterial);
    const particle4 = new THREE.Points(particlesGeometry, particlesMaterial);

    const particles = new THREE.Group();
    particles.add(particle1);
    particles.add(particle2);
    particles.add(particle3);
    particles.add(particle4);

    const X_OFF = 30;
    const Z_OFF = 30;

    particle1.position.x = -X_OFF;
    particle2.position.x = -X_OFF;
    particle3.position.x = X_OFF;
    particle4.position.x = X_OFF;

    particle1.position.z = -Z_OFF;
    particle2.position.z = Z_OFF;
    particle3.position.z = -Z_OFF;
    particle4.position.z = Z_OFF;

    particles.visible = false;
    scene.add(particles);






    //access parts
    leftArm = robot.getArm1();
    leftForearm = leftArm.getForearm();
    leftHand = leftForearm.getHand();

    rightArm = robot.getArm2();
    rightForearm = rightArm.getForearm();
    rightHand = rightForearm.getHand();

    head = robot.getHead();
    headlightBox = head.getPlate().getLight();

    //Set Visibility
    dirLight.visible = false;
    spotLight.visible = false;
    robotLight.visible = false;
    ambientLight.visible = false;

    dirLightHelper.visible = false;
    pointLightHelper.visible = false;
    spotLightHelper.visible = false;
    robotLightHelper.visible = false;



    const gui = new GUI({ width: 300 })


    
    var ambientLFolder = gui.addFolder('Ambient Light');
    ambientLFolder.add(ambientLight, 'intensity', 0, 1, 0.1);
    ambientLFolder.add(ambientLight, 'visible').name('visible').onChange(render);

    var dirLFolder = gui.addFolder('Directional Light');
    dirLFolder.add(dirLight, 'intensity', 0, 10, 1);
    dirLFolder.add(dirLight, 'visible').name('visible').onChange(render);
    dirLFolder.add(dirLightHelper, 'visible').name('visible').onChange(render);

    var pointLFolder = gui.addFolder('Point Light');
    pointLFolder.add(pointLight, 'intensity', 0, 10, 1);
    pointLFolder.add(pointLight.position, 'x', -250, 250, 10).name("X postion");
    pointLFolder.add(pointLight.position, 'y', 0, 750, 10).name("Y postion");
    pointLFolder.add(pointLight.position, 'z', -250, 250, 10).name("Z postion");
    pointLFolder.add(pointLight, 'visible').name('visible').onChange(render);
    pointLFolder.add(pointLightHelper, 'visible').name('visible').onChange(render);

    var spotLFolder = gui.addFolder('Spot Light');
    spotLFolder.add(spotLight, 'intensity', 0, 50, 1);
    spotLFolder.add(spotLight.position, "x", -250, 250, 0.01).name("X postion");
    spotLFolder.add(spotLight.position, "y", -250, 250, 0.01).name("Y postion");
    spotLFolder.add(spotLight.position, "z", 0, 1000, 0.01).name("Z postion");
    spotLFolder.add(spotLight, 'visible').name('visible').onChange(render);
    spotLFolder.add(spotLightHelper, 'visible').name('visible').onChange(render);

    var robotLFolder = gui.addFolder('Robot Light');
    robotLFolder.add(robotLight, 'intensity', 0, 50, 1);
    robotLFolder.add(robotLight, 'visible').name('visible').onChange(render);
    robotLFolder.add(robotLightHelper, 'visible').name('visible').onChange(render);

    var leftArmFolder = gui.addFolder('Left Arm Movement');
    leftArmFolder.add(leftArm.rotation, 'x', -Math.PI / 2, Math.PI / 2, 15 * Math.PI / 180).name('Shoulder Rotation');
    leftArmFolder.add(leftForearm.rotation, 'x', -Math.PI / 2, 0, 15 * Math.PI / 180).name('Elbow Rotation');
    leftArmFolder.add(leftHand.rotation, 'z', -Math.PI / 2, Math.PI / 2, 15 * Math.PI / 180).name('Wrist Rotation');

    var rightArmFolder = gui.addFolder('Right Arm Movement');
    rightArmFolder.add(rightArm.rotation, 'x', -Math.PI / 2, Math.PI / 2, 15 * Math.PI / 180).name('Shoulder Rotation');
    rightArmFolder.add(rightForearm.rotation, 'x', -Math.PI / 2, 0, 15 * Math.PI / 180).name('Elbow Rotation');
    rightArmFolder.add(rightHand.rotation, 'z', -Math.PI / 2, Math.PI / 2, 15 * Math.PI / 180).name('Wrist Rotation');

    var headFolder = gui.addFolder('Head Movement');
    headFolder.add(head.rotation, 'y', -Math.PI / 2, Math.PI / 2, 15 * Math.PI / 180).name('Neck Rotation').onChange(function (e) {
        const degree = e * 180 / Math.PI;
        rl_X = updateX(degree);
        rl_Y = updateY(degree);
        rl_Z = updateZ(degree);
    });
    headFolder.add(head.rotation, 'x', -Math.PI / 2, Math.PI / 2, 15 * Math.PI / 180).name('Nod Rotation');

    var robotFolder = gui.addFolder('Robot Movement');
    robotFolder.add(robot.position, 'x', -250, 250, 10).name('Sway').onChange(function (e) {
        particles.position.x = e;
    });
    robotFolder.add(robot.position, 'y', 25, 500, 5).name("Lift").onChange(function (e) {
        if (e <= 25) {
            particles.visible = false;
        }
        else {
            particles.visible = true;
        }

        particles.position.y = e - 50;

    }
    );
    robotFolder.add(robot.position, 'z', -250, 250, 10).name('Pitch').onChange(function (e) {
        particles.position.z = e;
    });
    robotFolder.add(robot.rotation, "y", -Math.PI / 2, Math.PI / 2, 15 * Math.PI / 180).name('Turn').onChange(function (e) {
        const degree = e * 180 / Math.PI;
        rl_X = updateX(degree);
        rl_Y = updateY(degree);
        rl_Z = updateZ(degree);

        particles.rotation.y = e;
    });

    //pointLFolder.open();
    //spotLFolder.open();
    //robotLFolder.open();
    leftArmFolder.open();
    rightArmFolder.open();
    headFolder.open();
    robotFolder.open();

    //Position
    rl_X = updateX(0);
    rl_Z = updateZ(0);
    rl_Y = updateY(0);

    //Target
    scene.add(robotLight.target);
    targetObject = new THREE.Object3D();
    scene.add(targetObject);
}


document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 49) {
        CAMERA = camera;
    } else if (keyCode == 50) {
        CAMERA = camera2;
    }
    else if (keyCode == 51) {
        CAMERA = camera3;
    }
    else {
        CAMERA = CAMERA;
    }
}




function updateX(degree) {
    var percent;
    if (degree == 0) {
        percent = 0;
    }
    else {
        percent = degree / 90;
    }

    var total = 0 + (percent * 500);
    return total;
}

function updateY(degree) {
    var percent;
    if (degree == 0) {
        percent = 0;
    }
    else {
        percent = degree / 90;
    }

    if (percent < 0) {
        var total = -300 + (percent * 500);
    }
    else {
        var total = -300 - (percent * 500);
    }

    return total;
}

function updateZ(degree) {
    var percent;
    if (degree == 0) {
        percent = 0;
    }
    else {
        percent = degree / 90;
    }

    if (percent < 0) {
        var total = 500 + (percent * 500);
    }
    else {
        var total = 500 - (percent * 500);
    }

    return total;
}

function animate() {
    requestAnimationFrame(animate);

    var delta = clock.getDelta();
    controls.update(delta);
    controls2.update(delta);
    controls3.update(delta);


    //Set Position
    headlight.position.copy(camera.position);


    const roboPosition = new THREE.Vector3();
    headlightBox.getWorldPosition(roboPosition);
    robotLight.position.set(roboPosition.x, roboPosition.y, roboPosition.z);

    camera2.position.copy(roboPosition);
    camera2.rotation.copy(head.rotation);
    camera2.lookAt(0, 200, 500);

    //Update Target
    targetObject.position.set(rl_X, rl_Y, rl_Z);
    robotLight.target = targetObject;

    robotLightHelper.update();
    cameraHelper.update();

    render();
}

function render() {

    renderer.render(scene, CAMERA);
}

init();
animate();