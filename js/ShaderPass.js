"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
import Common_1 from "./Common.js";
// import { Scene, Camera, RawShaderMaterial, PlaneBufferGeometry, Mesh } from "three";

var Scene = THREE.Scene
var Camera = THREE.Camera
var RawShaderMaterial = THREE.RawShaderMaterial
var PlaneBufferGeometry = THREE.PlaneBufferGeometry
var Mesh = THREE.Mesh
var ShaderPass = /** @class */ (function () {
    function ShaderPass(props) {
        var _a;
        this.props = props;
        this.uniforms = (_a = this.props.material) === null || _a === void 0 ? void 0 : _a.uniforms;
    }
    ShaderPass.prototype.init = function () {
        this.scene = new Scene();
        this.camera = new Camera();
        if (this.uniforms) {
            this.material = new RawShaderMaterial(this.props.material);
            this.geometry = new PlaneBufferGeometry(2.0, 2.0);
            this.plane = new Mesh(this.geometry, this.material);
            this.scene.add(this.plane);
        }
    };
    ShaderPass.prototype.update = function () {
        var _a, _b, _c;
        (_a = Common_1.renderer) === null || _a === void 0 ? void 0 : _a.setRenderTarget(this.props.output);
        (_b = Common_1.renderer) === null || _b === void 0 ? void 0 : _b.render(this.scene, this.camera);
        (_c = Common_1.renderer) === null || _c === void 0 ? void 0 : _c.setRenderTarget(null);
    };
    return ShaderPass;
}());
const _default = ShaderPass;
export { _default as default };
