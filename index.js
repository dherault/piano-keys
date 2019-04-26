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

function pianoKeys(element, keysDescription, handler, options = {}) {
  let keysArrays
  let index = 0
  let rightOnTrack = false
  let hasFiredOnce = false
  let shouldFireOnKeyUp = false
  let history = []
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
    shouldFireOnKeyUp = false

    if (keys.every(key => downedKeys.has(key))) {
      if (index === keysArrays.length - 1) {
        if (options.fireOnce && hasFiredOnce) {
          return
        }

        history = []

        if (!options.fireOnKeyUp) {
          hasFiredOnce = true

          return handler(event)
        }

        shouldFireOnKeyUp = true
      }

      rightOnTrack = true
    }
    else if (keys.some(key => downedKeys.has(key))) {
      rightOnTrack = true
    }
    else {
      rightOnTrack = false
      index = 0
      for (let i = 0; i < history.length; i++) {
        rightOnTrack = false
        index = 0
        for (let j = 0; j < history.length - i; j++) {
          rightOnTrack = history[i + j].length === keysArrays[index].length && history[i + j].every((item, k) => keysArrays[index][k] === item)

          if (rightOnTrack) index++
          else break
        }
      }
    }

    if (rightOnTrack) history.push(Array.from(downedKeys))
    else history = []
  }

  const keyUpHandler = event => {
    hasFiredOnce = false

    if (shouldFireOnKeyUp) {
      index = 0
      rightOnTrack = false
      shouldFireOnKeyUp = false
      downedKeys.forEach(key => downedKeys.delete(key))

      return handler(event)
    }

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

  // Prevent alt+tab from leaving alt active on focus
  const windowFocusHandler = () => {
    if (downedKeys.has('alt')) {
      downedKeys.delete('alt')
    }
  }

  // Register events
  element.addEventListener('keydown', keyDownHandler)
  element.addEventListener('keyup', keyUpHandler)
  window.addEventListener('focus', windowFocusHandler)

  // Return unregister function
  return () => {
    element.removeEventListener('keydown', keyDownHandler)
    element.removeEventListener('keyup', keyUpHandler)
    window.removeEventListener('focus', windowFocusHandler)
  }
}

module.exports = pianoKeys
