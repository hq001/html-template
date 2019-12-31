/**
 * 核心渲染类
 */
import { trim } from "./units"

type Script = string[] | string

class Render {
  private html: string | undefined
  private option: Object | undefined

  constructor(option: Object | undefined) {
    this.option = option
  }

  set(html: string) {
    this.html = html
  }

  render(): string | void {
    const html = this.html

    if (typeof html === 'undefined') {
      return console.warn('render function error: not find html template')
    }
    let output: string = ''
    let startScript: boolean = false
    let tempScript: Script = ''
    for (let i = 0, len = html.length; i < len; i++) {
      const item = html[i], itemNext = html[i + 1]
      if (item === '{' && itemNext === '{') {
        startScript = true
      }
      if (item === '}' && itemNext === '}') {
        startScript = false
        try {
          const grammar = new Function('return ' + tempScript.replace(trim, ''))
          output += grammar()
        } catch (e) {
          console.error(e)
        } finally {
          tempScript = ''
        }
      }
      if (item === '{' || item === '}') {

      } else if (startScript) {
        tempScript += item
      } else if (item !== '{' && item !== '}') {
        output += item
      }
    }

    return output
  }

}

export default Render
