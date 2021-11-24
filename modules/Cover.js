import { Node } from "./Node.js";
export class Cover extends Node {
    constructor() {
        super();
    }
    initStyle(){
        // this.view.style.backgroundColor = "orange";
        // this.view.style.position = "absolute";
        // this.view.style.display = "flex";
        // this.view.style.display = "block";
    
        // this.view.style.border = "1px solid black";
        // this.view.classList = 'cover';

        // this.view.style.backgroundColor = "orange";
        this.view.style.position = "absolute";
        this.view.style.display = "flex";
        this.view.style.flexWrap = "nowrap";
        this.view.style.alignContent = "center";
        this.view.style.justifyContent = "center";
        this.view.style.alignItems = "center";
        this.view.style.border = "1px solid black";
        this.view.classList = 'cover';

    }
    
}