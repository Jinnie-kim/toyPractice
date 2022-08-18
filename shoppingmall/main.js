const shopItemList = document.querySelector('.itemLists');
const blueButton = document.querySelector('.blue');
const yellowButton = document.querySelector('.yellow');
const pinkButton = document.querySelector('.pink');
const tShirtButton = document.querySelector('.tshirtButton');
const pantsButton = document.querySelector('.pantsButton');
const skirtButton = document.querySelector('.skirtButton');

async function loadShopData() {
  const response = await fetch('./data/data.json');
  const json = await response.json();
  return json.items;
}

loadShopData().then((items) => {
  items.map((item) => shopItemList.append(makeShopListItem(item)));
});

function makeShopListItem(item) {
  const list = document.createElement('li');
  list.setAttribute('class', 'item');
  const image = document.createElement('img');
  const description = document.createElement('strong');
  image.setAttribute('src', item.image);
  description.innerHTML = `${item.gender}, ${item.size} size`;
  list.append(image, description);
  return list;
}

async function loadBlueItemData() {
  const response = await fetch('./data/filter.json');
  const json = await response.json();
  return json.blue;
}

function filterBlueItem() {
  shopItemList.innerHTML = '';
  loadBlueItemData().then((items) => {
    items.map((item) => shopItemList.append(makeShopListItem(item)));
  });
}

blueButton.addEventListener('click', filterBlueItem);

async function loadYellowItemData() {
  const response = await fetch('./data/filter.json');
  const json = await response.json();
  return json.yellow;
}

function filterYellowItem() {
  shopItemList.innerHTML = '';
  loadYellowItemData().then((items) => {
    items.map((item) => shopItemList.append(makeShopListItem(item)));
  });
}

yellowButton.addEventListener('click', filterYellowItem);

async function loadPinkItemData() {
  const response = await fetch('./data/filter.json');
  const json = await response.json();
  return json.pink;
}

function filterPinkItem() {
  shopItemList.innerHTML = '';
  loadPinkItemData().then((items) => {
    items.map((item) => shopItemList.append(makeShopListItem(item)));
  });
}

pinkButton.addEventListener('click', filterPinkItem);

async function loadTShirtItemData() {
  const response = await fetch('./data/filter.json');
  const json = await response.json();
  return json.tShirt;
}

function filterTShirtItem() {
  shopItemList.innerHTML = '';
  loadTShirtItemData().then((items) => {
    items.map((item) => shopItemList.append(makeShopListItem(item)));
  });
}

tShirtButton.addEventListener('click', filterTShirtItem);

async function loadPantsItemData() {
  const response = await fetch('./data/filter.json');
  const json = await response.json();
  return json.pants;
}

function filterPantsItem() {
  shopItemList.innerHTML = '';
  loadPantsItemData().then((items) => {
    items.map((item) => shopItemList.append(makeShopListItem(item)));
  });
}

pantsButton.addEventListener('click', filterPantsItem);

async function loadSkirtItemData() {
  const response = await fetch('./data/filter.json');
  const json = await response.json();
  return json.skirt;
}

function filterSkirtItem() {
  shopItemList.innerHTML = '';
  loadSkirtItemData().then((items) => {
    items.map((item) => shopItemList.append(makeShopListItem(item)));
  });
}

skirtButton.addEventListener('click', filterSkirtItem);