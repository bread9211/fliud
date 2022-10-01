"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import Common_1 from "./Common.js";
import Output_1 from "./Output.js";
import Mouse_1 from "./Mouse.js";
var WebGL = /** @class */ (function () {
    function WebGL(_a) {
        var $wrapper = _a.$wrapper;
        this.$wrapper = $wrapper;
        Common_1.init();
        Mouse_1.init();
        // this.init();
        this.$wrapper.prepend(Common_1.renderer.domElement);
        this.output = new Output_1();
        this.loop();
        window.addEventListener("resize", this.resize.bind(this));
    }
    WebGL.prototype.resize = function () {
        Common_1.resize();
        this.output.resize();
    };
    WebGL.prototype.render = function () {
        Mouse_1.update();
        Common_1.update();
        this.output.update();
    };
    WebGL.prototype.loop = function () {
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    };
    return WebGL;
}());
const _default = WebGL;
export { _default as default };
