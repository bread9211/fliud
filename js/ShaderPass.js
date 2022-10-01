"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("./Common");
var THREE = require("three");

var ShaderPass = /** @class */ (function () {
    function ShaderPass(props) {
        var _a;
        this.props = props;
        this.uniforms = (_a = this.props.material) === null || _a === void 0 ? void 0 : _a.uniforms;
    }
    ShaderPass.prototype.init = function () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        if (this.uniforms) {
            this.material = new THREE.RawShaderMaterial(this.props.material);
            this.geometry = new THREE.PlaneBufferGeometry(2.0, 2.0);
            this.plane = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(this.plane);
        }
    };
    ShaderPass.prototype.update = function () {
        var _a, _b, _c;
        (_a = Common_1.default.renderer) === null || _a === void 0 ? void 0 : _a.setRenderTarget(this.props.output);
        (_b = Common_1.default.renderer) === null || _b === void 0 ? void 0 : _b.render(this.scene, this.camera);
        (_c = Common_1.default.renderer) === null || _c === void 0 ? void 0 : _c.setRenderTarget(null);
    };
    return ShaderPass;
}());
exports.default = ShaderPass;
