import React, { useState } from 'react'
import { MatIV } from '../../../../libs/minMatrix';
import { CanvasComponent } from '../components';
import { Models } from '../models';

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

class W015 {
  private gl: WebGLRenderingContext;
  private canvasWidth: number;
  private canvasHeight: number;
  positionX: number = 0;
  positionY: number = 0;
  canLoop = true;

  constructor(
    canvasEl: HTMLCanvasElement,
  ) {
    this.gl = canvasEl.getContext('webgl') as WebGLRenderingContext
    this.canvasWidth = canvasEl.width
    this.canvasHeight = canvasEl.height
  }

  run() {
    const gl = this.gl;

    // Create Program
    const vShader = this.createShader(this.gl.createShader(this.gl.VERTEX_SHADER)!, vsSource);
    const fShader = this.createShader(this.gl.createShader(this.gl.FRAGMENT_SHADER)!, fsSource);
    const program = this.createProgram(vShader, fShader);
    this.gl.useProgram(program);

    // Get locations
    const vertexPositionAttribLocation = this.gl.getAttribLocation(program, vsAttributes.position)
    const vertexColorAttribLocation = this.gl.getAttribLocation(program, vsAttributes.color)
    const mvpMatrixUniformLocation = this.gl.getUniformLocation(program, vsAttributes.mvpMatrix)

    // const vertexPositionStride = 3
    // const vertexPosition = [
    //   0.0, 1.0, 0.0,
    //   1.0, 0.0, 0.0,
    //   -1.0, 0.0, 0.0,
    //   0.0, -1.0, 0.0,
    // ]
    // const vertexColorStride = 4
    // const vertexColor = [
    //   1.0, 0.0, 0.0, 1.0,
    //   0.0, 1.0, 0.0, 1.0,
    //   0.0, 0.0, 1.0, 1.0,
    //   1.0, 1.0, 1.0, 1.0,
    // ];
    // const indexes = [
    //   0, 1, 2,
    //   1, 3, 2,
    // ]

    const torus = Models.createTorus(32, 32, 1.0, 2.0)
    const vertexPosition = torus.positions
    const vertexPositionStride = 3
    const vertexColor = torus.colors
    const vertexColorStride = 4
    const indexes = torus.indexes

    const vertexPositionVbo = this.createVbo(vertexPosition)
    const vertexColorVbo = this.createVbo(vertexColor)

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexPositionVbo)
    this.gl.enableVertexAttribArray(vertexPositionAttribLocation)
    this.gl.vertexAttribPointer(vertexPositionAttribLocation, vertexPositionStride, this.gl.FLOAT, false, 0, 0)

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexColorVbo)
    this.gl.enableVertexAttribArray(vertexColorAttribLocation)
    this.gl.vertexAttribPointer(vertexColorAttribLocation, vertexColorStride, this.gl.FLOAT, false, 0, 0)

    const ibo = this.createIbo(indexes)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    const m = new MatIV();
    const mMatrix = m.create()
    const vMatrix = m.create()
    const pMatrix = m.create()
    const mvMatrix = m.create()
    const mvpMatrix = m.create()
    m.identity(mMatrix)
    m.identity(vMatrix)
    m.identity(pMatrix)
    m.identity(mvMatrix)
    m.identity(mvpMatrix)

    // ビュー行列とプロジェクション行列を計算しておく
    m.lookAt([0.0, 1.0, 6.0], [0, 0, 0], [0, 1, 0], vMatrix)
    m.perspective(90, this.canvasWidth / this.canvasHeight, 0.1, 100, pMatrix)
    m.multiply(pMatrix, vMatrix, mvMatrix)

    // カリング
    // gl.enable(gl.CULL_FACE)

    // 深度テスト
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL);

    const startTime = Date.now()
    const updateWorld = () => {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clearDepth(1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const currentTime = Date.now()
      const spentTime = currentTime - startTime
      const rad = (2 * Math.PI) * (spentTime % 2000 / 2000);
      
      // 円運動
      var x = Math.cos(rad);
      var y = Math.sin(rad);
  
      // モデルを描画
      m.identity(mMatrix)
      // m.translate(mMatrix, [x, y + 1.0, 0.0], mMatrix)
      // m.translate(mMatrix, [this.positionX, 0.0, 0.0], mMatrix)
      // m.rotate(mMatrix, rad, [0, 1, 0], mMatrix);
      const radianOfDegree = (2 * Math.PI) / 360
      const xRadian = radianOfDegree * this.positionX
      const yRadian = radianOfDegree * this.positionY
      m.rotate(mMatrix, xRadian, [0, 1, 0], mMatrix);
      m.rotate(mMatrix, yRadian, [1, 0, 0], mMatrix);
      m.multiply(mvMatrix, mMatrix, mvpMatrix)
      this.gl.uniformMatrix4fv(mvpMatrixUniformLocation, false, mvpMatrix)
      // this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)
      this.gl.drawElements(this.gl.TRIANGLES, indexes.length, gl.UNSIGNED_SHORT, 0)

      this.gl.flush()

      if (this.canLoop) {
        requestAnimationFrame(() => updateWorld())
      }
    }
    requestAnimationFrame(() => updateWorld())
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

  createIbo(data: number[]) {
    var ibo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibo)
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), this.gl.STATIC_DRAW)
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null)
    return ibo;
  }

  destroy() {
    this.canLoop = false
  }
}


const Example: React.FunctionComponent<{}> = (props) => {
  const [glContainer, setGlContainer] = useState<W015 | undefined>(undefined);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  return (
    <div>
      <h1>Test</h1>
      <CanvasComponent onMountedCanvas={canvasEl => {
        const glContainer = new W015(canvasEl)
        setGlContainer(glContainer)
        glContainer.positionX = x
        glContainer.positionY = y
        glContainer.run();
      }} onUnmountedCanvas={() => {
        if (glContainer) {
          glContainer.destroy()
        }
        setGlContainer(undefined)
      }} />
      {glContainer ? <div>
        <div>
          <label>position x: <input type="range" value={x} min="0.0" max="360.0" step="0.1" onChange={e => {
            glContainer.positionX = parseFloat(e.target.value)
            console.log(glContainer.positionX)
            setX(glContainer.positionX)
          }} /> <span>{glContainer.positionX}</span></label>
        </div>
        <div>
          <label>position y: <input type="range" value={y} min="0.0" max="360.0" step="0.1" onChange={e => {
            glContainer.positionY = parseFloat(e.target.value)
            setY(glContainer.positionY)
          }} /> <span>{glContainer.positionY}</span></label>
        </div>
      </div> : null}
    </div>
  )
}
export default Example
