import { minify } from 'html-minifier';

const line = /(\n|\\s)/g;
const match = /{{(.+?)}}/g;
const translateCode = {
    '&gt;': '>',
    '&lt;': '<',
    '&nbsp;': ' ',
    '&amp;': '&',
    '&quot;': '"'
};
function isString(target) {
    return Object.prototype.toString.call(target) === '[object String]';
}
function isFunction(target) {
    return Object.prototype.toString.call(target) === '[object Function]';
}
function isBoolean(target) {
    return Object.prototype.toString.call(target) === '[object Boolean]';
}
function isObject(target) {
    return Object.prototype.toString.call(target) === '[object Object]';
}

/// <reference path="node.d.ts"/>
class Render {
    constructor(options = {
        mini: true
    }) {
        this.options = options;
    }
    set(html) {
        this.html = html;
    }
    output(html) {
        const { mini } = this.options;
        let option = {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        };
        if (isBoolean(mini) && !mini) {
            return html;
        }
        if (isObject(mini) && typeof mini === 'object') {
            option = mini;
        }
        return minify(html, option);
    }
    render(template) {
        const tp = template || this.html;
        const matchArray = this.compiler(tp);
        const placeholder = '!%';
        let output = '';
        let sync = false;
        let syncArray = [];
        for (let item of matchArray) {
            if (isString(item)) {
                output += item;
            }
            if (isFunction(item)) {
                try {
                    const cb = item();
                    if (cb instanceof Promise) {
                        sync = true;
                        syncArray.push(cb);
                        output += placeholder;
                    }
                    else {
                        output += cb;
                    }
                }
                catch (e) {
                }
            }
        }
        if (sync) {
            return Promise.all(syncArray).then(value => {
                let html = '';
                output.split(placeholder).forEach((item, index) => {
                    html += (item + (value[index] || ''));
                });
                return this.output(html);
            });
        }
        return this.output(output);
    }
    compiler(template) {
        if (typeof template === 'undefined') {
            console.warn('render function error: not find html template');
        }
        let matchArray = [];
        let matchString;
        let tp = template.replace(line, ' ');
        while ((matchString = match.exec(tp))) {
            const index = matchString.index;
            const script = matchString[1];
            const scriptBlock = matchString[0];
            const js = script.replace(/&(lt|gt|nbsp|amp|quot);/ig, (key) => translateCode[key]);
            index !== 0 && matchArray.push(tp.slice(0, index));
            try {
                matchArray.push(new Function(js));
            }
            catch (e) {
                console.error(js, e);
            }
            tp = tp.substring(index + scriptBlock.length);
            matchString = match.exec(tp);
        }
        matchArray.push(tp);
        return matchArray;
    }
}

export { Render };
//# sourceMappingURL=index.esm.js.map
