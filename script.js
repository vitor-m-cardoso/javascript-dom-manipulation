const mainElement = document.getElementById('root');
const savedPixelBoard = localStorage.getItem('pixelBoard');

const title = document.createElement('h1');
title.innerText = 'Paleta de Cores';
title.setAttribute('id', 'title');
mainElement.appendChild(title);

// constante criada para string utilizada repetidas vezes.
const pixelBoardStr = 'pixel-board';

const createColorPalette = () => {
  const colorPalette = document.createElement('section');
  colorPalette.setAttribute('id', 'color-palette');
  const colorArr = ['black', 'red', 'green', 'blue'];

  for (let index = 0; index < 4; index += 1) {
    const color = document.createElement('span');
    color.setAttribute('class', 'color');

    if (index === 0) {
      color.classList.add('selected');
    }

    color.style.backgroundColor = colorArr[index];

    colorPalette.appendChild(color);
  }
  mainElement.appendChild(colorPalette);
};
createColorPalette();

const btnsSection = document.createElement('section');
mainElement.appendChild(btnsSection);

const generateRandomNumber = () => Math.round(Math.random() * 255);

const createRandomRGB = () => {
  const red = generateRandomNumber();
  const green = generateRandomNumber();
  const blue = generateRandomNumber();

  return `rgb(${red}, ${green}, ${blue})`;
};

const setRandomColor = () => {
  const colorArr = document.getElementsByClassName('color');

  for (let index = 0; index < colorArr.length; index += 1) {
    const color = colorArr[index];

    color.style.backgroundColor = createRandomRGB();
  }
};

const createElementsToSetBoardSize = () => {
  const boardSizeSection = document.createElement('section');

  const input = document.createElement('input');
  input.setAttribute('id', 'board-size');
  input.setAttribute('type', 'number');
  input.min = 1;
  input.max = 50;

  const genBoard = document.createElement('button');
  genBoard.setAttribute('id', 'generate-board');
  genBoard.innerText = 'VQV';

  boardSizeSection.appendChild(input);
  boardSizeSection.appendChild(genBoard);
  mainElement.appendChild(boardSizeSection);
};
createElementsToSetBoardSize();

const createPixelBoard = (size) => {
  const pixelBoard = document.createElement('section');
  pixelBoard.setAttribute('id', pixelBoardStr);

  for (let column = 0; column < size; column += 1) {
    const pixelColumn = document.createElement('div');
    pixelColumn.setAttribute('class', 'pixel-column');
    for (let pixelIndex = 0; pixelIndex < size; pixelIndex += 1) {
      const pixel = document.createElement('span');
      pixel.setAttribute('class', 'pixel');

      pixelColumn.appendChild(pixel);
    }
    pixelBoard.appendChild(pixelColumn);
  }
  mainElement.appendChild(pixelBoard);
};
createPixelBoard(5);

const savePixelBoard = () => {
  const pixelBoard = document.getElementById(pixelBoardStr);
  localStorage.setItem('pixelBoard', JSON.stringify(pixelBoard.innerHTML));
};

const clearPixelBoard = () => {
  const pixels = document.getElementsByClassName('pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    const pixel = pixels[index];
    pixel.style.backgroundColor = 'rgb(255, 255, 255)';
  }
  savePixelBoard();
};

const createClearBtn = () => {
  const clearBtn = document.createElement('button');
  clearBtn.setAttribute('id', 'clear-board');
  clearBtn.innerText = 'Limpar';
  btnsSection.appendChild(clearBtn);
  clearBtn.addEventListener('click', clearPixelBoard);
};
createClearBtn();

const createRandomColorBtn = () => {
  const randomColorBtn = document.createElement('button');
  randomColorBtn.setAttribute('id', 'button-random-color');
  randomColorBtn.innerText = 'Cores aleatórias';
  btnsSection.appendChild(randomColorBtn);

  randomColorBtn.addEventListener('click', setRandomColor);
};
createRandomColorBtn();

const setSelectedColor = () => {
  const colorArr = document.getElementsByClassName('color');

  for (let index = 0; index < colorArr.length; index += 1) {
    const color = colorArr[index];

    color.addEventListener('click', (event) => {
      const selectedColor = document.getElementsByClassName('selected')[0];

      selectedColor.classList.remove('selected');
      event.target.classList.add('selected');
    });
  }
};
setSelectedColor();

const getSavedPixelBoard = () => {
  const pixelBoard = document.getElementById(pixelBoardStr);
  if (savedPixelBoard) {
    pixelBoard.innerHTML = JSON.parse(savedPixelBoard);
  }
};
getSavedPixelBoard();

const paintPixels = () => {
  const pixels = document.getElementsByClassName('pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    const pixel = pixels[index];

    pixel.addEventListener('click', (event) => {
      const selectedColor = document.getElementsByClassName('selected')[0];
      const selectedColorBg = selectedColor.style.backgroundColor;
      const clickedPixel = event.target;

      clickedPixel.style.backgroundColor = selectedColorBg;
      savePixelBoard();
    });
  }
};
paintPixels();

const setPixelBoardSize = () => {
  localStorage.removeItem('pixelBoard');
  const input = document.getElementById('board-size');
  const getPixelBoard = document.getElementById('pixel-board');

  if (input.value < 5) {
    alert('Board inválido!');
    input.value = 5;
  } else if (input.value > 50) {
    alert('Board inválido!');
    input.value = 50;
  }

  getPixelBoard.remove();
  createPixelBoard(input.value);
  paintPixels();
  savePixelBoard();
  localStorage.setItem('boardSize', input.value);
};
const genBoardBtn = document.getElementById('generate-board');
genBoardBtn.addEventListener('click', setPixelBoardSize);
