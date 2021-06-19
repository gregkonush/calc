import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import Tree from './tree'

class CalculatorCLI extends Command {
  async run() {
    const rawInput = await cli.prompt('calc', { prompt: 'calc > ' })
    try {
      const tree = new Tree(rawInput)
      tree.calculate()
      this.run()
    } catch (error) {
      this.log(error.message)
      this.run()
    }
  }
}

export = CalculatorCLI
