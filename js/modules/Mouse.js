__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Common */ "./js/modules/Common.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Mouse = /*#__PURE__*/function () {
  function Mouse() {
    _classCallCheck(this, Mouse);

    this.mouseMoved = false;
    this.coords = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
    this.coords_old = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
    this.diff = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
    this.timer = null;
    this.count = 0;
  }

  _createClass(Mouse, [{
    key: "init",
    value: function init() {
      document.body.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
      document.body.addEventListener('touchstart', this.onDocumentTouchStart.bind(this), false);
      document.body.addEventListener('touchmove', this.onDocumentTouchMove.bind(this), false);
    }
  }, {
    key: "setCoords",
    value: function setCoords(x, y) {
      var _this = this;

      if (this.timer) clearTimeout(this.timer);
      this.coords.set(x / _Common__WEBPACK_IMPORTED_MODULE_1__["default"].width * 2 - 1, -(y / _Common__WEBPACK_IMPORTED_MODULE_1__["default"].height) * 2 + 1);
      this.mouseMoved = true;
      this.timer = setTimeout(function () {
        _this.mouseMoved = false;
      }, 100);
    }
  }, {
    key: "onDocumentMouseMove",
    value: function onDocumentMouseMove(event) {
      this.setCoords(event.clientX, event.clientY);
    }
  }, {
    key: "onDocumentTouchStart",
    value: function onDocumentTouchStart(event) {
      if (event.touches.length === 1) {
        // event.preventDefault();
        this.setCoords(event.touches[0].pageX, event.touches[0].pageY);
      }
    }
  }, {
    key: "onDocumentTouchMove",
    value: function onDocumentTouchMove(event) {
      if (event.touches.length === 1) {
        // event.preventDefault();
        this.setCoords(event.touches[0].pageX, event.touches[0].pageY);
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.diff.subVectors(this.coords, this.coords_old);
      this.coords_old.copy(this.coords);
      if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);
    }
  }]);

  return Mouse;
}();

/* harmony default export */ __webpack_exports__["default"] = (new Mouse());

//# sourceURL=webpack:///./js/modules/Mouse.js?