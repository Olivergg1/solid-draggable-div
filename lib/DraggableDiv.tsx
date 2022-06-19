import { Component, createSignal } from 'solid-js'
import { JSXElement, JSX } from 'solid-js/types/index'
import { isInBounds, Bounds } from './utilities'
import { Accessor } from 'solid-js/types/reactive/signal'

type Position = {
  x: number
  y: number
}

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSXElement
  fixed?: boolean | false
  style?: JSX.CSSProperties
  centered?: boolean | false
  initialPosition?: Position
  when?: Accessor<boolean>
  within: Accessor<DOMRect | undefined>
}

const DraggableDiv: Component<Props> = ({
  children,
  fixed,
  initialPosition,
  centered,
  style,
  when,
  within,
  ...props
}) => {
  const [position, setPosition] = createSignal<Position>(
    initialPosition || { x: 0, y: 0 }
  )
  const [pressed, setPressed] = createSignal<boolean>(false)

  const onMove = (e: MouseEvent) => {
    if (typeof within === 'undefined') return
    console.log(e.movementY)
    const bounds: Bounds = {
      top: position().y + e.movementY,
      left: position().x + e.movementX,
      bottom:
        position().y +
        e.movementY +
        (e.currentTarget as HTMLElement).clientHeight,
      right:
        position().x +
        e.movementX +
        (e.currentTarget as HTMLElement).clientWidth,
    }

    if (
      pressed() &&
      isInBounds(bounds, within()) &&
      (typeof when !== 'undefined' ? when() : true)
    ) {
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
        position: fixed === true ? 'fixed' : 'absolute',
        transform: `translate(${position().x}px, ${position().y}px)`,
      }}>
      {children}
    </div>
  )
}

export default DraggableDiv
