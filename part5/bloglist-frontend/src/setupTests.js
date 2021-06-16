import '@testing-library/jest-dom/extend-expect'

const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Please upgrade to at least react-dom/.test(args[0])
      || /Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: () => {
    savedItems = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })