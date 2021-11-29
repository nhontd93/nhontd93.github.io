import { Node } from './Node.js';
export class Sprite extends Node {
    constructor(path) {
        super();
        this._initView();
    }
    _initView(){
        this.view = document.createElement('img');
        this.view.hidden = true;
    }

    setImage(src){
        this.view.src = src;
    };
}