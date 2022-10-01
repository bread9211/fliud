"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dat_gui_1 = require("dat.gui");
var Controls = /** @class */ (function () {
    function Controls(params) {
        this.params = params;
        this.init();
    }
    Controls.prototype.init = function () {
        this.gui = new dat_gui_1.GUI({ width: 300 });
        this.gui.add(this.params, "mouse_force", 20, 200);
        this.gui.add(this.params, "cursor_size", 10, 200);
        this.gui.add(this.params, "isViscous");
        this.gui.add(this.params, "viscous", 0, 500);
        this.gui.add(this.params, "iterations_viscous", 1, 32);
        this.gui.add(this.params, "iterations_poisson", 1, 32);
        this.gui.add(this.params, "dt", 1 / 200, 1 / 30);
        this.gui.add(this.params, "BFECC");
        this.gui.close();
    };
    return Controls;
}());
exports.default = Controls;
