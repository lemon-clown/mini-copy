import fs from 'fs-extra'
import { CopyOption, copy as realCopy } from './copy'
import { PasteOption, paste as realPaste } from './paste'


const defaultCopyCommandPath: string = [
  '/mnt/c/Windows/System32/clip.exe',
  '/c/Windows/System32/clip.exe',
  'C:\\Windows\\System32\\clip.exe',
].filter(p => fs.existsSync(p))[0]


const defaultPasteCommandPath: string = [
  '/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe',
  '/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe',
  'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
].filter(p => fs.existsSync(p))[0]


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
 * @param copyCommandPath   the path of clip.exe (in windows)
 */
export const copy = async (content: string, option: Partial<CopyOption> = {}, copyCommandPath?: string) => {
  if (copyCommandPath == null) copyCommandPath = defaultCopyCommandPath
  return realCopy(copyCommandPath, content, option)
}


/**
 * get the data from system clipboard
 * @param pasteCommandPath  the path where the system call is located
 * @param option
 */
export const paste = async (option: Partial<PasteOption> = {}, pasteCommandPath?: string) => {
  if (pasteCommandPath == null) pasteCommandPath = defaultPasteCommandPath
  if (option.lineSeparator == null) option.lineSeparator = defaultLineSeparator
  return realPaste(pasteCommandPath, option as PasteOption)
}
