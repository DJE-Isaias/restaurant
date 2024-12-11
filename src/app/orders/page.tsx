"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  id: number;
  dish: {
    name: string;
    price: number;
  };
  quantity: number;
};

type Order = {
  id: number;
  createdAt: string;
  totalPrice: number;
  status: string;
  items: OrderItem[];
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>All Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Order #{order.id}</h3>
            <p>Status: {order.status}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Total: ${order.totalPrice.toFixed(2)}</p>
            <div className="mt-2">
              <h4 className="font-medium">Items:</h4>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity} x {item.dish.name} - $
                    {item.dish.price.toFixed(2)} each
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
