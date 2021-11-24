import { Node } from "./Node.js";
export class Label extends Node {

    constructor(string) {
        super();
        this._string = string || "";
        this.string = this._string;
        this.initStyle();
    }
    initStyle(){
        this.view.classList = 'number';
    }
    get string() {
        return this._string;
    }

    set string(value) {
        this._string = value;
        this.view.innerHTML = this._string;
        this.view.style.fontSize = "31px";
        this.view.style.width = "100%";
        this.view.style.height = '100%';
        this.view.style.display = 'flex';
        this.view.style.justifyContent = 'center';
        this.view.style.alignItems = 'center';
        this.view.style.backgroundColor = 'orange';
        this.view.hidden = true;
    }
}