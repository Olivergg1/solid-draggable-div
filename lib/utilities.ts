export type Bounds = {
  top: number
  right: number
  bottom: number
  left: number
}

export function isInViewport(bounds: Bounds): boolean {
  return (
    bounds.top >= 0 &&
    bounds.left >= 0 &&
    bounds.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounds.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
