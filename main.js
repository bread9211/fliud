// tutorial: https://mofu-dev.com/en/blog/stable-fluids/

// import * as THREE from "three"

const canvas = document.querySelector("canvas")

const resolution = 0.25;
const width = Math.round(canvas.width*resolution);
const height = Math.round(canvas.height*resolution);

const cellScale = new THREE.Vector2(1/width, 1/height);

const planeG = new THREE.PlaneGeometry(2 - cellScale.x*2, 2 - cellScale.y*2)

const fboSize = new THREE.Vector2(width, height);
const fbos = {
    vel_0: null,
    vel_1: null,

    vel_viscous0: null,
    vel_viscous1: null,
    div: null,

    pressure_0: null,
    pressure_1: null
}

for (let key in fbos) {
    fbos[key] = new THREE.WebGLRenderTarget(fboSize.x, fboSize.yÍ, {type: THREE.FloatType});
}