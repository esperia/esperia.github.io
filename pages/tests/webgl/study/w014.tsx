import React from 'react'
import Link from 'next/link'
import { MatIV } from '../../../../libs/minMatrix';

const vsSource = `
attribute vec3 position;
uniform   mat4 mvpMatrix;

void main(void) {
  gl_Position = mvpMatrix * vec4(position, 1.0);
}
`
const fsSource = `
void main(void) {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`

class W014 {
  private canvasWidth = 300;
  private canvasHeight = 300;

  constructor(
    private gl: WebGLRenderingContext
  ) {}

  run() {
    const gl = this.gl;
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clearDepth(1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const vShader = this.createShader(this.gl.createShader(this.gl.VERTEX_SHADER)!, vsSource);
      const fShader = this.createShader(this.gl.createShader(this.gl.FRAGMENT_SHADER)!, fsSource);
      const program = this.createProgram(vShader, fShader);
      this.gl.useProgram(program);
      const attLocation = this.gl.getAttribLocation(program, 'position')
      const attStride = 3
      const vertexPosition = [
          0.0, 1.0, 0.0,
          1.0, 0.0, 0.0,
          -1.0,0.0, 0.0,
      ]

      const vbo = this.createVbo(vertexPosition)
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo)
      this.gl.enableVertexAttribArray(attLocation)
      this.gl.vertexAttribPointer(attLocation, attStride, this.gl.FLOAT, false, 0, 0)

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

      const uniLocation = this.gl.getUniformLocation(program, 'mvpMatrix')
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


class Canvas extends React.Component {
  private canvasRef: React.RefObject<HTMLCanvasElement>

  constructor(props: any) {
    super(props)
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvasEl = this.canvasRef.current
    if (canvasEl) {
      console.log(this.canvasRef.current)
      canvasEl.width = 300
      canvasEl.height = 300

      const webGLContext = canvasEl.getContext('webgl') as WebGLRenderingContext
      new W014(webGLContext).run();
    }
  }

  render() {
    return <canvas ref={this.canvasRef}></canvas>
  }
}

export default () => (
  <div>
    <h1>Test</h1>
    <Canvas />
  </div>
)
