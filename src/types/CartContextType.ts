import type { Dispatch, SetStateAction } from 'react'
import type { CartItem } from './Order'

export type CartContextType = {
    items: CartItem[];
    setItems: Dispatch<SetStateAction<CartItem[]>>;

    restaurantId: number | null;
    setRestaurantId: Dispatch<SetStateAction<number | null>>;

    subtotal: number;
    totalItems: number;
}
