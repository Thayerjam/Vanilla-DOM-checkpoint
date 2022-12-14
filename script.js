/* eslint-disable no-alert */

/**************
 *   SLICE 1
 **************/

// Extra Credit - moving the coffee cup on click
function moveCoffeeCup() {
  document.querySelector('#big_coffee').style.fontSize = '127px';
  
}

function moveCoffeeCupBack() {
  document.querySelector('#big_coffee').style.fontSize = '128px';
}

function updateCoffeeView(coffeeQty) {
  // The commented out line below properly adds commas to the counter but breaks tests
  // document.querySelector('#coffee_counter').innerText = coffeeQty.toLocaleString();
  document.querySelector('#coffee_counter').innerText = coffeeQty;
}

function clickCoffee(data) {
  data.coffee += 1;
  updateCoffeeView(data.coffee);
  renderProducers(data)
  moveCoffeeCup();
  setTimeout(moveCoffeeCupBack, 90);
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
  return producers.forEach(producer => coffeeCount >= producer.price / 2 ? producer.unlocked = true : null)
}

function getUnlockedProducers(data) {
  return data.producers.filter(producer => producer.unlocked);
}

function makeDisplayNameFromId(id) {
  return id.split('_').map(value => value[0].toUpperCase() + value.slice(1)).join(' ');
}

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column producer-stats">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} coffee</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

function deleteAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderProducers(data) {
  const container = document.querySelector('#producer_container');
  unlockProducers(data.producers, data.coffee)
  getUnlockedProducers(data);
  deleteAllChildNodes(container);
  for (value of getUnlockedProducers(data)) {
    container.append(makeProducerDiv(value))
  }
}

/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
  return data.producers.find(producer => producer.id === producerId);
}

function canAffordProducer(data, producerId) {
  return data.coffee >= getProducerById(data, producerId).price;
}

function updateCPSView(cps) {
  document.querySelector('#cps').innerText = cps;
}

function updatePrice(oldPrice) {
  return Math.floor(oldPrice * 1.25);
}

function attemptToBuyProducer(data, producerId) {
  let producerInQuestion = getProducerById(data, producerId);
  if (canAffordProducer(data, producerId)) {
    producerInQuestion.qty += 1;
    data.coffee -= producerInQuestion.price
    producerInQuestion.price = updatePrice(producerInQuestion.price)
    data.totalCPS += producerInQuestion.cps
    return true;
  }
  return false;
}

function buyButtonClick(event, data) {
  if (event.target.tagName !== 'BUTTON') {
    return false;
  }
  let producerId = event.target.id.slice(4);
  if (!canAffordProducer(data, producerId)) {
    window.alert('Not enough coffee');
  } else {
    attemptToBuyProducer(data, producerId);
    renderProducers(data);
    updateCoffeeView(data.coffee);
    updateCPSView(data.totalCPS);
  }
}

function tick(data) {
  data.coffee += data.totalCPS;
  updateCoffeeView(data.coffee);
  updateCPSView(data.totalCPS);
  renderProducers(data);
}

function saveData(data) {
  localStorage.setItem('savedGameData', JSON.stringify(data));
}

/*************************
 *  Start your engines!
 *************************/

// You don't need to edit any of the code below
// But it is worth reading so you know what it does!

// So far we've just defined some functions; we haven't actually
// called any of them. Now it's time to get things moving.

// We'll begin with a check to see if we're in a web browser; if we're just running this code in node for purposes of testing, we don't want to 'start the engines'.

// How does this check work? Node gives us access to a global variable /// called `process`, but this variable is undefined in the browser. So,
// we can see if we're in node by checking to see if `process` exists.
if (typeof process === 'undefined') {
  // Get starting data from the window object
  // (This comes from data.js)


  const data = window.data;

  // Add an event listener to the giant coffee emoji
  const bigCoffee = document.getElementById('big_coffee');
  bigCoffee.addEventListener('click', () => clickCoffee(data));

  // Add an event listener to the container that holds all of the producers
  // Pass in the browser event and our data object to the event listener
  const producerContainer = document.getElementById('producer_container');
  producerContainer.addEventListener('click', event => {
    buyButtonClick(event, data);
  });

  // Call the tick function passing in the data object once per second
  setInterval(() => tick(data), 1000);
  setInterval(() => saveData(data), 1000);
}


// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.
else if (process) {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick
  };
}
