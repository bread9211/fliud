__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */
__webpack_require__.d(__webpack_exports__, "default", function() {
	return ShaderPass;
});
/* harmony import */
var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./Common */ "./js/modules/Common.js");
/* harmony import */
var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! three */ "./node_modules/three/build/three.module.js");

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




var ShaderPass = /*#__PURE__*/ function() {
	function ShaderPass(props) {
		var _this$props$material;

		_classCallCheck(this, ShaderPass);

		this.props = props;
		this.uniforms = (_this$props$material = this.props.material) === null || _this$props$material === void 0 ? void 0 : _this$props$material.uniforms;
	}

	_createClass(ShaderPass, [{
		key: "init",
		value: function init() {
			this.scene = new three__WEBPACK_IMPORTED_MODULE_1__["Scene"]();
			this.camera = new three__WEBPACK_IMPORTED_MODULE_1__["Camera"]();

			if (this.uniforms) {
				this.material = new three__WEBPACK_IMPORTED_MODULE_1__["RawShaderMaterial"](this.props.material);
				this.geometry = new three__WEBPACK_IMPORTED_MODULE_1__["PlaneBufferGeometry"](2.0, 2.0);
				this.plane = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](this.geometry, this.material);
				this.scene.add(this.plane);
			}
		}
	}, {
		key: "update",
		value: function update() {
			_Common__WEBPACK_IMPORTED_MODULE_0__["default"].renderer.setRenderTarget(this.props.output);
			_Common__WEBPACK_IMPORTED_MODULE_0__["default"].renderer.render(this.scene, this.camera);
			_Common__WEBPACK_IMPORTED_MODULE_0__["default"].renderer.setRenderTarget(null);
		}
	}]);

	return ShaderPass;
}();



//# sourceURL=webpack:///./js/modules/ShaderPass.js?