if (localStorage.getItem('savedGameData')) {
  window.data = JSON.parse(localStorage.getItem('savedGameData'));
} else {
  window.data = {
    coffee: 0,
    totalCPS: 0,
    producers: [
      {
        id: 'chemex',
        price: 5,
        unlocked: false,
        cps: 2,
        qty: 0
      },
      {
        id: 'french_press',
        price: 25,
        unlocked: false,
        cps: 4,
        qty: 0
      },
      {
        id: 'mr._coffee',
        price: 50,
        unlocked: false,
        cps: 10,
        qty: 0
      },
      {
        id: 'ten_cup_urn',
        price: 250,
        unlocked: false,
        cps: 20,
        qty: 0
      },
      {
        id: 'espresso_machine',
        price: 500,
        unlocked: false,
        cps: 40,
        qty: 0
      },
      {
        id: 'ten_gallon_urn',
        price: 2500,
        unlocked: false,
        cps: 100,
        qty: 0
      },
      {
        id: 'coffeeshop',
        price: 5000,
        unlocked: false,
        cps: 150,
        qty: 0
      },
      {
        id: 'coffee_factory',
        price: 25000,
        unlocked: false,
        cps: 200,
        qty: 0
      },
      {
        id: 'coffee_fountain',
        price: 50000,
        unlocked: false,
        cps: 400,
        qty: 0
      },
      {
        id: 'coffee_river',
        price: 250000,
        unlocked: false,
        cps: 1000,
        qty: 0
      },
      {
        id: 'coffee_ocean',
        price: 500000,
        unlocked: false,
        cps: 2000,
        qty: 0
      },
      {
        id: 'coffee_planet',
        price: 2500000,
        unlocked: false,
        cps: 4000,
        qty: 0
      }
    ]
  };
}