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
var fs = new FileReader()
var face_vert_raw_1 = fs.readAsText(new File([], "../shaders/face.vert?raw"));
fs = new FileReader()
var divergence_frag_raw_1 = fs.readAsText(new File([], "./shaders/divergence.frag?raw"));
import ShaderPass_1 from "./ShaderPass.js";
var Divergence = /** @class */ (function (_super) {
    __extends(Divergence, _super);
    function Divergence(simProps) {
        var _this = _super.call(this, {
            material: {
                vertexShader: face_vert_raw_1,
                fragmentShader: divergence_frag_raw_1,
                uniforms: {
                    boundarySpace: {
                        value: simProps.boundarySpace,
                    },
                    velocity: {
                        value: simProps.src.texture,
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
        }) || this;
        _this.init();
        return _this;
    }
    Divergence.prototype.updateDivergence = function (_a) {
        var vel = _a.vel;
        if (this.uniforms) {
            this.uniforms.velocity.value = vel.texture;
        }
        _super.prototype.update.call(this);
    };
    return Divergence;
}(ShaderPass_1));
const _default = Divergence;
export { _default as default };
