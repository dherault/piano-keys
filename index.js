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

const hashPattern = pattern => JSON.stringify(pattern.map(x => [...new Set(x)].sort()))

function comparePattern(pattern, source) {
  const sourceHash = hashPattern(source)

  for (let i = 0; i < pattern.length - source.length + 1; i++) {
    if (hashPattern(pattern.slice(i)) === sourceHash) return true
  }
}

function pianoKeys(element, description, handler, keyUp) {
  let keys
  let pattern = [[]]

  try {
    keys = description.toLowerCase().split(' ').map(x => x.split('+'))
  }
  catch (error) {
    throw new Error('Invalid keys description')
  }

  if (!keys.length || keys.some(x => !x.length || x.some(code => code === ''))) {
    throw new Error('Invalid keys description')
  }

  function handleKeyDown(event) {
    const code = keyCodes[event.key] || event.key.toLowerCase()

    pattern[pattern.length - 1].push(code)

    if (!keyUp && comparePattern(pattern, keys)) {
      pattern = [[]]

      return handler(event)
    }
  }

  function handleKeyUp(event) {
    if (keyUp && comparePattern(pattern, keys)) {
      pattern = [[]]

      return handler(event)
    }

    if (pattern[pattern.length - 1].length) {
      pattern.push([])
    }

    // Prevent memory leaks
    if (pattern.length > keys.length) {
      pattern = pattern.slice(pattern.length - keys.length)
    }
  }

  element.addEventListener('keydown', handleKeyDown)
  element.addEventListener('keyup', handleKeyUp)

  return () => {
    element.removeEventListener('keydown', handleKeyDown)
    element.removeEventListener('keyup', handleKeyUp)
  }
}

module.exports = pianoKeys
