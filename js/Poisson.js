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
var fs = new FileReader();
var face_vert_raw_1 = fs.readAsText(new File([], "../shaders/face.vert?raw"));
fs = new FileReader();
var poisson_frag_raw_1 = fs.readAsText(new File([], "../shaders/poisson.frag?raw"))
import ShaderPass_1 from "./ShaderPass.js";
var Poisson = /** @class */ (function (_super) {
    __extends(Poisson, _super);
    function Poisson(simProps) {
        var _this = _super.call(this, {
            material: {
                vertexShader: face_vert_raw_1,
                fragmentShader: poisson_frag_raw_1,
                uniforms: {
                    boundarySpace: {
                        value: simProps.boundarySpace,
                    },
                    pressure: {
                        value: simProps.dst_.texture,
                    },
                    divergence: {
                        value: simProps.src.texture,
                    },
                    px: {
                        value: simProps.cellScale,
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
    Poisson.prototype.updatePoisson = function (_a) {
        var iterations = _a.iterations;
        var p_in, p_out;
        for (var i = 0; i < iterations; i++) {
            var isOdd = i % 2 === 0;
            p_in = isOdd ? this.props.output0 : this.props.output1;
            p_out = isOdd ? this.props.output1 : this.props.output0;
            this.uniforms.pressure.value = p_in.texture;
            this.props.output = p_out;
            _super.prototype.update.call(this);
        }
        return p_out;
    };
    return Poisson;
}(ShaderPass_1));
const _default = Poisson;
export { _default as default };
