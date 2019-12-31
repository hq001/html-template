/**
 * 核心渲染类
 */
import { trim } from "./units"

type Script = string[] | string

export interface RenderType {
  set(html: string): void
  render(template?: string): string
}

export class Render implements RenderType{
  private html: string | undefined
  private option: Object | undefined

  constructor(option?: Object) {
    this.option = option
  }

  set(html: string) {
    this.html = html
  }

  render(template?: string): string {
    const html = template || this.html

    if (typeof html === 'undefined') {
      console.warn('render function error: not find html template')
      return ''
    }
    let output: string = ''
    let startScript: boolean = false
    let tempScript: Script = ''
    for (let i = 0, len = html.length; i < len; i++) {
      const item = html[i], itemNext = html[i + 1]
      if (item === '{' && itemNext === '{') {
        startScript = true
        ++i
      } else if (item === '}' && itemNext === '}') {
        startScript = false
        ++i
        try {
          const grammar = new Function('return ' + tempScript.replace(trim, ''))
          output += grammar()
        } catch (e) {
          console.error(e)
        } finally {
          tempScript = ''
        }
      } else if (startScript) {
        tempScript += item
      } else {
        output += item
      }
    }

    return output
  }

}
