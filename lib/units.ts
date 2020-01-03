
export const line: RegExp = /(\n|\\s)/g

export const trim: RegExp = /(\s|\n|\\s)/g

export const match: RegExp = /{{(.+?)}}/g

export const map: string[] = [
  '[object Array]',
  '[object Object]',
  '[object String]',
  '[object Boolean]',
  '[object Function]',
  '[object Number]',
  '[object Date]',
  '[object RegExp]'
]

export function isString(target: any): boolean {
  return Object.prototype.toString.call(target) === '[object String]'
}

export function isFunction(target: any): boolean {
  return Object.prototype.toString.call(target) === '[object Function]'
}
