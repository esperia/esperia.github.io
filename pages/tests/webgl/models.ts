
export class Models {
  static createTorus(row: number, column: number, irad: number, orad: number) {
    const positions = new Array(), colors = new Array(), indexes = new Array();
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
        const tc = this.hsva(360 / column * ii, 1, 1, 1)
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
  
  private static hsva(h: number, s: number, v: number, a: number): number[] {
    if (s > 1) {
      throw new Error(`s must be less than 1`)
    }
    if (v > 1) {
      throw new Error(`v must be less than 1`)
    }
    if (a > 1) {
      throw new Error(`a must be less than 1`)
    }
    var th = h % 360;
    var i = Math.floor(th / 60);
    var f = th / 60 - i;
    var m = v * (1 - s);
    var n = v * (1 - s * f);
    var k = v * (1 - s * (1 - f));
    const color = new Array();
    // if (!s > 0 && !s < 0) {
    //   color.push(v, v, v, a);
    // } else {
    var r = new Array(v, n, m, m, k, v);
    var g = new Array(k, v, v, n, m, m);
    var b = new Array(m, m, k, v, v, n);
    color.push(r[i], g[i], b[i], a);
    // }
    return color;
  }
}
