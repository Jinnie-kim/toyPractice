const shopItemList = document.querySelector('.itemLists');

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
