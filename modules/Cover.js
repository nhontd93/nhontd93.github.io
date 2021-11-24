import { Node } from "./Node.js";
export class Cover extends Node {
    constructor() {
        super();
    }
    initStyle(){
        this.view.style.position = "absolute";
        this.view.style.display = "flex";
        this.view.style.flexWrap = "nowrap";
        this.view.style.alignContent = "center";
        this.view.style.justifyContent = "center";
        this.view.style.alignItems = "center";
        this.view.classList = 'cover';
    }
    
}