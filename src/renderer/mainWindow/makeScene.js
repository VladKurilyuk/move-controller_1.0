'use strict'
/* global window, document, console, requestAnimationFrame */
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/GLTFLoader.js';

let container, clock, mixer, actions, activeAction, previousAction;
let camera, scene, renderer, model;

const api = { state: 'Walking' };

init();
animate();

function init() {
    const windowOptions = {
        width: window.innerWidth - 25,
        height: window.innerHeight - 18,
        pixelRatio: window.devicePixelRatio
    }

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, windowOptions.width / windowOptions.height, 0.25, 100);
    camera.position.set(- 5, 3, 10);
    camera.lookAt(new THREE.Vector3(0, 2, 0));

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

    clock = new THREE.Clock();

    // lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);

    // ground
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    scene.add(mesh);

    const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    // model
    const modelPath = window.threeModel.getModelPath();
    const loader = new GLTFLoader();

    loader.load(modelPath, function (gltf) {
        model = gltf.scene;
        scene.add(model);

        createGUI(model, gltf.animations);

    }, undefined, function (e) {
        console.error(e);
    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(windowOptions.pixelRatio);
    renderer.setSize(windowOptions.width, windowOptions.height);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    // stats
    // stats = new Stats();
    // container.appendChild(stats.dom);
}

function createGUI(model, animations) {
    const states = ['Walking', 'Dance', 'Death'];
    const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch'];

    mixer = new THREE.AnimationMixer(model);
    actions = {};

    animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        actions[clip.name] = action;

        if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
            action.clampWhenFinished = true;
            action.loop = THREE.LoopOnce;
        }
    })

    function createEmoteCallback(name) {
        api[name] = function () {
            fadeToAction(name, 0.2);
            mixer.addEventListener('finished', restoreState);
        };
    }

    function restoreState() {
        mixer.removeEventListener('finished', restoreState);
        fadeToAction(api.state, 0.5);
    }

    emotes.forEach(createEmoteCallback);

    activeAction = actions['Walking'];
    activeAction.play();

    window.fadeToAction = fadeToAction;
}

function fadeToAction(name, duration) {
    console.log('Fade to action');
    previousAction = activeAction;
    activeAction = actions[name];

    if (previousAction !== activeAction) {
        previousAction.fadeOut(duration);
    }

    activeAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        .play();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth - 25, window.innerHeight - 17);
}

function animate() {
    const dt = clock.getDelta();

    if (mixer) mixer.update(dt);

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}