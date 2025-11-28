// src/server/socket.ts
import { Server } from "socket.io";

const io = new Server({
  path: "/api/socket",
  addTrailingSlash: false,
});

io.on("connection", (socket) => {
  console.log("Rider connected:", socket.id);

  // Send a real order every 15 seconds (demo)
  const orderInterval = setInterval(() => {
    const orders = [
      {
        id: "ORD" + Math.floor(Math.random() * 999),
        restaurant: "Burger King",
        restaurantAddress: "Indiranagar, Bangalore",
        customer: "Priya Singh",
        customerAddress: "Marathahalli, Bangalore",
        items: "1 Whopper Meal + Fries",
        amount: 379,
      },
      {
        id: "ORD" + Math.floor(Math.random() * 999),
        restaurant: "KFC",
        restaurantAddress: "Koramangala, Bangalore",
        customer: "Amit Kumar",
        customerAddress: "BTM Layout, Bangalore",
        items: "Zinger Burger + Pepsi",
        amount: 299,
      },
    ];

    const randomOrder = orders[Math.floor(Math.random() * orders.length)];
    socket.emit("new-order", randomOrder);
  }, 15000);

  socket.on("disconnect", () => {
    clearInterval(orderInterval);
    console.log("Rider disconnected");
  });
});

export default io;