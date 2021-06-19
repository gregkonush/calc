export type Operator = '*' | '+' | '-' | '/'

export interface Fraction {
  wholeNumber: number
  numerator: number
  denominator: number
  rawValue?: string
}

export type NodeValue = Fraction | Operator

export interface TreeNode {
  value: NodeValue
  left?: TreeNode
  right?: TreeNode
}

export interface SyntaxTree {
  rawInput: string
  root: TreeNode
  parse: (rawInput: string) => TreeNode
  calculate: () => void
  result?: string
}
