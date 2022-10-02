"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import { WebGLRenderer, Clock } from "three";

var WebGLRenderer = THREE.WebGLRenderer
var Clock = THREE.Clock

var Common = /** @class */ (function () {
    class Common {
        constructor() {
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
        init() {
            this.pixelRatio = window.devicePixelRatio;
            this.resize();
            this.renderer = new WebGLRenderer({
                antialias: true,
                alpha: true,
            });
            this.renderer.autoClear = false;
            this.renderer.setSize(this.width, this.height);
            this.renderer.setClearColor(0x000000);
            this.renderer.setPixelRatio(this.pixelRatio);
            this.clock = new Clock();
            this.clock.start();
        }
        resize() {
            this.width = window.innerWidth; // document.body.clientWidth;
            this.height = window.innerHeight;
            this.aspect = this.width / this.height;
            if (this.renderer)
                this.renderer.setSize(this.width, this.height);
        }
        update() {
            var _a;
            this.delta = ((_a = this.clock) === null || _a === void 0 ? void 0 : _a.getDelta()) || 0; // Math.min(0.01, this.clock.getDelta());
            this.time += this.delta;
        }
    }
    return Common;
}());
const _default = new Common();
export { _default as default };
