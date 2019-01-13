import { copy, paste } from '../src'


// @ts-ignore
async function f () {
  const string = '中国，here，hello world，好的，哦哦'
  await copy(string)
  const p = await paste()
  console.log(`#${p}#`)
}


f().catch(e => console.error(e))
