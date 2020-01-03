import { RenderType } from "./lib/render"

export declare class Render implements RenderType{
  constructor(option?: object)
  set(html: string): void
  render(template?: string): string
  compiler(template: string): any[]
}
