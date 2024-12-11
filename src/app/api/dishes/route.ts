import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") || "";
  const category = url.searchParams.get("category") || "";
  const minPrice = parseFloat(url.searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(url.searchParams.get("maxPrice") || "1000");

  try {
    const dishes = await prisma.dish.findMany({
      where: {
        name: {
          contains: name, // Filtra por nombre
        },
        category: {
          contains: category, // Filtra por categoría
        },
        price: {
          gte: minPrice, // Filtro de precio mínimo
          lte: maxPrice, // Filtro de precio máximo
        },
      },
    });

    return NextResponse.json(dishes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dishes: " + error },
      { status: 500 }
    );
  }
}
