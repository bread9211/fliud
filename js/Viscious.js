"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// import face_vert_raw_1 from "./glsl/sim/face.vert?raw";
// import viscous_frag_raw_1 from "./glsl/sim/viscous.frag?raw";

var fs = new FileReader();
var face_vert_raw_1 = fs.readAsText(new File([], "../shaders/face.vert?raw"));
fs = new FileReader();
var viscous_frag_raw_1 = fs.readAsText(new File([], "../shaders/viscious.frag?raw"))
var VSMShadowMap = THREE.VSMShadowMap;
import ShaderPass_1 from "./ShaderPass.js";
var Viscous = /** @class */ (function (_super) {
    __extends(Viscous, _super);
    function Viscous(simProps) {
        var _this = _super.call(this, {
            material: {
                vertexShader: face_vert_raw_1,
                fragmentShader: viscous_frag_raw_1,
                uniforms: {
                    boundarySpace: {
                        value: simProps.boundarySpace,
                    },
                    velocity: {
                        value: simProps.src.texture,
                    },
                    velocity_new: {
                        value: simProps.dst_.texture,
                    },
                    v: {
                        value: simProps.viscous,
                    },
                    px: {
                        value: simProps.cellScale,
                    },
                    dt: {
                        value: simProps.dt,
                    },
                },
            },
            output: simProps.dst,
            output0: simProps.dst_,
            output1: simProps.dst,
        }) || this;
        _this.init();
        return _this;
    }
    Viscous.prototype.updateViscous = function (_a) {
        var viscous = _a.viscous, iterations = _a.iterations, dt = _a.dt;
        var exportedFboOut = (iterations - 1) % 2 === 0 ? this.props.output1 : this.props.output0;
        if (this.uniforms) {
            this.uniforms.v.value = viscous;
        }
        for (var i = 0; i < iterations; i++) {
            var isOdd = i % 2 == 0;
            var fbo_in = isOdd ? this.props.output0 : this.props.output1;
            var fbo_out = isOdd ? this.props.output1 : this.props.output0;
            if (this.uniforms)
                this.uniforms.velocity_new.value = fbo_in.texture;
            this.props.output = fbo_out;
            if (!!fbo_in && this.uniforms) {
                this.uniforms.dt.value = dt;
            }
            _super.prototype.update.call(this);
        }
        return exportedFboOut;
    };
    return Viscous;
}(ShaderPass_1));
const _default = Viscous;
export { _default as default };
