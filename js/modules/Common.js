__webpack_require__.r(__webpack_exports__);
/* harmony import */
var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! three */ "./node_modules/three/build/three.module.js");

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



var Common = /*#__PURE__*/ function() {
	function Common() {
		_classCallCheck(this, Common);

		this.width = null;
		this.height = null;
		this.aspect = this.width / this.height;
		this.isMobile = false;
		this.breakpoint = 768;
		this.fboWidth = null;
		this.fboHeight = null;
		this.resizeFunc = this.resize.bind(this);
		this.time = 0;
		this.delta = 0;
	}

	_createClass(Common, [{
		key: "init",
		value: function init() {
			this.pixelRatio = window.devicePixelRatio;
			this.resize();
			this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({
				antialias: true,
				alpha: true
			});
			this.renderer.autoClear = false;
			this.renderer.setSize(this.width, this.height);
			this.renderer.setClearColor(0x000000);
			this.renderer.setPixelRatio(this.pixelRatio);
			this.clock = new three__WEBPACK_IMPORTED_MODULE_0__["Clock"]();
			this.clock.start();
		}
	}, {
		key: "resize",
		value: function resize() {
			this.width = window.innerWidth; // document.body.clientWidth;

			this.height = window.innerHeight;
			this.aspect = this.width / this.height;
			if (this.renderer) this.renderer.setSize(this.width, this.height);
		}
	}, {
		key: "update",
		value: function update() {
			this.delta = this.clock.getDelta(); // Math.min(0.01, this.clock.getDelta());

			this.time += this.delta;
		}
	}]);

	return Common;
}();

/* harmony default export */
__webpack_exports__["default"] = (new Common());

//# sourceURL=webpack:///./js/modules/Common.js?