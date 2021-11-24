import { Node } from "./Node.js";
export class Sprite extends Node {
    constructor(path) {
        super();
        this.initView();
    }
    initView(){
        this.view = document.createElement('img');
        this.view.hidden = true;
        // this.view.style.display = "none";
    }

    setImage(src){
        this.view.src = src;
    };
}