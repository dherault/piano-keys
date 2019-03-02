import React from 'react'
import ReactDOM from 'react-dom'
import hotkeys from 'piano-keys'

ReactDOM.render(
  <div>
    Hello world
  </div>, 
  document.getElementById('root')
)

hotkeys(document.documentElement, 'a', () => console.log('!!!!!!!\na\n!!!!!!!'))
hotkeys(document.documentElement, 'b+c', () => console.log('!!!!!!!\nb+c\n!!!!!!!'))
hotkeys(document.documentElement, 'd e', () => console.log('!!!!!!!\nd e\n!!!!!!!'))
hotkeys(document.documentElement, 'ctrl+q', () => console.log('!!!!!!!\nctrl+q\n!!!!!!!'))
hotkeys(document.documentElement, 'up up left left', () => console.log('!!!!!!!\nup up left left\n!!!!!!!'))
hotkeys(document.documentElement, 'x down+right', () => console.log('!!!!!!!\nx down+right\n!!!!!!!'))
hotkeys(document.documentElement, 'up+left down+right', () => console.log('!!!!!!!\nup+left down+right\n!!!!!!!'))
hotkeys(document.documentElement, 'space', () => console.log('!!!!!!!\nspace\n!!!!!!!'))
hotkeys(document.documentElement, 'ctrl+space', () => console.log('!!!!!!!\nctrl+space\n!!!!!!!'))
