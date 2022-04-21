import pianoKeys from './src/index'

const pre = document.getElementsByTagName('pre')[0]

function output(string: string) {
  pre.innerHTML = `${string}\n${pre.innerHTML}`
}

function register(description: string, keyup?: boolean) {
  pianoKeys(window, description, () => output(description), keyup)
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
register('s', true)
register('f f g', true)
register('up+a down+z', true)
