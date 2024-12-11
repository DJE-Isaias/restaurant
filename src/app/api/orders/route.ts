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

    // Calcular el total de la orden
    const totalPrice = items.reduce(
      (total: number, item: { price: number; quantity: number }) => {
        return total + item.price * item.quantity;
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
