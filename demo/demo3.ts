import { ColorfulChalkLogger, DEBUG } from 'colorful-chalk-logger'
import { paste } from '../src'


const logger = new ColorfulChalkLogger('mini-copy', {
  colorful: true,
  date: true,
  inline: false,
  level: DEBUG,
})


// @ts-ignore
async function f () {
  const p = await paste({ logger })
  console.log(`#${p}#`)
}


f().catch(e => console.error(e))
