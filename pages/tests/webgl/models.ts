
export class Models {
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
