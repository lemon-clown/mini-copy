import clipboardy from 'clipboardy'
import { ColorfulChalkLogger } from 'colorful-chalk-logger'
const wcp = require('clipboardy/lib/windows.js')


/*
 * @member lineSeparator    the system's line separator
 * @member logger           if specified, will logger some information in the process.
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
    // is windows or wsl, use clipboardy (as powershell Get-Clipboard will return messy code).
    if (logger != null) logger.debug(`[paste] try: clipboardy/lib/windows.js`)
    try {
      const content: string = wcp.pasteSync({stripEof: false}).stdout
      return processContent(content, lineSeparator)
    } catch (error) {
      if (logger != null) logger.debug(error)
    }
  }

  if (logger != null) logger.debug('[paste] try: clipboardy')
  const content: string = clipboardy.readSync()
  return processContent(content, lineSeparator)
}
