import { Render } from '../lib'
import { expect } from 'chai'
import { trim } from "../lib/units"
import 'mocha'

describe('Render Class', () => {
  it('should return render html string', () => {
    const render = new Render()
    render.set(`
      <div>{{
        [1,2,3].map(item => '<h' + item + '>' + item + '</h' + item + '>').join('')
      }}</div>
    `)
    let html = render.render().replace(trim, '')
    expect(html).to.equal('<div><h1>1</h1><h2>2</h2><h3>3</h3></div>')
  });

  it('should render function return template', () => {
    const render = new Render()
    let html = render.render(`
      <div>{{
        [1,2,3].map(item => '<h' + item + '>' + item + '</h' + item + '>').join('')
      }}</div>
    `).replace(trim, '')
    expect(html).to.equal('<div><h1>1</h1><h2>2</h2><h3>3</h3></div>')
  })
});
