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

function pianoKeys(element, keysDescription, handler) {

  let keysArrays
  let index = 0
  let rightOnTrack = false
  const downedKeys = new Set()

  try {
    keysArrays = keysDescription.split(' ').map(string => string.split('+'))
  }
  catch (error) {
    throw new Error('Invalid keys description')
  }

  if (!keysArrays.length || keysArrays.some(array => !array.length || array.some(key => key === ''))) {
    throw new Error('Invalid keys description')
  }

  const keyDownHandler = event => {
    const keys = keysArrays[index]
    const codedKey = keyCodes[event.key] || event.key

    downedKeys.add(codedKey)

    if (keys.every(key => downedKeys.has(key))) {
      
      if (index === keysArrays.length - 1) {
        return handler(event)
      }

      rightOnTrack = true
    }
    else if (keys.some(key => downedKeys.has(key))) {
      rightOnTrack = true
    }
    else {
      index = 0
      rightOnTrack = false
    }
  }

  const keyUpHandler = event => {
    const codedKey = keyCodes[event.key] || event.key

    if (downedKeys.has(codedKey)) {
      downedKeys.delete(codedKey)
    }

    if (downedKeys.size === 0 && rightOnTrack) {
      index++

      if (index >= keysArrays.length) {
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

module.exports = pianoKeys
