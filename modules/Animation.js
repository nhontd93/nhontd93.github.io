export function flipOpen(card){
    let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    tl.to(card, { scaleX: 0, duration: 0.5 });
      tl.add(function () {
       card.firstChild.style.display = 'none';
       card.lastChild.hidden = false;
    }) ;
     tl.to(card, { scaleX: 1, duration: 0.5 });
  }

  export function flipClose(card){
    let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    tl.to(card, { scaleX: 0, duration: 0.5 });
      tl.add(function () {
          card.firstChild.style.display = 'flex';
          card.lastChild.hidden = true;
    }) ;
     tl.to(card, { scale: 1, duration: 0.5 });
  }

  export function zoomCard(card) {
    let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
      tl.add(function () {
      card.firstChild.style.display = 'none';
      card.lastChild.hidden = false;
      card.style.zIndex = 3;
    }) ;
    tl.to(card, { scale: 1.2, duration: 0.5 });
}