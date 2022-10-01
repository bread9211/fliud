"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Vector2 } from "three";
import Common_1 from "./Common.js";

var Vector2 = THREE.Vector2
var Mouse = /** @class */ (function () {
    function Mouse() {
        this.mouseMoved = false;
        this.coords = new Vector2();
        this.coords_old = new Vector2();
        this.diff = new Vector2();
        this.timer = null;
        this.count = 0;
    }
    Mouse.prototype.init = function () {
        document.body.addEventListener("mousemove", this.onDocumentMouseMove.bind(this), false);
        document.body.addEventListener("touchstart", this.onDocumentTouchStart.bind(this), false);
        document.body.addEventListener("touchmove", this.onDocumentTouchMove.bind(this), false);
    };
    Mouse.prototype.setCoords = function (x, y) {
        var _this = this;
        if (this.timer)
            clearTimeout(this.timer);
        this.coords.set((x / Common_1.width) * 2 - 1, -(y / Common_1.height) * 2 + 1);
        this.mouseMoved = true;
        this.timer = setTimeout(function () {
            _this.mouseMoved = false;
        }, 100);
    };
    Mouse.prototype.onDocumentMouseMove = function (event) {
        this.setCoords(event.clientX, event.clientY);
    };
    Mouse.prototype.onDocumentTouchStart = function (event) {
        if (event.touches.length === 1) {
            // event.preventDefault();
            this.setCoords(event.touches[0].pageX, event.touches[0].pageY);
        }
    };
    Mouse.prototype.onDocumentTouchMove = function (event) {
        if (event.touches.length === 1) {
            // event.preventDefault();
            this.setCoords(event.touches[0].pageX, event.touches[0].pageY);
        }
    };
    Mouse.prototype.update = function () {
        this.diff.subVectors(this.coords, this.coords_old);
        this.coords_old.copy(this.coords);
        if (this.coords_old.x === 0 && this.coords_old.y === 0)
            this.diff.set(0, 0);
    };
    return Mouse;
}());
const _default = new Mouse();
export { _default as default };
