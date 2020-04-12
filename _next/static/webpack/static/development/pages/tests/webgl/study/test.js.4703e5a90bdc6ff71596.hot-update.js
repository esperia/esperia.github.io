webpackHotUpdate("static/development/pages/tests/webgl/study/test.js",{

/***/ "./libs/minMatrix.ts":
/*!***************************!*\
  !*** ./libs/minMatrix.ts ***!
  \***************************/
/*! exports provided: MatIV */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatIV", function() { return MatIV; });
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");


// ------------------------------------------------------------------------------------------------
// minMatrix.js
// version 0.0.1
// Copyright (c) doxas
// ------------------------------------------------------------------------------------------------
var MatIV = /*#__PURE__*/function () {
  function MatIV() {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, MatIV);
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(MatIV, [{
    key: "create",
    value: function create() {
      return new Float32Array(16);
    }
  }, {
    key: "identity",
    value: function identity(dest) {
      dest[0] = 1;
      dest[1] = 0;
      dest[2] = 0;
      dest[3] = 0;
      dest[4] = 0;
      dest[5] = 1;
      dest[6] = 0;
      dest[7] = 0;
      dest[8] = 0;
      dest[9] = 0;
      dest[10] = 1;
      dest[11] = 0;
      dest[12] = 0;
      dest[13] = 0;
      dest[14] = 0;
      dest[15] = 1;
    }
  }, {
    key: "multiply",
    value: function multiply(mat1, mat2, dest) {
      var a = mat1[0],
          b = mat1[1],
          c = mat1[2],
          d = mat1[3],
          e = mat1[4],
          f = mat1[5],
          g = mat1[6],
          h = mat1[7],
          i = mat1[8],
          j = mat1[9],
          k = mat1[10],
          l = mat1[11],
          m = mat1[12],
          n = mat1[13],
          o = mat1[14],
          p = mat1[15],
          A = mat2[0],
          B = mat2[1],
          C = mat2[2],
          D = mat2[3],
          E = mat2[4],
          F = mat2[5],
          G = mat2[6],
          H = mat2[7],
          I = mat2[8],
          J = mat2[9],
          K = mat2[10],
          L = mat2[11],
          M = mat2[12],
          N = mat2[13],
          O = mat2[14],
          P = mat2[15];
      dest[0] = A * a + B * e + C * i + D * m;
      dest[1] = A * b + B * f + C * j + D * n;
      dest[2] = A * c + B * g + C * k + D * o;
      dest[3] = A * d + B * h + C * l + D * p;
      dest[4] = E * a + F * e + G * i + H * m;
      dest[5] = E * b + F * f + G * j + H * n;
      dest[6] = E * c + F * g + G * k + H * o;
      dest[7] = E * d + F * h + G * l + H * p;
      dest[8] = I * a + J * e + K * i + L * m;
      dest[9] = I * b + J * f + K * j + L * n;
      dest[10] = I * c + J * g + K * k + L * o;
      dest[11] = I * d + J * h + K * l + L * p;
      dest[12] = M * a + N * e + O * i + P * m;
      dest[13] = M * b + N * f + O * j + P * n;
      dest[14] = M * c + N * g + O * k + P * o;
      dest[15] = M * d + N * h + O * l + P * p;
    }
  }, {
    key: "scale",
    value: function scale(mat, vec, dest) {
      dest[0] = mat[0] * vec[0];
      dest[1] = mat[1] * vec[0];
      dest[2] = mat[2] * vec[0];
      dest[3] = mat[3] * vec[0];
      dest[4] = mat[4] * vec[1];
      dest[5] = mat[5] * vec[1];
      dest[6] = mat[6] * vec[1];
      dest[7] = mat[7] * vec[1];
      dest[8] = mat[8] * vec[2];
      dest[9] = mat[9] * vec[2];
      dest[10] = mat[10] * vec[2];
      dest[11] = mat[11] * vec[2];
      dest[12] = mat[12];
      dest[13] = mat[13];
      dest[14] = mat[14];
      dest[15] = mat[15];
    }
  }, {
    key: "translate",
    value: function translate(mat, vec, dest) {
      dest[0] = mat[0];
      dest[1] = mat[1];
      dest[2] = mat[2];
      dest[3] = mat[3];
      dest[4] = mat[4];
      dest[5] = mat[5];
      dest[6] = mat[6];
      dest[7] = mat[7];
      dest[8] = mat[8];
      dest[9] = mat[9];
      dest[10] = mat[10];
      dest[11] = mat[11];
      dest[12] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2] + mat[12];
      dest[13] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2] + mat[13];
      dest[14] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14];
      dest[15] = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15];
    }
  }, {
    key: "rotate",
    value: function rotate(mat, angle, axis, dest) {
      var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);

      if (!sq) {
        return null;
      }

      var a = axis[0],
          b = axis[1],
          c = axis[2];

      if (sq != 1) {
        sq = 1 / sq;
        a *= sq;
        b *= sq;
        c *= sq;
      }

      var d = Math.sin(angle),
          e = Math.cos(angle),
          f = 1 - e,
          g = mat[0],
          h = mat[1],
          i = mat[2],
          j = mat[3],
          k = mat[4],
          l = mat[5],
          m = mat[6],
          n = mat[7],
          o = mat[8],
          p = mat[9],
          q = mat[10],
          r = mat[11],
          s = a * a * f + e,
          t = b * a * f + c * d,
          u = c * a * f - b * d,
          v = a * b * f - c * d,
          w = b * b * f + e,
          x = c * b * f + a * d,
          y = a * c * f + b * d,
          z = b * c * f - a * d,
          A = c * c * f + e;

      if (angle) {
        if (mat != dest) {
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
        }
      } else {
        dest = mat;
      }

      dest[0] = g * s + k * t + o * u;
      dest[1] = h * s + l * t + p * u;
      dest[2] = i * s + m * t + q * u;
      dest[3] = j * s + n * t + r * u;
      dest[4] = g * v + k * w + o * x;
      dest[5] = h * v + l * w + p * x;
      dest[6] = i * v + m * w + q * x;
      dest[7] = j * v + n * w + r * x;
      dest[8] = g * y + k * z + o * A;
      dest[9] = h * y + l * z + p * A;
      dest[10] = i * y + m * z + q * A;
      dest[11] = j * y + n * z + r * A;
    }
  }, {
    key: "lookAt",
    value: function lookAt(eye, center, up, dest) {
      var eyeX = eye[0],
          eyeY = eye[1],
          eyeZ = eye[2],
          upX = up[0],
          upY = up[1],
          upZ = up[2],
          centerX = center[0],
          centerY = center[1],
          centerZ = center[2];

      if (eyeX == centerX && eyeY == centerY && eyeZ == centerZ) {
        return this.identity(dest);
      }

      var x0, x1, x2, y0, y1, y2, z0, z1, z2, l;
      z0 = eyeX - center[0];
      z1 = eyeY - center[1];
      z2 = eyeZ - center[2];
      l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
      z0 *= l;
      z1 *= l;
      z2 *= l;
      x0 = upY * z2 - upZ * z1;
      x1 = upZ * z0 - upX * z2;
      x2 = upX * z1 - upY * z0;
      l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);

      if (!l) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
      } else {
        l = 1 / l;
        x0 *= l;
        x1 *= l;
        x2 *= l;
      }

      y0 = z1 * x2 - z2 * x1;
      y1 = z2 * x0 - z0 * x2;
      y2 = z0 * x1 - z1 * x0;
      l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);

      if (!l) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
      } else {
        l = 1 / l;
        y0 *= l;
        y1 *= l;
        y2 *= l;
      }

      dest[0] = x0;
      dest[1] = y0;
      dest[2] = z0;
      dest[3] = 0;
      dest[4] = x1;
      dest[5] = y1;
      dest[6] = z1;
      dest[7] = 0;
      dest[8] = x2;
      dest[9] = y2;
      dest[10] = z2;
      dest[11] = 0;
      dest[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
      dest[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
      dest[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
      dest[15] = 1;
    }
  }, {
    key: "perspective",
    value: function perspective(fovy, aspect, near, far, dest) {
      var t = near * Math.tan(fovy * Math.PI / 360);
      var r = t * aspect;
      var a = r * 2,
          b = t * 2,
          c = far - near;
      dest[0] = near * 2 / a;
      dest[1] = 0;
      dest[2] = 0;
      dest[3] = 0;
      dest[4] = 0;
      dest[5] = near * 2 / b;
      dest[6] = 0;
      dest[7] = 0;
      dest[8] = 0;
      dest[9] = 0;
      dest[10] = -(far + near) / c;
      dest[11] = -1;
      dest[12] = 0;
      dest[13] = 0;
      dest[14] = -(far * near * 2) / c;
      dest[15] = 0;
    }
  }, {
    key: "transpose",
    value: function transpose(mat, dest) {
      dest[0] = mat[0];
      dest[1] = mat[4];
      dest[2] = mat[8];
      dest[3] = mat[12];
      dest[4] = mat[1];
      dest[5] = mat[5];
      dest[6] = mat[9];
      dest[7] = mat[13];
      dest[8] = mat[2];
      dest[9] = mat[6];
      dest[10] = mat[10];
      dest[11] = mat[14];
      dest[12] = mat[3];
      dest[13] = mat[7];
      dest[14] = mat[11];
      dest[15] = mat[15];
    }
  }, {
    key: "inverse",
    value: function inverse(mat, dest) {
      var a = mat[0],
          b = mat[1],
          c = mat[2],
          d = mat[3],
          e = mat[4],
          f = mat[5],
          g = mat[6],
          h = mat[7],
          i = mat[8],
          j = mat[9],
          k = mat[10],
          l = mat[11],
          m = mat[12],
          n = mat[13],
          o = mat[14],
          p = mat[15],
          q = a * f - b * e,
          r = a * g - c * e,
          s = a * h - d * e,
          t = b * g - c * f,
          u = b * h - d * f,
          v = c * h - d * g,
          w = i * n - j * m,
          x = i * o - k * m,
          y = i * p - l * m,
          z = j * o - k * n,
          A = j * p - l * n,
          B = k * p - l * o,
          ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
      dest[0] = (f * B - g * A + h * z) * ivd;
      dest[1] = (-b * B + c * A - d * z) * ivd;
      dest[2] = (n * v - o * u + p * t) * ivd;
      dest[3] = (-j * v + k * u - l * t) * ivd;
      dest[4] = (-e * B + g * y - h * x) * ivd;
      dest[5] = (a * B - c * y + d * x) * ivd;
      dest[6] = (-m * v + o * s - p * r) * ivd;
      dest[7] = (i * v - k * s + l * r) * ivd;
      dest[8] = (e * A - f * y + h * w) * ivd;
      dest[9] = (-a * A + b * y - d * w) * ivd;
      dest[10] = (m * u - n * s + p * q) * ivd;
      dest[11] = (-i * u + j * s - l * q) * ivd;
      dest[12] = (-e * z + f * x - g * w) * ivd;
      dest[13] = (a * z - b * x + c * w) * ivd;
      dest[14] = (-m * t + n * r - o * q) * ivd;
      dest[15] = (i * t - j * r + k * q) * ivd;
    }
  }]);

  return MatIV;
}();

