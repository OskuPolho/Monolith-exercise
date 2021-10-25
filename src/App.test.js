
import {
  checkIfDateIsValid,
  checkIfNum,
  validateDataPoint,
  calculateBalance,
  mockData
} from './functions'

test('check if string is number', () => {
  expect(checkIfNum('abc')).toBe(false)
})

test('check if datestring is valid', () => {
  expect(checkIfDateIsValid('12-12-2012')).toBeFalsy()
})

test('check if object has all required properties', () => {
  expect(validateDataPoint({
    user_id: 132412,
    timestamp: '2020-12-10'
  })).toBeFalsy()
})

test('check if calculateBalance works correctly', () => {
  expect(calculateBalance(mockData, 'EUR')).toBe(100)
  expect(calculateBalance(mockData, 'GBP')).toBe(150)
})
