import execa from 'execa'
import clipboardy from 'clipboardy'
import { ColorfulChalkLogger } from 'colorful-chalk-logger'
import { read } from './fake-clipboard'


/*
 * @member lineSeparator      the system's line separator
 * @member pasteCommandPath   the path where the system call is located
 * @member pasteCommandArgs   the arguments of the command
 * @member logger             if specified, will logger some information in the process.
 */
export interface PasteOption {
  lineSeparator: string
  pasteCommandPath?: string
  pasteCommandArgs?: string[]
  fakeClipboard?: string
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
 * @param option
 */
export async function paste( option: PasteOption): Promise<string> {
  const { logger, lineSeparator, pasteCommandPath, pasteCommandArgs=[], fakeClipboard } = option

  if (pasteCommandPath != null) {
    // is windows or wsl, use clipboardy (as powershell Get-Clipboard will return messy code).
    if (logger != null) logger.debug(`[paste] try: ${pasteCommandPath} ${pasteCommandArgs.join(' ')}`)
    try {
      let content: string = await execa.stdout(pasteCommandPath, pasteCommandArgs, { stripEof: false })
      if (/powershell/.test(pasteCommandPath)) content = content.replace(/^([^]*?)(?:\r\n|\n\r|[\n\r])$/, '$1')
      return processContent(content, lineSeparator)
    } catch (error) {
      if (logger != null) logger.debug(error)
    }
  }

  try {
    if (logger != null) logger.debug('[paste] try: clipboardy')
    const content: string = await clipboardy.read()
    return processContent(content, lineSeparator)
  } catch (error) {
    if (logger != null) logger.debug(error)
  }

  if (fakeClipboard == null) return ''
  return await read(fakeClipboard, logger)
}
