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
    this.classList.add('flip');
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;  
      flipOpen(firstCard);
      return;
    }

    secondCard = this;
    flipOpen(secondCard);
    setTimeout(() => {
      checkForMatch();
    },500);

  }
  function checkForMatch() {
    let isMatch = firstCard.lastChild.src === secondCard.lastChild.src;
    isMatch ? disableCards() : unflipCards();
  }

  function flipOpen(card){
    let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    tl.to(card, { scaleX: 0, duration: 0.5 });
      tl.add(function () {
       card.firstChild.style.display = "none";
       card.lastChild.hidden = false;
    }) ;
     tl.to(card, { scaleX: 1, duration: 0.5 });
  }
  

  function disableCards() {
    setTimeout(() => {
    zoomCard(firstCard);
    zoomCard(secondCard);
    }, 500)
  
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    // point += 1000;
    // scoreDOM.value = "SCORE: " + point;
    setTimeout(() => {
      point += 1000;
      scoreDOM.value = "SCORE: " + point;
      firstCard.style.display = "none";
      secondCard.style.display = "none";      
      resetBoard();
    },1000) 
  }
  function zoomCard(card) {
    let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    // tl.to(card, { scale: 1.2, duration: 0.5 });
      tl.add(function () {
       card.firstChild.style.display = "none";
       card.lastChild.hidden = false;
    }) ;
     tl.to(card, { scale: 1.2, duration: 0.5 });
  }

  function unflipCards() {
    lockBoard = true;
    // point -= 1000;
    // scoreDOM.value = "SCORE: " + point;
    setTimeout(() => {
    flipClose(firstCard);
    flipClose(secondCard);
     },1000) 
    point -= 1000;
    scoreDOM.value = "SCORE: " + point;
      if(point <= 0) {
      scoreDOM.value = "SCORE: " + 0;
      setTimeout(() => {
        alert("GAME OVER");
        window.location = './index.html';
      },1000) 
    }
    function flipClose(card){
      let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
      tl.to(card, { scaleX: 0, duration: 0.5 });
        tl.add(function () {
            card.firstChild.style.display = "flex";
            card.lastChild.hidden = true;
      }) ;
       tl.to(card, { scaleX: 1, duration: 0.5 });
    }
   setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 2000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  covers.forEach(cover => cover.addEventListener('click', flipCard));