webpackHotUpdate("static/development/pages/tests/webgl/study/test.js",{

/***/ "./pages/tests/webgl/study/test.tsx":
/*!******************************************!*\
  !*** ./pages/tests/webgl/study/test.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);








var _jsxFileName = "/Users/neske/Works/neske/esperia.github.io/pages/tests/webgl/study/test.tsx",
    _this2 = undefined;

var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function _createSuper(Derived) { return function () { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var W014 = /*#__PURE__*/function () {
  function W014(gl) {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, W014);

    this.gl = gl;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(W014, [{
    key: "run",
    value: function run() {
      var gl = this.gl;
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clearDepth(1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      var vShader = this.createShader(this.gl.createShader(this.gl.VERTEX_SHADER), vsSource);
      var fShader = this.createShader(this.gl.createShader(this.gl.FRAGMENT_SHADER), fsSource);
      var prg = this.createProgram(vShader, fShader);
      var attLocation = this.gl.getAttribLocation(prg, 'position');
      var attStride = 3;
      var vertexPosition = [0.0, 1.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0];
      var vbo = this.createVbo(vertexPosition);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
      this.gl.enableVertexAttribArray(attLocation);
      this.gl.vertexAttribPointer(attLocation, attStride, this.gl.FLOAT, false, 0, 0);
      var m = new matIV();
      var mMatrix = m.identity(m.create());
      var vMatrix = m.identity(m.create());
      var pMatrix = m.identity(m.create());
      var mvpMatrix = m.identity(m.create());
      m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);
      m.perspective(90, this.canvas.width / this.canvas.height, 0.1, 100, pMatrix);
      m.multiply(pMatrix, vMatrix, mvpMatrix);
      m.multiply(mvpMatrix, mMatrix, mvpMatrix);
      var uniLocation = this.gl.getUniformLocation(prg, 'mvpMatrix');
      this.gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
      this.gl.flush();
    }
  }, {
    key: "createShader",
    value: function createShader(shader, source) {
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);

      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        throw new Error(this.gl.getShaderInfoLog(shader));
      }

      return shader;
    }
  }, {
    key: "createProgram",
    value: function createProgram(vs, fs) {
      var program = this.gl.createProgram();
      this.gl.attachShader(program, vs);
      this.gl.attachShader(program, fs);
      this.gl.linkProgram(program);

      if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
        throw new Error(this.gl.getProgramInfoLog(program));
      }

      this.gl.useProgram(program);
      return program;
    }
  }, {
    key: "createVbo",
    value: function createVbo(data) {
      var vbo = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
      return vbo;
    }
  }]);

  return W014;
}();

var Canvas = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Canvas, _React$Component);

  var _super = _createSuper(Canvas);

  function Canvas(props) {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Canvas);

    _this = _super.call(this, props);

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this), "canvasRef", void 0);

    _this.canvasRef = react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef();
    return _this;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(Canvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var canvasEl = this.canvasRef.current;

      if (canvasEl) {
        console.log(this.canvasRef.current);
        canvasEl.width = 300;
        canvasEl.height = 300;
        var webGLContext = canvasEl.getContext('webgl');
        new W014(webGLContext);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return __jsx("canvas", {
        ref: this.canvasRef,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103,
          columnNumber: 12
        }
      });
    }
  }]);

  return Canvas;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return __jsx("div", {
    __self: _this2,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 3
    }
  }, __jsx("h1", {
    __self: _this2,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 5
    }
  }, "Test"), __jsx(Canvas, {
    __self: _this2,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 5
    }
  }));
});

/***/ })

})
//# sourceMappingURL=test.js.c983846813eebcbb5797.hot-update.js.map