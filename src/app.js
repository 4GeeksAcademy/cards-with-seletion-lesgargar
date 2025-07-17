import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";



window.onload = function () {
  let cardsInput = document.getElementById('cardsInput');
  let sortBtn = document.getElementById('sortBtn');
  let inputNumber = document.getElementById('inputNumber');
  let cardsContainer = document.getElementById('originalCards');
  let sortedCards = document.getElementById('sortedCards')
  let arrTemp = []

  function createCard(inputValue) {
    cardsContainer.innerHTML = '';
    const icons = ['♦', '♥', '♠', '♣'];
    const cardNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'A', 'J', 'Q', 'K'];
    function randomContent(arr) {
      const indx = Math.floor(Math.random() * (arr.length))
      return arr[indx]
    }

    for (let i = 0; i < inputValue; i++) {

      let theIcon = randomContent(icons)
      let theNumber = randomContent(cardNumbers);
      const redStyle = theIcon == '♥' || theIcon == '♦' ? 'text-danger' : 'text-black';
      const oneCardContainer = document.createElement('div');
      const card = document.createElement('div');
      const cardTop = document.createElement('div');
      const cardBase = document.createElement('div');
      const randomNum = document.createElement('h1');
      oneCardContainer.classList.add('p-2', 'col-2')
      oneCardContainer.id = 'card-height'
      card.classList.add('bg-white', 'p-2', 'rounded', 'h-100', 'd-flex', 'flex-column', 'justify-content-between')
      cardTop.classList.add('m-2', 'd-flex', 'justify-content-start', redStyle)
      cardBase.classList.add('m-2', 'd-flex', 'justify-content-end', redStyle)
      randomNum.innerHTML = theNumber
      randomNum.classList.add(redStyle)
      cardTop.innerHTML = theIcon;
      cardBase.innerHTML = theIcon;
      card.appendChild(cardTop)
      card.appendChild(randomNum)
      card.appendChild(cardBase)
      oneCardContainer.appendChild(card)
      cardsContainer.appendChild(oneCardContainer)
      arrTemp.push({ value: theNumber, suit: theIcon, element: oneCardContainer })
    }
    console.log('la card como array', arrTemp.values)
  };

  //cuando se presione draw va a dibujar las cartas
  cardsInput.addEventListener('submit', (e) => {
    e.preventDefault();
    cardsContainer.innerHTML = '';
    const inputToNumber = Number(inputNumber.value);
    if (inputNumber.value !== '' && typeof inputToNumber == "number") {
      createCard(inputToNumber)
    } else {
      alert('ingresa un numero valido')
    }
  });

  //cuando se presione sort va a organizar el array de cartas



  function sort() {
    for (let a = 0; a <= arrTemp.length; a++) {


      const selectSort = (arregloDeCartas) => {
        let min = 0;
        for (let i = min; i < arregloDeCartas.length - 1; i++) { //mientras haya que comparar
          for (let ind = min + 1; ind < arregloDeCartas.length - 1; ind++) { //itera en el arreglo
            if (arregloDeCartas[ind] > arregloDeCartas[ind + 1]) {
              let aux = arregloDeCartas[ind]; //guarda temporalmente el indice actual
              arregloDeCartas[ind] = arregloDeCartas[ind + 1] //ahora min toma el index actual que se esta recorrieno
              arregloDeCartas[ind + 1] = aux // y aqui se hace el otro intercambio

            }
          }
        }
        return arregloDeCartas
      }
      console.log('selecttt', selectSort(arrTemp))
      //debe agregar las lineas en sortedCards
    }




  }




  sortBtn.addEventListener('click', sort)

};
