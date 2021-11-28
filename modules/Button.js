import { Node } from "./Node.js";
export class Button extends Node{
    constructor() {
        super();
        this._initView();
    }

    _initStyleElement(obj) {
        this.view.style.position = obj.position;
        this.width = obj.width;
        this.height = obj.height;
        this.view.style.fontSize = obj.fontSize;
        this.x = obj.x;
        this.y = obj.y;
        this.view.innerHTML = obj.name;
    }
    _initView() {
        this.view = document.createElement("button");
    }
}