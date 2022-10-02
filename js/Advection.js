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

// import { BufferGeometry, BufferAttribute, RawShaderMaterial, LineSegments } from "three";
var face_vert_raw_1 = require("../shaders/face.vert?raw");
var line_vert_raw_1 = require("../shaders/line.vert?raw");
var advection_frag_raw_1 = require("../shaders/advection.frag?raw");
import ShaderPass_1 from "./ShaderPass.js";

var BufferGeometry = THREE.BufferGeometry
var BufferAttribute = THREE.BufferAttribute
var RawShaderMaterial = THREE.RawShaderMaterial
var LineSegments = THREE.LineSegments
var Advection = /** @class */ (function (_super) {
    __extends(Advection, _super);
    function Advection(simProps) {
        var _this = _super.call(this, {
            material: {
                vertexShader: face_vert_raw_1,
                fragmentShader: advection_frag_raw_1,
                uniforms: {
                    boundarySpace: {
                        value: simProps.cellScale,
                    },
                    px: {
                        value: simProps.cellScale,
                    },
                    fboSize: {
                        value: simProps.fboSize,
                    },
                    velocity: {
                        value: simProps.src.texture,
                    },
                    dt: {
                        value: simProps.dt,
                    },
                    isBFECC: {
                        value: true,
                    },
                },
            },
            output: simProps.dst,
        }) || this;
        _this.init();
        return _this;
    }
    Advection.prototype.init = function () {
        _super.prototype.init.call(this);
        this.createBoundary();
    };
    Advection.prototype.createBoundary = function () {
        var _a;
        var boundaryG = new BufferGeometry();
        var vertices_boundary = new Float32Array([
            // left
            -1, -1, 0, -1, 1, 0,
            // top
            -1, 1, 0, 1, 1, 0,
            // right
            1, 1, 0, 1, -1, 0,
            // bottom
            1, -1, 0, -1, -1, 0,
        ]);
        boundaryG.setAttribute("position", new BufferAttribute(vertices_boundary, 3));
        var boundaryM = new RawShaderMaterial({
            vertexShader: line_vert_raw_1,
            fragmentShader: advection_frag_raw_1,
            uniforms: this.uniforms,
        });
        this.line = new LineSegments(boundaryG, boundaryM);
        (_a = this.scene) === null || _a === void 0 ? void 0 : _a.add(this.line);
    };
    Advection.prototype.updateAdvection = function (_a) {
        var dt = _a.dt, isBounce = _a.isBounce, BFECC = _a.BFECC;
        if (this.uniforms)
            this.uniforms.dt.value = dt;
        this.line.visible = isBounce;
        this.uniforms.isBFECC.value = BFECC;
        _super.prototype.update.call(this);
    };
    return Advection;
}(ShaderPass_1));
const _default = Advection;
export { _default as default };
