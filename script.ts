// ==UserScript==
// @name SimpleSnipe
// @namespace https://iceayy.com/simplesnipe
// @version 5.5
// @description Simple roblox sniper with a GUI. Includes a bunch of customization and sniper settings.
// @match https://*.roblox.com/catalog/*
// @match https://*.roblox.com/bundles/*
// @grant none
// @license MIT
// ==/UserScript==

/*

	==UPDATE NOTES==
- Rewrote functions. Simple snipe will be under the 

	==UPDATE NOTES==
	  ==PATCH .1==
- Fixed gui styles for different screen and windows sizes.
- Changed some text.

*/

// GUI variables and styles
const guiStyles = {
  position: 'fixed',
  top: '50%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  border: '8px solid rgba(255, 242, 71, 1)', // 8px is the default border thickness. the color is RGBA by default.
  borderRadius: '30px', // border rounding, the default its 30px.
  padding: '20px',
  height: '420px', // height of the main gui.
  width: '320px', // width of the main gui.
  color: 'rgba(255, 242, 71, 1)', // text color for text.
  background: 'rgba(255, 86, 232, 1)', // background color of the gui. RGBA format.
};

const buttonStyles = {
  background: 'rgba(255, 242, 71, 0.2)', // background color of buttons. RGBA format.
  border: '5px solid rgba(255, 242, 71, 1)', // border thickness for buttons. default is 5, and color is in RGBA format.
  borderRadius: '10px', // border radius for the buttons, default is 10px.
  display: 'inline-block',
  marginLeft: '5px',
  color: 'rgba(255, 242, 71, 1)', // color of the text inside buttons.
  padding: '5px 10px',
};

const textboxStyles = {
  background: 'rgba(255, 242, 71, 0.2)', // background color for text boxes. RGBA format.
  border: '5px solid rgba(255, 242, 71, 1)', // border thickness, defualt is 5. RGBA format.
  borderRadius: '10px', // border rounding, default is 10px.
  display: 'block',
  marginTop: '5px',
  padding: '5px',
  color: 'rgba(255, 242, 71, 1)', // color of the text inside the text boxes.
};

/*



Copyright 2023 IceayyDev

Permission is hereby granted, free of charge,
to any person obtaining a copy of this software
and associated documentation files
(the “Software”), to deal in the Software
without restriction, including without limitation
the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies
of the Software, and to permit persons to
whom the Software is furnished to do so, subject
to the following conditions:

The above copyright notice and this permission
notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT
WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT
SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR
IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.


*/

// Sniper variables
let guiContainer;
let sniperIntervalId;
let startSniperButton;
let stopSniperButton;
let toggleAnimationButton;
let checkPriceCheckbox;
let maxPriceInput;
let reloadIntervalInput;
let settings = {};

// Load settings from local storage or use default settings
const savedSettings = JSON.parse(localStorage.getItem('simpleSnipeSettings'));
if (savedSettings) {
  settings = savedSettings;
} else {
  settings = {
    check_price: false,
    max_price: 0,
    reload_interval: 100,
  };
  saveSettings();
}

// Utility functions
function saveSettings() {
  localStorage.setItem('simpleSnipeSettings', JSON.stringify(settings));
}

function updateSettings() {
  settings.check_price = checkPriceCheckbox.checked;
  settings.max_price = Number(maxPriceInput.value);
  settings.reload_interval = Number(reloadIntervalInput.value);
  saveSettings();
}

function startSniper() {
  sniperIntervalId = setInterval(checkButtonAndExecuteFunction, settings.reload_interval);
  startSniperButton.disabled = false;
}

function stopSniper() {
  clearInterval(sniperIntervalId);
  startSniperButton.disabled = false;
}

