    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Vector2 } from "three";
// import Common_1 from "./Common.js";
import Controls_1 from "./Controls.js";
import Advection_1 from "./Advection.js";
import ExternalForce_1 from "./ExternalForce.js";
import Viscous_1 from "./Viscious.js";
import Divergence_1 from "./Divergence.js";
import Poisson_1 from "./Poisson.js";
import Pressure_1 from "./Pressure.js";
import { createFbos } from "../utils/createFbos.js";
import Common_1 from "./Common.js"
var Vector2 = THREE.Vector2
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
        new Controls_1(this.options);
        this.fboSize = new Vector2();
        this.cellScale = new Vector2();
        this.boundarySpace = new Vector2();
        // clacSize
        var width = Math.round(this.options.resolution * Common_1.width);
        var height = Math.round(this.options.resolution * Common_1.height);
        var px_x = 1.0 / width;
        var px_y = 1.0 / height;
        this.cellScale.set(px_x, px_y);
        this.fboSize.set(width, height);
        this.fbos = (0, createFbos)(this.fboSize);
        // createShaderPass()
        this.advection = new Advection_1({
            cellScale: this.cellScale,
            fboSize: this.fboSize,
            dt: this.options.dt,
            src: this.fbos.vel_0,
            dst: this.fbos.vel_1,
        });
        this.externalForce = new ExternalForce_1({
            cellScale: this.cellScale,
            cursor_size: this.options.cursor_size,
            dst: this.fbos.vel_1,
        });
        this.viscous = new Viscous_1({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            viscous: this.options.viscous,
            src: this.fbos.vel_1,
            dst: this.fbos.vel_viscous1,
            dst_: this.fbos.vel_viscous0,
            dt: this.options.dt,
        });
        this.divergence = new Divergence_1({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            src: this.fbos.vel_viscous0,
            dst: this.fbos.div,
            dt: this.options.dt,
        });
        this.poisson = new Poisson_1({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            src: this.fbos.div,
            dst: this.fbos.pressure_1,
            dst_: this.fbos.pressure_0,
        });
        this.pressure = new Pressure_1({
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
const _default = Simulation;
export { _default as default };
