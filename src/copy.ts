import execa from 'execa'
import clipboardy from 'clipboardy'
import { ColorfulChalkLogger } from 'colorful-chalk-logger'


/**
 * @member logger         if specified, will logger some information in the process.
 */
export interface CopyOption {
  copyCommandPath?: string
  copyCommandArgs?: string[]
  logger?: ColorfulChalkLogger
}


/**
 * copy content to system clipboard.
 * @param content           the content you want to write into system clipboard.
 * @param option
 */
export async function copy(content: string, option: CopyOption) {
  const { logger, copyCommandPath, copyCommandArgs=[] } = option

  if (copyCommandPath != null) {
    // is windows or wsl, use clipboardy (as powershell Get-Clipboard will return messy code).
    if (logger != null) logger.debug(`[copy] try: ${copyCommandPath} ${copyCommandArgs.join(' ')}`)
    try {
      await execa(copyCommandPath, copyCommandArgs, { input: content })
      return
    } catch (error) {
      if (logger != null) logger.debug(error)
    }
  }

  if (logger != null) logger.debug('[copy] try: clipboardy')
  await clipboardy.write(content)
}
