const Actions = {
  nMoves: 0,
  contador: 0,
  restartApp() {
    window.location.reload();
  },
  moves() {
    Actions.nMoves++;
    if (Actions.nMoves < 10) {
      Actions.nMoves = "0" + Actions.nMoves;
    }
    document.querySelector("#moves span").innerHTML = Actions.nMoves;
  },
  fecharCards() {
    let cards = document.querySelectorAll(".box-active");
    cards.forEach((e) => {
      e.querySelector("img").classList.remove("img-active");
      e.classList.remove("box-active");
      Actions.contador = 0;
    });
  },
  openCard(element) {
    element.classList.add("box-active");
    element.querySelector("img").classList.add("img-active");
  },
  venceuJogo(){
    document.querySelector('div.modal-venceu').style.visibility = 'visible'
    document.querySelector('div.modal-venceu').style.opacity = '0'
    setTimeout(()=>{
      document.querySelector('div.modal-venceu').style.opacity = '1'
    },800)

  },
  verificarAllCards(){
    let cardsActive = document.querySelectorAll('.box')
    for(let i = 0; i <= cardsActive.length; i++){
      if(cardsActive[i].classList.contains('box-sucess')){
        if(i==15){Actions.venceuJogo()}
      } else{
        return
      }

    }
  },
  verificarCard(){
    let cardsActive = document.querySelectorAll('.box-active')
    var cardAnterior = ''
    cardsActive.forEach((e)=>{
      card = e.querySelector('img').getAttribute('data-key')
      if(cardAnterior == ''){
        cardAnterior = card
      } else{
        if(cardAnterior == card){
          cardsActive.forEach((e)=>{
            e.querySelector('img').classList.add("img-sucess");
            e.classList.add("box-sucess");
          })
        }
      }
    })
  },
  card() {
    Actions.contador++;
    //abrindo card
    Actions.openCard(this);
    if (Actions.contador == 2) {
      // verificar cards
      Actions.verificarCard()
      // verificar todos os cards
      Actions.verificarAllCards()
      setTimeout(() => {
        Actions.fecharCards();
      }, 600);
    }
    if (Actions.contador == 1) {
      Actions.moves();
    }
  },

  //embaralhar keys cards
  randomKeys() {
    var keys = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
    for (let i = 0; i < keys.length; i++) {
      let p = Math.round(Math.random() * 7);
      let aux = keys[p];
      keys[p] = keys[i];
      keys[i] = aux;
    }
    return keys;
  },

  setImage() {
    var div = document.querySelectorAll("div.box");
    var keys = this.randomKeys();
    var i = 0;
    div.forEach((e) => {
      id = keys[i];
      e.innerHTML = `<img data-key="${id}" src="./assets/img/${id}.svg"/>`;
      i++;
    });
  },
};

const Timer = {
  mn: 0,
  ss: 0,
  timer: 1000,
  timerHora() {
    let timer = setInterval(() => {
      this.ss++;
      if (this.ss == 60) {
        this.ss = 0;
        this.mn++;
        if (this.mn == 60) {
          clearInterval(timer);
        }
      }
      let format =
        (this.mn < 10 ? "0" + this.mn : this.mn) +
        ":" +
        (this.ss < 10 ? "0" + this.ss : this.ss);
      document.querySelector("#time span").innerHTML = format;
    }, this.timer);
  },
};

const App = {
  init() {
    Timer.timerHora();
    Actions.setImage();
    var div = document.querySelectorAll("div.box");
    div.forEach((e) => {
      e.addEventListener("click", Actions.card);
    });
  },
};
