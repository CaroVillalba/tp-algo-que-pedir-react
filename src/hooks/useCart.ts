import { useState } from 'react'
import type { CartItem } from '../types/Order'
import type { CartContextType } from '../types/CartContextType'

export const useCart = (): CartContextType => {
    const [items, setItems] = useState<CartItem[]>([])
    const [restaurantId, setRestaurantId] = useState<number | null>(null)

    const subtotal = items.reduce((acc, i) => acc + i.total, 0)
    const totalItems = items.reduce((acc, i) => acc + i.qty, 0)

    return {
        items,
        setItems,
        restaurantId,
        setRestaurantId,
        subtotal,
        totalItems,
    }
}
