__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */
__webpack_require__.d(__webpack_exports__, "default", function() {
	return Output;
});
/* harmony import */
var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./Common */ "./js/modules/Common.js");
/* harmony import */
var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */
var _Simulation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ./Simulation */ "./js/modules/Simulation.js");
/* harmony import */
var _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ./glsl/sim/face.vert */ "./js/modules/glsl/sim/face.vert");
/* harmony import */
var _glsl_sim_color_frag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! ./glsl/sim/color.frag */ "./js/modules/glsl/sim/color.frag");

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}

function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	return Constructor;
}




var Output = /*#__PURE__*/ function() {
	function Output() {
		_classCallCheck(this, Output);

		this.init();
	}

	_createClass(Output, [{
		key: "init",
		value: function init() {
			this.simulation = new _Simulation__WEBPACK_IMPORTED_MODULE_2__["default"]();
			this.scene = new three__WEBPACK_IMPORTED_MODULE_1__["Scene"]();
			this.camera = new three__WEBPACK_IMPORTED_MODULE_1__["Camera"]();
			this.output = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](new three__WEBPACK_IMPORTED_MODULE_1__["PlaneBufferGeometry"](2, 2), new three__WEBPACK_IMPORTED_MODULE_1__["RawShaderMaterial"]({
				vertexShader: _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_3__["default"],
				fragmentShader: _glsl_sim_color_frag__WEBPACK_IMPORTED_MODULE_4__["default"],
				uniforms: {
					velocity: {
						value: this.simulation.fbos.vel_0.texture
					},
					boundarySpace: {
						value: new three__WEBPACK_IMPORTED_MODULE_1__["Vector2"]()
					}
				}
			}));
			this.scene.add(this.output);
		}
	}, {
		key: "addScene",
		value: function addScene(mesh) {
			this.scene.add(mesh);
		}
	}, {
		key: "resize",
		value: function resize() {
			this.simulation.resize();
		}
	}, {
		key: "render",
		value: function render() {
			_Common__WEBPACK_IMPORTED_MODULE_0__["default"].renderer.setRenderTarget(null);
			_Common__WEBPACK_IMPORTED_MODULE_0__["default"].renderer.render(this.scene, this.camera);
		}
	}, {
		key: "update",
		value: function update() {
			this.simulation.update();
			this.render();
		}
	}]);

	return Output;
}();



//# sourceURL=webpack:///./js/modules/Output.js?