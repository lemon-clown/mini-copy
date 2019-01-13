import { ColorfulChalkLogger, DEBUG } from 'colorful-chalk-logger'
import { copy, paste } from '../src'


const logger = new ColorfulChalkLogger('mini-copy', {
  colorful: true,
  date: true,
  inline: false,
  level: DEBUG,
})


// @ts-ignore
async function f () {
  const string = '中国，here，hello world，好的，哦哦\n'
  await copy(string, { logger })
  const p = await paste({ logger })
  console.log(`#${p}#`)
}


f().catch(e => console.error(e))
