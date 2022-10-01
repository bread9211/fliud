"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("./Common");
var Output_1 = require("./Output");
var Mouse_1 = require("./Mouse");
var WebGL = /** @class */ (function () {
    function WebGL(_a) {
        var $wrapper = _a.$wrapper;
        this.$wrapper = $wrapper;
        Common_1.default.init();
        Mouse_1.default.init();
        // this.init();
        this.$wrapper.prepend(Common_1.default.renderer.domElement);
        this.output = new Output_1.default();
        this.loop();
        window.addEventListener("resize", this.resize.bind(this));
    }
    WebGL.prototype.resize = function () {
        Common_1.default.resize();
        this.output.resize();
    };
    WebGL.prototype.render = function () {
        Mouse_1.default.update();
        Common_1.default.update();
        this.output.update();
    };
    WebGL.prototype.loop = function () {
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    };
    return WebGL;
}());
exports.default = WebGL;
