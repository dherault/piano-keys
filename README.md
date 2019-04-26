# Piano keys

[![npm version](https://badge.fury.io/js/piano-keys.svg)](https://badge.fury.io/js/piano-keys)
[![Build Status](https://travis-ci.org/dherault/piano-keys.svg?branch=master)](https://travis-ci.org/dherault/piano-keys)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

A JavaScript shorcuts and hotkeys librairy in less than 3kb

## Installation

```
npm install piano-keys --save
```

## Usage

```js
import hotkeys from 'piano-keys'

const element = document.getElementById('hello')

hotkeys(element, 'ctrl+b', () => console.log('bold'))
hotkeys(element, 'ctrl+k 1', () => console.log('super settings'))
hotkeys(element, 'up up down down left right left right b a', () => console.log('konami code'))

// To fire the handler only once per keydown use the "fireOnce" option
hotkeys(element, 'ctrl+a', () => console.log('select all'), { fireOnce: true })

// To fire the handler on keyup use the "fireOnKeyUp" option
hotkeys(element, '1 2 3', () => console.log('fire when 3 is released'), { fireOnKeyUp: true })

// To unregister the listeners use the return function
const unregisterHotkeys = hotkeys(element, 'a', () => console.log('pressed a'))

unregisterHotkeys()
```

Available descriptors:
`ctrl shift alt altgr cmd enter tab space backspace escape capslock up down left right plus contextmenu delete insert pause home end numlock`

## Usage with React

```js
import React from 'react'
import hotkeys from 'piano-keys'

class MyComponent extends React.Component {

  myRef = React.createRef()

  componentDidMount() {
    this.unregisterHotkeys = hotkeys(this.myRef.current, 'ctrl+a', e => {
      e.preventDefault()
      console.log('custon select all')
    })
  }

  componentWillUnmount() {
    this.unregisterHotkeys()
  }

  render() {
    return (
      <div ref={this.myRef}>
        Hello world
      </div>
    )
  }
}
```

## Contributing

Any PR is welcome and will be reviewed.

## License

MIT
