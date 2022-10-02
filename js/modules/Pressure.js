__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */
__webpack_require__.d(__webpack_exports__, "default", function() {
	return Divergence;
});
/* harmony import */
var _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./glsl/sim/face.vert */ "./js/modules/glsl/sim/face.vert");
/* harmony import */
var _glsl_sim_pressure_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./glsl/sim/pressure.frag */ "./js/modules/glsl/sim/pressure.frag");
/* harmony import */
var _ShaderPass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ./ShaderPass */ "./js/modules/ShaderPass.js");

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




var Divergence = /*#__PURE__*/ function(_ShaderPass) {
	_inherits(Divergence, _ShaderPass);

	var _super = _createSuper(Divergence);

	function Divergence(simProps) {
		var _this;

		_classCallCheck(this, Divergence);

		_this = _super.call(this, {
			material: {
				vertexShader: _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_0__["default"],
				fragmentShader: _glsl_sim_pressure_frag__WEBPACK_IMPORTED_MODULE_1__["default"],
				uniforms: {
					boundarySpace: {
						value: simProps.boundarySpace
					},
					pressure: {
						value: simProps.src_p.texture
					},
					velocity: {
						value: simProps.src_v.texture
					},
					px: {
						value: simProps.cellScale
					},
					dt: {
						value: simProps.dt
					}
				}
			},
			output: simProps.dst
		});

		_this.init();

		return _this;
	}

	_createClass(Divergence, [{
		key: "update",
		value: function update(_ref) {
			var vel = _ref.vel,
				pressure = _ref.pressure;
			this.uniforms.velocity.value = vel.texture;
			this.uniforms.pressure.value = pressure.texture;

			_get(_getPrototypeOf(Divergence.prototype), "update", this).call(this);
		}
	}]);

	return Divergence;
}(_ShaderPass__WEBPACK_IMPORTED_MODULE_2__["default"]);



//# sourceURL=webpack:///./js/modules/Pressure.js?