import './style.css'
import * as THREE from 'three'
// import * as dat from 'dat.gui'
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
// import vertShader from "./shaders/vertShader.glsl"
// import fragShader from "./shaders/fragShader.glsl"

import {setup} from "./setup"
// import "./object";
// import "./Objects";
import "./Objects_clean";
// 

function main() {

// BASIC SETUP

var {scene,camera,renderer} = setup;

// RENDER LOOP

function render(time)
{   
    renderer.render(scene,camera);
    requestAnimationFrame ( render );
}

requestAnimationFrame ( render );

}

main();




