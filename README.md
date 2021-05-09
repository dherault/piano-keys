# Piano keys

[![npm version](https://badge.fury.io/js/piano-keys.svg)](https://badge.fury.io/js/piano-keys)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

A JavaScript hotkeys librairy in less than 3KB.

## Installation

```
npm install piano-keys --save
```

## Usage

```js
import hotkeys from 'piano-keys'

const element = document.getElementById('hello')

hotkeys(element, 'ctrl+b', () => console.log('bold'))
hotkeys(element, 'cmd+k a', () => console.log('super settings'))
hotkeys(element, 'up up down down left right left right b a', () => console.log('konami code'))
hotkeys(element, '1', () => console.log('fire on keyup'), true)

// To unregister the listeners use the return function
const unregisterHotkeys = hotkeys(element, 'a', () => console.log('pressed a'))

unregisterHotkeys()
```

Available descriptors:
`ctrl shift alt altgr cmd enter tab space backspace escape capslock up down left right plus contextmenu delete insert pause home end numlock`

## Usage with react

Checkout [react-piano-keys](https://www.npmjs.com/package/react-piano-keys)

## Contributing

Yes, thank you.

## License

MIT
