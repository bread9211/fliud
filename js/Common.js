"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");

var Common = /** @class */ (function () {
    function Common() {
        this.width = null;
        this.height = null;
        this.aspect = this.width / this.height;
        this.isMobile = false;
        this.breakpoint = 768;
        this.fboWidth = null;
        this.fboHeight = null;
        this.resizeFunc = this.resize.bind(this);
        this.time = 0;
        this.delta = 0;
    }
    Common.prototype.init = function () {
        this.pixelRatio = window.devicePixelRatio;
        this.resize();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.renderer.autoClear = false;
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x000000);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.clock = new THREE.Clock();
        this.clock.start();
    };
    Common.prototype.resize = function () {
        this.width = window.innerWidth; // document.body.clientWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        if (this.renderer)
            this.renderer.setSize(this.width, this.height);
    };
    Common.prototype.update = function () {
        var _a;
        this.delta = ((_a = this.clock) === null || _a === void 0 ? void 0 : _a.getDelta()) || 0; // Math.min(0.01, this.clock.getDelta());
        this.time += this.delta;
    };
    return Common;
}());
exports.default = new Common();
