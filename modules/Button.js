import { Node } from './Node.js';
export class Button extends Node{
    constructor() {
        super();
        this._initView();
    }

    _initStyleElement(x, y, name) {
        this.view.style.position = 'absolute';
        this.width = 150;
        this.height = 50;
        this.view.style.fontSize = '20px';
        this.x = x;
        this.y = y;
        this.view.innerHTML = name;
    }
    _initView() {
        this.view = document.createElement('button');
    }
}