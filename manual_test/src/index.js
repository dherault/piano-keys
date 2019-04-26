import React from 'react'
import ReactDOM from 'react-dom'
import hotkeys from 'piano-keys'

ReactDOM.render(
  <div>
    Hello world
  </div>,
  document.getElementById('root')
)

hotkeys(document.documentElement, 'a', () => console.log('a'))
hotkeys(document.documentElement, 'b+c', () => console.log('b+c'))
hotkeys(document.documentElement, 'd e', () => console.log('d e'))
hotkeys(document.documentElement, 'ctrl+q', () => console.log('ctrl+q'))
hotkeys(document.documentElement, 'up up left left', () => console.log('up up left left'))
hotkeys(document.documentElement, 'x down+right', () => console.log('x down+right'))
hotkeys(document.documentElement, 'up+left down+right', () => console.log('up+left down+right'))
hotkeys(document.documentElement, 'space', () => console.log('space'))
hotkeys(document.documentElement, 'ctrl+space', () => console.log('ctrl+space'))
hotkeys(document.documentElement, 'w', () => console.log('w'), { fireOnce: true })
hotkeys(document.documentElement, 'v+n', () => console.log('v+n'), { fireOnce: true })
hotkeys(document.documentElement, 's', () => console.log('s'), { fireOnKeyUp: true })
hotkeys(document.documentElement, 'f f g', () => console.log('f f g'), { fireOnKeyUp: true })
hotkeys(document.documentElement, 'up+a down+z', () => console.log('up+a down+z'), { fireOnKeyUp: true })
