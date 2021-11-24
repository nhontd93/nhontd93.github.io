import { Node } from "./modules/Node.js";
import { Cover } from "./modules/Cover.js";
import { Label } from "./modules/Label.js";
import { Sprite } from "./modules/Sprite.js";

class Game extends Node {
    constructor(){
        super();
        
    }
}

const images = ["agasa.jpeg","ayumi.jpeg","conan.jpeg","genta.jpeg","haibara.jpeg","heiji.jpeg","mitsuhiko.jpeg","mori.jpeg","ran.jpeg","yusaku.jpeg"];
    const duplicateImages = images.concat(images);
    let imgRandom = [...duplicateImages];

    const startX = 70;
    const startY = 10;
    let score = new Node();

    score.initView();
    score.view = document.createElement("input");
    document.body.appendChild(score.view);
    score.view.readOnly = true;
    score.view.classList = "score";
    score.view.id = "score";
    score.view.readOnly = true;
    score.view.style.border = "1px solid black";
    score.view.style.borderRadius = "10px";
    score.view.style.width = "300px";
    score.view.style.height = "70px";
    score.view.style.marginLeft = "160px";
    score.view.style.marginTop = "10px"; 
    score.view.style.fontSize = "30px";
    score.view.style.textAlign = "center";
    score.view.style.alignItems = "center";
    score.x = 170;
    score.y = 10;
    let num = 0;
    for(let i=1 ; i<=4; i++){
        for(let j = 1; j <=5; j++){
            let label = new Label();
            let sprite = new Sprite();
            let cover = new Cover();

            cover.initStyle();
            cover.addChild(label);
            cover.addChild(sprite);
            cover.width = 100
            cover.height = 100;
            cover.x = j*cover.height + startX + j;
            cover.y = i*cover.width + startY + i; 
            sprite.width = 100;
            sprite.height = 100;
            sprite.x = j*sprite.height + startX +j;
            sprite.y = i*sprite.width + startY + i;
            // label.width = 100;
            // label.height = 100;
            // label.x = j*label.height + startX +j;
            // label.y = i*label.width + startY + i;
            let ramdom = Math.floor(Math.random()*imgRandom.length);
            sprite.setImage(`./images/${imgRandom[ramdom]}`);
            document.body.appendChild(cover.view);
            imgRandom.splice(ramdom,1);   
            num ++;
            label.string = num;
        }     
    }
   
    const covers = document.querySelectorAll('.cover');
   
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let point = 10000;
let scoreDOM = document.getElementById('score');
scoreDOM.value = `SCORE: ${point}`;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
      // this.firstChild.hidden = true;
      // this.lastChild.hidden = false;

      let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
  tl.to(this, { scaleX: 0, duration: 1 });
    // this.lastChild.hidden = false;
  tl.to(this.lastChild, { scaleX: 1, duration: 1 });
  // tl.to(this.lastChild, { scaleX: 0, duration: 0 });
  // tl.to(this.lastChild, { scaleX: 1, duration: 0 });
       
    this.classList.add('flip');
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;  
      return;
    }

    secondCard = this;
    checkForMatch();
  }
  function checkForMatch() {
    let isMatch = firstCard.lastChild.src === secondCard.lastChild.src;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    point += 1000;
    scoreDOM.value = "SCORE: " + point;
    // firstChild.hidden = true;
    // lastChild.hidden = true;
    // firstCard.firstChild.hidden = true;
    // firstCard.lastChild.hidden = true;
    // secondCard.firstChild.hidden = true;
    // secondCard.lastChild.hidden = true;
    setTimeout(() => {
      firstCard.hidden = true;
      secondCard.hidden = true;
      resetBoard();
    },500) 



  }

  function unflipCards() {
    lockBoard = true;
    point -= 1000;
    scoreDOM.value = "SCORE: " + point;
      if(point <= 0) {
      scoreDOM.value = "SCORE: " + 0;
      setTimeout(() => {
        alert("game over");
        window.location = '/index.html';
      },200) 
    }
 
   setTimeout(() => {

      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      // firstCard.firstChild.hidden = false;
      // firstCard.lastChild.hidden = true;
      
      // secondCard.firstChild.hidden = false;
      // secondCard.lastChild.hidden = true;
      resetBoard();
    }, 500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  covers.forEach(cover => cover.addEventListener('click', flipCard));