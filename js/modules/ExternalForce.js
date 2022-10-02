__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExternalForce; });
/* harmony import */ var _glsl_sim_mouse_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glsl/sim/mouse.vert */ "./js/modules/glsl/sim/mouse.vert");
/* harmony import */ var _glsl_sim_externalForce_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glsl/sim/externalForce.frag */ "./js/modules/glsl/sim/externalForce.frag");
/* harmony import */ var _ShaderPass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShaderPass */ "./js/modules/ShaderPass.js");
/* harmony import */ var _Mouse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Mouse */ "./js/modules/Mouse.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var ExternalForce = /*#__PURE__*/function (_ShaderPass) {
  _inherits(ExternalForce, _ShaderPass);

  var _super = _createSuper(ExternalForce);

  function ExternalForce(simProps) {
    var _this;

    _classCallCheck(this, ExternalForce);

    _this = _super.call(this, {
      output: simProps.dst
    });

    _this.init(simProps);

    return _this;
  }

  _createClass(ExternalForce, [{
    key: "init",
    value: function init(simProps) {
      _get(_getPrototypeOf(ExternalForce.prototype), "init", this).call(this);

      var mouseG = new three__WEBPACK_IMPORTED_MODULE_4__["PlaneBufferGeometry"](1, 1);
      var mouseM = new three__WEBPACK_IMPORTED_MODULE_4__["RawShaderMaterial"]({
        vertexShader: _glsl_sim_mouse_vert__WEBPACK_IMPORTED_MODULE_0__["default"],
        fragmentShader: _glsl_sim_externalForce_frag__WEBPACK_IMPORTED_MODULE_1__["default"],
        blending: three__WEBPACK_IMPORTED_MODULE_4__["AdditiveBlending"],
        uniforms: {
          px: {
            value: simProps.cellScale
          },
          force: {
            value: new three__WEBPACK_IMPORTED_MODULE_4__["Vector2"](0.0, 0.0)
          },
          center: {
            value: new three__WEBPACK_IMPORTED_MODULE_4__["Vector2"](0.0, 0.0)
          },
          scale: {
            value: new three__WEBPACK_IMPORTED_MODULE_4__["Vector2"](simProps.cursor_size, simProps.cursor_size)
          }
        }
      });
      this.mouse = new three__WEBPACK_IMPORTED_MODULE_4__["Mesh"](mouseG, mouseM);
      this.scene.add(this.mouse);
    }
  }, {
    key: "update",
    value: function update(props) {
      var forceX = _Mouse__WEBPACK_IMPORTED_MODULE_3__["default"].diff.x / 2 * props.mouse_force;
      var forceY = _Mouse__WEBPACK_IMPORTED_MODULE_3__["default"].diff.y / 2 * props.mouse_force;
      var cursorSizeX = props.cursor_size * props.cellScale.x;
      var cursorSizeY = props.cursor_size * props.cellScale.y;
      var centerX = Math.min(Math.max(_Mouse__WEBPACK_IMPORTED_MODULE_3__["default"].coords.x, -1 + cursorSizeX + props.cellScale.x * 2), 1 - cursorSizeX - props.cellScale.x * 2);
      var centerY = Math.min(Math.max(_Mouse__WEBPACK_IMPORTED_MODULE_3__["default"].coords.y, -1 + cursorSizeY + props.cellScale.y * 2), 1 - cursorSizeY - props.cellScale.y * 2);
      var uniforms = this.mouse.material.uniforms;
      uniforms.force.value.set(forceX, forceY);
      uniforms.center.value.set(centerX, centerY);
      uniforms.scale.value.set(props.cursor_size, props.cursor_size);

      _get(_getPrototypeOf(ExternalForce.prototype), "update", this).call(this);
    }
  }]);

  return ExternalForce;
}(_ShaderPass__WEBPACK_IMPORTED_MODULE_2__["default"]);



//# sourceURL=webpack:///./js/modules/ExternalForce.js?