__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */
__webpack_require__.d(__webpack_exports__, "default", function() {
	return Advection;
});
/* harmony import */
var _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./glsl/sim/face.vert */ "./js/modules/glsl/sim/face.vert");
/* harmony import */
var _glsl_sim_line_vert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./glsl/sim/line.vert */ "./js/modules/glsl/sim/line.vert");
/* harmony import */
var _glsl_sim_advection_frag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ./glsl/sim/advection.frag */ "./js/modules/glsl/sim/advection.frag");
/* harmony import */
var _ShaderPass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ./ShaderPass */ "./js/modules/ShaderPass.js");
/* harmony import */
var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! three */ "./node_modules/three/build/three.module.js");

function _typeof(obj) {
	"@babel/helpers - typeof";
	if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
		_typeof = function _typeof(obj) {
			return typeof obj;
		};
	} else {
		_typeof = function _typeof(obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
		};
	}
	return _typeof(obj);
}

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

function _get(target, property, receiver) {
	if (typeof Reflect !== "undefined" && Reflect.get) {
		_get = Reflect.get;
	} else {
		_get = function _get(target, property, receiver) {
			var base = _superPropBase(target, property);
			if (!base) return;
			var desc = Object.getOwnPropertyDescriptor(base, property);
			if (desc.get) {
				return desc.get.call(receiver);
			}
			return desc.value;
		};
	}
	return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
	while (!Object.prototype.hasOwnProperty.call(object, property)) {
		object = _getPrototypeOf(object);
		if (object === null) break;
	}
	return object;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function");
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			writable: true,
			configurable: true
		}
	});
	if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
	_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
	var hasNativeReflectConstruct = _isNativeReflectConstruct();
	return function _createSuperInternal() {
		var Super = _getPrototypeOf(Derived),
			result;
		if (hasNativeReflectConstruct) {
			var NewTarget = _getPrototypeOf(this).constructor;
			result = Reflect.construct(Super, arguments, NewTarget);
		} else {
			result = Super.apply(this, arguments);
		}
		return _possibleConstructorReturn(this, result);
	};
}

function _possibleConstructorReturn(self, call) {
	if (call && (_typeof(call) === "object" || typeof call === "function")) {
		return call;
	}
	return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
	if (self === void 0) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	return self;
}

function _isNativeReflectConstruct() {
	if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	if (Reflect.construct.sham) return false;
	if (typeof Proxy === "function") return true;
	try {
		Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
		return true;
	} catch (e) {
		return false;
	}
}

function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf(o);
}




var Advection = /*#__PURE__*/ function(_ShaderPass) {
	_inherits(Advection, _ShaderPass);

	var _super = _createSuper(Advection);

	function Advection(simProps) {
		var _this;

		_classCallCheck(this, Advection);

		_this = _super.call(this, {
			material: {
				vertexShader: _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_0__["default"],
				fragmentShader: _glsl_sim_advection_frag__WEBPACK_IMPORTED_MODULE_2__["default"],
				uniforms: {
					boundarySpace: {
						value: simProps.cellScale
					},
					px: {
						value: simProps.cellScale
					},
					fboSize: {
						value: simProps.fboSize
					},
					velocity: {
						value: simProps.src.texture
					},
					dt: {
						value: simProps.dt
					},
					isBFECC: {
						value: true
					}
				}
			},
			output: simProps.dst
		});

		_this.init();

		return _this;
	}

	_createClass(Advection, [{
		key: "init",
		value: function init() {
			_get(_getPrototypeOf(Advection.prototype), "init", this).call(this);

			this.createBoundary();
		}
	}, {
		key: "createBoundary",
		value: function createBoundary() {
			var boundaryG = new three__WEBPACK_IMPORTED_MODULE_4__["BufferGeometry"]();
			var vertices_boundary = new Float32Array([ // left
				-1, -1, 0, -1, 1, 0, // top
				-1, 1, 0, 1, 1, 0, // right
				1, 1, 0, 1, -1, 0, // bottom
				1, -1, 0, -1, -1, 0
			]);
			boundaryG.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_4__["BufferAttribute"](vertices_boundary, 3));
			var boundaryM = new three__WEBPACK_IMPORTED_MODULE_4__["RawShaderMaterial"]({
				vertexShader: _glsl_sim_line_vert__WEBPACK_IMPORTED_MODULE_1__["default"],
				fragmentShader: _glsl_sim_advection_frag__WEBPACK_IMPORTED_MODULE_2__["default"],
				uniforms: this.uniforms
			});
			this.line = new three__WEBPACK_IMPORTED_MODULE_4__["LineSegments"](boundaryG, boundaryM);
			this.scene.add(this.line);
		}
	}, {
		key: "update",
		value: function update(_ref) {
			var dt = _ref.dt,
				isBounce = _ref.isBounce,
				BFECC = _ref.BFECC;
			this.uniforms.dt.value = dt;
			this.line.visible = isBounce;
			this.uniforms.isBFECC.value = BFECC;

			_get(_getPrototypeOf(Advection.prototype), "update", this).call(this);
		}
	}]);

	return Advection;
}(_ShaderPass__WEBPACK_IMPORTED_MODULE_3__["default"]);



//# sourceURL=webpack:///./js/modules/Advection.js?