/***/ }),

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
/* harmony import */ var _libs_minMatrix__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../libs/minMatrix */ "./libs/minMatrix.ts");








var _jsxFileName = "/Users/neske/Works/neske/esperia.github.io/pages/tests/webgl/study/test.tsx",
    _this2 = undefined;

var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function _createSuper(Derived) { return function () { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var vsSource = "\nattribute vec3 position;\nuniform   mat4 mvpMatrix;\n\nvoid main(void) {\n  gl_Position = mvpMatrix * vec4(position, 1.0);\n}\n";
var fsSource = "\nvoid main(void) {\n  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}\n";

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
      var program = this.createProgram(vShader, fShader);
      this.gl.useProgram(program);
      var attLocation = this.gl.getAttribLocation(program, 'position');
      var attStride = 3;
      var vertexPosition = [0.0, 1.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0];
      var vbo = this.createVbo(vertexPosition);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
      this.gl.enableVertexAttribArray(attLocation);
      this.gl.vertexAttribPointer(attLocation, attStride, this.gl.FLOAT, false, 0, 0);
      var m = new _libs_minMatrix__WEBPACK_IMPORTED_MODULE_8__["MatIV"]();
      var mMatrix = m.create();
      var vMatrix = m.create();
      var pMatrix = m.create();
      var mvpMatrix = m.create();
      m.identity(mMatrix);
      m.identity(vMatrix);
      m.identity(pMatrix);
      m.identity(mvpMatrix);
      m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);
      m.perspective(90, this.canvas.width / this.canvas.height, 0.1, 100, pMatrix);
      m.multiply(pMatrix, vMatrix, mvpMatrix);
      m.multiply(mvpMatrix, mMatrix, mvpMatrix);
      var uniLocation = this.gl.getUniformLocation(program, 'mvpMatrix');
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
        var _this$gl$getShaderInf;

        throw new Error((_this$gl$getShaderInf = this.gl.getShaderInfoLog(shader)) !== null && _this$gl$getShaderInf !== void 0 ? _this$gl$getShaderInf : '');
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
        var _this$gl$getProgramIn;

        throw new Error((_this$gl$getProgramIn = this.gl.getProgramInfoLog(program)) !== null && _this$gl$getProgramIn !== void 0 ? _this$gl$getProgramIn : '');
      }

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
          lineNumber: 122,
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
      lineNumber: 127,
      columnNumber: 3
    }
  }, __jsx("h1", {
    __self: _this2,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 5
    }
  }, "Test"), __jsx(Canvas, {
    __self: _this2,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 5
    }
  }));
});

/***/ })

})
//# sourceMappingURL=test.js.4703e5a90bdc6ff71596.hot-update.js.map