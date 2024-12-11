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

export default function MenuPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    name: "",
    category: "",
    minPrice: 0,
    maxPrice: 1000,
  });

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

  return (
    <section>
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
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
