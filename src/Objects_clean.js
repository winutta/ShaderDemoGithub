import * as THREE from "three"
import {setup} from "./setup"
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader"
import * as dat from 'dat.gui'
// import 

// import vertShader from "./shaders/sphere/vertShader.glsl"
// import fragShader from "./shaders/sphere/fragShader.glsl"

//Maybe do this in a seperate file to be more organized

import diffuseVert from "./shaders/Diffuse/vertShader.glsl"
import diffuseFrag from "./shaders/Diffuse/fragShader.glsl"

import diffuseMMVGVert from "./shaders/DiffuseMMVG/vertShader.glsl"
import diffuseMMVGFrag from "./shaders/DiffuseMMVG/fragShader.glsl"

import fresnelVert from "./shaders/Fresnel/vertShader.glsl"
import fresnelFrag from "./shaders/Fresnel/fragShader.glsl"

import reflectionVert from "./shaders/Reflection/vertShader.glsl"
import reflectionFrag from "./shaders/Reflection/fragShader.glsl"

import reflectionNVert from "./shaders/ReflectionN/vertShader.glsl"
import reflectionNFrag from "./shaders/ReflectionN/fragShader.glsl"

import bakeVert from "./shaders/Bake/vertShader.glsl"
import bakeFrag from "./shaders/Bake/fragShader.glsl"

var {scene,renderer} = {...setup};

var sphereGeometry = new THREE.SphereGeometry(1,100.,100.);
sphereGeometry.computeTangents();
var planeGeometry = new THREE.PlaneGeometry(1,1,100,100);

function createSphere(material){
    var mesh = new THREE.Mesh(sphereGeometry,material);
    mesh.scale.set(5,5,5);
    

    mesh.visible = false;
    scene.add(mesh);
    return mesh;
}

function createPlane(material){
    var mesh = new THREE.Mesh(planeGeometry, material);
    mesh.scale.set(10,10,10);
    mesh.visible = false;
    scene.add(mesh);
    return mesh;
}

//Materials:
// Bake, Diffuse, DiffuseMMVG, Fresnel, Reflection, ReflectionN

function createMaterial(vertShader,fragShader, uniforms){
    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader: fragShader,
        // transparent: true
    });

    return material;
}

var bakeUniforms = {
    minV: {value: 0.},
    maxV: {value: 1.},
    valueV: {value: 1.},
    gammaV: {value: 1.},
    tiling: {value: new THREE.Vector2(1,1)},
    offset: {value: new THREE.Vector2(0.,0.)},
    tex: {value: null},
}

var diffuseUniforms = {
    tiling: { value: new THREE.Vector2(1, 1) },
    offset: { value: new THREE.Vector2(0, 0) },
    tex: { value: null },
}

var diffuseMMVGUniforms = {
    tiling: { value: new THREE.Vector2(1, 1) },
    offset: { value: new THREE.Vector2(0, 0) },
    tex: { value: null },
    minV: { value: 0. },
    maxV: { value: 1. },
    valueV: { value: 1 },
    powerV: { value: 1 },
}

var fresnelUniforms = {
    IOR: {value: 1.7},
    facing: { value: 0. },
    edge: { value: 0.208 },
}

var reflectionUniforms = {
    gloss: {value: 1.},
    tex0: { value: "t", value: null },
    tex1: { value: "t", value: null },
    tex2: { value: "t", value: null },
    tex3: { value: "t", value: null },
    tex4: { value: "t", value: null },
    tex5: { value: "t", value: null },
    tex6: { value: "t", value: null },
    tex7: { value: "t", value: null },
    cube0: { value: "t", value: null },
    cube1: { value: "t", value: null },
    cube2: { value: "t", value: null },
    cube3: { value: "t", value: null },
    cube4: { value: "t", value: null },
    cube5: { value: "t", value: null },
    cube6: { value: "t", value: null },
    cube7: { value: "t", value: null },
}

var reflectionNUniforms = {
    tiling: { value: new THREE.Vector2(10, 10) },
    offset: { value: new THREE.Vector2(0, 0) },
    tex0: { value: "t", value: null },
    tex1: { value: "t", value: null },
    tex2: { value: "t", value: null },
    tex3: { value: "t", value: null },
    tex4: { value: "t", value: null },
    tex5: { value: "t", value: null },
    tex6: { value: "t", value: null },
    tex7: { value: "t", value: null },
    cube0: { value: "t", value: null },
    cube1: { value: "t", value: null },
    cube2: { value: "t", value: null },
    cube3: { value: "t", value: null },
    cube4: { value: "t", value: null },
    cube5: { value: "t", value: null },
    cube6: { value: "t", value: null },
    cube7: { value: "t", value: null },
    normTex: {value: null},
    valueV: {value: 0.683},
    gloss: {value: 0.377},
}

