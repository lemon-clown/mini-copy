import clipboardy from 'clipboardy'
import { ColorfulChalkLogger } from 'colorful-chalk-logger'
const wcp = require('clipboardy/lib/windows.js')


/**
 * @member logger         if specified, will logger some information in the process.
 */
export interface CopyOption {
  logger?: ColorfulChalkLogger
}


/**
 * copy content to system clipboard.
 * @param copyCommandPath   the path of clip.exe (in windows)
 * @param content           the content you want to write into system clipboard.
 * @param option
 */
export async function copy(copyCommandPath: string, content: string, option: CopyOption) {
  const { logger } = option

  if (copyCommandPath != null) {
    // is windows or wsl, use clipboardy (as powershell Get-Clipboard will return messy code).
    if (logger != null) logger.debug(`[copy] try: clipboardy/lib/windows.js`)
    try {
      wcp.copySync({ input: content })
      return
    } catch (error) {
      if (logger != null) logger.debug(error)
    }
  }

  if (logger != null) logger.debug('[copy] try: clipboardy')
  clipboardy.writeSync(content)
}
