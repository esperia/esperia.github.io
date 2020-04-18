import React from 'react'
import { MatIV } from '../../../../libs/minMatrix';
import { CanvasComponent } from '../components';

const vsAttributes = {
  position: 'position',
  color: 'color',
  mvpMatrix: 'mvpMatrix',
}
const varyings = {
  vColor: 'vColor',
}
const vsSource = `
attribute vec3 ${vsAttributes.position};
attribute vec4 ${vsAttributes.color};
uniform   mat4 ${vsAttributes.mvpMatrix};
varying   vec4 ${varyings.vColor};

void main(void) {
  vColor = color;
  gl_Position = mvpMatrix * vec4(${vsAttributes.position}, 1.0);
}
`
const fsSource = `
precision mediump float;
varying   vec4 ${varyings.vColor};

void main(void) {
  gl_FragColor = ${varyings.vColor};
}
`

class W014 {
  private gl: WebGLRenderingContext;
  private canvasWidth = 300;
  private canvasHeight = 300;

  constructor(
    canvasEl: HTMLCanvasElement,
  ) {
    this.gl = canvasEl.getContext('webgl') as WebGLRenderingContext
    this.canvasWidth = canvasEl.width
    this.canvasHeight = canvasEl.height
  }

  run() {
    const gl = this.gl;
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clearDepth(1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const vShader = this.createShader(this.gl.createShader(this.gl.VERTEX_SHADER)!, vsSource);
      const fShader = this.createShader(this.gl.createShader(this.gl.FRAGMENT_SHADER)!, fsSource);
      const program = this.createProgram(vShader, fShader);
      this.gl.useProgram(program);

      const vertexPositionAttribLocation = this.gl.getAttribLocation(program, vsAttributes.position)
      const vertexColorAttribLocation = this.gl.getAttribLocation(program, vsAttributes.color)

      const vertexPositionStride = 3
      const vertexPosition = [
          0.0, 1.0, 0.0,
          1.0, 0.0, 0.0,
          -1.0,0.0, 0.0,
      ]
      const vertexColorStride = 4
      const vertexColor = [
          1.0, 0.0, 0.0, 1.0,
          0.0, 1.0, 0.0, 1.0,
          0.0, 0.0, 1.0, 1.0
      ];

      const vertexPositionVbo = this.createVbo(vertexPosition)
      const vertexColorVbo = this.createVbo(vertexColor)

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexPositionVbo)
      this.gl.enableVertexAttribArray(vertexPositionAttribLocation)
      this.gl.vertexAttribPointer(vertexPositionAttribLocation, vertexPositionStride, this.gl.FLOAT, false, 0, 0)

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexColorVbo)
      this.gl.enableVertexAttribArray(vertexColorAttribLocation)
      this.gl.vertexAttribPointer(vertexColorAttribLocation, vertexColorStride, this.gl.FLOAT, false, 0, 0)

      const m = new MatIV();
      const mMatrix = m.create()
      const vMatrix = m.create()
      const pMatrix = m.create()
      const mvpMatrix = m.create()
      m.identity(mMatrix)
      m.identity(vMatrix)
      m.identity(pMatrix)
      m.identity(mvpMatrix)

      m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix)
      m.perspective(90, this.canvasWidth / this.canvasHeight, 0.1, 100, pMatrix)

      m.multiply(pMatrix, vMatrix, mvpMatrix)
      m.multiply(mvpMatrix, mMatrix, mvpMatrix)

      const uniLocation = this.gl.getUniformLocation(program, vsAttributes.mvpMatrix)
      this.gl.uniformMatrix4fv(uniLocation, false, mvpMatrix)
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)
      this.gl.flush()
  }

  createShader(shader: WebGLShader, source: string) {
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          throw new Error(this.gl.getShaderInfoLog(shader) ?? '');
      }
      return shader;
  }

  createProgram(vs: WebGLShader, fs: WebGLShader) {
      const program = this.gl.createProgram()!;

      this.gl.attachShader(program, vs)
      this.gl.attachShader(program, fs)
      this.gl.linkProgram(program)

      if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
          throw new Error(this.gl.getProgramInfoLog(program) ?? '');
      }
      return program;
  }

  createVbo(data: number[]) {
      var vbo = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo)
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW)
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
      return vbo;
  }
}

export default () => {
  const onMountedCanvas = (canvasEl: HTMLCanvasElement) => {
    new W014(canvasEl).run();
  }
  return (
    <div>
      <h1>Test</h1>
      <CanvasComponent onMountedCanvas={canvasEl => onMountedCanvas(canvasEl)} />
    </div>
  )
}
