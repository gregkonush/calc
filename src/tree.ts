import { SyntaxTree, TreeNode } from '../types'
import Node from './node'
import Number from './number'

export default class Tree implements SyntaxTree {
  rawInput: string
  root: TreeNode

  constructor(rawInput: string) {
    this.rawInput = rawInput
    this.root = this.parse(rawInput)
  }

  parse(rawInput: string): TreeNode {
    return new Node(rawInput)
  }

  calculate() {
    switch (this.root.value) {
      case '+':
        process.stdout.write('= ')
        console.log(this.addition().toString())
        break
      case '-':
        process.stdout.write('= ')
        console.log(this.subtraction().toString())
        break
      case '*':
        process.stdout.write('= ')
        console.log(this.multiplication().toString())
        break
      case '/':
        process.stdout.write('= ')
        console.log(this.division().toString())
        break
      default:
        return
    }
  }

  addition(): Number {
    const left = this.root.left?.value as Number
    const right = this.root.right?.value as Number
    if (right.negative) {
      return this.subtraction()
    }

    if (left.numerator === 0) {
      return new Number({
        wholeNumber: right.wholeNumber,
        numerator: left.wholeNumber * right.denominator + left.numerator * right.denominator + right.numerator * left.denominator,
        denominator: left.denominator * right.denominator,
      })
    }

    if (left.denominator === right.denominator) {
      return new Number({
        wholeNumber: left.wholeNumber + right.wholeNumber,
        numerator: left.numerator + right.numerator,
        denominator: left.denominator,
      })
    }

    return new Number({
      wholeNumber: 0,
      numerator:
        (left.wholeNumber * left.denominator + left.numerator) * right.denominator +
        (right.wholeNumber * right.denominator + right.numerator) * left.denominator,
      denominator: left.denominator * right.denominator,
    })
  }

  subtraction() {
    const left = this.root.left?.value as Number
    const right = this.root.right?.value as Number

    if (left.wholeNumber === 0 && left.numerator === 0) {
      return new Number({ ...right, negative: true })
    }

    return new Number({
      wholeNumber: 0,
      numerator:
        (left.wholeNumber * left.denominator + left.numerator) * right.denominator -
        (right.wholeNumber * right.denominator + right.numerator) * left.denominator,
      denominator: left.denominator * right.denominator,
      negative: right.doubleValue > left.doubleValue,
    })
  }

  multiplication() {
    const left = this.root.left?.value as Number
    const right = this.root.right?.value as Number
    return new Number({
      wholeNumber: 0,
      numerator: (left.wholeNumber * left.denominator + left.numerator) * (right.wholeNumber * right.denominator + right.numerator),
      denominator: left.denominator * right.denominator,
      negative: left.negative !== right.negative,
    })
  }

  division() {
    const left = this.root.left?.value as Number
    const { wholeNumber, numerator, denominator, negative } = this.root.right?.value as Number

    if (wholeNumber === 0 && numerator === 0) {
      return left.negative ? '-∞' : '∞'
    }

    const flipRightFraction = new Number({
      wholeNumber: 0,
      numerator: denominator,
      denominator: numerator + wholeNumber * denominator,
      negative,
    })

    return new Number({
      wholeNumber: 0,
      numerator:
        (left.wholeNumber * left.denominator + left.numerator) *
        (flipRightFraction.wholeNumber * flipRightFraction.denominator + flipRightFraction.numerator),
      denominator: left.denominator * flipRightFraction.denominator,
      negative: left.negative !== flipRightFraction.negative,
    })
  }
}
