import clipboardy from 'clipboardy'
import { exec } from 'child_process'
import { ColorfulChalkLogger } from 'colorful-chalk-logger'


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
    const cmd = `${ copyCommandPath }`
    if (logger != null) logger.debug(`try: ${ cmd }`)
    try {
      await new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
          if (error != null) return reject(error)
          if (stderr != null && stderr != '') return reject(stderr)
          resolve(stdout)
        })
          .stdin
          .end(content)
      })
      return
    } catch (error) {
      if (logger != null) logger.debug(error)
    }
  }

  if (logger != null) logger.debug('try: clipboardy')
  clipboardy.writeSync(content)
}
