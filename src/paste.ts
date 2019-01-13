import clipboardy from 'clipboardy'
import { exec } from 'child_process'
import { ColorfulChalkLogger } from 'colorful-chalk-logger'

/*
 * @member  lineSeparator     the system's line separator
 * @member logger         if specified, will logger some information in the process.
 */
export interface PasteOption {
  lineSeparator: string
  logger?: ColorfulChalkLogger
}


/**
 * process the data from system clipboard
 * @param content         the content from system clipboard
 * @param lineSeparator   the system's line separator
 */
function processContent(content: string, lineSeparator: string): string {
  if (content == null) content = ''
  content = content.replace(/\r\n|\r|\n/g, lineSeparator)
  return content
}


/**
 * get the data from system clipboard
 * @param pasteCommandPath  the path where the system call is located
 * @param option
 */
export async function paste(pasteCommandPath: string,
                            option: PasteOption): Promise<string> {
  const { logger, lineSeparator } = option

  if (pasteCommandPath != null) {
    const cmd = `${ pasteCommandPath } -Command Get-Clipboard`
    if (logger != null) logger.debug(`try: ${ cmd }`)
    try {
      let content: string | any = await new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
          if (error != null) return reject(error)
          if (stderr != null && stderr != '') return reject(stderr)
          resolve(stdout.replace(/^([^]*?)(?:\r\n|\n\r|[\n\r])$/, '$1'))
        })
      })
      return processContent(content, lineSeparator)
    } catch (error) {
      if (logger != null) logger.debug(error)
    }
  }
  const content: string = clipboardy.readSync()
  return processContent(content, lineSeparator)
}
