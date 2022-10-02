__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventBus = /*#__PURE__*/function () {
  /**
   * Initialize a new event bus instance.
   */
  function EventBus() {
    _classCallCheck(this, EventBus);

    this.bus = document.createElement('fakeelement');
  }
  /**
   * Add an event listener.
   */


  _createClass(EventBus, [{
    key: "on",
    value: function on(event, callback) {
      this.bus.addEventListener(event, callback);
    }
    /**
     * Remove an event listener.
     */

  }, {
    key: "off",
    value: function off(event, callback) {
      this.bus.removeEventListener(event, callback);
    }
    /**
     * Dispatch an event.
     */

  }, {
    key: "emit",
    value: function emit(event) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.bus.dispatchEvent(new CustomEvent(event, {
        detail: detail
      }));
    }
  }]);

  return EventBus;
}();

/* harmony default export */ __webpack_exports__["default"] = (new EventBus());

//# sourceURL=webpack:///./js/utils/EventBus.js?