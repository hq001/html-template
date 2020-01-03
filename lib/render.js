"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Core rendering class
 * Belong to @Link
 */
const units_1 = require("./units");
class Render {
    constructor(options = {
        mini: false
    }) {
        this.options = options;
    }
    set(html) {
        this.html = html;
    }
    output(html) {
        const { mini } = this.options;
        return mini ? html.replace(units_1.trim, '') : html;
    }
    render(template) {
        const tp = template || this.html;
        if (typeof tp === 'undefined') {
            return '';
        }
        const matchArray = this.compiler(tp);
        const placeholder = '!%';
        let output = '';
        let sync = false;
        let syncArray = [];
        for (let item of matchArray) {
            if (units_1.isString(item)) {
                output += item;
            }
            if (units_1.isFunction(item)) {
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
        let tp = template.replace(units_1.line, ' ');
        while ((matchString = units_1.match.exec(tp))) {
            const index = matchString.index;
            const script = matchString[1];
            const scriptBlock = matchString[0];
            index !== 0 && matchArray.push(tp.slice(0, index));
            matchArray.push(new Function(script));
            tp = tp.substring(index + scriptBlock.length);
            matchString = units_1.match.exec(tp);
        }
        matchArray.push(tp);
        return matchArray;
    }
}
exports.Render = Render;
