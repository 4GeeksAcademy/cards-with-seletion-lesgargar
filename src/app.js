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
    sortedCards.innerHTML = '';
    const icons = ['♦', '♥', '♠', '♣'];
    const cardNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'A', 'J', 'Q', 'K'];
    function randomContent(arr) {
      const indx = Math.floor(Math.random() * (arr.length))
      return arr[indx]
    }

    function setCardValue(number) {
      if (number === 'A') return 1;
      if (number === 'J') return 11;
      if (number === 'Q') return 12;
      if (number === 'K') return 13;
      return number;
    }

    for (let i = 0; i < inputValue; i++) {

      let theIcon = randomContent(icons)
      let theNumber = randomContent(cardNumbers);
      let value = setCardValue(theNumber);
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

      arrTemp.push({ value: value, suit: theIcon, element: oneCardContainer })
    }
    console.log('la card como array', arrTemp.value)
  };



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

  function renderSortedCards() {
    sortedCards.innerHTML = '';
    arrTemp.forEach(cardObj => {
      sortedCards.appendChild(cardObj.element);
    });
  }

  function selectionSort() {
    for (let i = 0; i < arrTemp.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arrTemp.length; j++) {
        if (arrTemp[j].value < arrTemp[minIndex].value) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        let temp = arrTemp[i];
        arrTemp[i] = arrTemp[minIndex];
        arrTemp[minIndex] = temp;
      }
      renderSortedCards();

    }
  }

  function sort() {
    if (arrTemp.length === 0) {
      alert('Primero genera las cartas con Draw');
      return;
    }
    selectionSort();

  }




  sortBtn.addEventListener('click', sort)

};
