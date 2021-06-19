import { Fraction } from '../types'

export default class Number implements Fraction {
  wholeNumber: number
  numerator: number
  denominator: number
  negative?: boolean
  rawValue: string
  doubleValue: number

  constructor({
    wholeNumber = 0,
    numerator,
    denominator,
    negative,
  }: {
    wholeNumber: number
    numerator: number
    denominator: number
    negative?: boolean
  }) {
    this.wholeNumber = Math.abs(wholeNumber)
    this.numerator = numerator
    this.denominator = denominator
    this.negative = negative
    this.doubleValue = (this.wholeNumber * this.denominator + this.numerator) / this.denominator

    this.extractWholePart()

    const gcd = Math.abs(this.findGCD(this.numerator, this.denominator))

    if (gcd > 1) {
      this.numerator /= gcd
      this.denominator /= gcd
    }

    this.rawValue = `${this.negative && this.doubleValue !== 0 ? '-' : ''}${this.wholeNumber === 0 && this.numerator === 0 ? '0' : ''}${
      this.wholeNumber !== 0 ? `${Math.abs(this.wholeNumber)}` : ''
    }${this.wholeNumber && this.numerator ? '_' : ''}${this.numerator ? `${Math.abs(this.numerator)}/${this.denominator}` : ''}`
  }

  extractWholePart() {
    if (Math.abs(this.numerator) >= Math.abs(this.denominator)) {
      this.wholeNumber += Math.floor(this.numerator / this.denominator)
      this.numerator = this.numerator % this.denominator
    }
  }

  static parse(rawInput: string) {
    let wholeNumber = 0
    let fraction = rawInput

    // this particular number is a whole integer
    if (!rawInput?.includes('_') && !rawInput?.includes('/')) {
      wholeNumber = Math.abs(parseInt(rawInput))
      return new Number({ wholeNumber: parseInt(rawInput), numerator: 0, denominator: 1, negative: rawInput[0] === '-' })
      // in this there are two parts of number => whole int and a fraction
    } else if (rawInput.includes('_')) {
      const [rawWholeNumber, rawFraction] = rawInput.split('_')
      wholeNumber = Math.abs(parseInt(rawWholeNumber))
      fraction = rawFraction
    }

    const [numerator, denominator] = fraction.split('/').map((num) => parseInt(num))

    return new Number({ wholeNumber, numerator, denominator, negative: rawInput[0] === '-' })
  }

  findGCD(x: number, y: number): number {
    if (!y) {
      return x
    }
    return this.findGCD(y, x % y)
  }

  toString() {
    this.extractWholePart()
    return this.rawValue
  }
}
