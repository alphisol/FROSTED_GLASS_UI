export function buildTransform(rotateX: number, rotateY: number): string {
  return `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0deg) skew(0deg, 0deg)`;
}

export function buildAvatarTransform(y: number, z: number): string {
  return `translate3d(0px, ${y}px, ${z}px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
}
