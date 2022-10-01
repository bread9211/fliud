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
var THREE = require("three");
var mouse_vert_raw_1 = require("../shaders/mouse.vert?raw");
var externalForce_frag_raw_1 = require("../shaders/externalForce.frag?raw");
var ShaderPass_1 = require("./ShaderPass");
var Mouse_1 = require("./Mouse");
var ExternalForce = /** @class */ (function (_super) {
    __extends(ExternalForce, _super);
    function ExternalForce(simProps) {
        var _this = _super.call(this, {
            output: simProps.dst,
        }) || this;
        _super.prototype.init.call(_this);
        var mouseG = new THREE.PlaneBufferGeometry(1, 1);
        var mouseM = new THREE.RawShaderMaterial({
            vertexShader: mouse_vert_raw_1.default,
            fragmentShader: externalForce_frag_raw_1.default,
            blending: THREE.AdditiveBlending,
            uniforms: {
                px: {
                    value: simProps.cellScale,
                },
                force: {
                    value: new THREE.Vector2(0.0, 0.0),
                },
                center: {
                    value: new THREE.Vector2(0.0, 0.0),
                },
                scale: {
                    value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size),
                },
            },
        });
        _this.mouse = new THREE.Mesh(mouseG, mouseM);
        _this.scene.add(_this.mouse);
        return _this;
    }
    ExternalForce.prototype.updateExternalForce = function (props) {
        var forceX = (Mouse_1.default.diff.x / 2) * props.mouse_force;
        var forceY = (Mouse_1.default.diff.y / 2) * props.mouse_force;
        var cursorSizeX = props.cursor_size * props.cellScale.x;
        var cursorSizeY = props.cursor_size * props.cellScale.y;
        var centerX = Math.min(Math.max(Mouse_1.default.coords.x, -1 + cursorSizeX + props.cellScale.x * 2), 1 - cursorSizeX - props.cellScale.x * 2);
        var centerY = Math.min(Math.max(Mouse_1.default.coords.y, -1 + cursorSizeY + props.cellScale.y * 2), 1 - cursorSizeY - props.cellScale.y * 2);
        var uniforms = this.mouse.material.uniforms;
        uniforms.force.value.set(forceX, forceY);
        uniforms.center.value.set(centerX, centerY);
        uniforms.scale.value.set(props.cursor_size, props.cursor_size);
        _super.prototype.update.call(this);
    };
    return ExternalForce;
}(ShaderPass_1.default));
exports.default = ExternalForce;