//this is looking fairly nice, add a slider?
//maybe need to reexport panos from lys with 128x64 as the highest roughness.

// Create Materials and Meshes //
// --------------------------- //

var diffuseMaterial = createMaterial(diffuseVert, diffuseFrag, diffuseUniforms);
var diffuseMesh = createPlane(diffuseMaterial);

// diffuseMesh.visible = true;

var diffuseMMVGMaterial = createMaterial(diffuseMMVGVert, diffuseMMVGFrag, diffuseMMVGUniforms);
var diffuseMMVGMesh = createPlane(diffuseMMVGMaterial);

// diffuseMMVGMesh.visible = true;

var bakeMaterial = createMaterial(bakeVert, bakeFrag, bakeUniforms);
var bakeMesh = createPlane(bakeMaterial);

// bakeMesh.visible = true;

var reflectionMaterial = createMaterial(reflectionVert,reflectionFrag,reflectionUniforms);
var reflectionMesh = createSphere(reflectionMaterial);

// reflectionMesh.visible = true;

var reflectionNMaterial = createMaterial(reflectionNVert,reflectionNFrag,reflectionNUniforms);
var reflectionNMesh = createSphere(reflectionNMaterial);

console.log("reflN",reflectionNMesh);

reflectionNMesh.visible = true;

var fresnelMaterial = createMaterial(fresnelVert, fresnelFrag, fresnelUniforms);
var fresnelMesh = createSphere(fresnelMaterial);

// fresnelMesh.visible = true;




var meshes = [diffuseMesh, diffuseMMVGMesh, bakeMesh, reflectionMesh, reflectionNMesh, fresnelMesh];

// Add GUI for toggling and variable changing

var gui = new dat.GUI();

// Reflection GUI

var guiDiffuse = gui.addFolder("Diffuse");
// guiDiffuse.open();
guiDiffuse.add(diffuseMesh, "visible");
guiDiffuse.add(diffuseMaterial.uniforms.tiling.value,"x",0.,2.,0.1).name("Tiling X");
guiDiffuse.add(diffuseMaterial.uniforms.tiling.value, "y", 0., 2., 0.1).name("Tiling Y");
guiDiffuse.add(diffuseMaterial.uniforms.offset.value, "x", 0., 2., 0.1).name("Offset X");
guiDiffuse.add(diffuseMaterial.uniforms.offset.value, "y", 0., 2., 0.1).name("Offset Y");

var guiDiffuseMMVG = gui.addFolder("DiffuseMMVG");
// guiDiffuseMMVG.open();
guiDiffuseMMVG.add(diffuseMMVGMesh, "visible");
guiDiffuseMMVG.add(diffuseMMVGMaterial.uniforms.tiling.value, "x", 0., 2., 0.1).name("Tiling X");
guiDiffuseMMVG.add(diffuseMMVGMaterial.uniforms.tiling.value, "y", 0., 2., 0.1).name("Tiling Y");
guiDiffuseMMVG.add(diffuseMMVGMaterial.uniforms.offset.value, "x", 0., 2., 0.1).name("Offset X");
guiDiffuseMMVG.add(diffuseMMVGMaterial.uniforms.offset.value, "y", 0., 2., 0.1).name("Offset Y");
guiDiffuseMMVG.add(diffuseMMVGMaterial.uniforms.minV, "value", 0.,1., 0.01).name("Min");
guiDiffuseMMVG.add(diffuseMMVGMaterial.uniforms.maxV, "value", 0., 1., 0.01).name("Max");
guiDiffuseMMVG.add(diffuseMMVGMaterial.uniforms.valueV, "value", 0., 1., 0.01).name("Value");
guiDiffuseMMVG.add(diffuseMMVGMaterial.uniforms.powerV, "value", 0., 4., 0.01).name("Power");

var guiBake = gui.addFolder("Bake");
// guiBake.open();
guiBake.add(bakeMesh, "visible");
guiBake.add(bakeMaterial.uniforms.tiling.value, "x", 0., 2., 0.1).name("Tiling X");
guiBake.add(bakeMaterial.uniforms.tiling.value, "y", 0., 2., 0.1).name("Tiling Y");
guiBake.add(bakeMaterial.uniforms.offset.value, "x", 0., 2., 0.1).name("Offset X");
guiBake.add(bakeMaterial.uniforms.offset.value, "y", 0., 2., 0.1).name("Offset Y");
guiBake.add(bakeMaterial.uniforms.minV, "value", 0., 1., 0.01).name("Min");
guiBake.add(bakeMaterial.uniforms.maxV, "value", 0., 1., 0.01).name("Max");
guiBake.add(bakeMaterial.uniforms.valueV, "value", 0., 1., 0.01).name("Value");
guiBake.add(bakeMaterial.uniforms.gammaV, "value", 0., 4., 0.01).name("Gamma");

