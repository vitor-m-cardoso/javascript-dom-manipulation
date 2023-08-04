const mainElement = document.getElementById('root');

const title = document.createElement('h1');
title.innerText = 'Paleta de Cores';
title.setAttribute('id', 'title');
mainElement.appendChild(title);

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

const clearPixelBoard = () => {
  const pixels = document.getElementsByClassName('pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    const pixel = pixels[index];
    pixel.style.backgroundColor = 'rgb(255, 255, 255)';
  }
};

const createClearBtn = () => {
  const clearBtn = document.createElement('button');
  clearBtn.setAttribute('id', 'clear-board');
  clearBtn.innerText = 'Limpar';
  mainElement.appendChild(clearBtn);
  clearBtn.addEventListener('click', clearPixelBoard);
};
createClearBtn();

const createPixelBoard = (size) => {
  const pixelBoard = document.createElement('section');
  pixelBoard.setAttribute('id', 'pixel-board');

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

const paintPixels = () => {
  const pixels = document.getElementsByClassName('pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    const pixel = pixels[index];

    pixel.addEventListener('click', (event) => {
      const selectedColor = document.getElementsByClassName('selected')[0];
      const selectedColorBg = selectedColor.style.backgroundColor;
      const clickedPixel = event.target;

      clickedPixel.style.backgroundColor = selectedColorBg;
    });
  }
};
paintPixels();

const generateRandomNumber = () => Math.round(Math.random() * 255);

const createRandomRGB = () => {
  const red = generateRandomNumber();
  const green = generateRandomNumber();
  const blue = generateRandomNumber();

  return `rgb(${red}, ${green}, ${blue})`;
};
