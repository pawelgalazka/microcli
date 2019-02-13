import cliArgs from '@pawelgalazka/cli-args'

import { CLICommandNotFound, CLIIllegalOption } from './errors'
import { CommandsTreeNode, interpret } from './interpreter'
import { Logger } from './logger'

export { help } from './helper'

export function cli(node: CommandsTreeNode) {
  const logger = new Logger()
  try {
    const { params, options } = cliArgs(process.argv.slice(2))
    const namespace = process.argv[1]

    interpret({ options, params, node, logger, namespace })
  } catch (error) {
    if (
      error instanceof CLICommandNotFound ||
      error instanceof CLIIllegalOption
    ) {
      logger.error(error.message)
      process.exit(1)
    } else {
      logger.log(error)
      process.exit(1)
    }
  }
}
