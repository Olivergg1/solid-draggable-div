import type { Component } from 'solid-js'
import styles from './App.module.css'
import DraggableDiv from '../../lib/DraggableDiv'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <DraggableDiv initialPosition={{ x: 0, y: 0 }}>
        <p>default</p>
      </DraggableDiv>
    </div>
  )
}

export default App
