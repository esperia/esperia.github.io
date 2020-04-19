
export class Models {

  /**
   * @see "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL"
   */
  static createBox() {
    const positions: number[] = [
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
      
      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      
      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,
      
      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,
      
      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      
      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,
    ]
    const faceColors = [
      [1.0,  1.0,  1.0,  1.0],    // Front face: white
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [0.0,  1.0,  0.0,  1.0],    // Top face: green
      [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
      [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
      [1.0,  0.0,  1.0,  1.0],    // Left face: purple
    ];
  
    // Convert the array of colors into a table for all the vertices.
  
    let colors: number[] = [];
  
    for (var j = 0; j < faceColors.length; ++j) {
      const c = faceColors[j];
  
      // Repeat each color four times for the four vertices of the face
      colors = colors.concat(c, c, c, c);
    }
    // const colors: number[] = [
    //   1.0,  1.0,  1.0,  1.0,    // Front face: white
    //   1.0,  0.0,  0.0,  1.0,    // Back face: red
    //   0.0,  1.0,  0.0,  1.0,    // Top face: green
    //   0.0,  0.0,  1.0,  1.0,    // Bottom face: blue
    //   1.0,  1.0,  0.0,  1.0,    // Right face: yellow
    //   1.0,  0.0,  1.0,  1.0,    // Left face: purple
    // ];
    const indexes: number[] = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
    ];

    const vertexPositionStride = 3
    const vertexColorStride = 4

    return {
      positions,
      colors,
      indexes
    };
  }

  static createTriangle() {
    const positions: number[] = [
      0.0, 1.0, 0.0,
      1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      0.0, -1.0, 0.0,
    ]
    const colors: number[] = [
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0,
    ];
    const indexes: number[] = [
      0, 1, 2,
      1, 3, 2,
    ];

    const vertexPositionStride = 3
    const vertexColorStride = 4

    return {
      positions,
      colors,
      indexes
    };
  }

  /**
   * トーラスを生成する
   * @param row パイプを形成する円をいくつの頂点で表現するのかを指定します。大きな数値を指定すればパイプの断面が円形に近づきますが、逆に小さな数値を指定すればパイプの断面はカクカクになっていきます。
   * @param column パイプをどれくらい分割するのかを指定します。この数値を大きくすると、トーラスは滑らかな輪を形成するようになり、小さな数値を指定すればカクカクの輪になります。
   * @param irad 生成されるパイプそのものの半径です。
   * @param orad 原点からパイプの中心までの距離になります。
   */
  static createTorus(row: number, column: number, irad: number, orad: number) {
    const positions = [], colors = [], indexes = [];
    for (let i = 0; i <= row; i++) {
      const r = Math.PI * 2 / row * i;
      const rr = Math.cos(r);
      const ry = Math.sin(r);
      for (let ii = 0; ii <= column; ii++) {
        const tr = Math.PI * 2 / column * ii;
        const tx = (rr * irad + orad) * Math.cos(tr);
        const ty = ry * irad;
        const tz = (rr * irad + orad) * Math.sin(tr);
        positions.push(tx, ty, tz);
        const tc = this.getRgbColorFromHsva(360 / column * ii, 1, 1, 1)
        colors.push(tc[0], tc[1], tc[2], tc[3]);
      }
    }
    for (let i = 0; i < row; i++) {
      for (let ii = 0; ii < column; ii++) {
        const r = (column + 1) * i + ii;
        indexes.push(r, r + column + 1, r + 1);
        indexes.push(r + column + 1, r + column + 2, r + 1);
      }
    }
    return {
      positions,
      colors,
      indexes
    };
  }
  
  /**
   * HSVAからRGBカラーへ変換する
   * @param h 色相
   * @param s 彩度
   * @param v 明度
   * @param a 透明度
   */
  private static getRgbColorFromHsva(h: number, s: number, v: number, a: number): number[] {
    if (s > 1) throw new Error(`s must be less than 1`)
    if (v > 1) throw new Error(`v must be less than 1`)
    if (a > 1) throw new Error(`a must be less than 1`)

    const th = h % 360;
    const i = Math.floor(th / 60);
    const f = th / 60 - i;
    const m = v * (1 - s);
    const n = v * (1 - s * f);
    const k = v * (1 - s * (1 - f));
    const color = [];
    if (s === 0) {
      color.push(v, v, v, a);
    } else {
      const r = [v, n, m, m, k, v];
      const g = [k, v, v, n, m, m];
      const b = [m, m, k, v, v, n];
      color.push(r[i], g[i], b[i], a);
    }
    return color;
  }
}
