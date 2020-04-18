import React from 'react'


export class CanvasComponent extends React.Component<{
  onMountedCanvas?: (canvasEl: HTMLCanvasElement) => void,
}> {
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

      if (this.props.onMountedCanvas) {
        this.props.onMountedCanvas(canvasEl)
      }
      // const webGLContext = canvasEl.getContext('webgl') as WebGLRenderingContext
      // new W014(webGLContext).run();
    }
  }

  render() {
    return <canvas ref={this.canvasRef}></canvas>
  }
}