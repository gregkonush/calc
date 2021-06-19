import { NodeValue, Operator, TreeNode } from '../types'
import Number from './number'

export default class Node implements TreeNode {
  value: NodeValue
  left?: TreeNode
  right?: TreeNode

  constructor(rawInput: string) {
    const { value, left, right } = this.parse(rawInput)
    this.value = value
    this.left = left
    this.right = right
  }

  parse(rawInput: string): { left?: Node; right?: Node; value: NodeValue } {
    const [leftOperand, operator, rightOperand] = rawInput.split(/ +/)

    if (!operator) {
      return { value: Number.parse(leftOperand) }
    }

    if (!['+', '-', '*', '/'].includes(operator)) {
      throw new Error('Invalid operator, only + - * / supported, make sure to have spaces around operands')
    }

    return {
      left: leftOperand ? new Node(leftOperand) : undefined,
      right: rightOperand ? new Node(rightOperand) : undefined,
      value: operator as Operator,
    }
  }
}
