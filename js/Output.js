"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Scene, Camera, Mesh, PlaneBufferGeometry, RawShaderMaterial, Vector2 } from "three";
import Common_1 from "./Common.js";
import Simulation_1 from "./Simulation.js";
var fs = new FileReader()
var face_vert_raw_1 = fs.readAsText(new File([], "../shaders/face.vert?raw"));
fs = new FileReader()
var color_frag_raw_1 = fs.readAsText(new File([], "../shaders/color.frag?raw"));

var Scene = THREE.Scene
var Camera = THREE.Camera
var Mesh = THREE.Mesh
var PlaneBufferGeometry = THREE.PlaneBufferGeometry
var RawShaderMaterial = THREE.RawShaderMaterial
var Vector2 = THREE.Vector2
var Output = /** @class */ (function () {
    function Output() {
        this.simulation = new Simulation_1();
        this.scene = new Scene();
        this.camera = new Camera();
        this.output = new Mesh(new PlaneBufferGeometry(2, 2), new RawShaderMaterial({
            vertexShader: face_vert_raw_1,
            fragmentShader: color_frag_raw_1,
            uniforms: {
                velocity: {
                    value: this.simulation.fbos.vel_0.texture,
                },
                boundarySpace: {
                    value: new Vector2(),
                },
            },
        }));
        this.scene.add(this.output);
    }
    Output.prototype.addScene = function (mesh) {
        this.scene.add(mesh);
    };
    Output.prototype.resize = function () {
        this.simulation.resize();
    };
    Output.prototype.render = function () {
        Common_1.renderer.setRenderTarget(null);
        Common_1.renderer.render(this.scene, this.camera);
    };
    Output.prototype.update = function () {
        this.simulation.update();
        this.render();
    };
    return Output;
}());
const _default = Output;
export { _default as default };
