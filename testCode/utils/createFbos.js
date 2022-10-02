"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

// import { HalfFloatType, FloatType, WebGLRenderTarget } from "three";
var HalfFloatType = THREE.HalfFloatType
var FloatType = THREE.FloatType
var WebGLRenderTarget = THREE.WebGLRenderTarget
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
        ? HalfFloatType
        : FloatType;
    Object.keys(initialFbos).forEach(function (key) {
        initialFbos[key] = new WebGLRenderTarget(fboSize.x, fboSize.y, {
            type: type,
        });
    });
    var exportedFbos = initialFbos;
    return exportedFbos;
};
const _createFbos = createFbos;
export { _createFbos as createFbos };
