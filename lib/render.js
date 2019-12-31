"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 核心渲染类
 */
const units_1 = require("./units");
class Render {
    constructor(option) {
        this.option = option;
    }
    set(html) {
        this.html = html;
    }
    render(template) {
        const html = template || this.html;
        if (typeof html === 'undefined') {
            console.warn('render function error: not find html template');
            return '';
        }
        let output = '';
        let startScript = false;
        let tempScript = '';
        for (let i = 0, len = html.length; i < len; i++) {
            const item = html[i], itemNext = html[i + 1];
            if (item === '{' && itemNext === '{') {
                startScript = true;
            }
            if (item === '}' && itemNext === '}') {
                startScript = false;
                try {
                    const grammar = new Function('return ' + tempScript.replace(units_1.trim, ''));
                    output += grammar();
                }
                catch (e) {
                    console.error(e);
                }
                finally {
                    tempScript = '';
                }
            }
            if (item === '{' || item === '}') {
            }
            else if (startScript) {
                tempScript += item;
            }
            else if (item !== '{' && item !== '}') {
                output += item;
            }
        }
        return output;
    }
}
exports.Render = Render;
