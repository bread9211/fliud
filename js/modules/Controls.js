__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Controls; });
/* harmony import */ var dat_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dat.gui */ "./node_modules/dat.gui/build/dat.gui.module.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Controls = /*#__PURE__*/function () {
  function Controls(params) {
    _classCallCheck(this, Controls);

    this.params = params;
    this.init();
  }

  _createClass(Controls, [{
    key: "init",
    value: function init() {
      this.gui = new dat_gui__WEBPACK_IMPORTED_MODULE_0__["GUI"]({
        width: 300
      });
      this.gui.add(this.params, "mouse_force", 20, 200);
      this.gui.add(this.params, "cursor_size", 10, 200);
      this.gui.add(this.params, "isViscous");
      this.gui.add(this.params, "viscous", 0, 500);
      this.gui.add(this.params, "iterations_viscous", 1, 32);
      this.gui.add(this.params, "iterations_poisson", 1, 32);
      this.gui.add(this.params, "dt", 1 / 200, 1 / 30);
      this.gui.add(this.params, 'BFECC');
      this.gui.close();
    }
  }]);

  return Controls;
}();



//# sourceURL=webpack:///./js/modules/Controls.js?