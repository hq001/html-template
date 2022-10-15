<p align="center">
  <img src="https://linkorg.club/www/html-template/logo.png" alt="html-template">
</p>

[![Build Status](https://travis-ci.com/Linkontoask/html-template.svg?branch=master)](https://travis-ci.com/Linkontoask/html-template)

# html-template

The simplest `html` template engine

## Installation

`npm install @linkorgs/html-template`

or

`yarn add @linkorgs/html-template`

## Usage

```javascript
import { Render } from "@linkorgs/html-template"                    // ESModule
// const { Render } = require("@linkorgs/html-template")            // commonjs 
const render = new Render()
render.render(`<div>{{ return null || '@linkorgs/html-template' }}</div>`)
// output: <div>@linkorgs/html-template</div>
```

`2.0.1` starts to support asynchronous syntax, the basic usage is as follows

```javascript
import { Render } from "@linkorgs/html-template"
const render = new Render({
  mini: true
})

void async function() {
  await render.render(`
    <div>
      {{
        return (async function() {
          return await Promise.resolve('@linkorgs/html-template')
        })();
      }}
    </div>
`)
  // output: <div>@linkorgs/html-template</div>
}()
```

## Documentation

Use **new Render (options?: object)** for initialization and return an instance of **Render**.

### options

+ `mini`: Whether to compress `html` content. As with the `minify` attribute of` html-webpack-plugin`, use `html-minifier` to compress HTML content. See [List](https://github.com/kangax/html-minifier#options-quick-reference) for optional values. The default values are as follows
```javascript
{
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true
}
```

Note: If the value of `mini` is` false`, nothing will be compressed. If it is `true`, the above default value will be used

### API

+ `set (html: string)`: set the template string to be rendered
+ `compiler (template?: string)`: Returns a prepared array of templates for the `render` function to compile
+ `render (template?: string)`: render template string and return

### Changelog

Detailed changes for each release are documented in the [release notes](CHANGELOG.md).

### LICENSE

[MIT](LICENSE)
