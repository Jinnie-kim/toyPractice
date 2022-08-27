const shopItemList = document.querySelector('.itemLists');
const logoButton = document.querySelector('.logoButton');
const buttons = document.querySelector('.shoppingmallButton');

loadShopData().then((items) => {
  showItem(items);
  setButtonFilterEvent(items);
});

async function loadShopData() {
  const response = await fetch('./data/data.json');
  const json = await response.json();
  return json.items;
}

function showItem(items) {
  shopItemList.innerHTML = '';
  items.map((item) => shopItemList.append(makeShopListItem(item)));
}

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

function setButtonFilterEvent(items) {
  logoButton.addEventListener('click', () => showItem(items));
  buttons.addEventListener('click', (event) =>
    onFilterButtonClick(event, items)
  );
}

function onFilterButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  showItem(items.filter((item) => item[key] === value));
}