/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const images = {
  restaurantLogo:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/McDonald%27s_SVG_logo.svg/960px-McDonald%27s_SVG_logo.svg.png",
  restaurantCover:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/McDonald%27s_Walsrode_exterior_2026.jpg/960px-McDonald%27s_Walsrode_exterior_2026.jpg",

  bigMacDuploCombo:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Double_Big_Mac_Meal_at_McDonald%27s_%285116376216%29.jpg/960px-Double_Big_Mac_Meal_at_McDonald%27s_%285116376216%29.jpg",
  duploQuarteraoCombo:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Singapore_McDonald%27s_Double_Quarter_Pounder_with_Cheese_Burger_07-08-2025.jpg/960px-Singapore_McDonald%27s_Double_Quarter_Pounder_with_Cheese_Burger_07-08-2025.jpg",
  braboOnionRings:
    "https://upload.wikimedia.org/wikipedia/commons/7/7d/Steak_burger_with_cheese_and_onion_rings.jpg",
  mcCrispyCombo:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/McDonalds_Buttermilk_Crispy_Chicken_Sandwich.jpg/960px-McDonalds_Buttermilk_Crispy_Chicken_Sandwich.jpg",

  duploCheddar:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/McDonald%27s_Double_Cheeseburger_%282024%29.png/960px-McDonald%27s_Double_Cheeseburger_%282024%29.png",
  duploQuarterao:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/McDonald%27s_Quarter_Pounder_with_Cheese%2C_United_States.jpg/960px-McDonald%27s_Quarter_Pounder_with_Cheese%2C_United_States.jpg",

  casquinhaMista:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Liat_Portal_for_Foodie_Disorder_-_Chocolate_and_vanilla_soft_serve_ice_cream_cone.jpg/960px-Liat_Portal_for_Foodie_Disorder_-_Chocolate_and_vanilla_soft_serve_ice_cream_cone.jpg",

  batataPequena:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/McDonald%27s_small_fries_%2829514257135%29.jpg/960px-McDonald%27s_small_fries_%2829514257135%29.jpg",
  batataMedia:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/McDonald%27s_Medium_Size_French_Fries.jpg/960px-McDonald%27s_Medium_Size_French_Fries.jpg",
  batataGrande:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/McDonald%27s_French_Fries%2C_Canada%2C_2026-04-04.jpg/960px-McDonald%27s_French_Fries%2C_Canada%2C_2026-04-04.jpg",
};

const main = async () => {
  await prismaClient.$transaction(async (tx: any) => {
    await tx.restaurant.deleteMany();

    const restaurant = await tx.restaurant.create({
      data: {
        name: "FSW Donalds",
        slug: "fsw-donalds",
        description: "O melhor fast food do mundo",
        avatarImageUrl: images.restaurantLogo,
        coverImageUrl: images.restaurantCover,
      },
    });

    const combosCategory = await tx.menuCategory.create({
      data: { name: "Combos", restaurantId: restaurant.id },
    });

    const hamburgueresCategory = await tx.menuCategory.create({
      data: { name: "Hambúrgueres", restaurantId: restaurant.id },
    });

    const dessertsCategory = await tx.menuCategory.create({
      data: { name: "Sobremesas", restaurantId: restaurant.id },
    });

    const frenchFriesCategory = await tx.menuCategory.create({
      data: { name: "Batatas Fritas", restaurantId: restaurant.id },
    });

    await tx.product.createMany({
      data: [
        // Combos
        {
          name: "McOferta Média Big Mac Duplo",
          description:
            "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar com gergelim, acompanhamento e bebida.",
          price: 39.9,
          imageUrl: images.bigMacDuploCombo,
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Queijo fatiado sabor cheddar",
            "Alface americana",
            "Molho especial",
          ],
          categoryId: combosCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "McOferta Duplo Quarterão",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar, cebola e brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          price: 41.5,
          imageUrl: images.duploQuarteraoCombo,
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Maionese especial com sabor de carne defumada",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
          categoryId: combosCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Novo Brabo Melt Onion Rings",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar, cebola e brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          price: 41.5,
          imageUrl: images.braboOnionRings,
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
          categoryId: combosCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "McCrispy Chicken Elite",
          description:
            "Composto por pão tipo brioche com batata, molho HoneyFire, bacon em fatias, alface, tomate, queijo tipo cheddar, filé de frango temperado e empanado, acompanhamento e bebida.",
          price: 39.9,
          imageUrl: images.mcCrispyCombo,
          ingredients: [
            "Pão tipo brioche",
            "Filé de frango empanado",
            "Molho HoneyFire",
            "Bacon em fatias",
            "Alface",
            "Tomate",
            "Queijo tipo cheddar",
          ],
          categoryId: combosCategory.id,
          restaurantId: restaurant.id,
        },

        // Hambúrgueres
        {
          name: "Duplo Cheddar McMelt",
          description:
            "Dois hambúrgueres de carne 100% bovina, queijo tipo cheddar, cebola e acompanhamento.",
          price: 29.9,
          imageUrl: images.duploCheddar,
          ingredients: [
            "Pão",
            "Hambúrguer de carne 100% bovina",
            "Queijo tipo cheddar",
            "Cebola",
          ],
          categoryId: hamburgueresCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Duplo Quarterão",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar e brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          price: 41.5,
          imageUrl: images.duploQuarterao,
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Maionese especial com sabor de carne defumada",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
          categoryId: hamburgueresCategory.id,
          restaurantId: restaurant.id,
        },

        // Sobremesas
        {
          name: "Casquinha de Mista",
          description: "Casquinha de sorvete sabor baunilha e chocolate.",
          price: 2.9,
          imageUrl: images.casquinhaMista,
          ingredients: [],
          categoryId: dessertsCategory.id,
          restaurantId: restaurant.id,
        },

        // Batatas fritas
        {
          name: "Small French Fries",
          description:
            "Batatas fritas crocantes por fora e macias por dentro, servidas quentinhas e douradas no tamanho pequeno.",
          price: 9.9,
          imageUrl: images.batataPequena,
          ingredients: ["Batata", "Sal"],
          categoryId: frenchFriesCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Medium French Fries",
          description:
            "Batatas fritas crocantes por fora e macias por dentro, servidas quentinhas e douradas no tamanho médio.",
          price: 11.9,
          imageUrl: images.batataMedia,
          ingredients: ["Batata", "Sal"],
          categoryId: frenchFriesCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Big French Fries",
          description:
            "Batatas fritas crocantes por fora e macias por dentro, servidas quentinhas e douradas no tamanho grande.",
          price: 13.9,
          imageUrl: images.batataGrande,
          ingredients: ["Batata", "Sal"],
          categoryId: frenchFriesCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
  });
};

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
