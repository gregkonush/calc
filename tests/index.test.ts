import Number from '../src/number'
import Tree from '../src/tree'

describe('numbers', () => {
  it('parses number from constructor', () => {
    const number = new Number({ wholeNumber: 1, numerator: 1, denominator: 3 })
    expect(number.rawValue).toEqual('1_1/3')
  })

  it('parses number from helper method', () => {
    const number = Number.parse('1_2/3')
    expect(number.rawValue).toEqual('1_2/3')
    expect(number.wholeNumber).toEqual(1)
    expect(number.numerator).toEqual(2)
    expect(number.denominator).toEqual(3)
  })

  it('parses improper fractions', () => {
    const number = Number.parse('12/5')
    expect(number.rawValue).toEqual('2_2/5')
  })

  it('parses whole numbers', () => {
    const number = Number.parse('4')
    expect(number.rawValue).toEqual('4')
  })

  it('parses negative integers', () => {
    const number = Number.parse('-4')
    expect(number).toEqual({ denominator: 1, numerator: 0, wholeNumber: 4, rawValue: '-4', negative: true, doubleValue: 4 })
  })

  it('parses negative mixed fractions', () => {
    const number = Number.parse('-3_1/2')
    expect(number).toEqual({ negative: true, wholeNumber: 3, numerator: 1, denominator: 2, rawValue: '-3_1/2', doubleValue: 3.5 })
  })

  it('parses negative improper fractions', () => {
    const number = Number.parse('-10_7/5')
    expect(number).toEqual({ negative: true, wholeNumber: 11, numerator: 2, denominator: 5, rawValue: '-11_2/5', doubleValue: 11.4 })
  })
})

describe('operations', () => {
  it('adds to fractions', () => {
    const add = (tree: Tree) => tree.addition().toString()
    expect(add(new Tree('1/2 + 3/4'))).toEqual('1_1/4')
    expect(add(new Tree('1/2 + 5/4'))).toEqual('1_3/4')
    expect(add(new Tree('3/2 + 4/5'))).toEqual('2_3/10')
    expect(add(new Tree('1 + 3'))).toEqual('4')
    expect(add(new Tree('0 + 3'))).toEqual('3')
    expect(add(new Tree('5 + 0'))).toEqual('5')
    expect(add(new Tree('1_1/2 + 3/5'))).toEqual('2_1/10')
    expect(add(new Tree('5/7 + 2_3/5'))).toEqual('3_11/35')
    expect(add(new Tree('1/4 + 1/4'))).toEqual('1/2')
    expect(add(new Tree('3 + 1/4'))).toEqual('3_1/4')
    expect(add(new Tree('1/3 + 3_1/4'))).toEqual('3_7/12')
    expect(add(new Tree('1/3 + 5'))).toEqual('5_1/3')
    expect(add(new Tree('4_1/5 + 12_3/5'))).toEqual('16_4/5')
    expect(add(new Tree('250 + 300_1/2'))).toEqual('550_1/2')
    expect(add(new Tree('0 + 1'))).toEqual('1')
    expect(add(new Tree('3 + 0'))).toEqual('3')
    expect(add(new Tree('0 + 0'))).toEqual('0')
    expect(add(new Tree('3_3/1 + 4_4/2'))).toEqual('12')
    expect(add(new Tree('-1/2 + 1/2'))).toEqual('0')
    expect(add(new Tree('-1/2 + -3_1/2'))).toEqual('-4')
    expect(add(new Tree('4_7/3 + -5_13/7'))).toEqual('-11/21')
  })

  it('subtracts correctly', () => {
    const subtract = (tree: Tree) => tree.subtraction().toString()
    expect(subtract(new Tree('1/2 - 1/4'))).toEqual('1/4')
    expect(subtract(new Tree('3 - 1/4'))).toEqual('2_3/4')
    expect(subtract(new Tree('5/7 - 1'))).toEqual('-2/7')
    expect(subtract(new Tree('3_1/2 - 1'))).toEqual('2_1/2')
    expect(subtract(new Tree('120 - 100'))).toEqual('20')
    expect(subtract(new Tree('120 - 120'))).toEqual('0')
    expect(subtract(new Tree('0 - 0'))).toEqual('0')
    expect(subtract(new Tree('120 - 121'))).toEqual('-1')
    expect(subtract(new Tree('1 - 1_1/2'))).toEqual('-1/2')
    expect(subtract(new Tree('9/3 - 8/3'))).toEqual('1/3')
    expect(subtract(new Tree('3_9/3 - 8/3'))).toEqual('3_1/3')
    expect(subtract(new Tree('3_9/3 - 4_8/3'))).toEqual('-2/3')
    expect(subtract(new Tree('0 - 3_1/2'))).toEqual('-3_1/2')
    expect(subtract(new Tree('3_5/2 - 0'))).toEqual('5_1/2')
  })

  it('multiples correctly', () => {
    const multiply = (tree: Tree) => tree.multiplication().toString()
    expect(multiply(new Tree('1 * 1'))).toEqual('1')
    expect(multiply(new Tree('1 * 1/2'))).toEqual('1/2')
    expect(multiply(new Tree('1/3 * 3'))).toEqual('1')
    expect(multiply(new Tree('3/8 * 1/4'))).toEqual('3/32')
    expect(multiply(new Tree('3_1/2 * 1/2'))).toEqual('1_3/4')
    expect(multiply(new Tree('3/4 * 1_1/2'))).toEqual('1_1/8')
    expect(multiply(new Tree('3_1/2 * 2_1/2'))).toEqual('8_3/4')
    expect(multiply(new Tree('7/5 * 2'))).toEqual('2_4/5')
    expect(multiply(new Tree('3 * 6/2'))).toEqual('9')
    expect(multiply(new Tree('3_4/1 * 5_32/2'))).toEqual('147')
    expect(multiply(new Tree('0 * 3/2'))).toEqual('0')
    expect(multiply(new Tree('4_12/3 * 0'))).toEqual('0')
    expect(multiply(new Tree('-1/2 * 1'))).toEqual('-1/2')
    expect(multiply(new Tree('-1 * -1'))).toEqual('1')
  })

  it('divides correctly', () => {
    const divide = (tree: Tree) => tree.division().toString()
    expect(divide(new Tree('1/3 / 1/2'))).toEqual('2/3')
    expect(divide(new Tree('1_2/3 / 1/3'))).toEqual('5')
    expect(divide(new Tree('3_1/2 / 1/2'))).toEqual('7')
    expect(divide(new Tree('1/2 / 3_1/2'))).toEqual('1/7')
    expect(divide(new Tree('8/2 / 3/1'))).toEqual('1_1/3')
    expect(divide(new Tree('1_5/2 / 1/4'))).toEqual('14')
    expect(divide(new Tree('2_5/3 / 3_4/3'))).toEqual('11/13')
    expect(divide(new Tree('-3_4/3 / 5_7/5'))).toEqual('-65/96')
    expect(divide(new Tree('-3_4/3 / -4_5/2'))).toEqual('2/3')
    expect(divide(new Tree('3/2 / 0'))).toEqual('∞')
  })
})
