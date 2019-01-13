`mini-copy` based on [clipboardy](https://www.npmjs.com/package/clipboardy), and it support sharing the clipboard with windows and wsl.
But sometimes there has some messy code problem when use both the terminal of wsl and windows (for example, copy content from cmd.exe, and run demo3 in windows terminal), to solve this problem, you could try copy the `node_modules/clipboardy/fallbacks/windows/clipboard_*.exe`(depends on your machine's architecture) to `/mnt/<d|e|f|g>/clipboard.exe`.


# install

```
npm install mini-copy // npm
yarn add mini-copy    // yarn
```

# usage

## demo1
```typescript
// demo1
import { copy, paste } from 'mini-copy'


// @ts-ignore
async function f () {
  const string = '中国，here，hello world，好的，哦哦'
  await copy(string)
  const p = await paste()
  console.log(`#${p}#`)
}


f().catch(e => console.error(e))
```

## demo2
```
import { ColorfulChalkLogger, DEBUG } from 'colorful-chalk-logger'
import { copy, paste } from 'mini-copy'


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
```
