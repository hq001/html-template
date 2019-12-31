/**
 * 核心渲染类
 */
import { line, trim } from "./units"

type Script = string[] | string
interface Options {
  mini: boolean
}

export interface RenderType {
  set(html: string): void
  render(template?: string): string
}

export class Render implements RenderType{
  private html: string | undefined
  private options: Options

  constructor(
    options: Options = {
      mini: false
    }
  ) {
    this.options = options
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
          const grammar = new Function('return ' + tempScript.replace(line, ''))
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

    return this.options.mini ? output.replace(trim, '') : output
  }

}
