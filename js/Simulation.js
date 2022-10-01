"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Common_1 = require("./Common");
var Controls_1 = require("./Controls");
var Advection_1 = require("./Advection");
var ExternalForce_1 = require("./ExternalForce");
var Viscous_1 = require("./Viscous");
var Divergence_1 = require("./Divergence");
var Poisson_1 = require("./Poisson");
var Pressure_1 = require("./Pressure");
var createFbos_1 = require("../utils/createFbos");
var Simulation = /** @class */ (function () {
    function Simulation() {
        this.options = {
            iterations_poisson: 32,
            iterations_viscous: 32,
            mouse_force: 20,
            resolution: 0.5,
            cursor_size: 100,
            viscous: 30,
            isBounce: false,
            dt: 0.014,
            isViscous: false,
            BFECC: true,
        };
        new Controls_1.default(this.options);
        this.fboSize = new THREE.Vector2();
        this.cellScale = new THREE.Vector2();
        this.boundarySpace = new THREE.Vector2();
        // clacSize
        var width = Math.round(this.options.resolution * Common_1.default.width);
        var height = Math.round(this.options.resolution * Common_1.default.height);
        var px_x = 1.0 / width;
        var px_y = 1.0 / height;
        this.cellScale.set(px_x, px_y);
        this.fboSize.set(width, height);
        this.fbos = (0, createFbos_1.createFbos)(this.fboSize);
        // createShaderPass()
        this.advection = new Advection_1.default({
            cellScale: this.cellScale,
            fboSize: this.fboSize,
            dt: this.options.dt,
            src: this.fbos.vel_0,
            dst: this.fbos.vel_1,
        });
        this.externalForce = new ExternalForce_1.default({
            cellScale: this.cellScale,
            cursor_size: this.options.cursor_size,
            dst: this.fbos.vel_1,
        });
        this.viscous = new Viscous_1.default({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            viscous: this.options.viscous,
            src: this.fbos.vel_1,
            dst: this.fbos.vel_viscous1,
            dst_: this.fbos.vel_viscous0,
            dt: this.options.dt,
        });
        this.divergence = new Divergence_1.default({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            src: this.fbos.vel_viscous0,
            dst: this.fbos.div,
            dt: this.options.dt,
        });
        this.poisson = new Poisson_1.default({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            src: this.fbos.div,
            dst: this.fbos.pressure_1,
            dst_: this.fbos.pressure_0,
        });
        this.pressure = new Pressure_1.default({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            src_p: this.fbos.pressure_0,
            src_v: this.fbos.vel_viscous0,
            dst: this.fbos.vel_0,
            dt: this.options.dt,
        });
    }
    Simulation.prototype.resize = function () {
        var _this = this;
        Object.keys(this.fbos).forEach(function (key) {
            _this.fbos[key].setSize(_this.fboSize.x, _this.fboSize.y);
        });
    };
    Simulation.prototype.update = function () {
        if (this.options.isBounce) {
            this.boundarySpace.set(0, 0);
        }
        else {
            this.boundarySpace.copy(this.cellScale);
        }
        this.advection.updateAdvection(this.options);
        this.externalForce.updateExternalForce({
            cursor_size: this.options.cursor_size,
            mouse_force: this.options.mouse_force,
            cellScale: this.cellScale,
        });
        var vel = this.options.isViscous
            ? this.fbos.vel_1
            : this.viscous.updateViscous({
                viscous: this.options.viscous,
                iterations: this.options.iterations_viscous,
                dt: this.options.dt,
            });
        this.divergence.updateDivergence({ vel: vel });
        var pressure = this.poisson.updatePoisson({
            iterations: this.options.iterations_poisson,
        });
        this.pressure.updatePressure({ vel: vel, pressure: pressure });
    };
    return Simulation;
}());
exports.default = Simulation;
