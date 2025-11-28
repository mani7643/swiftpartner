import { create } from "zustand";

interface Order {
  id: string;
  restaurant: string;
  restaurantAddress: string;
  customer: string;
  customerAddress: string;
  items: string;
  amount: number;
  acceptedAt: string;
}

interface RiderState {
  isOnline: boolean;
  earnings: number;
  acceptedOrders: Order[];
  currentOrder: Order | null;
  setOnline: (status: boolean) => void;
  acceptOrder: (order: Order) => void;
  completeOrder: () => void;
  setCurrentOrder: (order: Order | null) => void;
}

export const useRiderStore = create<RiderState>((set) => ({
  isOnline: true,
  earnings: 0,
  acceptedOrders: [],
  currentOrder: null,
  setOnline: (status) => set({ isOnline: status }),
  acceptOrder: (order) =>
    set((state) => ({
      earnings: state.earnings + order.amount,
      acceptedOrders: [...state.acceptedOrders, { ...order, acceptedAt: new Date().toISOString() }],
      currentOrder: order,
    })),
  completeOrder: () => set({ currentOrder: null }),
  setCurrentOrder: (order) => set({ currentOrder: order }),
}));