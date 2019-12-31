import Render from '../lib/render';
import { expect } from 'chai';
import { trim } from "../lib/units"
import 'mocha';

describe('Render Class', () => {
  it('should return render html string', () => {
    const render = new Render({})
    render.set(`
      <div>{{
        [1,2,3].map(item => '<h' + item + '>' + item + '</h' + item + '>').join('')
      }}</div>
    `)
    let html = render.render()
    if (typeof html === 'undefined') {
      return
    } else {
      html = html.replace(trim, '')
    }
    expect(html).to.equal('<div><h1>1</h1><h2>2</h2><h3>3</h3></div>');
  });
});

