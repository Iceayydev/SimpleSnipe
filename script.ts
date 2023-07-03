// ==UserScript==
// @name SimpleSnipe
// @namespace http://tampermonkey.net/
// @version 5.4.3
// @description created better gui, major optimization improvements and better code readability. The next version (5.5) will include a rewrite of the sniping code, so fishcat wont be asocciated with simplesnipe. updates are in MAJOR, MINOR, PATCH format.
// @author @iceayy, base sniper code by fishcat#2431
// @match https://*.roblox.com/catalog/*
// @match https://*.roblox.com/bundles/*
// @grant none
// @license GNU General Public License v3.0
// ==/UserScript==

/*

	==UPDATE NOTES==
- Removed RGB background. Caused too many issues.
- Fixed setting saving.
- Fixed ignored variables.
- Improved readablity.
- Reworked how some settings are handled. This is the first step to redoing the entire snipe code.

	==UPDATE NOTES==
	  ==PATCH .4==
- Added text box styles.
- Fixed a console spam issue which caused minor preformance issues.
*/

// GUI variables and styles
const guiStyles = {
  position: 'fixed',
  top: '50%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  border: '5px solid rgba(255, 255, 255, 1)',
  borderRadius: '30px',
  padding: '20px',
  height: '400px',
  width: '280px',
  color: 'white',
  background: 'linear-gradient(to bottom right, purple, blue)', // Change the colors!!!
};

const buttonStyles = {
  background: 'rgba(255, 255, 255, 0.2)',
  border: '3px solid rgba(255, 255, 255, 0.2)',
  display: 'inline-block',
  marginLeft: '5px',
  color: 'white',
  padding: '5px 10px',
};

const textboxStyles = {
  background: 'rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'block',
  marginTop: '5px',
  padding: '5px',
  color: 'white',
};

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
  } // Made by iceayy & fishcat, dont try and skid noob.
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
  const text = 'https://discord.gg/V7XT9cuPrZ';
  navigator.clipboard.writeText(text)
  .then(() => {
    alert('Copied to clipboard: ' + text + "\nDid you know you can change the colors by editing `background: 'linear-gradient(to bottom, purple, blue)` in the script?");
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
