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
var face_vert_raw_1 = require("../shaders/face.vert?raw");
var pressure_frag_raw_1 = require("../shaders/pressure.frag?raw");
var ShaderPass_1 = require("./ShaderPass");
var Pressure = /** @class */ (function (_super) {
    __extends(Pressure, _super);
    function Pressure(simProps) {
        var _this = _super.call(this, {
            material: {
                vertexShader: face_vert_raw_1.default,
                fragmentShader: pressure_frag_raw_1.default,
                uniforms: {
                    boundarySpace: {
                        value: simProps.boundarySpace,
                    },
                    pressure: {
                        value: simProps.src_p.texture,
                    },
                    velocity: {
                        value: simProps.src_v.texture,
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
    Pressure.prototype.updatePressure = function (_a) {
        var vel = _a.vel, pressure = _a.pressure;
        this.uniforms.velocity.value = vel.texture;
        this.uniforms.pressure.value = pressure.texture;
        _super.prototype.update.call(this);
    };
    return Pressure;
}(ShaderPass_1.default));
exports.default = Pressure;
