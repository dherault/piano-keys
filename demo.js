const pianoKeys = require('./index.js')

const pre = document.getElementsByTagName('pre')[0]

function output(string) {
  pre.innerHTML = `${string}\n${pre.innerHTML}`
}

function register(description) {
  pianoKeys(window, description, () => output(description))
}

register('a')
register('shift+a')
register('b+c')
register('d e')
register('ctrl+q')
register('up up left left')
register('x down+right')
register('up+left down+right')
register('space')
register('ctrl+space')
register('s')
register('f f g')
register('up+a down+z')
