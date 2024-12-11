import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.dish.createMany({
    data: [
      {
        name: "Ensalada César",
        description:
          "Ensalada fresca con pollo, lechuga, queso parmesano y aderezo César.",
        category: "Ensaladas",
        price: 8.99,
        imageUrl:
          "https://images.unsplash.com/photo-1669283714145-f97867f6c238?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW5zYWxhZGElMjBjZXNhcnxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Pizza Margarita",
        description: "Pizza con salsa de tomate, mozzarella fresca y albahaca.",
        category: "Pizzas",
        price: 12.99,
        imageUrl:
          "https://images.unsplash.com/photo-1573821663912-6df460f9c684?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UGl6emElMjBNYXJnYXJpdGF8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Sushi de Atún",
        description: "Sushi fresco de atún con arroz y algas nori.",
        category: "Sushi",
        price: 15.99,
        imageUrl:
          "https://images.unsplash.com/photo-1558985212-92c2ff0b56e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFN1c2hpJTIwZGUlMjBBdCVDMyVCQW58ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Hamburguesa Clásica",
        description:
          "Hamburguesa con carne de res, lechuga, tomate, cebolla y pan recién horneado.",
        category: "Hamburguesas",
        price: 10.49,
        imageUrl:
          "https://media.istockphoto.com/id/637790866/es/foto/100-cordero-hamburguesa-griega.webp?a=1&b=1&s=612x612&w=0&k=20&c=WZlZ6Tkq7IJG-glBhrGGUX5MjQjZDMnPvzv9RIO-ZYM=",
      },
      {
        name: "Tacos al Pastor",
        description:
          "Tacos mexicanos con carne al pastor, cebolla, cilantro y salsa.",
        category: "Tacos",
        price: 6.99,
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1681406994499-737a170e9c43?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGFjb3MlMjBhbCUyMFBhc3RvcnxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Sopa de Mariscos",
        description:
          "Sopa caliente con camarones, mejillones, calamares y verduras frescas.",
        category: "Sopas",
        price: 13.49,
        imageUrl:
          "https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U29wYSUyMGRlJTIwTWFyaXNjb3N8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Pasta Carbonara",
        description:
          "Pasta italiana con salsa cremosa de huevo, panceta y queso parmesano.",
        category: "Pasta",
        price: 14.99,
        imageUrl:
          "https://media.istockphoto.com/id/1181456803/es/foto/espaguetis-cremosos-con-champi%C3%B1ones-pasta-cremosa-con-champi%C3%B1ones-pasta-de-espaguetis-y.webp?a=1&b=1&s=612x612&w=0&k=20&c=ocTTiRa15BsEFxjDqRP6QSyqOGEfy03aGbztEJYgYtw=",
      },
      {
        name: "Filete de Res",
        description:
          "Filete jugoso de res servido con papas fritas y ensalada.",
        category: "Carnes",
        price: 18.99,
        imageUrl:
          "https://media.istockphoto.com/id/1358009037/es/foto/filete-de-rib-eye-en-rodajas-y-a-la-parrilla-carne-de-res-jaspeada-de-rib-eye-sobre-una-tabla.webp?a=1&b=1&s=612x612&w=0&k=20&c=nlZlqmQjoYCuCLKy37OVza1uBe7Yh_3_Z7lwIMNFalQ=",
      },
      {
        name: "Enchiladas Verdes",
        description: "Tortillas rellenas de pollo cubiertas con salsa verde.",
        category: "Mexicano",
        price: 11.49,
        imageUrl:
          "https://media.istockphoto.com/id/1915296994/es/foto/green-enchiladas.webp?a=1&b=1&s=612x612&w=0&k=20&c=CLZaQz6qt0uN7F69tvKLoxVnz8FOz3re_oYI5WWsvW8=",
      },
      {
        name: "Croquetas de Jamón",
        description: "Deliciosas croquetas rellenas de jamón y queso.",
        category: "Aperitivos",
        price: 7.99,
        imageUrl:
          "https://media.istockphoto.com/id/521757193/es/foto/jam%C3%B3n-croquettes.webp?a=1&b=1&s=612x612&w=0&k=20&c=0wUv1YZTdafo_K4aDlS0v5eCh7Vbzz2Q2vFR4pmS3ao=",
      },
      {
        name: "Paella de Mariscos",
        description: "Arroz con mariscos frescos, pimientos y guisantes.",
        category: "Arroces",
        price: 16.99,
        imageUrl:
          "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGFlbGxhJTIwZGUlMjBNYXJpc2Nvc3xlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Tartar de Salmón",
        description: "Salmón crudo con aguacate, cebollas moradas y limón.",
        category: "Sushi",
        price: 14.49,
        imageUrl:
          "https://media.istockphoto.com/id/1131020791/es/foto/comida-peruana-ceviche-de-salm%C3%B3n-con-aguacate-cebolla-tierna-y-lim%C3%B3n-sobre-plato-blanco.webp?a=1&b=1&s=612x612&w=0&k=20&c=UDYTHX8hy13_RaLX7SBpE6Ihzs2U3nHpxiXFOGvZu3k=",
      },
      {
        name: "Croissant de Almendra",
        description:
          "Delicioso croissant relleno de almendra y crema pastelera.",
        category: "Postres",
        price: 4.99,
        imageUrl:
          "https://media.istockphoto.com/id/2161017333/es/foto/freshly-baked-croissants-with-almonds-on-a-plate.webp?a=1&b=1&s=612x612&w=0&k=20&c=9cZqNW68yqsKdWd6BSi78atZ-bxMd24zS8OUsYak4MA=",
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
