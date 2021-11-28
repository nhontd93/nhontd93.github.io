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
    initScoreBox() {
    this.initView();
    this.view = document.createElement("input");
    document.body.appendChild(this.view);
    this.view.readOnly = true;
    this.view.classList = "score";
    this.view.id = "score";
    this.view.style.border = "1px solid black";
    this.view.style.borderRadius = "10px";
    this.view.style.marginTop = "540px"; 
    this.view.style.fontSize = "30px";
    this.view.style.textAlign = "center";
    this.view.style.alignItems = "center";
    this.view.hidden = true;
    this.width = 300;
    this.height = 70;
    this.x = 170;
    this.y = 10;
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
    }
}