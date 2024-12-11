"use client";

import { Dish } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Filters {
  name: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

interface CartItem {
  dish: Dish;
  quantity: number;
}

export default function MenuPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    name: "",
    category: "",
    minPrice: 0,
    maxPrice: 1000,
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchDishes() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(
          filters as unknown as Record<string, string>
        ).toString();
        const res = await fetch(`/api/dishes?${queryParams}`);
        const data = await res.json();
        if (res.ok) {
          setDishes(data);
        }
      } catch (err) {
        console.log("An unexpected error occurred: " + err);
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddToCart = (dish: Dish) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.dish.id === dish.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { dish, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (dishId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.dish.id !== dishId));
  };

  const handleCheckout = async () => {
    const items = cart.map((item) => ({
      dishId: item.dish.id, // Asegúrate de usar 'dishId' aquí
      quantity: item.quantity,
    }));

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }), // Enviar solo los 'items' con 'dishId' y 'quantity'
    });

    if (response.ok) {
      alert("Order placed successfully!");
      setCart([]); // Vaciar el carrito después de hacer la compra
    } else {
      alert("Failed to place order.");
    }
  };

  return (
    <section className="flex">
      <div className="w-full lg:w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-6">Menú</h2>
        <form className="mb-8 flex">
          <input
            type="text"
            name="name"
            placeholder="Buscar por nombre"
            value={filters.name}
            onChange={handleFilterChange}
            className="border p-2 mr-4"
          />
          <input
            type="text"
            name="category"
            placeholder="Categoría"
            value={filters.category}
            onChange={handleFilterChange}
            className="border p-2 mr-4"
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Precio mínimo"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="border p-2 mr-4"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Precio máximo"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="border p-2"
          />
        </form>
        {loading ? (
          <p>Cargando platos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish) => (
              <div key={dish.id} className="border p-4 rounded-lg">
                <Image
                  width={200}
                  height={200}
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-bold">{dish.name}</h3>
                <p>{dish.description}</p>
                <p className="text-lg font-semibold mt-2">${dish.price}</p>
                <button
                  onClick={() => handleAddToCart(dish)}
                  className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botón para abrir/cerrar el carrito */}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full"
      >
        {isCartOpen ? "Cerrar Carrito" : "Abrir Carrito"}
      </button>

      {/* Carrito - Lateral derecho */}
      <div
        className={`fixed w-[30vw] top-0 right-0 h-full bg-white shadow-lg p-6 overflow-y-auto transform transition-all ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <section className="flex justify-between p-3 items-center">
          <h3 className="text-2xl font-bold mb-4">Carrito</h3>
          <nav
            className="text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            X
          </nav>
        </section>
        {cart.length > 0 ? (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.dish.id} className="border p-4 rounded-lg">
                <h4 className="text-lg font-semibold">{item.dish.name}</h4>
                <p>
                  {item.quantity} x ${item.dish.price}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.dish.id)}
                  className="mt-2 text-red-500"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <div className="text-right mt-4 font-semibold">
              Total: $
              {cart
                .reduce(
                  (total, item) => total + item.dish.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 p-2 bg-green-500 text-white rounded"
            >
              Confirmar compra
            </button>
          </div>
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </div>
    </section>
  );
}
