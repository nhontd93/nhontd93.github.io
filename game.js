import { Node } from "./modules/Node.js";
import { Cover } from "./modules/Cover.js";
import { Label } from "./modules/Label.js";
import { Sprite } from "./modules/Sprite.js";
import { Button } from "./modules/Button.js";

class Game extends Node {
    constructor(){
        super();        
    }
}
    document.body.style.backgroundImage = "url(./images/cover.jpeg)";
    document.body.style.backgroundSize = "cover";
    const images = [
    "agasa.jpeg",
    "ayumi.jpeg",
    "conan.jpeg",
    "genta.jpeg",
    "haibara.jpeg",
    "heiji.jpeg",
    "mitsuhiko.jpeg",
    "mori.jpeg",
    "ran.jpeg",
    "yusaku.jpeg"];
    const duplicateImages = images.concat(images);
    let imgRandom = [...duplicateImages];
    let imgSources = [];
    const startX = 10;
    const startY = 120;
    const col = 5;
    const row = 4;
    let score = new Label();
    score.initScoreBox();
    let num = 0;
    function createCards() {
      for(let i=0 ; i<row; i++){
          for(let j = 0; j <col; j++){
              let label = new Label();
              let sprite = new Sprite();
              let cover = new Cover();
              cover.initStyle();
              cover.addChild(label);
              cover.addChild(sprite);
              cover.width = 100
              cover.height = 100;
              cover.x = 210;
              cover.y = 270; 
              sprite.width = 100;
              sprite.height = 100;
              let ramdom = Math.floor(Math.random()*imgRandom.length);
              sprite.setImage(`./images/${imgRandom[ramdom]}`);
              document.body.appendChild(cover.view);
              imgSources.push(imgRandom[ramdom]);                 
              imgRandom.splice(ramdom,1);              
              num++;
              label.string = num;
              if (num > 19) num = 0;
                      //Animation
              let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
              tl.delay(0.05*num).to(cover, {
                  duration: 3,
                  ease: "elastic.out(0.5, 0.3)",
                  x: 100*j + startX + j,
                  y: 100*i + startY + i,                 
              }); 
           
          }     
      }
      const covers = document.querySelectorAll('.cover');
      covers.forEach(cover => cover.addEventListener('click', flipCard));
  }   
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let point = 10000;
let isWin = 0;
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
  function disableCards() {
      setTimeout(() => {
      zoomCard(firstCard);
      zoomCard(secondCard);
      }, 500);
    
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      setTimeout(() => {
        point += 1000;
        scoreDOM.value = "SCORE: " + point;  
        firstCard.remove(); 
        secondCard.remove();
        resetBoard();
      },1000) 

      isWin++;
      setTimeout(() => {
            if (isWin == 10) alert('YOU WIN! SCORE = ' + point);},500);
  }
  function zoomCard(card) {
      let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        tl.add(function () {
        card.firstChild.style.display = 'none';
        card.lastChild.hidden = false;
      }) ;
      tl.to(card, { scale: 1.2, duration: 0.5 });
  }

  function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
        flipClose(firstCard);
        flipClose(secondCard);  
        },1000);
      setTimeout(() => {
        point -= 1000;
        if (point>0) {
          scoreDOM.value = "SCORE: " + point;
        } else {      
          scoreDOM.value = "SCORE: " + 0;
          setTimeout(() => {
          alert("GAME OVER");
          window.location = './index.html';},100);
        };
        },900); 
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
  
  let stylePlay = {
    position: "absolute",
    width: 100,
    height: 50,
    fontSize: "20px",
    x: 10,
    y: 30,
    name: "PLAY"
  }
  let btnPlay = new Button();
      btnPlay._initStyleElement(stylePlay);
      btnPlay.view.onclick = function () {
        createCards();
        setTimeout(() => {
          score.view.hidden = false;
          btnPlay.view.hidden = true;},3000);
      }
  document.body.appendChild(btnPlay.view);

  let styleRePlay = {
    position: "absolute",
    width: 100,
    height: 50,
    fontSize: "20px",
    x: 120,
    y: 30,
    name: "REPLAY"
  }
  let btnReplay = new Button();
      btnReplay._initStyleElement(styleRePlay);
      btnReplay.view.onclick = function () {
        scoreDOM.value = "SCORE: " + point;
        createCards();
      }
  document.body.appendChild(btnReplay.view);

  let styleRetry = {
    position: "absolute",
    width: 100,
    height: 50,
    fontSize: "20px",
    x: 230,
    y: 30,
    name: "RETRY"
  }
  let btnRetry = new Button();
      btnRetry._initStyleElement(styleRetry);
      btnRetry.view.onclick = function () {
        alert("Button RETRY is clicked");
      }
  document.body.appendChild(btnRetry.view);

  function flipOpen(card){
    let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    tl.to(card, { scaleX: 0, duration: 0.5 });
      tl.add(function () {
       card.firstChild.style.display = 'none';
       card.lastChild.hidden = false;
    }) ;
     tl.to(card, { scaleX: 1, duration: 0.5 });
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