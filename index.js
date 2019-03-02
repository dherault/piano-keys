/* global module */

const keyCodes = {
  Alt: 'alt',
  AltGraph: 'altgr',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  Backspace: 'backspace',
  CapsLock: 'capslock',
  Command: 'cmd',
  ContextMenu: 'contextmenu',
  Control: 'ctrl',
  Delete: 'delete',
  End: 'end',
  Enter: 'enter',
  Escape: 'escape',
  Home: 'home',
  Insert: 'insert',
  Meta: 'cmd',
  NumLock: 'numlock',
  Shift: 'shift',
  Tab: 'tab',
  '+': 'plus',
  ' ': 'space',
}

function hotkeys(element, keysDescription, handler) {

  let keysArray
  let index = 0
  let rightOnTrack = false
  const keysDown = new Set()

  try {
    keysArray = keysDescription.split(' ').map(string => string.split('+'))
  }
  catch (error) {
    throw new Error('Incorrect hotkeys description')
  }

  const keyDownHandler = event => {
    const nextKeys = keysArray[index]
    const codedKey = keyCodes[event.key] || event.key

    keysDown.add(codedKey)

    if (nextKeys.every(key => keysDown.has(key))) {
      
      if (index === keysArray.length - 1) {
        return handler(event)
      }

      rightOnTrack = true
    }
    else if (nextKeys.some(key => keysDown.has(key))) {
      rightOnTrack = true
    }
    else {
      index = 0
      rightOnTrack = false
    }
  }

  const keyUpHandler = event => {
    const codedKey = keyCodes[event.key] || event.key

    if (keysDown.has(codedKey)) {
      keysDown.delete(codedKey)
    }

    if (keysDown.size === 0 && rightOnTrack) {
      index++

      if (index >= keysArray.length) {
        index = 0
      }
    }
  }
  
  // Register events
  element.addEventListener('keydown', keyDownHandler)
  element.addEventListener('keyup', keyUpHandler)

  // Return unregister function
  return () => {
    element.removeEventListener('keydown', keyDownHandler)
    element.removeEventListener('keyup', keyUpHandler)
  }
}

module.exports = hotkeys
