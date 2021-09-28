'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('bathbombs', [{
       style: 'Gingerbread with Bow',
       image: './images/make-own.jpeg',
       description: 'Paint Your Own Bath Bomb sets comes with everything you need! Get creative and make your own bath bomb in your image!',
       ingredients: 'Baking soda, Citric Acid, Coconut Oil, Cocoa Butter, Epsom Salt, Polysorbate 80, Corn Starch, Isopropyl Alcohol, Fragrance, Red 40, Blue 1, Yellow 5, Mica',
       cost: 12.95,
       pinterest:'https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fpaint-your-own-gingerbread&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_093018_1024x1024.jpg%3Fv%3D1627746415&description=Paint%20Your%20Own%20Bath%20Bomb&method=button',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       style: 'Peppermint Hot Cocoa',
       image: './images/peppermint.jpeg',
       description: 'Pop off the icing and hold under running water for a bath full of delicious moisturizing bubbles. Place bath bomb in the water in the same bath or separate',
       ingredients: 'Baking soda, Citric Acid, Coconut Oil, Cocoa Butter, Epsom Salt, Sodium Lauryl Sulfacetate, Polysorbate 80, Cocamidopropyl Betaine, Cream of Tarter, Corn Starch, Isopropyl Alcohol, Fragrance, Red 40, Blue 1, Yellow 5, Mica, Biodegradable Glitter, Sodium Cocoyl Isethionate Noodles, Soap',
       cost: 12.95,
       pinterest:'https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fpeppermint-hot-cocoa&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_093222_1024x1024.jpg%3Fv%3D1627746816&description=Peppermint%20Hot%20Cocoa&method=button',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
     style: 'Snow Globe Bath Bomb',
     image: './images/snow-globe.jpeg',
     description: 'Listing is for 1 Snow Globe bath bomb. Hidden color inside. Bottom is a bath bomb, top is a bouncy ball',
     ingredients: null,
     cost: 12.95,
     pinterest: 'https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fsnow-globe&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_093119_1024x1024.jpg%3Fv%3D1627746898&description=Snow%20Globe%20Bath%20Bomb&method=button',
     createdAt: new Date(),
     updatedAt: new Date()
    },
    {
     style: 'Gingerbread Cupcake With Bubble Frosting',
     image: './images/gingerbread.jpeg',
     description: 'This 3 in 1 bath bomb is scented in Gingerbread. The top "icing" is a bubble bath and the gingerbread on top is soap. Pop off the icing and hold under running water for a bath full of delicious moisturizing bubbles. Drop the bottom of the cupcake in the same bath or a separate bath',
     ingredients: 'Baking soda, Citric Acid, Coconut Oil, Cocoa Butter, Epsom Salt, Sodium Lauryl Sulfacetate, Polysorbate 80, Cocamidopropyl Betaine, Cream of Tarter, Corn Starch, Isopropyl Alcohol, Fragrance, Red 40, Blue 1, Yellow 5, Mica, Biodegradable Glitter, Sodium Cocoyl Isethionate Noodles, Soap',
     cost: 12.95,
     pinterest: 'https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fgingerbread-cupcake-with-bubble-frosting&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_100021_1024x1024.jpg%3Fv%3D1627746111&description=Gingerbread%20Cupcake%20With%20Bubble%20Frosting&method=button',
     createdAt: new Date(),
     updatedAt: new Date()
    },
    {
      style: 'Eggnog Body Frosting Scrub',
      image: './images/eggnog.jpeg',
      description: 'This 3 in 1 Sugar scrub leaves your skin feeling soft and silky. Simply place a small amount of scrub in your hands and massage into the area you would like exfoliated. Add water for a rich creamy lather. Exfoliate, cleanse, moisturize',
      ingredients: 'Sugar, Sodium Cocoyl Isethionate Powder, Glycerin, Cocamidopropyl Betaine, Optiphen plus, Steric Acid, Tetrasodium EDTA, Mica',
      cost: 12.95,
      pinterest: 'https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fegg-nog-body-frosting-scrub&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_022922_1024x1024.jpg%3Fv%3D1627744948&description=Eggnog%20Body%20Frosting%20Scrub&method=button',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      style: 'Hot Cocoa Body Frosting Scrub',
      image: './images/hot-cocoa.jpeg', 
      description: 'This 3 in 1 Sugar scrub leaves your skin feeling soft and silky. Simply place a small amount of scrub in your hands and massage into the area you would like exfoliated. Add water for a rich creamy lather. Exfoliate, cleanse, moisturize',
      ingredients: 'Sugar, Sodium Cocoyl Isethionate Powder, Glycerin, Cocamidopropyl Betaine, Optiphen plus, Steric Acid, Tetrasodium EDTA, Mica',
      cost: 12.95,
      pinterest: 'https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fhot-cocoa-body-frosting-scrub&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_001218_1024x1024.jpg%3Fv%3D1627744925&description=Hot%20Cocoa%20Body%20Frosting%20Scrub&method=button',
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bathbombs', null, {});
  }
};
