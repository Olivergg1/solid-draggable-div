import { Component, createSignal } from 'solid-js'
import { JSXElement, JSX } from 'solid-js/types/index'
import { isInViewport, Bounds } from './utilities'

type Position = {
  x: number
  y: number
}

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSXElement
  fixed?: boolean
  style?: JSX.CSSProperties
  centered?: boolean | false
  initialPosition?: Position
}

const DraggableDiv: Component<Props> = ({
  children,
  fixed,
  initialPosition,
  centered,
  style,
  ...props
}) => {
  const [position, setPosition] = createSignal<Position>(
    initialPosition || { x: 0, y: 0 }
  )
  const [pressed, setPressed] = createSignal<boolean>(false)

  const onMove = (e: MouseEvent) => {
    const bounds: Bounds = {
      top: position().y + e.movementY,
      left: position().x + e.movementX,
      bottom:
        position().y + e.movementY + (e.target as HTMLElement).clientHeight,
      right: position().x + e.movementX + (e.target as HTMLElement).clientWidth,
    }

    if (pressed() && isInViewport(bounds)) {
      setPosition({
        x: position().x + e.movementX,
        y: position().y + e.movementY,
      })
    }
  }

  return (
    <div
      {...props}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onMouseMove={onMove}
      style={{
        ...style,
        position: 'absolute',
        transform: `translate(${position().x}px, ${position().y}px)`,
      }}>
      {children}
    </div>
  )
}

export default DraggableDiv
