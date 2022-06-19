export type Bounds = {
  top: number
  right: number
  bottom: number
  left: number
}

export function isInBounds(
  bounds: Bounds,
  within: DOMRect | undefined
): boolean {
  if (typeof within === 'undefined') return false

  // console.log(
  //   bounds.left >= 0,
  //   bounds.right <= within.width,
  //   bounds.top >= 0,
  //   bounds.bottom <= within.height
  // )

  console.log(bounds.bottom)

  const horizontal = bounds.left >= 0 && bounds.right <= within.width
  const vertical = bounds.top >= 0 && bounds.bottom <= within.height

  return horizontal && vertical
}