function createGUI() {
  guiContainer = document.createElement('div');
  Object.assign(guiContainer.style, guiStyles);

  guiContainer.style.display = 'flex';
  guiContainer.style.flexDirection = 'column';
  guiContainer.style.gap = '7px';

  document.body.appendChild(guiContainer);

  const guiTitle = document.createElement('h1');
  guiTitle.textContent = 'SimpleSnipe';
  guiTitle.style.textAlign = 'center';
  guiContainer.appendChild(guiTitle);

  const joinDiscordButton = createButton('Join the Discord', copyToClipboard);
  Object.assign(joinDiscordButton.style, buttonStyles);
  appendChild(guiContainer, joinDiscordButton);

  const guiList = document.createElement('ul');
  guiContainer.appendChild(guiList);

  const checkPriceListItem = createListItem('Check price: ');
  checkPriceCheckbox = createCheckBox(settings.check_price, updateSettings);
  appendChild(checkPriceListItem, checkPriceCheckbox);
  appendChild(guiList, checkPriceListItem);

  const maxPriceListItem = createListItem('Max price: ');
  maxPriceInput = createNumberInput(settings.max_price, '0', updateSettings);
  appendChild(maxPriceListItem, maxPriceInput);
  appendChild(guiList, maxPriceListItem);

  const reloadIntervalListItem = createListItem('Reload interval (ms): ');
  reloadIntervalInput = createNumberInput(settings.reload_interval, '100', updateSettings);
  appendChild(reloadIntervalListItem, reloadIntervalInput);
  appendChild(guiList, reloadIntervalListItem);

  startSniperButton = createButton('Start Sniper', startSniper);
  startSniperButton.disabled = false; // Default: Disabled
  stopSniperButton = createButton('Stop Sniper', stopSniper);
  Object.assign(startSniperButton.style, buttonStyles);
  Object.assign(stopSniperButton.style, buttonStyles);
  appendChild(guiContainer, startSniperButton);
  appendChild(guiContainer, stopSniperButton);
}

function createListItem(labelText) {
  const listItem = document.createElement('li');
  const label = document.createElement('label');
  label.textContent = labelText;
  appendChild(listItem, label);
  return listItem;
}

function createCheckBox(checked, eventHandler) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;
  checkbox.addEventListener('change', eventHandler);
  return checkbox;
}


function createNumberInput(value, minValue, eventHandler) {
  const input = document.createElement('input');
  input.type = 'number';
  input.value = value.toString();
  input.min = minValue;
  input.addEventListener('input', eventHandler);
  Object.assign(input.style, textboxStyles); // Apply the textboxStyles
  return input;
}

function createButton(text, eventHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', eventHandler);
  return button;
}

function appendChild(parent, child) {
  parent.appendChild(child);
}

function snipeItem() {
  const itemPriceElement = document.querySelector('.item-price-value')?.innerText;
  const buyButton = findBuyButton();
  const maxPrice = settings.max_price;

  if (itemPriceElement === 'Free') {
    console.log('The item is free. Just buy it. What do you have to lose lmao?');
    buyButton?.click();
    setTimeout(() => {
      const buyButton2 = document.querySelector('.modal-button.btn-primary-md.btn-min-width');
      buyButton2?.click();
      document.getElementById('refresh-details-button')?.click();
    }, 500);
  } else if (settings.check_price && Number(itemPriceElement) <= maxPrice) {
    buyButton?.click();
    setTimeout(() => {
      const buyButton2 = document.querySelector('.modal-button.btn-primary-md.btn-min-width');
      buyButton2?.click();
      document.getElementById('refresh-details-button')?.click();
    }, 500);
  } else if (settings.check_price && Number(itemPriceElement) > maxPrice) {
    stopSniper();
    alert('Item price too high, sniper has been stopped and no item was purchased.');
  }
}

function findBuyButton() {
  const buttons = document.querySelectorAll('button');
  return Array.from(buttons).find(button => button.textContent === 'Buy');
}

function checkButtonAndExecuteFunction() {
  const button = document.querySelector('.btn-growth-lg.btn-fixed-width-lg.PurchaseButton');

  if (button instanceof HTMLButtonElement) {
    snipeItem();
  } else {
    document.getElementById('refresh-details-button')?.click();
  }
}

function copyToClipboard() {
  const text = 'https://discord.gg/TJqDAaMZku';
  navigator.clipboard.writeText(text)
  .then(() => {
    alert('Copied to clipboard: ' + text + "\nAlso, you can change the style of the gui in the script.");
  })
  .catch((error) => {
    console.error('Failed to copy to clipboard: ', error);
  });
}

function initSniper() {
  createGUI();
  alert("Sniper loaded. Thanks for using SimpleSnipe!");
}

initSniper();
