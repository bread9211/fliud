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
// import { PlaneBufferGeometry, RawShaderMaterial, AdditiveBlending, Vector2, Mesh } from "three";
var fr = new FileReader()
var mouse_vert_raw_1 = fr.readAsText(new File([], "../shaders/mouse.vert?raw"));
fr = new FileReader()
var externalForce_frag_raw_1 = fr.readAsText(new File([], "../shaders/externalForce.frag?raw"));
import ShaderPass_1 from "./ShaderPass.js";
import Mouse_1 from "./Mouse.js";

var PlaneBufferGeometry = THREE.PlaneBufferGeometry;
var RawShaderMaterial = THREE.RawShaderMaterial;
var AdditiveBlending = THREE.AdditiveBlending;
var Vector2 = THREE.Vector2;
var Mesh = THREE.Mesh;
var ExternalForce = /** @class */ (function (_super) {
    __extends(ExternalForce, _super);
    function ExternalForce(simProps) {
        var _this = _super.call(this, {
            output: simProps.dst,
        }) || this;
        _super.prototype.init.call(_this);
        var mouseG = new PlaneBufferGeometry(1, 1);
        var mouseM = new RawShaderMaterial({
            vertexShader: mouse_vert_raw_1,
            fragmentShader: externalForce_frag_raw_1,
            blending: AdditiveBlending,
            uniforms: {
                px: {
                    value: simProps.cellScale,
                },
                force: {
                    value: new Vector2(0.0, 0.0),
                },
                center: {
                    value: new Vector2(0.0, 0.0),
                },
                scale: {
                    value: new Vector2(simProps.cursor_size, simProps.cursor_size),
                },
            },
        });
        _this.mouse = new Mesh(mouseG, mouseM);
        _this.scene.add(_this.mouse);
        return _this;
    }
    ExternalForce.prototype.updateExternalForce = function (props) {
        var forceX = (Mouse_1.diff.x / 2) * props.mouse_force;
        var forceY = (Mouse_1.diff.y / 2) * props.mouse_force;
        var cursorSizeX = props.cursor_size * props.cellScale.x;
        var cursorSizeY = props.cursor_size * props.cellScale.y;
        var centerX = Math.min(Math.max(Mouse_1.coords.x, -1 + cursorSizeX + props.cellScale.x * 2), 1 - cursorSizeX - props.cellScale.x * 2);
        var centerY = Math.min(Math.max(Mouse_1.coords.y, -1 + cursorSizeY + props.cellScale.y * 2), 1 - cursorSizeY - props.cellScale.y * 2);
        var uniforms = this.mouse.material.uniforms;
        uniforms.force.value.set(forceX, forceY);
        uniforms.center.value.set(centerX, centerY);
        uniforms.scale.value.set(props.cursor_size, props.cursor_size);
        _super.prototype.update.call(this);
    };
    return ExternalForce;
}(ShaderPass_1));
const _default = ExternalForce;
export { _default as default };
