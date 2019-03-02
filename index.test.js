/* global require test expect */
const hotkeys = require('./index')

test('it registers hotkeys', () => {
  document.body.innerHTML = `
    <div id="hello">
      Hello world
    </div>
  `

  const element = document.getElementById('hello')

  let error 
  let value = false

  try {
    hotkeys(element, 'a', () => value = true)
  }
  catch (err) {
    error = err
  }

  expect(error).toBe(undefined)

  const event = new Event('keydown')

  event.key = 'a'

  element.dispatchEvent(event)

  expect(value).toBe(true)
})

test('it calls the handler on simple key combinaison', () => {
  let value = false

  document.body.innerHTML = `
    <div id="hello">
      Hello world
    </div>
  `

  const element = document.getElementById('hello')

  const dispatchEvent = (type, key) => {
    const event = new Event(type)

    event.key = key

    element.dispatchEvent(event)
  }

  hotkeys(element, 'a', () => value = true)

  dispatchEvent('keydown', 'b')
  dispatchEvent('keyup', 'b')

  expect(value).toBe(false)

  dispatchEvent('keydown', 'a')
  
  expect(value).toBe(true)
  
  dispatchEvent('keyup', 'a')

  value = false

  dispatchEvent('keydown', 'b')
  dispatchEvent('keydown', 'a')

  expect(value).toBe(true)
})

test('it calls the handler on combined key combinaison', () => {
  let value = false

  document.body.innerHTML = `
    <div id="hello">
      Hello world
    </div>
  `

  const element = document.getElementById('hello')

  const dispatchEvent = (type, key) => {
    const event = new Event(type)

    event.key = key

    element.dispatchEvent(event)
  }

  hotkeys(element, 'ctrl+k', () => value = true)

  dispatchEvent('keydown', 'b')

  expect(value).toBe(false)

  dispatchEvent('keyup', 'b')

  expect(value).toBe(false)

  dispatchEvent('keydown', 'Control')
  
  expect(value).toBe(false)
  
  dispatchEvent('keydown', 'k')

  expect(value).toBe(true)

  value = false

  dispatchEvent('keyup', 'k')

  expect(value).toBe(false)
})


test('it calls the handler on complex key combinaison', () => {
  let value = false

  document.body.innerHTML = `
    <div id="hello">
      Hello world
    </div>
  `

  const element = document.getElementById('hello')

  const dispatchEvent = (type, key) => {
    const event = new Event(type)

    event.key = key

    element.dispatchEvent(event)
  }

  hotkeys(element, 'up down left right', () => value = true)

  dispatchEvent('keydown', 'b')

  expect(value).toBe(false)

  dispatchEvent('keyup', 'b')

  expect(value).toBe(false)

  dispatchEvent('keydown', 'ArrowUp')
  
  expect(value).toBe(false)

  dispatchEvent('keyup', 'ArrowUp')
  
  expect(value).toBe(false)

  dispatchEvent('keydown', 'ArrowDown')
  
  expect(value).toBe(false)

  dispatchEvent('keyup', 'ArrowDown')
  
  expect(value).toBe(false)

  dispatchEvent('keydown', 'ArrowLeft')
  
  expect(value).toBe(false)

  dispatchEvent('keyup', 'ArrowLeft')
  
  expect(value).toBe(false)

  dispatchEvent('keydown', 'ArrowRight')
  
  expect(value).toBe(true)

  value = false

  dispatchEvent('keyup', 'ArrowRight')
  
  expect(value).toBe(false)
})

test('it unregisters hotkeys', () => {
  document.body.innerHTML = `
    <div id="hello">
      Hello world
    </div>
  `

  let value = false
  const element = document.getElementById('hello')

  const dispatchEvent = (type, key) => {
    const event = new Event(type)
    
    event.key = key
    
    element.dispatchEvent(event)
  }

  const unregister = hotkeys(element, 'a', () => value = true)

  unregister()

  dispatchEvent('keydown', 'a')

  expect(value).toBe(false)
})
