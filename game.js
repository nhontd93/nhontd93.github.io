import { Node } from "./modules/Node.js";
import { Cover } from "./modules/Cover.js";
import { Label } from "./modules/Label.js";
import { Sprite } from "./modules/Sprite.js";

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

    const startX = 10;
    const startY = 120;
    const col = 5;
    const row = 4;
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
    score.view.style.marginTop = "540px"; 
    score.view.style.fontSize = "30px";
    score.view.style.textAlign = "center";
    score.view.style.alignItems = "center";
    score.view.hidden = true;
    score.x = 170;
    score.y = 10;
    let num = 0;

    let btnPlay = document.createElement("button");
    btnPlay.style.position = "absolute";
    btnPlay.style.width = "100px";
    btnPlay.style.height = "50px";
    btnPlay.style.fontSize = "20px";
    btnPlay.style.top = "30px";
    btnPlay.style.left = "10px";
    btnPlay.innerHTML = "PLAY";
    btnPlay.onclick = function () {
      createCards();
      setTimeout(() => {
      score.view.hidden = false;
      btnPlay.hidden = true;},3000);
    };
    document.body.appendChild(btnPlay);
  
    let btnReplay = document.createElement("button");
    btnReplay.style.position = "absolute";
    btnReplay.style.width = "100px";
    btnReplay.style.height = "50px";
    btnReplay.style.fontSize = "20px";
    btnReplay.style.top = "30px";
    btnReplay.style.left = "120px";
    btnReplay.innerHTML = "REPLAY";
    btnReplay.onclick = function () {
        window.location = './index.html';
    };
    document.body.appendChild(btnReplay);
    let btnRetry = document.createElement("button");
    btnRetry.style.position = "absolute";
    btnRetry.style.width = "100px";
    btnRetry.style.height = "50px";
    btnRetry.style.fontSize = "20px";
    btnRetry.style.top = "30px";
    btnRetry.style.left = "230px";
    btnRetry.innerHTML = "RETRY";
    btnRetry.onclick = function () {
      alert("Button RETRY is clicked");
    };
    document.body.appendChild(btnRetry);
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
              imgRandom.splice(ramdom,1); 
              num++;
              label.string = num;
                      //Animation
              let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
              tl.delay(0.05*num).to(cover, {
                  duration: 3,
                  ease: "elastic.out(0.5, 0.3)",
                  x: 100*j + startX + j,
                  y: 100*i + startY + i,
                 
                })
               ;
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

  function flipOpen(card){
    let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    tl.to(card, { scaleX: 0, duration: 0.5 });
      tl.add(function () {
       card.firstChild.style.display = 'none';
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
    setTimeout(() => {
      point += 1000;
      scoreDOM.value = "SCORE: " + point;   
      firstCard.hidden = true;
      firstCard.lastChild.hidden = true;
      secondCard.hidden = true;
      secondCard.lastChild.hidden = true;
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
  
     },1000) 
     setTimeout(() => {
      point -= 1000;
      if (point>0) {
        scoreDOM.value = "SCORE: " + point;
      } else {      
        scoreDOM.value = "SCORE: " + 0;
        setTimeout(() => {
        alert("GAME OVER");
        window.location = './index.html';},100);
      }
      },900); 
    
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