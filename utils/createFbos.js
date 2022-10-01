"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFbos = void 0;
var THREE = require("three");
var createFbos = function (fboSize) {
    var initialFbos = {
        vel_0: null,
        vel_1: null,
        vel_viscous0: null,
        vel_viscous1: null,
        div: null,
        pressure_0: null,
        pressure_1: null,
    };
    var type = /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
        ? THREE.HalfFloatType
        : THREE.FloatType;
    Object.keys(initialFbos).forEach(function (key) {
        initialFbos[key] = new THREE.WebGLRenderTarget(fboSize.x, fboSize.y, {
            type: type,
        });
    });
    var exportedFbos = initialFbos;
    return exportedFbos;
};
exports.createFbos = createFbos;
