
import {checkIfDateIsValid, checkIfNum, validateDataPoint} from './functions'

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
