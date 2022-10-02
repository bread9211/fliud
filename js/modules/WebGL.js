__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Webgl; });
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Common */ "./js/modules/Common.js");
/* harmony import */ var _Output__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Output */ "./js/modules/Output.js");
/* harmony import */ var _Mouse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Mouse */ "./js/modules/Mouse.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import * as THREE from "three";




var Webgl = /*#__PURE__*/function () {
  function Webgl(props) {
    _classCallCheck(this, Webgl);

    this.props = props;
    _Common__WEBPACK_IMPORTED_MODULE_0__["default"].init();
    _Mouse__WEBPACK_IMPORTED_MODULE_2__["default"].init();
    this.init();
    this.loop();
    window.addEventListener("resize", this.resize.bind(this));
  }

  _createClass(Webgl, [{
    key: "init",
    value: function init() {
      this.props.$wrapper.prepend(_Common__WEBPACK_IMPORTED_MODULE_0__["default"].renderer.domElement);
      this.output = new _Output__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
  }, {
    key: "resize",
    value: function resize() {
      _Common__WEBPACK_IMPORTED_MODULE_0__["default"].resize();
      this.output.resize();
    }
  }, {
    key: "render",
    value: function render() {
      _Mouse__WEBPACK_IMPORTED_MODULE_2__["default"].update();
      _Common__WEBPACK_IMPORTED_MODULE_0__["default"].update();
      this.output.update();
    }
  }, {
    key: "loop",
    value: function loop() {
      this.render();
      requestAnimationFrame(this.loop.bind(this));
    }
  }]);

  return Webgl;
}();



//# sourceURL=webpack:///./js/modules/WebGL.js?