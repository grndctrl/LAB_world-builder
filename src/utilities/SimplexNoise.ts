import { createNoise2D, createNoise3D } from 'simplex-noise';

// simplex-noise 4 dropped its seeded constructor and now takes a plain PRNG,
// so we hash the seed string (cyrb128) and feed it to a small PRNG (sfc32).
const cyrb128 = (seed: string): [number, number, number, number] => {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;

  for (let i = 0; i < seed.length; i++) {
    const k = seed.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }

  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);

  return [
    (h1 ^ h2 ^ h3 ^ h4) >>> 0,
    (h2 ^ h1) >>> 0,
    (h3 ^ h1) >>> 0,
    (h4 ^ h1) >>> 0,
  ];
};

const sfc32 = (a: number, b: number, c: number, d: number) => () => {
  a >>>= 0;
  b >>>= 0;
  c >>>= 0;
  d >>>= 0;

  let t = (a + b) | 0;
  a = b ^ (b >>> 9);
  b = (c + (c << 3)) | 0;
  c = (c << 21) | (c >>> 11);
  d = (d + 1) | 0;
  t = (t + d) | 0;
  c = (c + t) | 0;

  return (t >>> 0) / 4294967296;
};

export default class SimplexNoise {
  seed: string;
  private noise2D: ReturnType<typeof createNoise2D>;
  private noise3D: ReturnType<typeof createNoise3D>;

  constructor(seed = 'seed') {
    this.seed = seed;
    this.noise2D = createNoise2D(sfc32(...cyrb128(seed)));
    this.noise3D = createNoise3D(sfc32(...cyrb128(seed)));
  }

  noise3(x: number, y: number, z: number): number {
    return this.noise3D(x, y, z);
  }

  noise2(x: number, y: number): number {
    return this.noise2D(x, y);
  }

  random2(x: number, y: number): number {
    let r = this.noise2D(x, y);

    let p = this.noise2D(x + 1000, y + 1000);
    let q = this.noise2D(x - 100, y - 100);

    return (r + p + q) / 6 + 0.5;
  }

  random3(x: number, y: number, z: number): number {
    let r = this.noise3D(x, y, z);

    let p = this.noise3D(x + 1000, y + 1000, z + 1000);
    let q = this.noise3D(x - 100, y - 100, z - 100);

    return (r + p + q) / 6 + 0.5;
  }
}