var guiReflection = gui.addFolder("Reflection");
// guiReflection.open();
guiReflection.add(reflectionMesh, "visible");
guiReflection.add(reflectionMaterial.uniforms.gloss, "value", 0., 1., 0.001).name("gloss");

var guiReflectionN = gui.addFolder("ReflectionN");
guiReflectionN.open();
guiReflectionN.add(reflectionNMesh, "visible");
guiReflectionN.add(reflectionNMaterial.uniforms.tiling.value, "x", 0., 20., 0.1).name("Tiling X");
guiReflectionN.add(reflectionNMaterial.uniforms.tiling.value, "y", 0., 20., 0.1).name("Tiling Y");
guiReflectionN.add(reflectionNMaterial.uniforms.offset.value, "x", 0., 2., 0.1).name("Offset X");
guiReflectionN.add(reflectionNMaterial.uniforms.offset.value, "y", 0., 2., 0.1).name("Offset Y");
guiReflectionN.add(reflectionNMaterial.uniforms.valueV, "value", 0., 1., 0.001).name("Value");
guiReflectionN.add(reflectionNMaterial.uniforms.gloss, "value", 0., 1., 0.001).name("Gloss");


var guiFresnel = gui.addFolder("Fresnel");
// guiFresnel.open();
guiFresnel.add(fresnelMesh, "visible");
guiFresnel.add(fresnelMaterial.uniforms.IOR, "value", 0., 10., 0.001).name("IOR");
guiFresnel.add(fresnelMaterial.uniforms.facing, "value", 0., 1., 0.001).name("FACING");
guiFresnel.add(fresnelMaterial.uniforms.edge, "value", 0., 1., 0.001).name("EDGE");






// TEXTURE LOADING AND ASSIGNING TO UNIFORMS //

var textureLoader = new THREE.TextureLoader();
var rgbeLoader = new RGBELoader();

// Reflection & ReflectionN envMap mipmap levels (manually taken as texture uniforms to be interpolated)

function loadMip(url, url2, material, material2) {
    rgbeLoader.load("./fromLys/officialBurley8mips/mip" + url + ".hdr", function (texture) {

        var squareWidth = texture.source.data.width / 4.;
        // console.log("square width", squareWidth);
        var cubeRenderTarget = new THREE.WebGLCubeRenderTarget(squareWidth);
        cubeRenderTarget.fromEquirectangularTexture(renderer, texture);
        var cubeTex = cubeRenderTarget.texture;

        material.uniforms["cube" + url].value = cubeTex;
        material2.uniforms["cube" + url].value = cubeTex;

        console.log("mip", texture, cubeTex); 
        material.uniforms["tex" + url].value = texture;
        material2.uniforms["tex" + url].value = texture;
    });
}

for (var i = 0; i < 8; i++) {
    loadMip(i.toString(), (i - 1).toString(), reflectionMaterial, reflectionNMaterial);
}

//Load for ReflectionN - normalMap

textureLoader.load("./orange_peel.jpg", function(texture){
    // console.log("orangepeel", texture);
    // console.log("linearFilter", THREE.LinearFilter);
    // console.log("nearestFilter", THREE.NearestFilter);
    // console.log("NearestMipmapnearestfilter", THREE.NearestMipmapNearestFilter);

    texture.minFilter = THREE.LinearFilter;
    reflectionNMaterial.uniforms.normTex.value = texture;
});


//Load for Diffuse and DiffuseMMVG - diffuseMap png

textureLoader.load("./diffuse.png",function(texture){
    // texture.minFilter = THREE.LinearFilter;
    // console.log(texture);
    // texture.minFilter = THREE.NearestMipmapLinearFilter;
    // texture.minFilter = THREE.NearestMipmapNearestFilter;
    // texture.minFilter = THREE.LinearMipmapNearestFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    // texture.minFilter = THREE.NearestFilter;
    diffuseMesh.material.uniforms.tex.value = texture;
    diffuseMMVGMesh.material.uniforms.tex.value = texture;
});

// //Load for Bake - bakeMap exr could be tiff or hdr

rgbeLoader.load("./bake.hdr", function (texture){
    // texture.minFilter = THREE.LinearFilter;
    // console.log(texture);
    // texture.minFilter = THREE.NearestMipmapLinearFilter;
    // texture.minFilter = THREE.NearestMipmapNearestFilter;
    // texture.minFilter = THREE.LinearMipmapNearestFilter;
    // texture.minFilter = THREE.LinearMipmapLinearFilter;
    // texture.minFilter = THREE.NearestFilter;
    console.log("bake",texture);
    bakeMesh.material.uniforms.tex.value = texture;
});





// export { bakeMaterial, bakeMesh, diffuseMaterial, diffuseMesh, diffuseMMVGMaterial, diffuseMMVGMesh, fresnelMaterial, fresnelMesh, reflectionMaterial, reflectionMesh, reflectionNMaterial, reflectionNMesh }