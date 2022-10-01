"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Common_1 = require("./Common");
var Simulation_1 = require("./Simulation");
var face_vert_raw_1 = require("../shaders/face.vert?raw");
var color_frag_raw_1 = require("../shaders/color.frag?raw");
var Output = /** @class */ (function () {
    function Output() {
        this.simulation = new Simulation_1.default();
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.output = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), new THREE.RawShaderMaterial({
            vertexShader: face_vert_raw_1.default,
            fragmentShader: color_frag_raw_1.default,
            uniforms: {
                velocity: {
                    value: this.simulation.fbos.vel_0.texture,
                },
                boundarySpace: {
                    value: new THREE.Vector2(),
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
        Common_1.default.renderer.setRenderTarget(null);
        Common_1.default.renderer.render(this.scene, this.camera);
    };
    Output.prototype.update = function () {
        this.simulation.update();
        this.render();
    };
    return Output;
}());
exports.default = Output;
