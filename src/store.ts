import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[],
    addToCart: (product: Product) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    removeItem: (id: Product['id']) => void,
    clearOrder: () => void
}

const MAX_ITEMS = 5;

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCart: (product) => {
        const {categoryId, image, ...data} = product;

        let newOrder: OrderItem[] = [];
        const order = get().order;

        if(order.find(item => item.id === product.id)) {

            newOrder = order.map(item => {
                if(item.id === product.id && item.quantity < MAX_ITEMS) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: item.price * (item.quantity + 1)
                    };
                }
                
                return item;
            })
        }
        else {
            const newProduct = {
                ...data,
                quantity: 1,
                subtotal: product.price
            }

            newOrder = [ ...order,  newProduct ];
        }

        set(() => ({
            order: newOrder
        }));
    },
    increaseQuantity: (id) => {
        set((state) => {

            const newOrder = state.order.map(item => {
                if( item.id === id ) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: item.price * (item.quantity + 1)
                    }
                }

                return item
            });
            
            return {
                order: newOrder
            }
        });
    },
    decreaseQuantity: (id) => {
        set((state) => {

            const newOrder = state.order.map(item => {
                if( item.id === id ) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                        subtotal: item.price * (item.quantity - 1)
                    }
                }

                return item
            });
            
            return {
                order: newOrder
            }
        });
    },
    removeItem: (id) => {
        set((state) => {
            const newOrder = state.order.filter(item => item.id !== id);
            
            return {
                order: newOrder
            }
        });
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }));
    }
}));