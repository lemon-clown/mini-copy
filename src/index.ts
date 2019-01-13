import fs from 'fs-extra'
import { CopyOption, copy as realCopy } from './copy'
import { PasteOption, paste as realPaste } from './paste'


interface CommandItem {
  path: string
  args?: string[]
}


const defaultCopyCommandItem: CommandItem = [
  { path: '/mnt/c/Windows/System32/clip.exe' },
  { path: '/c/Windows/System32/clip.exe' },
  { path: 'C:\\Windows\\System32\\clip.exe' },
].filter(p => fs.existsSync(p.path))[0]


const defaultPasteCommandItem: CommandItem = [
  { path: '/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe', args: [ '-Command', 'Get-Clipboard'] },
  { path: '/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe', args: [ '-Command', 'Get-Clipboard'] },
  { path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe', args: [ '-Command', 'Get-Clipboard'] },
].filter(p => fs.existsSync(p.path))[0]


const defaultLineSeparator: string = (() => {
  switch (process.platform) {
    case 'win32': return '\r\n'
    default: return '\n'
  }
})()


/**
 * copy content to system clipboard.
 * @param content           the content you want to write into system clipboard.
 * @param option
 * @param copyCommandItem
 */
export const copy = async (content: string,
                           option: Partial<CopyOption> = {},
                           copyCommandItem?: CommandItem) => {
  if (copyCommandItem == null) {
    option.copyCommandPath = defaultCopyCommandItem.path
    option.copyCommandArgs = defaultCopyCommandItem.args || []
  } else {
    option.copyCommandPath = copyCommandItem.path
    option.copyCommandArgs = copyCommandItem.args || []
  }
  return realCopy(content, option)
}


/**
 * get the data from system clipboard
 * @param option
 * @param pasteCommandItem
 */
export const paste = async (option: Partial<PasteOption> = {}, pasteCommandItem?: CommandItem) => {
  if (pasteCommandItem == null) {
    option.pasteCommandPath = defaultPasteCommandItem.path
    option.pasteCommandArgs = defaultPasteCommandItem.args || []
  } else {
    option.pasteCommandPath = pasteCommandItem.path
    option.pasteCommandArgs = pasteCommandItem.args || []
  }
  if (option.lineSeparator == null) option.lineSeparator = defaultLineSeparator
  return realPaste(option as PasteOption)
}
