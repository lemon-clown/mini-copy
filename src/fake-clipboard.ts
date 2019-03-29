import fs from 'fs-extra'
import { ColorfulChalkLogger } from 'colorful-chalk-logger'


function checkfakeClipboardValid(fakeClipboard: string, logger?: ColorfulChalkLogger): boolean {
  if (!fs.existsSync(fakeClipboard)) {
    if (logger != null) logger.debug(`[copy] ${fakeClipboard} is not exists`)
    return false
  }

  if (!fs.statSync(fakeClipboard).isFile()) {
    if (logger != null) logger.debug(`[copy] ${fakeClipboard} is not exists`)
    return false
  }

  return true
}


/**
 * write the content to fake-clipboard
 * @param content
 * @param fakeClipboard
 * @param logger
 */
export async function write(content: string, fakeClipboard: string, logger?: ColorfulChalkLogger) {
  if (!checkfakeClipboardValid(fakeClipboard, logger)) return
  await fs.writeFile(fakeClipboard, content, 'UTF-8')
}


/**
 * read content from fake-clipboard
 * @param fakeClipboard
 * @param logger
 */
export async function read(fakeClipboard: string, logger?: ColorfulChalkLogger): Promise<string> {
  if (!checkfakeClipboardValid(fakeClipboard, logger)) return ''
  return await fs.readFile(fakeClipboard, 'UTF-8')
}
