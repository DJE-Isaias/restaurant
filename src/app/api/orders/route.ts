import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            dish: true, // Incluir la información del plato para cada item
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Error fetching orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { items } = await req.json(); // Los artículos del carrito se reciben en el cuerpo de la solicitud
    console.log('items', items);
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in the cart" },
        { status: 400 }
      );
    }

    // Calcular el total de la orden
    const totalPrice = items.reduce(
      async (total: number, item: { dishId: number; quantity: number }) => {
        // Aquí es necesario buscar el precio del plato usando `dishId`
        // Suponiendo que tienes un método para buscar el plato por su ID
        const dish = await prisma.dish.findUnique({
          where: { id: item.dishId },
        });

        if (!dish) {
          throw new Error(`Dish with ID ${item.dishId} not found`);
        }

        return total + dish.price * item.quantity;
      },
      0
    );

    // Crear la orden como completada
    const order = await prisma.order.create({
      data: {
        totalPrice,
        status: "completed",
        items: {
          create: items.map((item: { dishId: number; quantity: number }) => ({
            dishId: item.dishId,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}
