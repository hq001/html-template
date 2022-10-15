import { Render } from '../lib'
import { expect } from 'chai'
import 'mocha'

describe('Render Class', () => {
  it('should return render html string', () => {
    const render = new Render()
    render.set(`
      <div>{{
        return [1,2,3].map(item => '<h' + item + '>' + item + '</h' + item + '>').join('')
      }}</div>
    `)
    let html = render.render()
    expect(html).to.equal('<div><h1>1</h1><h2>2</h2><h3>3</h3></div>')
  });

  it('should render function return template', () => {
    const render = new Render()
    let html = render.render(`
      <div>{{
        return [1,2,3].map(item => '<h' + item + '>' + item + '</h' + item + '>').join('')
      }}</div>
    `)
    expect(html).to.equal('<div><h1>1</h1><h2>2</h2><h3>3</h3></div>')
  })

  it('should render "{" or "}"', () => {
    const render = new Render()
    const html = render.render(`<div>{{ return null || '{@linkorgs/html-template}' }}</div>`)
    expect(html).to.equal('<div>{@linkorgs/html-template}</div>')
    let html1 = render.render(`<div>{{   
      return [1,2].map(item => {
        return item
      }).join('')       
    }}</div>`)
    expect(html1).to.equal('<div>12</div>')
  })

  it('should support translate "<" ">" "&" """ ', () => {
    const render = new Render({mini: false})
    const html = render.render(`<div>{{ return null || '><&"' }}</div>`)
    expect(html).to.equal('<div>><&"</div>')
  })

  it('should options mini', () => {
    const render = new Render({
      mini: true
    })
    const html = render.render(`
    
      <div>
      
      {{ return 0 | 1 }}{{ return 2 }}
      
      </div><div>2</div>
    
    `)

    expect(html).to.equal('<div>12</div><div>2</div>')
  })

  it('should be asynchronous syntax', async () => {
    const render = new Render({
      mini: true
    })
    const html = await render.render(`
    
      <div>
      {{ 
        return (async function() {
          return await Promise.resolve(1)
        })();
      }}
      </div>
    
    `)

    expect(html).to.equal('<div>1</div>')
  })
});

