import "bootstrap";
import "./style.css";
import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {
  let cardsInput = document.getElementById('cardsInput');
  let sortBtn = document.getElementById('sortBtn');
  let inputNumber = document.getElementById('inputNumber');
  let cardsContainer = document.getElementById('originalCards');
  let sortedCards = document.getElementById('sortedCards');
  let arrTemp = [];

  function createCard(inputValue) {
    cardsContainer.innerHTML = '';
    sortedCards.innerHTML = '';
    arrTemp = []; // limpiar array de cartas

    const icons = ['♦', '♥', '♠', '♣'];
    const cardNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'A', 'J', 'Q', 'K'];

    function randomContent(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function setCardValue(number) {
      if (number === 'A') return 1;
      if (number === 'J') return 11;
      if (number === 'Q') return 12;
      if (number === 'K') return 13;
      return number;
    }

    for (let i = 0; i < inputValue; i++) {
      let theIcon = randomContent(icons);
      let theNumber = randomContent(cardNumbers);
      let value = setCardValue(theNumber);
      const redStyle = theIcon == '♥' || theIcon == '♦' ? 'text-danger' : 'text-black';

      const oneCardContainer = document.createElement('div');
      const card = document.createElement('div');
      const cardTop = document.createElement('div');
      const cardBase = document.createElement('div');
      const randomNum = document.createElement('h1');

      oneCardContainer.classList.add('p-2', 'col-2');
      oneCardContainer.id = 'card-height';
      card.classList.add('bg-white', 'p-2', 'rounded', 'h-100', 'd-flex', 'flex-column', 'justify-content-between');
      cardTop.classList.add('m-2', 'd-flex', 'justify-content-start', redStyle);
      cardBase.classList.add('m-2', 'd-flex', 'justify-content-end', redStyle);
      randomNum.innerHTML = theNumber;
      randomNum.classList.add(redStyle);
      cardTop.innerHTML = theIcon;
      cardBase.innerHTML = theIcon;
      card.appendChild(cardTop);
      card.appendChild(randomNum);
      card.appendChild(cardBase);
      oneCardContainer.appendChild(card);
      cardsContainer.appendChild(oneCardContainer);

      arrTemp.push({ value: value, suit: theIcon, element: oneCardContainer });
    }
  }

  // renderiza una fila
  function renderStep(stepIndex, arrayState) {
    const row = document.createElement('div');
    row.classList.add('d-flex', 'mb-2', 'align-items-center');

    const stepLabel = document.createElement('div');
    stepLabel.textContent = stepIndex;
    stepLabel.style.width = "30px";
    stepLabel.classList.add('fw-bold', 'me-2');
    row.appendChild(stepLabel);

    arrayState.forEach(cardObj => {
      const cardClone = cardObj.element.cloneNode(true);
      row.appendChild(cardClone);
    });

    sortedCards.appendChild(row);
  }

  function selectionSortLog() {
    sortedCards.innerHTML = '';
    const workingArr = [...arrTemp];
    let step = 0;

    renderStep(step++, workingArr);

    for (let i = 0; i < workingArr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < workingArr.length; j++) {
        if (workingArr[j].value < workingArr[minIndex].value) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        let temp = workingArr[i];
        workingArr[i] = workingArr[minIndex];
        workingArr[minIndex] = temp;
      }

      renderStep(step++, workingArr);
    }
  }


  cardsInput.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputToNumber = Number(inputNumber.value);
    if (inputNumber.value !== '' && inputToNumber > 0) {
      createCard(inputToNumber);
    } else {
      alert('Ingresa un número válido');
    }
  });

  function sort() {
    if (arrTemp.length === 0) {
      alert('Primero genera las cartas con Draw');
      return;
    }


    selectionSortLog();
  }

  sortBtn.addEventListener('click', sort);
};
